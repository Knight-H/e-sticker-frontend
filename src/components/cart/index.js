import React, { useState, useEffect } from "react";
import { useFormikContext, withFormik, Form, Field, ErrorMessage } from 'formik';

import StepProgress from "../step_progress";
import LocationFieldsComponent from '../location-fields';
import TaxFieldsComponent from '../tax-fields';

import fake_data from "./fake-api.json";
import styles from './index.module.scss';
import logoCreditCard from './credit.png';
import logoBangkokBank from './BangkokBank.png';
import logoKrungthaiBank from './KrungthaiBank.jpg';
import logoSiamCommercialBank from './SiamCommercialBank.jpg';

import { auth } from '../../firebase/index.js';
import axios from "axios";
import { axiosInst } from '../common-scss/common'
import { i18_th as i18 } from "../common-scss/i18_text";

const CartComponent = () => {

    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(2);
    const [checkedBox, setCheckedBox] = useState(false);
    const [shippingFee, setShippingFee] = useState(0);
    const [shippingDuration, setShippingDuration] = useState(0);

    useEffect(() => {
        // Fetch Shipping and Payment Option
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/paymentOptions`)
            .then(res => {
                // console.log("res.data[0].paymentOptions", res.data)
                // setFieldValue("paymentOptions", res.data[0], false);
            }).catch(function (err) {
                console.log("err", err)
            });

        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions`)
            .then(res => {
                // console.log("res.data.shipptingoption", res.data)
                setFieldValue("shippingOptions", res.data, false);
            }).catch(function (err) {
                console.log("err", err)
            });

        auth.onAuthStateChanged(user => {
            if (user) { // Login Mode
                // Fetch Cart in Custimer Login
                axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart?customerID=${user.uid}`)
                    .then(res => {
                        setFieldValue("itemsList", res.data[0].itemsList, false);
                    }).catch(function (err) {
                        console.log("err", err)
                    });

                // IF Login fetch address
                axiosInst.get("customers", {
                    params: {
                        customerID: auth.currentUser.uid
                    }
                }).then((res) => {
                    // Temporary for filtering the customer data
                    const customerInfo = res.data.filter((data) => {
                        return data["customerID"] === auth.currentUser.uid
                    })[0]
                    console.log("customerInfo", customerInfo)
                    setFieldValue("address", customerInfo.shippingAddress.address, false);
                    setFieldValue("county", customerInfo.shippingAddress.county, false);
                    setFieldValue("email", customerInfo.email, false);
                    setFieldValue("fullname", customerInfo.fullname, false);
                    setFieldValue("phone", customerInfo.phone, false);
                    setFieldValue("provice", customerInfo.shippingAddress.provice, false);
                    setFieldValue("zip", customerInfo.shippingAddress.zip, false);
                    setFieldValue("zone", customerInfo.shippingAddress.zone, false);
                })

            } else { // Guest Mode
                var cartLocal = JSON.parse(localStorage.getItem("cart"));
                if (cartLocal) {
                    setFieldValue("itemsList", cartLocal.itemsList, false);
                } else {
                    return;
                }
            }
        });

    }, []);

    useEffect(() => {
        if (checkedBox) {
            setFieldValue("billingFullname", values.fullname, false);
            setFieldValue("billingFulladdress", `${values.address} ${values.county} ${values.zone} ${values.provice} ${values.zip}`, false);
        } else {
            setFieldValue("billingFullname", '', false);
            setFieldValue("billingFulladdress", '', false);
        }

    }, [checkedBox]);

    let priceTotal = 0;
    return (
        <>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <Form>
                <section className={styles.section2}>
                    {/* Child Box #1 */}
                    <div className={styles.boxChild1}>
                        <h3>สรุปออเดอร์</h3>
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
                                        values.itemsList.map((dataObjectMapped) => {
                                            priceTotal = priceTotal + parseInt(dataObjectMapped.price);
                                            return (
                                                <>
                                                    <tr>
                                                        <td colspan="3">
                                                            <div className={`${styles.containerRowCart} ${styles.flexNoWrap}`} >
                                                                <img src={dataObjectMapped.messages[0].content} className={styles.productPreview} alt="Product" />
                                                                <div className={styles.containerCol}>
                                                                    <div className={styles.name}>สติกเกอร์{dataObjectMapped.shape}</div>
                                                                    <div className={styles.desciption}>{dataObjectMapped.material}-{dataObjectMapped.coat}-{dataObjectMapped.cutting}-ขนาด{dataObjectMapped.width}x{dataObjectMapped.height}mm</div>
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
                                    <tr>
                                        <td colspan="4">ค่าสินค้ารวม</td>
                                        <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{priceTotal}฿</td>
                                    </tr>
                                    <tr>
                                        <td className={`${styles.textCenterMobileNewRow}`}>{priceTotal}฿</td>
                                    </tr>

                                    <tr>
                                        <td colspan="4">VAT 7%</td>
                                        <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>50฿</td>
                                    </tr>
                                    <tr>
                                        <td className={`${styles.textCenterMobileNewRow} ${styles.rowTr}`}>50฿</td>
                                    </tr>

                                    <tr>
                                        <td colspan="4">
                                            <div className={styles.containerCol}>
                                                <div className={styles.name}>ค่าจัดส่ง</div>
                                                <div className={styles.desciption}>ลงทะเบียน - {shippingDuration} วันทำการ - {shippingFee} บาท</div>
                                            </div>
                                        </td>
                                <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{shippingFee}฿</td>
                                    </tr>
                                    <tr>
                                        <td className={`${styles.textCenterMobileNewRow}`}>{shippingFee}฿</td>
                                    </tr>

                                    <tr className={styles.borderTop}>
                                        <td colspan="4">รวมทั้งหมด</td>
                                        <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{priceTotal + 50 + 70}฿</td>
                                    </tr>
                                    <tr>
                                        <td className={`${styles.textCenterMobileNewRow}`}>{priceTotal + 50 + 70}฿</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Child Box #2 */}
                    <div className={styles.boxChild2}>
                        <h3>ระบุที่อยู่</h3>
                        <LocationFieldsComponent />
                        <h3>เลือก การจัดส่ง <ErrorMessage name="shippingOption" render={msg => <span className="error">{msg}</span>} /></h3>

                        {values.shippingOptions.map((shippingOptions, index) => {
                             var end_date = new Date();
                             end_date.setDate(end_date.getDate() + parseInt(shippingOptions.duration));
                            return (
                            <button type="button" className={`${styles.btnShippingOption} ${values.shippingOption === index && styles.active}`} 
                            onClick={() => {
                                setFieldValue("shippingOption", index, true);
                                setShippingFee(shippingOptions.rate);
                                setShippingDuration(shippingOptions.duration);
                            }}>
                                <p>รับสินค้าโดยประมาณ</p>
                                <h4>{end_date.toISOString().slice(0, 10)} ({shippingOptions.duration}วัน)</h4>
                                <p>{shippingOptions.rate}บาท</p>
                            </button>
                        )}
                        )}

                        <h3>ชำระเงิน <ErrorMessage name="payment" render={msg => <span className="error">{msg}</span>} /></h3>
                        <SelectPayment name="payment" id="payment" values={values} options={[
                            { value: "bangkok", name: "Bangkok Bank", logoBank: logoBangkokBank },
                            { value: "scb", name: "Siam Commercial Bank", logoBank: logoSiamCommercialBank },
                            { value: "ktb", name: "Krungthai Bank", logoBank: logoKrungthaiBank },
                            { value: "credit", name: "Credit / Debit", logoBank: logoCreditCard },
                        ]} />

                        <h3>ออกใบกำกับภาษี</h3>
                        <div className={styles.containerRow}>
                            <div className={styles.containerColBank}>
                                <Field name="checkedBoxInfo" type="checkbox" checked={checkedBox} onClick={() => setCheckedBox(!checkedBox)} />
                            </div>
                            <div className={styles.containerColBank}>
                                ข้อมูลเดียวกับที่อยู่
                            </div>
                        </div>

                        <div className={!checkedBox ? styles.contentDisplayBlock : styles.contentDisplayNone}>
                            <TaxFieldsComponent />
                        </div>
                        <button type="submit" className={styles.buttonNext}>ถัดไป</button>
                    </div>

                </section>
            </Form>
        </>
    );
};

const SelectPayment = ({ values, name, options }) => {
    return (
        <div className={styles.containerCol}>
            {options.map((list, index) => {
                return (
                    <div className={`${styles.boxRadiusSmall} ${styles.selectBoxInput}`}>
                        <Field name={name} type="radio" value={list.value} id={`${name}-${index + 1}`}
                            checked={`${values[name]}` === `${list.value}` ? true : false} />
                    </div>
                )
            })}

            <ul className={`${styles.containerCol}`}>
                {options.map((list, index) => {
                    return (
                        <li className={`${styles.optionShipping} ${styles.boxRadiusSmall} ${`${values.payment}` === `${list.value}` ? styles.active : styles.deactive}`} >
                            <label className={styles.selectBoxOption} for={`${name}-${index + 1}`}>
                                <div className={styles.containerRow}>
                                    <div className={styles.containerColBank}>
                                        <img src={list.logoBank} alt="Product" className={styles.logoBank} />
                                    </div>
                                    <div className={styles.containerColBank}>
                                        {list.name}
                                    </div>
                                </div>
                            </label>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
};

const EnhancedCartComponent = withFormik({
    mapPropsToValues: () => ({
        itemsList: [],
        paymentOptions: [],
        shippingOptions: [],

        orderID: '',
        priceTotal: '',
        shippingOption: '',
        payment: '',

        email: '',
        phone: '',
        address: '',
        county: '',
        zone: '',
        provice: '',
        zip: '',

        tax_email: '',
        tax_phone: '',
        tax_address: '',
        tax_district: '',
        tax_zone: '',
        tax_provice: '',
        tax_zip: '',
        checkedBoxInfo: false
    }),
    validate: values => {
        const errors = {};
        if (values.email === "") { errors.email = i18.required }
        if (values.phone === "") { errors.phone = i18.required }
        if (values.address === "") { errors.address = i18.required }
        if (values.fullname === "") { errors.fullname = i18.required }
        if (values.county === "") { errors.county = i18.required }
        if (values.zone === "") { errors.zone = i18.required }
        if (values.provice === "") { errors.provice = i18.required }
        if (values.zip === "") { errors.zip = i18.required }
        if (values.orderID === "") { errors.orderID = i18.required }
        if (values.priceTotal === "") { errors.priceTotal = i18.required }
        if (values.shippingOption === "") { errors.shippingOption = i18.required }
        if (values.payment === "") { errors.payment = i18.required }

        if (!values.checkedBoxInfo) {
            if (values.tax_email === "") { errors.tax_email = i18.required }
            if (values.tax_phone === "") { errors.tax_phone = i18.required }
            if (values.tax_address === "") { errors.tax_address = i18.required }
            if (values.tax_fullname === "") { errors.tax_fullname = i18.required }
            if (values.tax_district === "") { errors.tax_district = i18.required }
            if (values.tax_zone === "") { errors.tax_zone = i18.required }
            if (values.tax_provice === "") { errors.tax_provice = i18.required }
            if (values.tax_zip === "") { errors.tax_zip = i18.required }
        }
        else {
            values.tax_email = values.email;
            values.tax_phone = values.phone;
            values.tax_address = values.address;
            values.tax_fullname = values.fullname;
            values.tax_county = values.county;
            values.tax_zone = values.zone;
            values.tax_provice = values.provice;
            values.tax_zip = values.zip;
        }

        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 0);
    },
    displayName: 'CartComponentForm',
})(CartComponent);

export default EnhancedCartComponent;