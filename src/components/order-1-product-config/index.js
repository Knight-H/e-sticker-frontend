import React, { useState } from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';

const Order1ProductConfigComponent = () => {
    const [selectStep] = useState(1);

    return (
        <main>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <div className={styles.wrapContent}>
                <img className={styles.square} alt="Box Square for display"/>


                <section className={styles.rightContent}>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="stickerConfiguration">รูปแบบสติกเกอร์</label>
                        <select id="stickerConfiguration">
                            <option value="circular">แบบกลม</option>
                            <option value="rectangular">แบบเหลี่ยม</option>
                            <option value="dicut">ไดคัทตามรูป</option>
                        </select>
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="material">เนื้อวัสดุ</label>
                        <select id="material">
                            <option value="paper-art">กระดาษ Art</option>
                            <option value="pp-white">PP สีขาว</option>
                            <option value="pp-silver">PP สีเงิน</option>
                            <option value="pp-trans">PP สีใส</option>
                        </select>
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="coating">การเคลือบผิว</label>
                        <select id="coating">
                            <option value="coat-trans">เคลือบใส</option>
                            <option value="coat-matte">เคลือบด้าน</option>
                            <option value="coat-none">ไม่เคลือบ</option>
                        </select>
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="dicut">วิธีไดคัตภาพ</label>
                        <select id="dicut">
                            <option value="dicut-1mm">กินเนื้อ 1 มม.</option>
                        </select>
                    </div>

                    <div className={styles.sizeSelect}>
                        <label htmlFor="size">ขนาด</label>
                        <div className={styles.sizeWrapper}>
                            <input id="size-width" type="text" placeholder="กว้าง(ซม.)" />
                            <input id="size-height" type="text" placeholder="ยาว(ซม.)" />
                        </div>
                        
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="quantity">จำนวน</label>
                        <select id="quantity">
                            <option value="100pc">100 ชิ้น / 1,500 THB</option>
                        </select>
                        <button className={styles.addQuantityButton}>
                         + 50 ชิ้น เพิ่มเพียง 300 THB
                        </button>
                    </div>
                    

                    <button className={styles.nextButton}>
                        ถัดไป
                    </button>


                </section>
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;