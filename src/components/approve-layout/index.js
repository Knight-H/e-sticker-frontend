import React, { useState } from "react";
import styles from './index.module.scss';
import { withFormik, useFormikContext, Field } from 'formik';

import StepProgress from "../step_progress";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";

const ApproveLayoutComponent = () => {
    const { values } = useFormikContext();
    const [selectStep] = useState(3);
    const [guestMode] = useState(true);

    return (
        <main className={styles.wrapContent}>

            {guestMode &&
                <>
                    <h1 className={styles.title}>ตรวจสอบสถานะออเดอร์</h1>
                    <p>หมายเลขออเดอร์</p>
                    <Field name="orderNumber" className={styles.inputGreen} />
                    <button type="button" className={styles.btnGreen} onClick={() => alert(values.orderNumber)}>ตรวจสอบสถานะ</button>
                </>
            }

            <h1 className={styles.title}>รายการออเดอร์</h1>
            <p>ออเดอร์หมายเลข {values.orderID.orderNumber}
                <LabelSatus status={values.orderID.statusOrder}/>
            </p>

            <section className={styles.stepProgressBar}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <section>
                <CardOrder />
            </section>

            <section className={styles.previewImage}>
                <PreviewImage />
            </section>

            <section className={styles.groupDeliveryPayment} style={ guestMode ? { border: '1px solid #009473' } : {}}>
                <GroupDeliveryPayment />
            </section>

        </main >
    );
};

const EnhancedApproveLayoutComponent = withFormik({
    mapPropsToValues: (props) => ({
        massage: "",  //สำหรับ Chat Room
        orderNumber: "", //สำหรับค้นหาเลขที่ออเดอร์
        expandCard: 0, //สำหรับเลือกว่ากด Card ไหน

        orderID: fakeAPI[0],
    })
})(ApproveLayoutComponent);

export default EnhancedApproveLayoutComponent;


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

const LabelSatus = ({status}) => {
    if (status === 1) {
        return <label className={`${styles.labelStatus} ${styles.orangeStatus}`}>สถานะ: กำลังดำเนินการ</label>
    } else if (status === 2) {
        return <label className={`${styles.labelStatus} ${styles.yellowStatus}`}>สถานะ: กำลังผลิตสินค้า</label>
    } else if (status === 3) {
        return <label className={`${styles.labelStatus} ${styles.blueStatus}`}>สถานะ: อยู่ระหว่างจัดส่ง</label>
    } else if (status === 4) {
        return <label className={`${styles.labelStatus} ${styles.redStatus}`}>สถานะ: ขอคืนเงิน</label>
    } else if (status === 5) {
        return <label className={`${styles.labelStatus} ${styles.greenStatus}`}>สถานะ: คืนเงินสำเร็จ</label>
    } else if (status === 6) {
        return <label className={`${styles.labelStatus} ${styles.greenStatus}`}>สถานะ: รายการสำเร็จ</label>
    }
}
