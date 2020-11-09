import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconArrow } from '../upload-file/icon-arrow.svg';

const Order1ProductConfigComponent = (props) => {
    const [selectStep] = useState(1);
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        if (values.material) {
            values.optionMaterial.map((data) => {
                if (data.name === values.material) {
                    setFieldValue("optionCoat", data.coating_list, false);
                }
            })
        }
      }, [values.material]);

    return (
        <main>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <div className={styles.wrapContent}>
                <img className={styles.square} src={values.showImageUrl} alt="." />

                <section className={styles.rightContent}>
                    <Form>
                        <div className={styles.dropdownSelect}>
                            <label htmlFor="stickerConfiguration">รูปแบบสติกเกอร์<ErrorMessage name="shape" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="shape" values={values} options={
                                values.optionShape.map((data) => {
                                    return (
                                        {
                                            image: data.imgUrl,
                                            name: data.name
                                        }
                                    )
                                })
                                } />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="material">เนื้อวัสดุ<ErrorMessage name="material" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="material" values={values} options={
                                values.optionMaterial.map((data) => {
                                    return (
                                        {
                                            image: data.imgUrl,
                                            name: data.name
                                        }
                                    )
                                })
                            } />
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="coating">การเคลือบผิว<ErrorMessage name="coat" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="coat" values={values} options={
                                values.optionCoat.map((coat) => {
                                    return (
                                        {
                                            image: coat.imgUrl,
                                            name: coat.name
                                        }
                                    )
                                })
                            } />
                        </div>

                        {/* <div className={styles.dropdownSelect}>
                            <label htmlFor="dicut">วิธีไดคัตภาพ<ErrorMessage name="cutting" render={msg => <span className="error">{msg}</span>} /></label>
                            <SelectBox name="cutting" values={values} options={values.optionCuttingList} />
                        </div> */}

                        <div className={styles.sizeSelect}>
                            <label htmlFor="size">ขนาด<ErrorMessage name="width" render={msg => <span className="error">{msg}</span>} />
                                <ErrorMessage name="height" render={msg => <span className="error">{msg}</span>} /></label>
                            <div className={styles.sizeWrapper}>
                                <Field name="width" type="text" placeholder="กว้าง (มม.)..." />
                                <Field name="height" type="text" placeholder="ยาว (มม.)..." />
                            </div>
                        </div>

                        <div className={styles.dropdownSelect}>
                            <label htmlFor="quantity">จำนวน<ErrorMessage name="units" render={msg => <span className="error">{msg}</span>} /></label>
                            {values.optionUnitOptions.map((data, index) => {
                                return (
                                    <button type="button" className={`${styles.btnSelect} ${values.setActive === index && styles.active}`}
                                        onClick={() => {
                                            setFieldValue("setActive", index, false)
                                            setFieldValue("price", data.price, true)
                                            setFieldValue("units", data.unit, true)
                                        }}>
                                            <p>{data.unit} ชิ้น (ชิ้นละ {(data.price/data.unit).toFixed(2)} บาท)</p>
                                    </button>
                                )
                            })}
                        </div>

                        <p>รวม</p>
                        <h2>1,500 บาท</h2>

                        <button type="submit" className={styles.nextButton}>ถัดไป</button>
                    </Form>
                </section>
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;

const SelectBox = ({ values, name, options }) => {
    const { setFieldValue } = useFormikContext();
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
                            <li onClick={() => setFieldValue("showImageUrl", list.image, false)}>
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