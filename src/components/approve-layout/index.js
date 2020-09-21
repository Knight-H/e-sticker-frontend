import React, { useState } from "react";
import styles from './index.module.scss';
import StepProgress from "../step_progress";
import Kerry from './kerry.png';
import Scb from './scb.jpg';
import img_product from '../shopping/workplace.jpg';

import { ReactComponent as Circle } from './circle.svg';
import { ReactComponent as Drawing } from './drawing.svg';

const ApproveLayoutComponent = () => {
    const [selectStep] = useState(2);
    return (
        <main className={styles.wrapContent}>
            <h1>รายการออเดอร์</h1>
            <h3>ออเดอร์หมายเลข #DW0001 <label className={styles.waitApproval}>กำลังดำเนินการ</label></h3>

            <section className={styles.stepProgressBar}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <section className={styles.containCard}>
                <div className={styles.card}>
                    <h4>หมายเลขรายการ ITM00001</h4>
                    <div className={styles.description}>
                        <Circle />
                        <h4>สติกเกอร์แบบกลม</h4>
                        <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                        <h4 className={styles.quality}>300ชิ้น</h4> <h4 className={styles.price}>500฿</h4>
                    </div>

                    <label className={styles.waitApproval}>กำลังดำเนินการ</label>
                </div>
                <div className={styles.card}>
                    <h4>หมายเลขรายการ ITM00001</h4>
                    <div className={styles.description}>
                        <Circle />
                        <h4>สติกเกอร์แบบกลม</h4>
                        <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                        <h4 className={styles.quality}>300ชิ้น</h4> <h4 className={styles.price}>500฿</h4>
                    </div>

                    <label className={styles.waitApproval}>กำลังดำเนินการ</label>
                </div>
                <div className={styles.card}>
                    <h4>หมายเลขรายการ ITM00001</h4>
                    <div className={styles.description}>
                        <Circle />
                        <h4>สติกเกอร์แบบกลม</h4>
                        <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                        <h4 className={styles.quality}>300ชิ้น</h4> <h4 className={styles.price}>500฿</h4>
                    </div>

                    <label className={styles.waitApproval}>กำลังดำเนินการ</label>
                </div>
            </section >

            <section className={styles.previewImage}>
                <div className={styles.square}>
                    <Drawing />
                </div>

                <div className={styles.inputBox}>
                    <button><h3><i class="fas fa-check"></i> อนุมัติแบบ</h3></button>
                    <input type="text" placeholder="พิมพ์ข้อความ..."></input>

                    <div className={styles.groupBtn}>
                        <button>ส่ง</button>
                        <button>อัพโหลดไฟล์</button>
                    </div>
                </div>
            </section>

            <section className={styles.groupDeliveryPayment}>
                <div className={styles.groupDelivery}>
                    <h3><b>การจัดส่ง</b></h3>
                    <div className={styles.containInformationCustomer}>
                        <p>นายลูกค้า สติกเกอร์</p>
                        <p>110 ซอย สาธุประดิษฐ์ 58
                        แขวง บางโพงพาง เขต ยานนาวา
                        กรุงเทพมหานคร 10120
                        </p>
                        <p>เบอร์โทรศัพท์: 0900000000</p>
                        <p>อีเมล: contact@gmail.com</p>
                    </div>

                    <div className={styles.containInformation}>
                        <h4>จัดส่งโดย</h4>
                        <img src={Kerry} className={styles.deliveryBy} alt="kerry" />
                        <br />
                        <label>เลข Tracking: รอการจัดส่ง</label>
                        <label>ติดตาม</label>
                    </div>
                </div>

                <div className={styles.groupPayment}>
                    <h3><b>การชำระเงิน</b></h3>
                    <label><img src={Scb} className={styles.logoBank} width="25" alt="kerry" />ธนาคารไทยพาณิชย์</label>

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
                                <td>
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
            </section>

        </main >
    );
};

export default ApproveLayoutComponent;