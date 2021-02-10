import React from "react";
import styles from './index.module.scss';
import { useFormikContext, Field } from 'formik';

import Kerry from '../approve-layout/kerry.png';
import axios from "axios";


import logoSiamCommercialBank from '../cart/SiamCommercialBank.jpg';
import logoKBank from '../cart/kbank.jpg';
import logoQrCode from '../cart/qrcode.png';
import TranferBank from '../cart/tranfer.png';

const Payment = [
    {
        "icon": logoSiamCommercialBank,
        "name": "Siam Commercial Bank",
        "code": "internetbank_scb"
    },
    {
        "icon": logoKBank,
        "name": " Kasikorn Bank",
        "code": "payplus_kbank"
    },
    {
        "icon": logoQrCode,
        "name": "QR Code",
        "code": "bank_qrcode"
    },
    {
        "icon": TranferBank,
        "name": "โอนเงินแนบสลิป",
        "code": "transfer_money"
    }
];

const GroupDeliveryPaymentComponent = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleSubmitTrackingNumber = () => {
        setFieldValue("waitProcess", true, false);
        let data = { shippingNumber: values.shippingNumber }
        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders/${values.myID}`, data)
            .then(res => {
                console.log("res.data", res.data)
                setFieldValue("waitProcess", false, false);
                setFieldValue("fetchMsg", true, false)
            }).catch(function (err) {
                console.log("err", err)
                setFieldValue("waitProcess", false, false);
            })
    }

    if (!values.shippingAddress) {
        return <div></div>
    } else {
        return (
            <>
                <div className={styles.groupDelivery}>
                    <h3>การจัดส่ง</h3>
                    <div className={styles.containerInformationCustomer}>
                        <ul>
                            <li>{values.shippingAddress.fullname}</li>
                            <li>{values.shippingAddress.address} {values.shippingAddress.city} {values.shippingAddress.county} {values.shippingAddress.provice} {values.shippingAddress.zip}</li>
                        </ul>
                        <ul>
                            <li>เบอร์โทรศัพท์: {values.shippingAddress.phone}</li>
                            <li>อีเมล: {values.shippingAddress.email}</li>
                        </ul>
                    </div>

                    <div className={styles.containerInformation}>
                        <h4>จัดส่งโดย</h4>
                        <img src={values.shippingCourier === "Kerry" && Kerry} className={styles.deliveryBy} alt="kerry" />
                        <br />
                        <label>เลข Tracking: <Field name="shippingNumber" className={styles.inputShippingNumber} type="text"
                            disabled={values.isAdmin ? false : true} /></label>
                        {values.isAdmin ? <button onClick={() => handleSubmitTrackingNumber()} disabled={values.waitProcess ? true : false}>ยืนยัน</button> :
                            <button onClick={() => window.location.href = 'https://th.kerryexpress.com/th/track/dfdfdfd'}>ติดตาม</button>}

                    </div>
                </div>

                <div className={styles.groupPayment}>
                    <h3 style={{ marginBottom: "20px" }}>การชำระเงิน</h3>
                    <label>
                        {Payment.map((data) => {
                            if (data.code === values.paymentMethod)
                                return (
                                    <>
                                        <img src={data.icon} className={styles.logoBank} width="25" alt="kerry" />
                                        {data.name}
                                    </>
                                )
                        })}
                    </label>

                    <table>
                        <thead>
                            <tr>
                                <th colspan="2" className={styles.textLeft}>สินค้า</th>
                                <th>จำนวน</th>
                                <th>มูลค่า</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.itemsList.map((listCard, index) => {
                                return (
                                    <tr>
                                        <td><img src={listCard.messages[0].content} alt="Product" /></td>
                                        <td style={{ minWidth: "60px" }}>
                                            <p>{listCard.shape}</p>
                                            <span>{listCard.material} - {listCard.coat} - ขนาด {listCard.width}x{listCard.height} mm.</span>
                                        </td>
                                        <td className={styles.textRight}>{listCard.units}</td>
                                        <td className={styles.textRight}>{listCard.price}฿</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                        <tbody>
                            <tr>
                                <td colspan="3" className={styles.borderTop}>ค่าสินค้ารวม</td>
                                <td className={`${styles.textRight} ${styles.borderTop}`}>{values.itemsCost}฿</td>
                            </tr>
                            <tr>
                                <td colspan="3">ค่าจัดส่ง</td>
                                <td className={styles.textRight}>{values.shippingCost}฿</td>
                            </tr>
                            <tr>
                                <td colspan="3" className={styles.borderBottom}>ภาษี 7%</td>
                                <td className={`${styles.textRight} ${styles.borderBottom}`}>{values.vatCost}฿</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3">รวมทั้งหมด</td>
                                <td className={styles.textRight}>{values.totalCost}฿</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </>
        )
    }
}

export default GroupDeliveryPaymentComponent;