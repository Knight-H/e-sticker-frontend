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
    
    return (
        <>
            <div class={`loader loader-default ${values.loading ? 'is-active' : ''}`}></div>
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

                            <div className={styles.groupRow}>
                                <div className={styles.isRow}>
                                    <div className={styles.leftColumn}>
                                        <p>ชื่อ นามสกุล*<ErrorMessage name="name" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="name" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                    <div className={styles.rightColumn}>
                                        <p>อีเมล*<ErrorMessage name="email" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="email" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                </div>
                                <div className={styles.isRow}>
                                    <div className={styles.leftColumn}>
                                        <p>ที่อยู่*<ErrorMessage name="address" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="address" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                    <div className={styles.rightColumn}>
                                        <p>เบอร์โทรศัพท์*<ErrorMessage name="phone" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="phone" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                </div>
                                <div className={styles.isRow}>
                                    <div className={styles.leftColumn}>
                                        <p>แขวง*<ErrorMessage name="city" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="city" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                    <div className={styles.rightColumn}>
                                        <p>เขต*<ErrorMessage name="county" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="county" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                </div>
                                <div className={styles.isRow}>
                                    <div className={styles.leftColumn}>
                                        <p>จังหวัด*<ErrorMessage name="provice" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="provice" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                    <div className={styles.rightColumn}>
                                        <p>รหัสไปรษณีย์*<ErrorMessage name="zip" render={msg => <span className="error">{msg}</span>} /></p>
                                        <Field name="zip" type="text" disabled={values.waitProcess ? true : false} />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className={styles.btnGreen} disabled={values.waitProcess ? true : false}>ตกลง</button>
                            <button type="button" className={styles.btnGreen} disabled={values.waitProcess ? true : false} onClick={() => setModal(false)}>ปิด</button>
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
        city: '',
        county: '',
        phone: '',
        provice: '',
        email: '',

        waitProcess: false,
        loading: false
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
        if (!values.city) {
            errors.city = "*กรุณาระบุ"
        }
        if (!values.county) {
            errors.county = "*กรุณาระบุ"
        }
        if (!values.phone) {
            errors.phone = "*กรุณาระบุ"
        }
        if (!/^\d+$/.test(values.phone)) {
            errors.phone = "*ต้องเป็นตัวเลข 0-9"
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
        setFieldValue("waitProcess", true, false);
        setFieldValue("loading", true, false);
        let data = {
            fullname: values.name,
            email: values.email,
            phone: values.phone,
            shippingAddress: {
                fullname: values.name,
                zip: values.zip,
                address: values.address,
                city: values.city,
                county: values.county,
                provice: values.provice,
            },
            status: "ok"
        }
        axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/demo`, data)
            .then(res => {
                console.log("res", res);
                setFieldValue("waitProcess", false, false);
                setFieldValue("name", '', false)
                setFieldValue("zip", '', false)
                setFieldValue("address", '', false)
                setFieldValue("city", '', false)
                setFieldValue("county", '', false)
                setFieldValue("phone", '', false)
                setFieldValue("provice", '', false)
                setFieldValue("email", '', false)
                setFieldValue("loading", false, false);
            }).catch(function (err) {
                console.log("err", err)
                setFieldValue("waitProcess", false, false);
                setFieldValue("loading", false, false);
            })
    }
})(HomeComponent);

export default EnhancedHomeComponent;