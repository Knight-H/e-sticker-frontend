import React, { useState, useEffect } from "react";
import md5 from "md5";
import ip from "ip";
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
import logoKBank from './kbank.jpg';
import logoQrCode from './qrcode.png';

import { auth } from '../../firebase/index.js';
import axios from "axios";
import { axiosInst } from '../common-scss/common'
import { i18_th as i18 } from "../common-scss/i18_text";

const Payment = [
    {
        "icon": logoSiamCommercialBank,
        "name": "Siam Commercial Bank",
        "code": "internetbank_scb"
    },
    {
        "icon": logoKBank,
        "name": "Kasi Korn Bank",
        "code": "payplus_kbank"
    },
    {
        "icon": logoQrCode,
        "name": "QR Code",
        "code": "bank_qrcode"
    },
    {
        "icon": logoQrCode,
        "name": "โอนเงินแนบสลิป",
        "code": "transfer_money"
    }
];

const CartComponent = () => {

    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(2);
    const [checkedBox, setCheckedBox] = useState(false);
    const [checkedBoxNotGet, setCheckedBoxNotGet] = useState(true);
    const [shippingFee, setShippingFee] = useState(0);
    const [shippingDuration, setShippingDuration] = useState(0);

    useEffect(() => {
        // fetch(
        //     "https://geolocation-db.com/json/85249190-4601-11eb-9067-21b51bc8dee3"
        // )
        // .then(response => {
        //     console.log("response", response)
        //     response.json().then(data => setFieldValue("yourIP", data.IPv4, false));

        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions`)
            .then(res => {
                // console.log("res.data.shipptingoption", res.data)
                setFieldValue("shippingOptions", res.data, false);
                setFieldValue("yourIP", ip.address(), false)

                auth.onAuthStateChanged(user => {
                    if (user) { // Login Mode
                        // Fetch Cart in Custimer Login
                        // console.log("user.uid", user.uid)
                        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart?customerID=${user.uid}`)
                            .then(res => {
                                setFieldValue("itemsList", res.data[0].itemsList, false);
                                setFieldValue("uid", user.uid, false);

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
                            }).catch(function (err) {
                                console.log("err", err)
                            });

                    } else { // Guest Mode
                        var cartLocal = JSON.parse(localStorage.getItem("cart"));
                        console.log("cartLocal", cartLocal)
                        if (cartLocal) {
                            setFieldValue("itemsList", cartLocal.itemsList, false);
                        } else {
                            return;
                        }
                    }
                });


            }).catch(function (err) {
                console.log("err", err)
            });
        // })
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
                                        <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{priceTotal * 7 / 100}฿</td>
                                    </tr>
                                    <tr>
                                        <td className={`${styles.textCenterMobileNewRow} ${styles.rowTr}`}>{priceTotal * 7 / 100}฿</td>
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
                                        <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{priceTotal + priceTotal * 7 / 100 + parseInt(shippingFee)}฿</td>
                                    </tr>
                                    <tr>
                                        <td className={`${styles.textCenterMobileNewRow}`}>{priceTotal + priceTotal * 7 / 100 + parseInt(shippingFee)}฿</td>
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
                                        setFieldValue("totalPrice", priceTotal + priceTotal * 7 / 100 + parseInt(shippingFee), false);
                                        setFieldValue("totalItemPrice", priceTotal, false);
                                        setFieldValue("shippingCost", shippingOptions.rate, false);
                                        setFieldValue("shippingCourier", shippingOptions.courier, false);
                                    }}>
                                    <p>{shippingOptions.courier}รับสินค้าโดยประมาณ</p>
                                    <h4>{end_date.toISOString().slice(0, 10)} ({shippingOptions.duration}วัน)</h4>
                                    <p>{shippingOptions.rate}บาท</p>
                                </button>
                            )
                        }
                        )}

                        <h3>ชำระเงิน <ErrorMessage name="payment" render={msg => <span className="error">{msg}</span>} /></h3>
                        <div className={styles.containerRow}>
                            {Payment.map((data) => {
                                return (
                                    <button className={`${styles.btnPaymentOption} ${values.payment === data.code && styles.active}`} type="button" onClick={() => {
                                        setFieldValue("payment", data.code, true)
                                        setFieldValue("totalPrice", priceTotal + priceTotal * 7 / 100 + parseInt(shippingFee), false);
                                    }}>
                                        <img src={data.icon} alt="Product" className={styles.logoBank} /><h4>{data.name}</h4>
                                    </button>
                                )
                            })}
                        </div>

                        <h3>ออกใบกำกับภาษี</h3>
                        <div className={styles.containerRow} style={{ marginBottom: "10px" }}>
                            <div className={styles.containerColBank}>
                                <Field name="checkedBoxInfoNotGet" type="checkbox" checked={checkedBoxNotGet} onClick={() => setCheckedBoxNotGet(!checkedBoxNotGet)}
                                    disabled={checkedBox ? true : false} />
                            </div>
                            <div className={styles.containerColBank}>
                                ไม่เอาใบกำกับภาษี
                            </div>
                            <div className={styles.containerColBank}>
                                <Field name="checkedBoxInfo" type="checkbox" checked={checkedBox} onClick={() => setCheckedBox(!checkedBox)}
                                    disabled={checkedBoxNotGet ? true : false} />
                            </div>
                            <div className={styles.containerColBank}>
                                ข้อมูลเดียวกับที่อยู่
                            </div>
                        </div>

                        <div className={!checkedBox && !checkedBoxNotGet ? styles.contentDisplayBlock : styles.contentDisplayNone}>
                            <TaxFieldsComponent />
                        </div>
                        <button type="submit" className={styles.buttonNext}>ถัดไป</button>
                    </div>

                </section>
            </Form>
        </>
    );
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

        billingFullname: '',
        billingFulladdress: '',
        billingTaxID: '',

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
        // if (values.orderID === "") { errors.orderID = i18.required }
        // if (values.priceTotal === "") { errors.priceTotal = i18.required }
        if (values.shippingOption === "") { errors.shippingOption = i18.required }
        if (values.payment === "") { errors.payment = i18.required }

        if (!values.checkedBoxInfo) {
            // รับ หรือ ไม่รับก็ได้
        }
        else {
            values.billingFullname = values.fullname;
            values.billingFulladdress = values.address + "" + values.county + "" + values.zone + "" + values.provice + "" + values.zip;
            values.billingTaxID = values.billingTaxID
        }

        return errors;
    },
    handleSubmit: (values, { props, location }) => {

        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders`)
            .then(res => {
                console.log("res get orders", res.data)

                let orderIDLast = 0;
                res.data.map((data) => {
                    // let findIndexNumber = (parseInt(data.orderID.slice(2, data.orderID.length)) + 1).toString();
                    let findIndexNumber = (parseInt(data.orderID.slice(2, data.orderID.length)));
                    // console.log("findIndexNumber", findIndexNumber)
                    if (orderIDLast <= findIndexNumber) {
                        orderIDLast = findIndexNumber;
                        return;
                    } else {
                        return;
                    }
                })

                orderIDLast = (orderIDLast + 1).toString();
                // console.log(">>>>>>>>>>>>>>>", orderIDLast)
                if (orderIDLast.length === 1) { orderIDLast = "DW000" + orderIDLast }
                else if (orderIDLast.length === 2) { orderIDLast = "DW00" + orderIDLast }
                else if (orderIDLast.length === 3) { orderIDLast = "DW0" + orderIDLast }
                else if (orderIDLast.length === 4) { orderIDLast = "DW" + orderIDLast }
                // console.log(">>>>>>>>>>>>>>>>>>>2", orderIDLast)
                let data = {
                    "billingAddress": {
                        "fulladdress": values.billingFullname,
                        "fullname": values.billingFulladdress,
                        "taxID": values.billingTaxID
                    },
                    "customerID": values.uid,
                    "itemsCost": values.totalItemPrice,
                    "itemsList": values.itemsList,
                    "orderID": orderIDLast,
                    // "otherCost": "0",
                    "paymentInfo": values.payment,
                    "paymentMethod": values.payment,
                    "paymentRef": values.payment,
                    "paymentStatus": "รอชำระเงิน",

                    "shippingCost": values.shippingCost,
                    "shippingCourier": values.shippingCourier,
                    "shippingNumber": "",
                    "shippingStatus": "",
                    "status": "กำลังดำเนินการ",
                    // "timestamp": "4 Oct 2020",
                    "totalCost": values.totalPrice,
                    "vatCost": values.totalItemPrice * 7 / 100,

                    "paymentConfirm": [],

                    "shippingAddress": {
                        "address": values.address,
                        "city": values.zone,
                        "county": values.county,
                        "fullname": values.fullname,
                        "province": values.provice,
                        "zip": values.zip,
                        "phone": values.phone,
                        "email": values.email
                    }
                };
                console.log("data", data)
                axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders`, data)
                    .then(res => {
                        // console.log("res>>>>>>>>>> post order", res);
                        if (values.payment === "transfer_money") {
                            return props.history.push("/member");
                        } else {
                            let dataPostChillpay =
                            {
                                "OrderNo": orderIDLast,
                                "CustomerId": values.uid || values.fullname,
                                "PhoneNumber": parseInt(values.phone),
                                "Amount": parseFloat(values.totalPrice + "00"),
                                "ChannelCode": values.payment,
                                "Currency": "764",
                                "RouteNo": 1,
                                "IPAddress": values.yourIP
                            }

                            axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/payment`, dataPostChillpay)
                                .then(res => {
                                    // console.log(res.data.payment_url);
                                    // console.log("res>>>", res);
                                    window.location.href = res.data.payment_url;
                                })
                                .catch(err => {
                                    console.log(err.response)
                                });
                        }

                    })
                    .catch(function (err) {
                        console.log("err 2", JSON.stringify(err))
                    });

            }).catch(function (err) {
                console.log("err 1", JSON.stringify(err), JSON.stringify(err.response))
            });

    },
    displayName: 'CartComponentForm',
})(CartComponent);

export default EnhancedCartComponent;