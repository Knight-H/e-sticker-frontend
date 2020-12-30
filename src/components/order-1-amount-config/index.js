import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import StepProductConfig from "../step-product-config";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconCorrect } from './icon-correct.svg';

const Order1AmountConfigComponent = (props) => {
    const [selectStep] = useState(1);
    const { values, setFieldValue } = useFormikContext();

    return (
        <main>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <div className={styles.wrapContent}>
                <StepProductConfig />

                <section className={styles.groupOptionProductConfig}>

                    <Form>
                        <h3 className={styles.titalPage}>ขนาด<ErrorMessage name="width" render={msg => <span className="error">{msg}</span>} />
                        <ErrorMessage name="height" render={msg => <span className="error">{msg}</span>} /></h3>
                        <div className={styles.sizeWrapper}>
                            <Field name="width" type="text" placeholder="กว้าง (มม.)..." />
                            <Field name="height" type="text" placeholder="ยาว (มม.)..." />
                        </div>

                        <h3 className={styles.titalPage}>จำนวน<ErrorMessage name="units" render={msg => <span className="error">{msg}</span>} /></h3>
                        <div className={styles.gruop}>
                            {values.optionUnitOptions.map((data) => {
                                return (
                                    <article className={`${styles.smallCardProductConfig} ${values.units === data && styles.active}`} onClick={() => {
                                        setFieldValue("units", data, true);
                                    }}>
                                        <h3>{data}  ชิ้น</h3>
                                        <p>รวม 150 บาท (1.5 บาท/ชิ้น)</p>
                                    </article>
                                )
                            })}
                        </div>

                        <button type="submit" className={styles.nextButton}>ถัดไป</button>
                    </Form>
                </section>
            </div>
        </main>
    )
}

export default Order1AmountConfigComponent;