import React, { useState } from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';

const Order1ProductConfigComponent = ({ Field, ErrorMessage }) => {
    const [selectStep] = useState(1);
    
    return (
        <main>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <div className={styles.wrapContent}>
                <img className={styles.square} alt="Box Square for display" />


                <section className={styles.rightContent}>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="stickerConfiguration">รูปแบบสติกเกอร์</label>
                        <Field as="select" name="kindSticker">
                            <option value=""></option>
                            <option value="circular">แบบกลม</option>
                            <option value="rectangular">แบบเหลี่ยม</option>
                            <option value="dicut">ไดคัทตามรูป</option>
                        </Field>
                        <ErrorMessage className="error" component="div" name="kindSticker" />
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="material">เนื้อวัสดุ</label>
                        <Field as="select" name="materialSticker">
                            <option value=""></option>
                            <option value="paper-art">กระดาษ Art</option>
                            <option value="pp-white">PP สีขาว</option>
                            <option value="pp-silver">PP สีเงิน</option>
                            <option value="pp-trans">PP สีใส</option>
                        </Field>
                        <ErrorMessage className="error" component="div" name="materialSticker" />
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="coating">การเคลือบผิว</label>
                        <Field as="select" name="coatingStricker">
                            <option value=""></option>
                            <option value="coat-trans">เคลือบใส</option>
                            <option value="coat-matte">เคลือบด้าน</option>
                            <option value="coat-none">ไม่เคลือบ</option>
                        </Field>
                        <ErrorMessage className="error" component="div" name="coatingStricker" />
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="dicut">วิธีไดคัตภาพ</label>
                        <Field as="select" name="dieCutStricker">
                            <option value=""></option>
                            <option value="dicut-1mm">กินเนื้อ 1 มม.</option>
                        </Field>
                        <ErrorMessage className="error" component="div" name="dieCutStricker" />
                    </div>

                    <div className={styles.sizeSelect}>
                        <label htmlFor="size">ขนาด</label>
                        <div className={styles.sizeWrapper}>
                            <Field type="text" name="widthStricker" />
                            <Field type="text" name="heightStricker" />
                        </div>
                        <ErrorMessage className="error" component="div" name="widthStricker" />
                        <ErrorMessage className="error" component="div" name="heightStricker" />
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="quantity">จำนวน</label>
                        <Field as="select" name="quantityStricker">
                            <option value=""></option>
                            <option value="100pc">100 ชิ้น / 1,500 THB</option>
                        </Field>
                        <ErrorMessage className="error" component="div" name="quantityStricker" />
                        <button type="button" className={styles.addQuantityButton}>
                            + 50 ชิ้น เพิ่มเพียง 300 THB
                        </button>
                    </div>

                    <button type="submit" className={styles.nextButton}>
                        ถัดไป
                    </button>

                </section>
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;