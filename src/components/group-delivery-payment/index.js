import React from "react";
import styles from './index.module.scss';
import { useFormikContext, Field } from 'formik';

import Kerry from '../approve-layout/kerry.png';
import Scb from '../approve-layout/scb.jpg';
import logoKBank from './kbank.jpg';
import logoQrCode from './qrcode.png';
import axios from "axios";

const GroupDeliveryPaymentComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    // console.log(values.paymentMethod)

    const BankPayment = (paymentMethod) => {
        if (paymentMethod === "internetbank_scb") return (<img src={Scb} className={styles.logoBank} width="25" alt="kerry" />)
        else if (paymentMethod === "payplus_kbank") return (<img src={logoKBank} className={styles.logoBank} width="25" alt="kerry" />)
        else if (paymentMethod === "bank_qrcode") return (<img src={logoQrCode} className={styles.logoBank} width="25" alt="kerry" />)
    };
    console.log("values.shippingAddress", values)

    const handleSubmitTrackingNumber = () => {
        let data = { shippingNumber: values.shippingNumber }
        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders/${values.myID}`, data)
            .then(res => {
                console.log("res.data", res.data)
                setFieldValue("fetchMsg", true, false)
            }).catch(function (err) {
                console.log("err", err)
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
                            <li>{values.shippingAddress.address} {values.shippingAddress.city} {values.shippingAddress.county} {values.shippingAddress.province} {values.shippingAddress.zip}</li>
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
                        <label>เลข Tracking: <Field name="shippingNumber" className={styles.inputShippingNumber} type="text" placeholder="...."
                            disabled={values.isAdmin ? false : true} /></label>
                        {values.isAdmin ? <button onClick={() => handleSubmitTrackingNumber()}>ยืนยัน</button> :
                            <button onClick={() => window.location.href = 'https://th.kerryexpress.com/th/track/dfdfdfd'}>ติดตาม</button>}

                    </div>
                </div>

                <div className={styles.groupPayment}>
                    <h3 style={{ marginBottom: "20px" }}>การชำระเงิน</h3>
                    <label>
                        {BankPayment(values.paymentMethod)}
                        {values.paymentMethod}
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