import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import StepProductConfig from "../step-product-config";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';
import { ReactComponent as IconUploadFile } from './icon-upload-file.svg';
import { ReactComponent as IconCart } from './icon-cart.svg';

const Order1AmountConfigComponent = (props) => {
    const [selectStep] = useState(2);
    const { values, setFieldValue } = useFormikContext();

    const handleChange = event => {
        if (event.target.files) {
            setFieldValue("uploadFileStrickerForFirebase", event.target.files[0], false);
            setFieldValue("uploadFileStricker", URL.createObjectURL(event.target.files[0]), true);
            setFieldValue("isCheckUploadFileStricker", true, false);
        } else {
            setFieldValue("isCheckUploadFileStricker", false, false);
        }
    }

    return (
        <main>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <div className={styles.wrapContent}>
                <StepProductConfig />

                <section className={styles.groupOptionProductConfig}>

                    <Form style={{ width: "100%" }}>
                        <h3 className={styles.titalPage} style={{ marginTop: "10px" }}>อัพโหลดไฟล์งาน
                        <ErrorMessage name="uploadFileStricker" render={msg => <span className="error">{msg}</span>} />
                        </h3>
                        <input type="file" id="file" onChange={(e) => handleChange(e)} />
                        <label for="file" className={`${styles.buttonUploadFile} ${styles.label}`}>
                            <IconUploadFile />อัพโหลดไฟล์</label>{values.isCheckUploadFileStricker !== 0 ? values.isCheckUploadFileStricker ? 
                            <span className={styles.statusUploadFile} style={{ color: "#009473" }}>อัพโหลดไฟล์สำเร็จ</span> :
                            <span className={styles.statusUploadFile} style={{ color: "red" }}>อัพโหลดไฟล์ไม่สำเร็จ</span> : "" }

                        <h3 className={styles.titalPage} style={{ marginTop: "20px" }}>เพิ่มเติม</h3>
                        <Field name="comment" as="textarea" className={styles.textArea} rows="6" />

                        <button type="submit" className={styles.btnCart}><IconCart /><b>ใส่ในตะกร้า</b></button>
                    </Form>
                </section>
            </div>
        </main>
    )
}

export default Order1AmountConfigComponent;