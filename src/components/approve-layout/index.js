import React, { useState } from "react";
import styles from './index.module.scss';
import StepProgress from "../step_progress";

import { ReactComponent as Circle } from './circle.svg';
import { ReactComponent as Drawing } from './drawing.svg';

const ApproveLayoutComponent = () => {
    const [selectStep] = useState(2);
    return (
        <main className={styles.wrapContent}>
            <h1>รายการออเดอร์</h1>
            <h3>ออเดอร์หมายเลข #DW0001 <label className={styles.waitApproval}>กำลังดำเนินการ</label></h3>

            <section className={styles.stepProgressBar}>
                <StepProgress stepIndex={selectStep}/>
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
        </main >
    );
};

export default ApproveLayoutComponent;