import React, { useState } from "react";
import { withFormik, useFormikContext, Field } from 'formik';
import styles from './index.module.scss';

import StepProgress from "../step_progress";
import AdminKpi from "../admin-kpi";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";

import { ReactComponent as IconArrow } from '../upload-file/icon-arrow.svg';

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
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
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
                <CardOrder expandCard={expandCard} setExpandCard={setExpandCard} />
            </section>

            <section className={styles.previewImage}>
                <PreviewImage />
            </section>

            <section className={styles.groupDeliveryPayment} style={{ border: '1px solid #009473' }}>
                <GroupDeliveryPayment />
            </section>


        </main >
    );
};

const EnhancedAdminOrderComponent = withFormik({
    mapPropsToValues: (props) => ({
        massage: "",  //สำหรับ Chat Room
        orderNumber: "", //สำหรับค้นหาเลขที่ออเดอร์
        expandCard: 0, //สำหรับเลือกว่ากด Card ไหน

        orderID: fakeAPI[0],
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;

const fakeAPI = [
    {
        orderNumber: "#DW0001",
        statusOrder: 1,
        // image: ???
        listOrder: [
            {
                orderID: "ITM00001",
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500,
                status: 1,

                listMsg: [
                    {
                        content: "สวัสดีครับ",
                        by: "ลูกค้า",
                    },
                    {
                        content: "สวัสดีครับ",
                        by: "พนักงาน",
                    },
                    {
                        content: "เด่วจะส่งแบบให้นะครับ",
                        by: "ลูกค้า",
                    }
                ]
            },
            {
                orderID: "ITM00002",
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500,
                status: 1,

                listMsg: [
                    {
                        content: "สวัสดีครับ",
                        by: "ลูกค้า",
                    }
                ]
            },
            {
                orderID: "ITM00003",
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500,
                status: 2,

                listMsg: [
                    {
                        content: "สวัสดีครับ",
                        by: "ลูกค้า",
                    },
                    {
                        content: "สวัสดีครับ",
                        by: "พนักงาน",
                    },
                    {
                        content: "เด่วจะส่งแบบให้นะครับ",
                        by: "ลูกค้า",
                    },
                    {
                        content: "ส่งมาได้เลยครับ",
                        by: "พนักงาน",
                    },
                ]
            }
        ],
    }
]