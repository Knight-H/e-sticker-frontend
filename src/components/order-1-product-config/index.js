import React, { useState } from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';

import { useFormikContext } from 'formik';
import { validateFiledID, isEmpty, isObject, setNestedObjectValues } from '../helper.js';

import SelectInput from '../common/formik-select-input';
import TextInput from '../common/formik-text-input';

const Order1ProductConfigComponent = (props) => {
    const { values, setFieldValue, validateForm, setTouched, setErrors } = useFormikContext();
    const [selectStep] = useState(1);

    const validateConfigurationFiledID = (...args) => validateFiledID(...args);
    const validateMaterialFiledID = (...args) => validateFiledID(...args);
    const validateCoatingFiledID = (...args) => validateFiledID(...args);
    const validateDieCutFiledID = (...args) => validateFiledID(...args);
    const validateWidthFiledID = (...args) => validateFiledID(...args);
    const validateHeightFiledID = (...args) => validateFiledID(...args);
    const validateQuantityFiledID = (...args) => validateFiledID(...args);

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
                        <SelectInput name="kindSticker" validate={validateConfigurationFiledID}>
                            <option value=''></option>
                            <option value="circular">แบบกลม</option>
                            <option value="rectangular">แบบเหลี่ยม</option>
                            <option value="dicut">ไดคัทตามรูป</option>
                        </SelectInput>
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="material">เนื้อวัสดุ</label>
                        <SelectInput name="materialSticker" validate={validateMaterialFiledID}>
                            <option value=""></option>
                            <option value="paper-art">กระดาษ Art</option>
                            <option value="pp-white">PP สีขาว</option>
                            <option value="pp-silver">PP สีเงิน</option>
                            <option value="pp-trans">PP สีใส</option>
                        </SelectInput>
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="coating">การเคลือบผิว</label>
                        <SelectInput name="coatingStricker" validate={validateCoatingFiledID}>
                            <option value=""></option>
                            <option value="coat-trans">เคลือบใส</option>
                            <option value="coat-matte">เคลือบด้าน</option>
                            <option value="coat-none">ไม่เคลือบ</option>
                        </SelectInput>
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="dicut">วิธีไดคัตภาพ</label>
                        <SelectInput name="dieCutStricker" validate={validateDieCutFiledID}>
                            <option value=""></option>
                            <option value="dicut-1mm">กินเนื้อ 1 มม.</option>
                        </SelectInput>
                    </div>

                    <div className={styles.sizeSelect}>
                        <label htmlFor="size">ขนาด</label>
                        <div className={styles.sizeWrapper}>
                            <TextInput name="widthStricker" validate={validateWidthFiledID} />
                            <TextInput name="heightStricker" validate={validateHeightFiledID} />
                        </div>
                    </div>

                    <div className={styles.dropdownSelect}>
                        <label htmlFor="quantity">จำนวน</label>
                        <SelectInput name="quantityStricker" validate={validateQuantityFiledID}>
                            <option value=""></option>
                            <option value="100pc">100 ชิ้น / 1,500 THB</option>
                        </SelectInput>
                        <button type="button" className={styles.addQuantityButton}>
                            + 50 ชิ้น เพิ่มเพียง 300 THB
                        </button>
                    </div>

                    <button type="button" className={styles.nextButton}
                        onClick={() => validateForm().then(
                            (err) => {
                                setTouched(setNestedObjectValues(values, true))
                                setErrors(err);
                                if (isEmpty(err)) {
                                    setFieldValue("stepProgress", 1, false)
                                }
                            }
                        )}>
                        ถัดไป
                    </button>

                </section>
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;