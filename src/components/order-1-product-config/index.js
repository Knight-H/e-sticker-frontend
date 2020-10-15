import React, { useState } from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconArrow } from '../upload-file/icon-arrow.svg';
import { ReactComponent as IconRectangular } from './icon-rectangular.svg';
import { ReactComponent as IconCircle } from './icon-circle.svg';

const Order1ProductConfigComponent = (props) => {
    const [selectStep] = useState(1);
    const { values } = useFormikContext();

    return (
        <main>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <div className={styles.wrapContent}>
                <img className={styles.square} alt="Box Square for display" />

                <section className={styles.rightContent}>
                    <Form>
                        <div className={styles.dropdownSelect}>
                            <label htmlFor="stickerConfiguration">รูปแบบสติกเกอร์<ErrorMessage name="shape" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="shape" values={values} options={[values.optionShape]} />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="material">เนื้อวัสดุ<ErrorMessage name="material" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="material" values={values} options={[
                                {
                                    image: values.optionMaterial.imgUrl,
                                    name: values.optionMaterial.name
                                }
                            ]} />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="coating">การเคลือบผิว<ErrorMessage name="coat" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="coat" values={values} options={
                                values.material === "กระดาษ Art" ? values.optionMaterial.coating.map((data) => {
                                    return (
                                        {
                                            image: data.imgUrl,
                                            name: data.name
                                        }
                                    )
                                }) : []
                            } />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="dicut">วิธีไดคัตภาพ<ErrorMessage name="cutting" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="cutting" values={values} options={values.optionCuttingList} />
                        </div>

                        <div className={styles.sizeSelect}>
                            <label htmlFor="size">ขนาด<ErrorMessage name="width" render={msg => <span className="error">{msg}</span>} />
                            <ErrorMessage name="height" render={msg => <span className="error">{msg}</span>} /></label>
                            <div className={styles.sizeWrapper}>
                                <Field name="width" type="text" placeholder="กว้าง..." />
                                <Field name="height" type="text" placeholder="ยาว..." />
                            </div>
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="quantity">จำนวน<ErrorMessage name="units" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="units" values={values} options={
                                values.optionUnitOptions ? values.optionUnitOptions.map((data) => {
                                    return (
                                        {
                                            image: data.imgUrl,
                                            name: `${data.unit}-ชิ้น ${data.price}-บาท`
                                        }
                                    )
                                }) : []
                            } />
                        </div>

                        <button type="submit" className={styles.nextButton}>ถัดไป</button>
                    </Form>
                </section>
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;

const SelectBox = ({ values, name, options }) => {
    if (values.checkLoadOption) {
        return (
            <div className={styles.selectBox}>
                <div className={styles.selectBoxCurrent} tabindex="1">
                    {options.map((list, index) => {
                        let lastIndex = index + 1;
                        return (
                            <div className={styles.selectBoxValue}>
                                <Field name={name} type="radio" className={styles.selectBoxInput} value={list.name} id={`${name}-${lastIndex}`}
                                    checked={`${values[name]}` === `${list.name}` ? true : false} />
                                <p className={styles.selectBoxInputText}><img src={`${list.image}`} alt="." className={styles.positionIcon} />{list.name}</p>
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
                                <label className={styles.selectBoxOption} for={`${name}-${lastIndex}`}>
                                    <img src={list.image} alt="." width="16px" style={{ marginRight: "10px" }} />{list.name}
                                </label>
                            </li>
                        )
                    })}
                    <li>
                        <label className={styles.selectBoxOption} for={`${name}-0`}>กรุณาเลือก...</label>
                    </li>
                </ul>
            </div>
        )
    } else {
        return <div></div>
    }
};