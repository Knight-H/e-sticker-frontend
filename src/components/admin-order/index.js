import React, { useState } from "react";
import styles from './index.module.scss';
import StepProgress from "../step_progress";
import AdminKpi from "../admin-kpi";
import { withFormik } from 'formik';

import Kerry from '../approve-layout/kerry.png';
import Scb from '../approve-layout/scb.jpg';
import img_product from '../shopping/workplace.jpg';

import { ReactComponent as IconArrow } from '../upload-file/icon-arrow.svg';
import { ReactComponent as Circle } from '../approve-layout/circle.svg';
import { ReactComponent as Drawing } from '../approve-layout/drawing.svg';
import { ReactComponent as IconCheckSVG } from '../approve-layout/icon-check.svg';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const AdminOrderComponent = () => {
    const [dropDawn, setDropDawn] = useState(0);
    const [selectStep] = useState(3);
    const [expandCard, setExpandCard] = useState(0);

    const handleChangeDropDawn = (e) => {
        setDropDawn(e.value);
    };
    return (
        <main className={styles.wrapContent}>

            <section>
                <AdminKpi kpi={{"order":10, "sales":1234567, "member": 1000}}/>
            </section>

            <h1 className={styles.title}>รายการออเดอร์</h1>
            <p>ออเดอร์หมายเลข #DW0001

                <div className={styles.selectBox}>
                    <div className={styles.selectBoxCurrent} tabIndex="1">
                        <div className={styles.selectBoxValue}>
                            <input className={styles.selectBoxInput} type="radio" id="5" value="5" checked={`${dropDawn}` === `${5}` ? true : false}
                                onChange={(e) => handleChangeDropDawn(e.target)}
                            />
                            <p className={`${styles.selectBoxInputText} ${styles.greenStatus}`}>สถาน: รายการสำเร็จ</p>
                        </div>
                        <div className={styles.selectBoxValue}>
                            <input className={styles.selectBoxInput} type="radio" id="4" value="4" checked={`${dropDawn}` === `${4}` ? true : false}
                                onChange={(e) => handleChangeDropDawn(e.target)}
                            />
                            <p className={`${styles.selectBoxInputText} ${styles.greenStatus}`}>สถาน: คืนเงินสำเร็จ</p>
                        </div>
                        <div className={styles.selectBoxValue}>
                            <input className={styles.selectBoxInput} type="radio" id="3" value="3" checked={`${dropDawn}` === `${3}` ? true : false}
                                onChange={(e) => handleChangeDropDawn(e.target)}
                            />
                            <p className={`${styles.selectBoxInputText} ${styles.redStatus}`}>สถาน: ขอคืนเงิน</p>
                        </div>
                        <div className={styles.selectBoxValue}>
                            <input className={styles.selectBoxInput} type="radio" id="2" value="2" checked={`${dropDawn}` === `${2}` ? true : false}
                                onChange={(e) => handleChangeDropDawn(e.target)}
                            />
                            <p className={`${styles.selectBoxInputText} ${styles.blueStatus}`}>สถาน: อยู่ระหว่างจัดส่ง</p>
                        </div>
                        <div className={styles.selectBoxValue}>
                            <input className={styles.selectBoxInput} type="radio" id="1" value="1" checked={`${dropDawn}` === `${1}` ? true : false}
                                onChange={(e) => handleChangeDropDawn(e.target)}
                            />
                            <p className={`${styles.selectBoxInputText} ${styles.yellowStatus}`}>สถาน: กำลังผลิตสินค้า</p>
                        </div>
                        <div className={styles.selectBoxValue}>
                            <input className={styles.selectBoxInput} type="radio" id="0" value="0" checked={`${dropDawn}` === `${0}` ? true : false}
                                onChange={(e) => handleChangeDropDawn(e.target)}
                            />
                            <p className={`${styles.selectBoxInputText} ${styles.orangeStatus}`}>สถาน: รอการอนุมัติแบบ</p>
                            <IconArrow />
                        </div>
                    </div>
                    <ul className={styles.selectBoxList}>
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles.greenStatus}`} htmlFor="5">สถาน: รายการสำเร็จ</label>
                        </li>
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles.greenStatus}`} htmlFor="4">สถาน: คืนเงินสำเร็จ</label>
                        </li>
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles.redStatus}`} htmlFor="3">สถาน: ขอคืนเงิน</label>
                        </li>
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles.blueStatus}`} htmlFor="2">สถาน: อยู่ระหว่างจัดส่ง</label>
                        </li>
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles.yellowStatus}`} htmlFor="1">สถาน: กำลังผลิตสินค้า</label>
                        </li>
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles.orangeStatus}`} htmlFor="0">สถาน: รอการอนุมัติแบบ</label>
                        </li>
                    </ul>
                </div>

                <button type="button" className={styles.btnWhite}>บันทึก</button>
            </p>

            <section className={styles.stepProgressBar}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <section>
                <Carousel responsive={responsive}>
                    <div className={`${styles.card} ${`${expandCard}` === `${0}` && styles.active}`} onClick={() => setExpandCard(0)}>
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
                    <div className={`${styles.card} ${`${expandCard}` === `${1}` && styles.active}`} onClick={() => setExpandCard(1)}>
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
                    <div className={`${styles.card} ${`${expandCard}` === `${2}` && styles.active}`} onClick={() => setExpandCard(2)}>
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
                    <button><h3><IconCheckSVG /> อนุมัติแบบ</h3></button>
                    <input className="inputText" type="text" placeholder="พิมพ์ข้อความ..."></input>

                    <div className={styles.groupBtn}>
                        <button type="button">ส่ง</button>
                        <button type="button" className={styles.btnCustomWidth}>อัพโหลดไฟล์</button>
                    </div>
                </div>
            </section>

            <section className={styles.groupDeliveryPayment} style={ { border: '1px solid #009473' }}>
                <div className={styles.groupDelivery}>
                    <h3>การจัดส่ง</h3>
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
                    <h3 style={{ marginBottom: "20px"}}>การชำระเงิน</h3>
                    <label>
                        <img src={Scb} className={styles.logoBank} width="25" alt="kerry" />
                        ธนาคารไทยพาณิชย์
                    </label>

                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2" style={{ textAlign: "left" }}>สินค้า</th>
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
                                <td colSpan="3" style={{ borderTop: "1px solid black" }}>ค่าสินค้ารวม</td>
                                <td className={styles.textRight} style={{ borderTop: "1px solid black" }}>1000฿</td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{ borderBottom: "1px solid black" }}>ค่าจัดส่ง</td>
                                <td className={styles.textRight} style={{ borderBottom: "1px solid black" }}>50฿</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">รวมทั้งหมด</td>
                                <td className={styles.textRight}>1050฿</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </section>


        </main >
    );
};

const EnhancedAdminOrderComponent = withFormik({
    mapPropsToValues: (props) => ({
        email: '',
        password: ''
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;

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
        breakpoint: { max: 1024, min: 700 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 700, min: 0 },
        items: 1
    }
};
