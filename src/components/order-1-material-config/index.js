import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import StepProductConfig from "../step-product-config";
import styles from './index.module.scss';
import { Field, Form, ErrorMessage } from 'formik';
import { useFormikContext } from 'formik';

import { ReactComponent as IconCorrect } from './icon-correct.svg';

const Order1MaterialConfigComponent = (props) => {
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
                <StepProductConfig />

                <section className={styles.groupOptionProductConfig}>

                    <Form>
                    <h3 className={styles.titalPage}>เนื้อวัสดุ<ErrorMessage name="material" render={msg => <span className="error">{msg}</span>} /></h3>
                        <div className={styles.gruop}>
                            {values.optionMaterial.map((data, index) => {
                                return (
                                    <article className={`${styles.smallCardProductConfig} ${values.material === data.name && styles.active}`} onClick={() => {
                                        setFieldValue("material", data.name, true);
                                        setFieldValue("material_index", index, true);
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

export default Order1MaterialConfigComponent;