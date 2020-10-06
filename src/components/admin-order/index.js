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
    const { values } = useFormikContext();
    // const [dropDawn, setDropDawn] = useState(0);
    const [selectStep] = useState(3);
    const [expandCard, setExpandCard] = useState(0);

    return (
        <main className={styles.wrapContent}>

            <section>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <h1 className={styles.title}>รายการออเดอร์</h1>
            <p>ออเดอร์หมายเลข #DW0001
            <SelectBox name="editStatus" values={values} options={[
                    {
                        color: "orangeStatus",
                        value: "1",
                        name: "รอการอนุมัติแบบ"
                    },
                    {
                        color: "yellowStatus",
                        value: "2",
                        name: "กำลังผลิตสินค้า"
                    },
                    {
                        color: "blueStatus",
                        value: "3",
                        name: "อยู่ระหว่างจัดส่ง"
                    },
                    {
                        color: "redStatus",
                        value: "4",
                        name: "ขอคืนเงิน"
                    },
                    {
                        color: "greenStatus",
                        value: "5",
                        name: "คืนเงินสำเร็จ"
                    },
                    {
                        color: "greenStatus",
                        value: "6",
                        name: "รายการสำเร็จ"
                    }
                ]} />
                <button type="button" className={styles.btnWhite} onClick={() => alert(values.editStatus)}>บันทึก</button>
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
        editStatus: fakeAPI[0].statusOrder,
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

const SelectBox = ({ values, name, options }) => {
    return (
        <div className={styles.selectBox}>
            <div className={styles.selectBoxCurrent} tabindex="1">
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <div className={styles.selectBoxValue}>
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.value} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.value}` ? true : false} />
                            <p className={`${styles.selectBoxInputText} ${styles[list.color]}`}>{list.name}</p>
                        </div>
                    )
                })}

                <div className={styles.selectBoxValue}>
                    <Field name={name} type="radio" className={styles.selectBoxInput} value="0" id={`${name}-0`}
                        checked={`${values[name]}` === `${0}` ? true : false} />
                    <p className={styles.selectBoxInputText}>กรุณาเลือก...</p><IconArrow />
                </div>
            </div>
            <ul className={styles.selectBoxList}>
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles[list.color]}`} for={`${name}-${lastIndex}`}>{list.name}</label>
                        </li>
                    )
                })}
                <li>
                    <label className={styles.selectBoxOption} for={`${name}-0`}>กรุณาเลือก...</label>
                </li>
            </ul>
        </div>
    )
};