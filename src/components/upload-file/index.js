import React, { useState } from "react";
import styles from './index.module.scss';
import { useFormikContext, Field, Form, ErrorMessage } from 'formik';

import StepProgress from "../step_progress";

import { ReactComponent as IconUploadFile } from './icon-upload-file.svg';
import { ReactComponent as IconCart } from './icon-cart.svg';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import { ReactComponent as IconCheckSVG } from './icon-check.svg';

const UploadFileComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(2);

    const handleChange = event => {
        if (event.target.files) {
            setFieldValue("uploadFileStricker", URL.createObjectURL(event.target.files[0]), false)
            setFieldValue("isCheckUploadFileStricker", true, false)
        }
    }

    return (
        <main>
            <section style={{ display: "flex" }}>
                <StepProgress stepIndex={selectStep} />
            </section>
            <section>
                <Form className={styles.wrapContent}>
                    <img src={values.uploadFileStricker} className={styles.square} alt="." />

                    <div className={styles.rightContent}>
                        <label className={styles.label}>อนุมัติรูปแบบงาน<ErrorMessage name="approvalStricker" render={msg => <span className="error">{msg}</span>} /></label>
                        <SelectBox name="approvalStricker" values={values} options={[
                            {
                                image: IconCheckSVG,
                                value: "needApproval",
                                name: "ต้องการอนุมัติ"
                            }
                        ]} />

                        <label className={styles.label} style={{ marginTop: "10px" }}>อัพโหลดไฟล์งาน{!values.isCheckUploadFileStricker && <spna className="error">*Require</spna>}</label>
                        <input type="file" id="file" onChange={(e) => handleChange(e)} />
                        <label for="file" className={`${styles.buttonUploadFile} ${styles.label}`}>
                            <IconUploadFile />อัพโหลดไฟล์</label>

                        <label className={styles.label}>เพิ่มเติม</label>
                        <Field name="comment" as="textarea" rows="6" />

                        <button type="submit" className={styles.btnCart} disabled={!values.isCheckUploadFileStricker && true}><IconCart /><b>ใส่ในตะกร้า</b></button>
                        <button type="button" className={styles.btnBack} onClick={() => setFieldValue("stepProgress", 0, false)}>ย้อนกลับ</button>
                    </div>
                </Form>
            </section>
        </main>
    );
};

export default UploadFileComponent;

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