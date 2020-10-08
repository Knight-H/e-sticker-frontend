import React, { useState } from "react";
import styles from './index.module.scss';
import { withFormik, useFormikContext, Field } from 'formik';

import StepProgress from "../step_progress";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";

const ApproveLayoutComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(3);
    const [guestMode] = useState(true);

    const searchOrderNumber = () => {
        let orderNumber = fakeAPI.find(orderNumber => `${orderNumber.orderNumber}` === `${values.orderNumber}`);
        if (orderNumber) {
            console.log("orderNumber", orderNumber)
            setFieldValue("orderID", orderNumber.orderNumber);
            setFieldValue("status", orderNumber.status);
            setFieldValue("itemsList", orderNumber.itemsList);
        }
    };

    return (
        <main className={styles.wrapContent}>

            {guestMode &&
                <>
                    <h1 className={styles.title}>ตรวจสอบสถานะออเดอร์</h1>
                    <p>หมายเลขออเดอร์</p>
                    <Field name="orderNumber" className={styles.inputGreen} />
                    <button type="button" className={styles.btnGreen} onClick={() => searchOrderNumber()}>ตรวจสอบสถานะ</button>
                </>
            }

            {values.orderID && <>
                <h1 className={styles.title}>รายการออเดอร์</h1>
                <p>ออเดอร์หมายเลข #{values.orderID}
                    <LabelSatus status={values.status} />
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

                <section className={styles.groupDeliveryPayment} style={guestMode ? { border: '1px solid #009473' } : {}}>
                    <GroupDeliveryPayment />
                </section>
            </>
            }
        </main >
    );
};

const EnhancedApproveLayoutComponent = withFormik({
    mapPropsToValues: (props) => ({
        orderNumber: '', //สำหรับค้นหาหมายเลขออเดอร์
        massage: '',  //สำหรับ Chat Room
        expandCard: 0, //สำหรับเลือกว่ากด Card ไหน

        orderID: '',
        status: '',
        itemsList: [],
    })
})(ApproveLayoutComponent);

export default EnhancedApproveLayoutComponent;


const fakeAPI = [
    {
        orderNumber: "DW0001",
        status: 1,
        // image: ???
        itemsList: [
            {
                orderID: "ITM00001",
                shape: 'สติกเกอร์แบบกลม',
                material: 'กระดาษอาร์ต',
                coat: 'เคลือบด้าน',
                cutting: 'กินเนื้อ 1 มม.',
                width: '10',
                height: '20',
                units: '300',
                price: '500',
                status: 1,

                messages: [
                    {
                        type: "text",
                        content: "สวัสดีครับ",
                        info: "",
                        by: "ลูกค้า"

                    },
                    {
                        type: "text",
                        content: "สวัสดีครับ",
                        info: "",
                        by: "พนักงาน"

                    },
                    {
                        type: "text",
                        content: "เด่วจะส่งแบบให้นะครับ",
                        info: "",
                        by: "ลูกค้า"

                    }
                ]
            }
        ]
    }
]

const LabelSatus = ({ status }) => {
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
    } else {
        return <label></label>
    }
}
