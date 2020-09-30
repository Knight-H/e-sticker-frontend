import React, { useState } from "react";
import styles from './index.module.scss';

import StepProgress from "../step_progress";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";

const ApproveLayoutComponent = () => {
    const [selectStep] = useState(3);
    const [guestMode] = useState(true);

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
                <CardOrder expandCard={expandCard} setExpandCard={setExpandCard} />
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