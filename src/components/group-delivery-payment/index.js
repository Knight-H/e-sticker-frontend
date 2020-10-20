import React from "react";
import styles from './index.module.scss';
import { useFormikContext } from 'formik';

import Kerry from '../approve-layout/kerry.png';
import Scb from '../approve-layout/scb.jpg';
import IconCircle from '../order-1-product-config/icon-circle.svg';

const GroupDeliveryPaymentComponent = () => {
    const { values, setFieldValue } = useFormikContext();

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
                            <li>เบอร์โทรศัพท์: 0900000000</li>
                            <li>อีเมล: contact@gmail.com</li>
                        </ul>
                    </div>

                    <div className={styles.containerInformation}>
                        <h4>จัดส่งโดย</h4>
                        <img src={values.shippingCourier === "Kerry" && Kerry} className={styles.deliveryBy} alt="kerry" />
                        <br />
                        <label>เลข Tracking: รอการจัดส่ง</label>
                        <label>ติดตาม</label>
                    </div>
                </div>

                <div className={styles.groupPayment}>
                    <h3 style={{ marginBottom: "20px" }}>การชำระเงิน</h3>
                    <label>
                        <img src={Scb} className={styles.logoBank} width="25" alt="kerry" />
                        ธนาคารไทยพาณิชย์
                    </label>

                    <table>
                        <thead>
                            <tr>
                                <th colspan="2"  className={styles.textLeft}>สินค้า</th>
                                <th>จำนวน</th>
                                <th>มูลค่า</th>
                            </tr>
                        </thead>
                        <tbody>
                        {values.itemsList.map((listCard, index) => {
                            return (
                            <tr>
                                <td><img src={IconCircle} alt="Product" /></td>
                                <td style={{ minWidth: "60px" }}>
                                    <p>{listCard.shape}</p>
                                    <span>{listCard.material} - {listCard.coat} - {listCard.cutting} - ขนาด {listCard.width}x{listCard.height} mm.</span>
                                </td>
                                <td className={styles.textRight}>{listCard.units}</td>
                                <td className={styles.textRight}>{listCard.price}฿</td>
                            </tr>
                        )})
                    }
                        </tbody>
                        <tbody>
                            <tr>
                                <td colspan="3" className={styles.borderTop}>ค่าสินค้ารวม</td>
                                <td className={styles.textRight}  className={styles.borderTop}>{values.itemsCost}฿</td>
                            </tr>
                            <tr>
                                <td colspan="3">ค่าจัดส่ง</td>
                                <td className={styles.textRight}>{values.shippingCost}฿</td>
                            </tr>
                            <tr>
                                <td colspan="3"  className={styles.borderBottom}>ภาษี 7%</td>
                                <td className={styles.textRight} className={styles.borderBottom}>{values.vatCost}฿</td>
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