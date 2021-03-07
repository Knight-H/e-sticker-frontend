import React, { useState } from "react";
import StepProgress from "../step_progress";
import StepProductConfig from "../step-product-config";
import styles from "./index.module.scss";
import { Form, ErrorMessage } from "formik";
import { useFormikContext } from "formik";

const Order1ShapeConfigComponent = (props) => {
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
            <h3 className={styles.titalPage}>
              รูปแบบสติกเกอร์
              <ErrorMessage
                name="shape"
                render={(msg) => <span className="error">{msg}</span>}
              />
            </h3>
            <div className={styles.gruop}>
              {values.optionShape.map((data, index) => {
                return (
                  <button type="submit" className={styles.nextButton}>
                    <article
                      className={`${styles.smallCardProductConfig} ${
                        values.shape === data.name && styles.active
                      }`}
                      onClick={() => {
                        setFieldValue("shape", data.name, true);
                        setFieldValue("shape_index", index, true);
                      }}
                    >
                      <img alt="." src={data.imgUrl} width="200" />
                      <p>{data.name}</p>
                    </article>
                  </button>
                );
              })}
            </div>

            {/* <button type="submit" >
              ถัดไป
            </button> */}
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Order1ShapeConfigComponent;
