import React, { useEffect, useRef, useState } from "react";
import styles from './index.module.scss';
import { Link } from "react-router-dom";
import { useFormikContext, withFormik, Form, Field, ErrorMessage } from 'formik';

import { ReactComponent as Banner } from './banner.svg';

import { ReactComponent as S11SampleIcon } from './s1-1-sample-icon.svg';
import { ReactComponent as S12BasketIcon } from './s1-2-basket-icon.svg';
import { ReactComponent as S13StatusIcon } from './s1-3-status-icon.svg';
import { ReactComponent as S21OrderIcon } from './s2-1-order-icon.svg';
import { ReactComponent as S31ArtIcon } from './s3-1-art-icon.svg';
import { ReactComponent as S32PPWhiteIcon } from './s3-2-pp-white-icon.svg';
import { ReactComponent as S33PPSilverIcon } from './s3-3-pp-silver-icon.svg';
import { ReactComponent as S34PPTransIcon } from './s3-4-pp-trans-icon.svg';
import { ReactComponent as S41LogoIcon } from './s4-1-logo-icon.svg';
import { ReactComponent as S51OrderIcon } from './s5-1-order-icon.svg';

import { ReactComponent as Test } from './test.svg';

import FooterComponent from "../footer";

import axios from "axios";
import qs from "querystring";
import { auth } from '../../firebase';
import jwt_decode from "jwt-decode";
import { axiosInst } from "../common-scss/common";

const HomeComponent = (props) => {
    const stepsOrder = useRef(null);
    const ourWorks = useRef(null);
    const [modal, setModal] = useState(false);
    const { values, setFieldValue } = useFormikContext();

    // Take Effect every time the hash of the document is changed - CHANGED TO REFS
    // Thinking of https://medium.com/javascript-in-plain-english/creating-a-hash-anchor-link-effect-with-react-router-a63dcb1a9b0e
    useEffect(() => {
        if (props.location.state !== undefined) {
            if (props.location.state.scrollToStepsOrder) {
                stepsOrder.current.scrollIntoView({ block: 'center' });
            } else if (props.location.state.scrollToOurWorks) {
                ourWorks.current.scrollIntoView({ block: 'center' });
            }

        }
    }, [props.location.state]);

    useEffect(() => {
        let url = window.location.search;
        const urlParams = new URLSearchParams(url);
        let code = urlParams.get('code');

        if (code) {
            const requestBody = {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": "http://localhost:3000",
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
                                })
                                .catch((error) => {
                                    console.log("error", error)
                                })

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        } else return;

    }, [window.location.search])

    return (
        <>
            <main>
                <Banner className={styles.banner} />

                <section className={styles.section1}>
                    <div className={styles.horizontalScroller}>
                        <button onClick={() => setModal(true)}>
                            <S11SampleIcon />
                        ขอชุดตัวอย่างสติกเกอร์

                        </button>
                        <Link to={{
                            pathname: "/",
                            // hash: "#stepsOrder",
                            state: { scrollToStepsOrder: true }
                        }}>
                            <button onClick={() => setModal(false)} >
                                <S12BasketIcon />
                        ขั้นตอนการสั่งซื้อ
                    </button>

                        </Link>
                        <Link to={{
                            pathname: "/myorder",
                            // hash: "#stepsOrder",
                            state: { scrollToStepsOrder: true }
                        }}>

                            <button>
                                <S13StatusIcon /> ดูสถานะการสั่งซื้อ
                        </button>
                        </Link>
                    </div>
                </section>

                {/* <!-- The Modal --> */}
                <Form>
                    <div className={styles.modal} style={modal ? { display: "block" } : { display: "none" }}>
                        <div className={styles.modalContent}>
                            <div className={styles.exampleSticker}>
                                <S11SampleIcon />ขอชุดตัวอย่างสติกเกอร์
                        </div>

                            <div className={styles.exampleStickerBox}>
                                <Test />
                                <div className={styles.exampleStickerBoxDetail}>
                                    <h3>ท่านจะได้รับ</h3>
                                    <p>คำอธิบาย.............................................</p>
                                    <p>คำอธิบาย.............................................</p>
                                    <p>คำอธิบาย.............................................</p>
                                    <p>คำอธิบาย.............................................</p>
                                </div>
                            </div>

                            <div className={styles.groupColumn}>
                                <div className={styles.leftColumn}>
                                    <p>ชื่อ นามสกุล*<ErrorMessage name="name" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="name" type="text" />
                                    <p>ที่อยู่*<ErrorMessage name="address" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="address" type="text" />
                                    <p>แขวง*<ErrorMessage name="zone" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="zone" type="text" />
                                    <p>จังหวัด*<ErrorMessage name="provice" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="provice" type="text" />
                                </div>

                                <div className={styles.rightColumn}>
                                    <p>อีเมล*<ErrorMessage name="email" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="email" type="text" />
                                    <p>เบอร์โทรศัพท์*<ErrorMessage name="phone" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="phone" type="text" />
                                    <p>เขต*<ErrorMessage name="county" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="county" type="text" />
                                    <p>รหัสไปรษณีย์*<ErrorMessage name="zip" render={msg => <span className="error">{msg}</span>} /></p>
                                    <Field name="zip" type="text" />
                                </div>
                            </div>

                            <button type="submit" className={styles.btnGreen}>ตกลง</button>
                            <button type="button" className={styles.btnGreen} onClick={() => setModal(false)}>ปิด</button>
                        </div>
                    </div>
                </Form>

                <section id="stepsOrder" ref={stepsOrder} className={styles.section2}>
                    <h2>ขั้นตอนการสั่งซื้อ</h2>
                    <ol className={styles.stepsOrder}>
                        <li>
                            <span><S11SampleIcon /></span>
                            <p>เลือกรูปแบบสติกเกอร์</p>
                        </li>
                        <li>
                            <span><S11SampleIcon /></span>
                            <p>อัพโหลดไฟล์ & ชำระเงิน</p>
                        </li>
                        <li>
                            <span><S11SampleIcon /></span>
                            <p>อนุมัติแบบงาน</p>
                        </li>
                        <li>
                            <span><S11SampleIcon /></span>
                            <p>ผลิต และ จัดส่งสินค้า</p>
                        </li>
                    </ol>
                    <button>
                        <S21OrderIcon />
                        <Link to="/customize"><b>สั่งซื้อสินค้า</b></Link>
                    </button>

                </section>

                <section id="ourWorks" ref={ourWorks} className={styles.section3Title}>
                    <h2>ผลงานของเรา</h2>
                </section>

                <section id="ourWorks" ref={ourWorks} className={styles.section3}>
                    <div className={styles.cardWrapper}>
                        <div className={styles.card}>
                            กระดาษ Art
                    <S31ArtIcon id="s31Svg" />
                            <button>
                                ดูตัวอย่าง
                    </button>
                        </div>
                        <div className={styles.card}>
                            PP ขาว
                            <S32PPWhiteIcon id="s32Svg" />
                            <button>
                                ดูตัวอย่าง
                            </button>
                        </div>
                        <div className={styles.card}>
                            PP เงิน
                            <S33PPSilverIcon id="s33Svg" />
                            <button>
                                ดูตัวอย่าง
                            </button>
                        </div>
                        <div className={styles.card}>
                            PP ใส
                            <S34PPTransIcon id="s34Svg" />
                            <button>
                                ดูตัวอย่าง
                            </button>
                        </div>
                    </div>

                </section>

                <section className={styles.section4}>
                    <S41LogoIcon />
                    <div>
                        <h2>เกี่ยวกับเรา</h2>
                        <p>
                            <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                    </div>
                </section>

                <button className={styles.orderButton}>
                    <S51OrderIcon />
                    <Link to="/customize">สั่งซื้อสติกเกอร์</Link>
                </button>
            </main>

            <FooterComponent />
        </>
    );
};

const EnhancedHomeComponent = withFormik({
    mapPropsToValues: () => ({
        name: '',
        zip: '',
        address: '',
        zone: '',
        county: '',
        phone: '',
        provice: '',
        email: '',
    }),
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = "*กรุณาระบุ"
        }
        if (!values.zip) {
            errors.zip = "*กรุณาระบุ"
        }
        if (!values.address) {
            errors.address = "*กรุณาระบุ"
        }
        if (!values.zone) {
            errors.zone = "*กรุณาระบุ"
        }
        if (!values.county) {
            errors.county = "*กรุณาระบุ"
        }
        if (!values.phone) {
            errors.phone = "*กรุณาระบุ"
        }
        if (!values.email) {
            errors.email = "*กรุณาระบุ"
        }
        if (!values.provice) {
            errors.provice = "*กรุณาระบุ"
        }

        return errors;
    },
    handleSubmit: (values, { setFieldValue }) => {
        let data = {
            name: values.name,
            zip: values.zip,
            address: values.address,
            zone: values.zone,
            county: values.county,
            phone: values.phone,
            provice: values.provice,
            email: values.email,
        }
        axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/demo`, data)
            .then(res => {
                console.log("res", res);
                window.alert("ส่งข้อมูลสำเร็จแล้ว");
                setFieldValue("name", '', false)
                setFieldValue("zip", '', false)
                setFieldValue("address", '', false)
                setFieldValue("zone", '', false)
                setFieldValue("county", '', false)
                setFieldValue("phone", '', false)
                setFieldValue("provice", '', false)
                setFieldValue("email", '', false)
            }).catch(function (err) {
                console.log("err", err)
                window.alert("ส่งข้อมูลไม่สำเร็จแล้ว");
            })
    }
})(HomeComponent);

export default EnhancedHomeComponent;