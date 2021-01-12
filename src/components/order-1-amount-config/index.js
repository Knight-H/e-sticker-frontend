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
                        {
                            values.width && values.height ?
                                <div className={styles.gruop}>
                                    {values.optionUnitOptions.map((data) => {

                                        let price = pricing(parseInt(values.width), parseInt(values.height), parseInt(data), parseInt(values.fixed_cost)
                                            , parseInt(values.variable_cost_1), parseInt(values.variable_cost_2));

                                        return (
                                            <article className={`${styles.smallCardProductConfig} ${values.units === data && styles.active}`} onClick={() => {
                                                setFieldValue("units", data, true);
                                                setFieldValue("price", price.total_price, false);
                                            }}>
                                                <h3>{data}  ชิ้น</h3>
                                                <p>รวม {price.total_price} บาท ({price.unit_price} บาท/ชิ้น)</p>
                                            </article>
                                        )
                                    })}
                                </div>
                                :
                                ""
                        }

                        <button type="submit" className={styles.nextButton}>ถัดไป</button>
                    </Form>
                </section>
            </div>
        </main>
    )
}

export default Order1AmountConfigComponent;

function pricing(width, height, count, fixed, variable_1, variable_2) {
    const width_dicut = width + 3;
    const height_dicut = height + 3;

    const cutting_1_width = 300;
    const cutting_1_height = 242;
    const cutting_2_width = 300;
    const cutting_2_height = 157;

    const cutting_1_pattern_1 = Math.floor(cutting_1_width / width_dicut) * Math.floor(cutting_1_height / height_dicut) * 4;
    const cutting_1_pattern_2 = Math.floor(cutting_1_width / height_dicut) * Math.floor(cutting_1_height / width_dicut) * 4;
    const cutting_2_pattern_1 = Math.floor(cutting_2_width / width_dicut) * Math.floor(cutting_2_height / height_dicut) * 4;
    const cutting_2_pattern_2 = Math.floor(cutting_2_width / height_dicut) * Math.floor(cutting_2_height / width_dicut) * 4;

    const max_per_meter = Math.max(cutting_1_pattern_1, cutting_1_pattern_2, cutting_2_pattern_1, cutting_2_pattern_2);
    const production_size = Math.ceil(count / max_per_meter) * 1.1;

    const total_cost = fixed + (variable_1 * production_size) + (variable_2 * production_size);
    const total_price = Math.ceil(total_cost * 1.25);
    const unit_price = (total_price / count).toFixed(2);

    let price = {
        "width": width,
        "height": height,
        "count": count,
        "total_price": total_price,
        "unit_price": unit_price
    };

    return price;
}