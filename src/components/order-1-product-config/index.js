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
                            <SelectBox name="shape" values={values} options={[
                                {
                                    image: IconCircle,
                                    value: "circular",
                                    name: "แบบกลม"
                                },
                                {
                                    image: IconRectangular,
                                    value: "rectangular",
                                    name: "แบบเหลี่ยม"
                                }
                                ,
                                {
                                    image: IconRectangular,
                                    value: "dicut",
                                    name: "ไดคัทตามรูป"
                                }
                            ]} />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="material">เนื้อวัสดุ<ErrorMessage name="material" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="material" values={values} options={[
                                {
                                    image: IconCircle,
                                    value: "paper-art",
                                    name: "กระดาษ Art"
                                },
                                {
                                    image: IconRectangular,
                                    value: "pp-silver",
                                    name: "PP สีเงิน"
                                }
                                ,
                                {
                                    image: IconRectangular,
                                    value: "pp-trans",
                                    name: "PP สีใส"
                                }
                            ]} />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="coating">การเคลือบผิว<ErrorMessage name="coat" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="coat" values={values} options={[
                                {
                                    image: IconCircle,
                                    value: "coat-trans",
                                    name: "เคลือบใส"
                                },
                                {
                                    image: IconRectangular,
                                    value: "coat-matte",
                                    name: "เคลือบด้าน"
                                }
                                ,
                                {
                                    image: IconRectangular,
                                    value: "coat-none",
                                    name: "ไม่เคลือบ"
                                }
                            ]} />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="dicut">วิธีไดคัตภาพ<ErrorMessage name="cutting" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="cutting" values={values} options={[
                                {
                                    image: IconCircle,
                                    value: "dicut-1mm",
                                    name: "กินเนื้อ 1 มม."
                                }
                            ]} />
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
                            <SelectBox name="units" values={values} options={[
                                {
                                    image: IconCircle,
                                    value: "100pc",
                                    name: "100 ชิ้น / 1,500 THB"
                                },
                                {
                                    image: IconCircle,
                                    value: "100pc",
                                    name: "150 ชิ้น / 2,000 THB"
                                }
                            ]} />
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
    return (
        <div className={styles.selectBox}>
            <div className={styles.selectBoxCurrent} tabindex="1">
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <div className={styles.selectBoxValue}>
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.value} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.value}` ? true : false} />
                            <p className={styles.selectBoxInputText}><list.image className={styles.positionIcon} />{list.name}</p>
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
                            <label className={styles.selectBoxOption} for={`${name}-${lastIndex}`}><list.image width="16px" style={{ marginRight: "10px" }} />{list.name}</label>
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