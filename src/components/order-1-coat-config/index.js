import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import StepProductConfig from "../step-product-config";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconCorrect } from './icon-correct.svg';

const Order1CoatConfigComponent = (props) => {
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

                    <Form style={{ width: "100%"}}>
                    <h3 className={styles.titalPage}>การเคลือบผิว<ErrorMessage name="coat" render={msg => <span className="error">{msg}</span>} /></h3>
                        <div className={styles.gruop}>
                            {values.optionCoat.map((data, index) => {
                                return (
                                    <article className={`${styles.smallCardProductConfig} ${values.coat === data.name && styles.active}`} onClick={() => {
                                        setFieldValue("coat", data.name, true);
                                        setFieldValue("coat_index", index, true);
                                        setFieldValue("fixed_cost", data.price.fixed_cost, true);
                                        setFieldValue("variable_cost_1", data.price.variable_cost_1, true);
                                        setFieldValue("variable_cost_2", data.price.variable_cost_2, true);

                                    }}>
                                        <img src={data.imgUrl} width="200" />
                                        <div className={styles.gruopDetailProducts}>
                                            <p className={styles.headDetail}>{data.name}</p>
                                            <p>- Vibrant and cleaner colour</p>
                                            <p>- Visually brighter</p>
                                            <p>- Scratches are least visible</p>
                                            <p>- Protective surface</p>
                                        </div>
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

export default Order1CoatConfigComponent;