import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import StepProductConfig from "../step-product-config";
import styles from "./index.module.scss";
import { Form, ErrorMessage } from "formik";
import { useFormikContext } from "formik";
import parse from 'html-react-parser';

const Order1MaterialConfigComponent = (props) => {
  const [selectStep] = useState(1);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.material) {
      values.optionMaterial.map((data) => {
        if (data.name === values.material) {
          setFieldValue("optionCoat", data.coating_list, false);
        }
      });
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
            <h3 className={styles.titalPage}>
              เนื้อวัสดุ
              <ErrorMessage
                name="material"
                render={(msg) => <span className="error">{msg}</span>}
              />
            </h3>
            <div className={styles.gruop}>
              {values.optionMaterial.map((data, index) => {
                console.log("data", data)
                return (
                  <button type="submit" className={styles.nextButton}>
                    <article
                      className={`${styles.smallCardProductConfig} ${
                        values.material === data.name && styles.active
                      }`}
                      onClick={() => {
                        setFieldValue("index_1", index, true);
                        setFieldValue("material", data.name, true);
                      }}
                    >
                      <img alt="." src={data.imgUrl} width="200" />
                      <div className={styles.gruopDetailProducts}>
                        <p className={styles.headDetail}>{data.name}</p>
                        <p>{parse(data.description)}</p>
                      </div>
                    </article>
                  </button>
                );
              })}
            </div>

            {/* <button type="submit" className={styles.nextButton}>ถัดไป</button> */}
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Order1MaterialConfigComponent;
