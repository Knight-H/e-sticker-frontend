import React from "react";
import styles from './index.module.scss';

import Kerry from '../approve-layout/kerry.png';
import Scb from '../approve-layout/scb.jpg';
import img_product from '../shopping/workplace.jpg';

const GroupDeliveryPaymentComponent = () => {
    return (
        <>
            <div className={styles.groupDelivery}>
                <h3>การจัดส่ง</h3>
                <div className={styles.containerInformationCustomer}>
                    <ul>
                        <li>นายลูกค้า สติกเกอร์</li>
                        <li>110 ซอย สาธุประดิษฐ์ 58
                        แขวง บางโพงพาง เขต ยานนาวา
                            กรุงเทพมหานคร 10120</li>
                    </ul>
                    <ul>
                        <li>เบอร์โทรศัพท์: 0900000000</li>
                        <li>อีเมล: contact@gmail.com</li>
                    </ul>
                </div>

                <div className={styles.containerInformation}>
                    <h4>จัดส่งโดย</h4>
                    <img src={Kerry} className={styles.deliveryBy} alt="kerry" />
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
                            <th colspan="2" style={{ textAlign: "left" }}>สินค้า</th>
                            <th className={styles.textRight}>จำนวน</th>
                            <th className={styles.textRight}>มูลค่า</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={img_product} alt="Product" /></td>
                            <td style={{ minWidth: "60px" }}>
                                <p>สติกเกอร์แบบกลม</p>
                                <span>กระดาษอาร์ต - เคลือบด้าน -กินเนื้อ 1 มม. - ขนาด 10x20 mm </span>
                            </td>
                            <td className={styles.textRight}>300</td>
                            <td className={styles.textRight}>500฿</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td colspan="3" style={{ borderTop: "1px solid black" }}>ค่าสินค้ารวม</td>
                            <td className={styles.textRight} style={{ borderTop: "1px solid black" }}>1000฿</td>
                        </tr>
                        <tr>
                            <td colspan="3" style={{ borderBottom: "1px solid black" }}>ค่าจัดส่ง</td>
                            <td className={styles.textRight} style={{ borderBottom: "1px solid black" }}>50฿</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">รวมทั้งหมด</td>
                            <td className={styles.textRight}>1050฿</td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </>
    )
}

export default GroupDeliveryPaymentComponent;