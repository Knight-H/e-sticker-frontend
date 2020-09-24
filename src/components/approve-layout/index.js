import React, { useState } from "react";
import styles from './index.module.scss';
import StepProgress from "../step_progress";
import Kerry from './kerry.png';
import Scb from './scb.jpg';
import img_product from '../shopping/workplace.jpg';

import { ReactComponent as Circle } from './circle.svg';
import { ReactComponent as Drawing } from './drawing.svg';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ApproveLayoutComponent = () => {
    const [selectStep] = useState(2);
    const [guestMode, setGuestMode] = useState(true);
    const [expandCard, setExpandCard] = useState(0);
    return (
        <main className={styles.wrapContent}>

            {guestMode &&
                <>
                    <h1 className={styles.title}>ตรวจสอบสถานะออเดอร์</h1>
                    <p>หมายเลขออเดอร์</p>
                    <input class={styles.inputGreen} type="text"></input>
                    <button type="button" className={styles.btnGreen}>ตรวจสอบสถานะ</button>
                </>
            }

            <h1 className={styles.title}>รายการออเดอร์</h1>
            <p>ออเดอร์หมายเลข #DW0001
                <label className={styles.waitApproval}>กำลังดำเนินการ</label>
            </p>

            <section className={styles.stepProgressBar}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <section>
                <Carousel responsive={responsive}>
                    <div className={`${styles.card} ${expandCard == 0 && styles.active}`} onClick={() => setExpandCard(0)}>
                        <h4>หมายเลขรายการ ITM00001</h4>
                        <div className={styles.description}>
                            <Circle />
                            <h4>สติกเกอร์แบบกลม</h4>
                            <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                            <h4 className={styles.quality}>300ชิ้น</h4>
                            <h4 className={styles.price}>500฿</h4>
                        </div>

                        <label className={styles.waitApproval}>กำลังดำเนินการ</label>
                    </div>
                    <div className={`${styles.card} ${expandCard == 1 && styles.active}`} onClick={() => setExpandCard(1)}>
                        <h4>หมายเลขรายการ ITM00001</h4>
                        <div className={styles.description}>
                            <Circle />
                            <h4>สติกเกอร์แบบกลม</h4>
                            <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                            <h4 className={styles.quality}>300ชิ้น</h4>
                            <h4 className={styles.price}>500฿</h4>
                        </div>

                        <label className={styles.waitApproval}>กำลังดำเนินการ</label>
                    </div>
                    <div className={`${styles.card} ${expandCard == 2 && styles.active}`} onClick={() => setExpandCard(2)}>
                        <h4>หมายเลขรายการ ITM00001</h4>
                        <div className={styles.description}>
                            <Circle />
                            <h4>สติกเกอร์แบบกลม</h4>
                            <p>กระดาษอาร์ต - เคลือบด้าน - ขนาด 10x20 mm </p>
                            <h4 className={styles.quality}>300ชิ้น</h4>
                            <h4 className={styles.price}>500฿</h4>
                        </div>

                        <label className={styles.waitApproval}>กำลังดำเนินการ</label>
                    </div>
                    <div>Item 4</div>
                </Carousel>
            </section>

            <section className={styles.previewImage}>
                <div className={styles.square}>
                    <Drawing />
                </div>

                <div className={styles.inputBox}>
                    <button><h3><i class="fas fa-check"></i> อนุมัติแบบ</h3></button>
                    <input className={styles.inputGreen} type="text" placeholder="พิมพ์ข้อความ..."></input>

                    <div className={styles.groupBtn}>
                        <button>ส่ง</button>
                        <button>อัพโหลดไฟล์</button>
                    </div>
                </div>
            </section>

            <section className={styles.groupDeliveryPayment} style={ guestMode ? { border: '1px solid #009473' } : {}}>
                <div className={styles.groupDelivery}>
                    <h3><b>การจัดส่ง</b></h3>
                    <div className={styles.containInformationCustomer}>
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
            </section>

        </main >
    );
};

export default ApproveLayoutComponent;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
