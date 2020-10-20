import React, { useEffect } from "react";
import { withFormik, Form, useFormikContext } from 'formik';

import LoginComponent from '../login';
import styles from './index.module.scss';
import img_product from './workplace.jpg';
import { auth } from '../../firebase/index.js';

import { axiosInst } from '../common-scss/common'

const CheckoutComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                axiosInst.get(`cart?customerID=${user.uid}`)
                .then(res => {
                    setFieldValue("checkLogin", true, false)
                    console.log("res", res.data[0])
                    setFieldValue("itemsList", res.data[0].itemsList, false);
                }).catch(function (err) {
                    console.log("err", err)
                })
            } else {
                console.log(">>>>>guest")
                var cartLocal = JSON.parse(localStorage.getItem("cart"));
                if (cartLocal) {
                    setFieldValue("itemsList", cartLocal.itemsList, false);
                } else {
                    return;
                }
            }
        });
    }, []);

    let totalPrice = 0;
    return (
        <main>
            <section className={styles.section2}>
                <div className={styles.boxChild1}>
                    <h2>ตะกร้าสินค้า</h2>
                    <div className={styles.wrapTable}>
                        <table className={styles.tableCustom}>
                            <thead className={styles.borderBottom}>
                                <tr>
                                    <th className={styles.textLeft}>สินค้า</th>
                                    <th>จำนวน</th>
                                    <th>มูลค่า</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    values.itemsList.map((dataObjectMapped, index) => {
                                        totalPrice = totalPrice + parseInt(dataObjectMapped.price)
                                        return (
                                            <tr>
                                                <td>
                                                    <div className={`${styles.containerRow} ${styles.flexNoWrap}`}>
                                                        <img src={img_product} className={styles.productPreview} alt="Product" />
                                                        <div className={styles.containerCol}>
                                                            <div className={styles.name}>สติกเกอร์{dataObjectMapped.shape}</div>
                                                            <div className={styles.desciption}>{dataObjectMapped.material}-{dataObjectMapped.coat}-{dataObjectMapped.cutting}-ขนาด{dataObjectMapped.width}x{dataObjectMapped.height}mm</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={styles.textCenter}>{dataObjectMapped.units}</td>
                                                <td className={styles.textCenter}>{dataObjectMapped.price}฿</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot className={styles.borderTop}>
                                <tr className={styles.borderTop}>
                                    <td colspan="2">ค่าสินค้ารวม</td>
                                    <td className={styles.textCenter}>{totalPrice}฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button type="button" onClick={() => props.history.push("/customize")} className={styles.buttonGreen}>สั่งสินค้าอย่างอื่น</button>
                </div>

                <div className={styles.boxChild2}>
                    {!values.checkLogin ?
                        <>
                            <h2>ระบบสมาชิก</h2>
                            <div className={styles.wrapTable}>
                                <Form>
                                    <LoginComponent />
                                </Form>
                            </div>

                            <br /><br />
                            <h2>Checkout as Guest</h2>
                            <button className={styles.buttonGreenFit} type="button" onClick={() => props.history.push("/cart")}>Checkout as Guest</button>
                        </>
                        :
                        <>
                            <button className={`${styles.buttonGreenFit} ${styles.checkLogin}`} onClick={() => props.history.push("/cart")}>Checkout</button>
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
        password: ''
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
        auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                console.log("uid", res.user.uid, "email", res.user.email)
                setFieldValue("checkLoginComponant", false, false);
                props.history.push("/cart")
            })
            .catch(error => {
                console.log("Error", error)
                setFieldValue("checkLoginComponant", true, false);
            })
    },
})(CheckoutComponent);

export default EnhancedCheckoutComponent;