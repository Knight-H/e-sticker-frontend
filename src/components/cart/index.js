import React, { useState, useEffect } from "react";
import md5 from "md5";
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

import { auth } from '../../firebase/index.js';
import axios from "axios";
import { axiosInst } from '../common-scss/common'
import { i18_th as i18 } from "../common-scss/i18_text";

function md5Helper(data) {
    let txt = ""

    txt += data.MerchantCode
    txt += data.OrderNo
    txt += data.CustomerId
    txt += data.Amount
    txt += data.ChannelCode
    txt += data.Currency
    txt += data.RouteNo
    txt += data.IPAddress
    txt += data.ApiKey

    const secretKey = "ipgv7ZVSVnZ6RFLOWGWnhly6iSl4w8xmaRg3PsX5GnTuQ1QPpYivGBnF3DSpt3T851x1klEEQoywSjCEodcYu46K6YyGBJsT9Qcj8Z2beA1bDIgDroymDMpLYEQJ9kCtzVOQukf6zQoU4vj2GI5PygYEe3fAkq1kksM9S"
    txt += secretKey
    // console.log("I got this:", txt)

    const md5Hash = md5(txt)

    // console.log("md5:", md5Hash)

    return md5Hash
}

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
    }
];

const CartComponent = () => {

    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(2);
    const [checkedBox, setCheckedBox] = useState(false);
    const [shippingFee, setShippingFee] = useState(0);
    const [shippingDuration, setShippingDuration] = useState(0);

    useEffect(() => {
        fetch(
            "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
        )
            .then(response => {
                response.json().then(data => setFieldValue("yourIP", data.IPv4, false));
            })

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
                // console.log(user.uid)
                axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/cart?customerID=${user.uid}`)
                    .then(res => {
                        setFieldValue("itemsList", res.data[0].itemsList, false);
                        setFieldValue("uid", user.uid, false);
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
                    // console.log("customerInfo", customerInfo)
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

    // const bodyFormData = new FormData();
    const obj = {
        "MerchantCode": "M030856",
        "OrderNo": "DW0001",
        "CustomerId": "supagorn",
        "Amount": 2000,
        "ChannelCode": "internetbank_scb",

        "Currency": "764",
        "RouteNo": 1,
        "IPAddress": "183.88.68.171",
        "ApiKey": "v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD"
    }
    // Object.entries(obj).forEach(([k, v]) => {
    //     bodyFormData.append(k, v)
    // })
    // axios({
    //     method: 'post',
    //     url: 'https://sandbox-cdnv3.chillpay.co/Payment/',
    //     data: bodyFormData,
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // })
    //     .then(function (response) {
    //         //handle success
    //         console.log("asdf1", response);
    //     })
    //     .catch(function (response) {
    //         //handle error
    //         console.log("asdf3", response);
    //     });

    let priceTotal = 0;
    return (
        //{"MerchantCode":"M030856","OrderNo":"DW0001","CustomerId":"supagorn","Amount":2000,"ChannelCode":"internetbank_scb","Currency":"764","RouteNo":1,"IPAddress":"183.88.68.171","ApiKey":"v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD","CheckSum":"0097c2639982996fdd2fe841bd120ea6"}
        <>
            <form id="form123" hidden action="https://sandbox-cdnv3.chillpay.co/Payment/" method="post">
                <input hidden id="form123-MerchantCode" name="MerchantCode" value="M030856" />
                <input hidden id="form123-OrderNo" name="OrderNo" value="DW0001" />
                <input hidden id="form123-CustomerId" name="CustomerId" value="supagorn" />
                <input hidden id="form123-Amount" name="Amount" value="1234" />
                <input hidden id="form123-ChannelCode" name="ChannelCode" value="internetbank_scb" />

                <input hidden id="form123-Currency" name="Currency" value="764" />
                <input hidden id="form123-RouteNo" name="RouteNo" value="1" />
                <input hidden id="form123-IPAddress" name="IPAddress" value="183.88.68.171" />
                <input hidden id="form123-ApiKey" name="ApiKey" value="v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD" />
                <input hidden id="form123-CheckSum" name="CheckSum" value="0097c2639982996fdd2fe841bd120ea6" />
            </form>

            {/* <button onClick={() => {
                document.getElementById("form123-Amount").value = 50000
            }}>EDIT SET 50000</button>

            <button onClick={() => {
                document.getElementById("form123-Amount").value = 90000
            }}>EDIT SET 90000</button>

            <button onClick={() => {
                let sumCheck = null
                Object.keys(obj).forEach((fieldKey) => {
                    console.log("form123-" + fieldKey)
                    obj[fieldKey] = document.getElementById("form123-" + fieldKey).value
                    sumCheck = md5Helper(obj)
                    // console.log(obj, sumCheck)
                })
                document.getElementById("form123-CheckSum").value = sumCheck
                document.getElementById("form123").submit()
            }}>SUBMIT123</button> */}

            {/* <form id="form1" action="https://sandbox-cdnv3.chillpay.co/Payment/" method="post">
                <input name="MerchantCode" value="M030856" />
                <input name="OrderNo" value="DW0001" />
                <input name="CustomerId" value="supagorn" />
                <input name="Amount" value="2000" />
                <input name="ChannelCode" value="internetbank_scb" />
                <input name="Currency" value="764" />
                <input name="RouteNo" value="1" />
                <input name="IPAddress" value="183.88.68.171" />
                <input name="APIKey" value="v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD" />
                <input name="CheckSum" value="0097c2639982996fdd2fe841bd120ea6" />
                <button type="submit">SUBMIT</button>
            </form> */}

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

        const chillpayUrl1 = 'https://sandbox-appsrv2.chillpay.co/api/v2/Payment/'
        const chillpayUrl2 = 'https://sandbox-cdnv3.chillpay.co/Payment/'

        const dataPostChillpay = { "MerchantCode": "M030856", "OrderNo": "DW0001", "CustomerId": "supagorn", "Amount": 2000, "ChannelCode": "internetbank_scb", "Currency": "764", "RouteNo": 1, "IPAddress": "183.88.68.171", "ApiKey": "v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD" }
        dataPostChillpay.CheckSum = md5Helper(dataPostChillpay)

        console.log("dataPostChillpay", dataPostChillpay)

        axios.post(chillpayUrl1, dataPostChillpay, {
            headers: {
                'Host': 'sandbox-appsrv2.chillpay.co',
                'Content-Length': JSON.stringify(dataPostChillpay).length
            }
        }).then((res) => {
            console.log(chillpayUrl1, "ok", JSON.stringify(res))
        }).catch((reason) => {
            console.log(chillpayUrl1, "error", JSON.stringify(reason))
        })
        axios.post(chillpayUrl2, dataPostChillpay, {
            headers: {
                'Host': 'sandbox-cdnv3.chillpay.co',
                'Content-Length': JSON.stringify(dataPostChillpay).length
            }
        }).then((res) => {
            console.log(chillpayUrl2, "ok", JSON.stringify(res))
        }).catch((reason) => {
            console.log(chillpayUrl2, "error", JSON.stringify(reason))
        })

        // let dataPostChillpay =
        // {
        //     "MerchantCode": "M030856",
        //     "OrderNo": "DW0001",
        //     "CustomerId": "supagorn",
        //     "Amount": 2000,
        //     // "PhoneNumber": parseInt(values.phone),
        //     "ChannelCode": values.payment,
        //     "Currency": "764",
        //     "RouteNo": 1,
        //     "IPAddress": values.yourIP,
        //     "ApiKey": "v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD",//+values.phone
        //     // "CheckSum": md5(`M030856${orderIDLast}${values.uid || values.fullname}2000${values.payment}7641${values.yourIP}v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvDipgv7ZVSVnZ6RFLOWGWnhly6iSl4w8xmaRg3PsX5GnTuQ1QPpYivGBnF3DSpt3T851x1klEEQoywSjCEodcYu46K6YyGBJsT9Qcj8Z2beA1bDIgDroymDMpLYEQJ9kCtzVOQukf6zQoU4vj2GI5PygYEe3fAkq1kksM9S`)
        // }
        // dataPostChillpay.CheckSum = md5Helper(dataPostChillpay)

        // // console.log(dataPostChillpay)
        // // console.log(JSON.stringify(dataPostChillpay))


        // function testGet(path) {
        //     axios.get(path, {
        //         headers: {
        //             'Access-Control-Allow-Origin': '*'
        //         }
        //     }).then((res) => {
        //         console.log("GET path:", path, res)
        //     }).catch((reason) => {
        //         console.log("GET error on path:", path, reason)
        //     })
        // }

        // function testPost(path, payload) {
        //     payload = payload || { a: 1 }
        //     axios.post(path, payload).then((res) => {
        //         console.log("POST path:", path, res)
        //     }).catch((reason) => {
        //         console.log("POST error on path:", path, reason)
        //     })
        // }

        // testGet('https://www.google.com')
        // testPost('https://www.google.com')
        // testGet('https://www.yahoo.com')
        // testPost('https://www.yahoo.com')
        // testGet('https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders')
        // testPost('https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders')
        // testGet('https://sandbox-appsrv2.chillpay.co/api/v2/Payment/')
        // testPost('https://sandbox-appsrv2.chillpay.co/api/v2/Payment/')

        // return

        // axios({
        //     method: "GET",
        //     url: 'https://www.google.com'
        // })
        //     .then(res => {
        //         console.log("test", res);
        //     })
        //     .catch(function (err) {
        //         console.log("err test", JSON.stringify(err))
        //     })

        // axios({
        //     method: "POST",
        //     data: dataPostChillpay,
        //     headers: {
        //         // Overwrite Axios's automatically set Content-Type
        //         'Content-Type': 'application/json',
        //         'Host': 'sandbox-appsrv2.chillpay.co'
        //     },
        //     url: 'https://sandbox-appsrv2.chillpay.co/api/v2/Payment/'
        // })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(function (err) {
        //         console.log("err", JSON.stringify(err))
        //     })

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
    handleSubmit: (values) => {

        let dataPostChillpay = {
            "MerchantCode": "M030856",
            "OrderNo": "DW0001",
            "CustomerId": "supagorn",
            "Amount": 2000,
            // "PhoneNumber": parseInt(values.phone),
            "ChannelCode": values.payment,
            "Currency": "764",
            "RouteNo": 1,
            "IPAddress": values.yourIP,
            "ApiKey": "v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD",//+values.phone
            // "CheckSum": md5(`M030856${orderIDLast}${values.uid || values.fullname}2000${values.payment}7641${values.yourIP}v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvDipgv7ZVSVnZ6RFLOWGWnhly6iSl4w8xmaRg3PsX5GnTuQ1QPpYivGBnF3DSpt3T851x1klEEQoywSjCEodcYu46K6YyGBJsT9Qcj8Z2beA1bDIgDroymDMpLYEQJ9kCtzVOQukf6zQoU4vj2GI5PygYEe3fAkq1kksM9S`)
        }
        dataPostChillpay.CheckSum = md5Helper(dataPostChillpay)

        console.log(dataPostChillpay)
        console.log(JSON.stringify(dataPostChillpay))

        // axios({
        //     method: "POST",
        //     params: dataPostChillpay,
        //     headers: {
        //         // Overwrite Axios's automatically set Content-Type
        //         'Content-Type': 'application/json',
        //         'Host': 'sandbox-appsrv2.chillpay.co'
        //     },
        //     url: 'https://sandbox-cdnv3.chillpay.co/Payment/'
        // })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(function (err) {
        //         console.log("errasdfghjk", JSON.stringify(err))
        //     })
        // return


        console.log("asdfasdfasdf")
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders`)
            .then(res => {
                let orderIDLast = (parseInt(res.data[res.data.length - 1].orderID.slice(2, res.data[res.data.length - 1].orderID.length)) + 1).toString();

                if (orderIDLast.length === 1) { orderIDLast = "DW000" + orderIDLast }
                else if (orderIDLast.length === 2) { orderIDLast = "DW00" + orderIDLast }
                else if (orderIDLast.length === 3) { orderIDLast = "DW0" + orderIDLast }
                else if (orderIDLast.length === 4) { orderIDLast = "DW" + orderIDLast }

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

                    "shippingAddress": {
                        "address": values.address,
                        "city": values.zone,
                        "county": values.county,
                        "fullname": values.fullname,
                        "province": values.provice,
                        "zip": values.zip
                    }
                };

                axios.post(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders`, data)
                    .then(res => {
                        // let dataPostChillpay =
                        // {
                        //     "MerchantCode": "M030856",
                        //     "OrderNo": orderIDLast,
                        //     "CustomerId": values.uid || values.fullname,
                        //     "Amount": 2000,
                        //     // "PhoneNumber": parseInt(values.phone),
                        //     "ChannelCode": values.payment,
                        //     "Currency": "764",
                        //     "RouteNo": 1,
                        //     "IPAddress": values.yourIP,
                        //     "ApiKey": "v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD",//+values.phone
                        //     "CheckSum": md5(`M030856${orderIDLast}${values.uid || values.fullname}2000${values.payment}7641${values.yourIP}v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvDipgv7ZVSVnZ6RFLOWGWnhly6iSl4w8xmaRg3PsX5GnTuQ1QPpYivGBnF3DSpt3T851x1klEEQoywSjCEodcYu46K6YyGBJsT9Qcj8Z2beA1bDIgDroymDMpLYEQJ9kCtzVOQukf6zQoU4vj2GI5PygYEe3fAkq1kksM9S`)
                        // }

                        // const bodyFormData = new FormData();
                        const obj = {
                            "MerchantCode": "",
                            "OrderNo": "",
                            "CustomerId": "",
                            "Amount": 0,
                            "ChannelCode": "",

                            "Currency": "",
                            "RouteNo": 0,
                            "IPAddress": "",
                            "ApiKey": ""
                        }

                        let dataPostChillpay =
                        {
                            "MerchantCode": "M030856",
                            "OrderNo": "DW0001",
                            "CustomerId": "supagorn",
                            "Amount": 2000,
                            // "PhoneNumber": parseInt(values.phone),
                            "ChannelCode": values.payment,
                            "Currency": "764",
                            "RouteNo": 1,
                            "IPAddress": values.yourIP,
                            "ApiKey": "v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvD",//+values.phone
                            // "CheckSum": md5(`M030856${orderIDLast}${values.uid || values.fullname}2000${values.payment}7641${values.yourIP}v06M0eQtSuk73HmQZ6QNiPGXyhGwS4Lzk76wuHT4GBtdUBpvbv6n2P18pLsPxtvDipgv7ZVSVnZ6RFLOWGWnhly6iSl4w8xmaRg3PsX5GnTuQ1QPpYivGBnF3DSpt3T851x1klEEQoywSjCEodcYu46K6YyGBJsT9Qcj8Z2beA1bDIgDroymDMpLYEQJ9kCtzVOQukf6zQoU4vj2GI5PygYEe3fAkq1kksM9S`)
                        }
                        const sumCheckDataPostChillpay = md5Helper(dataPostChillpay)

                        console.log(dataPostChillpay)
                        console.log(JSON.stringify(dataPostChillpay))

                        Object.keys(obj).forEach((fieldKey) => {
                            obj[fieldKey] = dataPostChillpay[fieldKey]
                            document.getElementById("form123-" + fieldKey).value = dataPostChillpay[fieldKey]
                        })
                        sumCheckDataPostChillpay = md5Helper(obj)
                        dataPostChillpay.sumCheck = sumCheckDataPostChillpay

                        document.getElementById("form123-CheckSum").value = sumCheckDataPostChillpay
                        document.getElementById("form123").submit()


                        // Object.entries(dataPostChillpay).forEach(([fieldKey, fieldVal]) => {

                        //     console.log("form123-" + fieldKey)
                        //     document.getElementById("form123-" + fieldKey).value = fieldVal
                        // })
                        // document.getElementById("form123").submit()

                        // axios.post('https://sandbox-appsrv2.chillpay.co/api/v2/Payment/', dataPostChillpay, {
                        //     headers: {
                        //         "Host": "sandbox-appsrv2.chillpay.co"
                        //     }
                        // })
                        //     .then(res => {
                        //         console.log(res);
                        //     })
                        //     .catch(function (err) {
                        //         console.log("err", JSON.stringify(err))
                        //     })
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