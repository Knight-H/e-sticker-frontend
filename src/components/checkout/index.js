import React, { useEffect } from "react";
import { withFormik, Form, useFormikContext } from 'formik';

import LoginComponent from '../login';
import styles from './index.module.scss';
import img_product from './workplace.jpg';
import { auth } from '../../firebase/index.js';

import { axiosInst } from '../common-scss/common'
import axios from "axios";

import qs from "querystring";
import jwt_decode from "jwt-decode";

const CheckoutComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        let url = window.location.search;
        const urlParams = new URLSearchParams(url);
        let code = urlParams.get('code');
        setFieldValue("loading", true, false);
        if (code) {
            const requestBody = {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": "http://localhost:3000/cart",
                "client_id": "1655248592",
                "client_secret": "45f5c965e3ac723120e8adec38e8793c"
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post("https://api.line.me/oauth2/v2.1/token", qs.stringify(requestBody), config)
                .then((result) => {
                    console.log("https://api.line.me/oauth2/v2.1/token", result.data)
                    var decoded = jwt_decode(result.data.id_token);
                    console.log("decoded", decoded)
                    let data = {
                        "access_token": result.data.access_token,
                        "customer_id": decoded.sub,
                        "name": decoded.name,
                        "email": decoded.email,
                        "picture": decoded.picture
                    }
                    console.log("data", data);

                    axios.post("https://asia-east2-digitalwish-sticker.cloudfunctions.net/lineLogin", data)
                        .then((res) => {
                            console.log("https://asia-east2-digitalwish-sticker.cloudfunctions.net/lineLogin", res.data)
                            localStorage.setItem("token_line", result.data.id_token);

                            auth
                                .signInWithCustomToken(res.data.firebase_token)
                                .then((res_auth) => {
                                    console.log("res_auth", res_auth)
                                    setFieldValue("loading", false, false);
                                })
                                .catch((error) => {
                                    console.log("error", error)
                                    setFieldValue("loading", false, false);
                                })

                        })
                        .catch((err) => {
                            console.log(err)
                            setFieldValue("loading", false, false);
                        })
                })
                .catch((err) => {
                    console.log(err)
                    setFieldValue("loading", false, false);
                })
        } else return;

    }, [window.location.search])

    useEffect(() => {
        setFieldValue("loading", true, false);
        auth.onAuthStateChanged(user => {
            if (user) {
                axiosInst.get(`cart?customerID=${user.uid}`)
                    .then(res => {
                        setFieldValue("myID", res.data[0].myID, false);
                        setFieldValue("uid", user.uid, false);
                        setFieldValue("checkLogin", true, false)
                        setFieldValue("itemsList", res.data[0].itemsList, false);
                        setFieldValue("loading", false, false);
                    }).catch(function (err) {
                        console.log("err", err)
                        setFieldValue("checkLogin", true, false)
                        setFieldValue("loading", false, false);
                    })
            } else {
                var cartLocal = JSON.parse(localStorage.getItem("cart"));
                if (cartLocal) {
                    setFieldValue("itemsList", cartLocal.itemsList, false);
                    setFieldValue("loading", false, false);
                } else {
                    setFieldValue("loading", false, false);
                    return;
                }
            }
        });
    }, []);

    const handleRemoveItemInCart = (index) => {
        setFieldValue("loading", true, false);
        if (values.uid) {
            values.itemsList.splice(index, 1);

            let data = {
                customerID: values.uid,
                itemsList: values.itemsList
            }
            axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart/${values.myID}`, data)
                .then(res => {
                    console.log("res", res);
                    setFieldValue("itemsList", values.itemsList, false);
                    setFieldValue("loading", false, false);
                }).catch(function (err) {
                    console.log("err", err.response)
                    setFieldValue("loading", false, false);
                })
        } else {
            values.itemsList.splice(index, 1);
            setFieldValue("itemsList", values.itemsList, false);

            let data = {
                "itemsList": values.itemsList
            }
            localStorage.setItem("cart", JSON.stringify(data));
            setFieldValue("loading", false, false);
        }
    }

    let totalPrice = 0;
    return (
        <main>
             <div class={`loader loader-default ${values.loading ? 'is-active' : ''}`}></div>
            <section className={styles.section2}>
                <div className={styles.boxChild1}>
                    <h3>ตะกร้าสินค้า</h3>
                    <div className={styles.wrapTable}>
                        <table className={styles.tableCustom}>
                            <thead className={styles.borderBottom}>
                                <tr>
                                    <th colspan="3" className={styles.textLeft}>สินค้า</th>
                                    <th>จำนวน</th>
                                    <th>มูลค่า</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    values.itemsList.map((dataObjectMapped, index) => {
                                        totalPrice = totalPrice + parseInt(dataObjectMapped.price)
                                        return (
                                            <>
                                                <tr>
                                                    <td colspan="3">
                                                        <div className={`${styles.containerRowCart} ${styles.flexNoWrap}`} >
                                                            <img src={dataObjectMapped.messages[0].content} className={styles.productPreview} alt="Product" />
                                                            <div className={styles.containerCol}>
                                                                <div className={styles.name}>สติกเกอร์{dataObjectMapped.shape}<span onClick={() => {
                                                                    handleRemoveItemInCart(index)
                                                                }} style={{ color: "red", fontSize: "12px", marginLeft: "5px", cursor: "pointer" }}>(ลบรายการ)</span></div>
                                                                <div className={styles.desciption}>{dataObjectMapped.material}-{dataObjectMapped.coat}-ขนาด{dataObjectMapped.width}x{dataObjectMapped.height}cm</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{dataObjectMapped.units}</td>
                                                    <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{dataObjectMapped.price}฿</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" className={`${styles.textCenterMobileNewRow}`}>จำนวน {dataObjectMapped.units} ชิ้น</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" className={`${styles.textCenterMobileNewRow}`}>ราคา {dataObjectMapped.price}฿</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot className={styles.borderTop}>
                                <tr className={styles.borderTop}>
                                    <td colspan="4">ค่าสินค้ารวม</td>
                                    <td className={styles.textCenter}>{totalPrice}฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button type="button" onClick={() => props.history.push("/customize")} className={styles.buttonWhite}>สั่งสินค้าอย่างอื่น</button>
                    <button className={styles.buttonGreen} onClick={() => props.history.push("/checkout")}>ไปหน้าชำระเงิน</button>
                </div>

                <div className={styles.boxChild2}>
                    {!values.checkLogin ?
                        <>
                            <h3>ระบบสมาชิก</h3>
                            <div className={styles.wrapTable}>
                                <Form>
                                    <LoginComponent />
                                </Form>
                            </div>

                            <br /><br />
                            <h3>สั่งสินค้าสำหรับบุคคลที่ไม่ใช้สมาชิก</h3>
                            <button className={styles.buttonGreenFit} type="button" onClick={() => props.history.push("/checkout")}>สั่งสินค้า</button>
                        </>
                        :
                        <>
                            
                        </>
                    }
                </div>
            </section>
        </main>
    );
};

const EnhancedCheckoutComponent = withFormik({
    mapPropsToValues: () => ({
        itemsList: [],
        checkLogin: false,
        checkLoginComponant: false,

        email: '',
        password: '',

        loading: false
    }),
    validate: values => {
        const errors = {};

        if (values.email === "") {
            errors.email = "*กรุณากรอก"
        }

        if (values.password === "") {
            errors.password = "*กรุณากรอก"
        }
        return errors;
    },
    handleSubmit: (values, { setFieldValue, props }) => {
        setFieldValue("loading", true, false);
        auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                console.log("uid", res.user.uid, "email", res.user.email)
                setFieldValue("checkLoginComponant", false, false);
                setFieldValue("loading", false, false);
                props.history.push("/checkout")
            })
            .catch(error => {
                console.log("Error", error)
                setFieldValue("checkLoginComponant", true, false);
                setFieldValue("loading", false, false);
            })
    },
})(CheckoutComponent);

export default EnhancedCheckoutComponent;