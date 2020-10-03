import React, { useState } from "react";
import styles from './index.module.scss';

import StepProgress from "../step_progress";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";

const ApproveLayoutComponent = () => {
    const [selectStep] = useState(3);
    const [guestMode] = useState(false);

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
            <p>ออเดอร์หมายเลข {fakeAPI[0].orderNumber}
                {/* <label className={styles.waitApproval}>กำลังดำเนินการ</label> */}
                <LabelSatus status={fakeAPI[0].statusOrder}/>
            </p>

            <section className={styles.stepProgressBar}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <section>
                <CardOrder expandCard={expandCard} setExpandCard={setExpandCard} fakeAPI={fakeAPI[0]} />
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

export default ApproveLayoutComponent;


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
                status: 1
            },
            {
                orderID: "ITM00002",
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500,
                status: 1
            },
            {
                orderID: "ITM00003",
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500,
                status: 2
            }
        ]
    }
]

const LabelSatus = ({status}) => {
    if (status === 1) {
        return <label className={`${styles.waitApproval} ${styles.orangeStatus}`}>สถานะ: กำลังดำเนินการ</label>
    } else if (status === 2) {
        return <label className={`${styles.waitApproval} ${styles.yellowStatus}`}>สถานะ: กำลังผลิตสินค้า</label>
    } else if (status === 3) {
        return <label className={`${styles.waitApproval} ${styles.blueStatus}`}>สถานะ: อยู่ระหว่างจัดส่ง</label>
    } else if (status === 4) {
        return <label className={`${styles.waitApproval} ${styles.redStatus}`}>สถานะ: ขอคืนเงิน</label>
    } else if (status === 5) {
        return <label className={`${styles.waitApproval} ${styles.greenStatus}`}>สถานะ: คืนเงินสำเร็จ</label>
    } else if (status === 6) {
        return <label className={`${styles.waitApproval} ${styles.greenStatus}`}>สถานะ: รายการสำเร็จ</label>
    }
}
