import React, { useState, useEffect } from "react";
import StepProgress from "../step_progress";
import StepProductConfig from "../step-product-config";
import styles from "./index.module.scss";
import { Field, Form, ErrorMessage } from "formik";
import { useFormikContext } from "formik";

const widthHeight = [
  {
    width: 30,
    height: 30,
  },
  {
    width: 40,
    height: 40,
  },
  {
    width: 50,
    height: 50,
  },
  {
    width: 60,
    height: 60,
  },
  {
    width: 70,
    height: 70,
  },
  {
    width: 80,
    height: 80,
  },
  {
    width: 90,
    height: 90,
  },
];

const Order1AmountConfigComponent = (props) => {
  const [selectStep] = useState(1);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    console.log(">>>>>");
    if (values.units && values.width && values.height) {
      let price = pricing(
        parseInt(values.width),
        parseInt(values.height),
        parseInt(values.units),
        parseInt(values.fixed_cost),
        parseInt(values.variable_cost_1),
        parseInt(values.variable_cost_2)
      );
      if (price) {
        setFieldValue("price", price.total_price, false);
      } else return;
    } else return;
  }, [
    values.width,
    values.height,
    values.fixed_cost,
    values.variable_cost_1,
    values.units,
    values.variable_cost_2,
    setFieldValue,
  ]);

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
              ขนาด
              <div className={styles.gruop} style={{ marginTop: "10px" }}>
                {widthHeight.map((data) => {
                  return (
                    <button type="submit" className={styles.nextButton}>
                      <article
                        className={`${styles.smallCardProductConfig}`}
                        onClick={() => {
                          setFieldValue("width", data.width, true);
                          setFieldValue("height", data.height, false);
                        }}
                      >
                        <p>
                          {data.width} X {data.height} mm
                        </p>
                      </article>
                    </button>
                  );
                })}
              </div>
              <ErrorMessage
                name="width"
                render={(msg) => <span className="error">{msg}</span>}
              />
              <ErrorMessage
                name="height"
                render={(msg) => <span className="error">{msg}</span>}
              />
            </h3>
            <div className={styles.sizeWrapper}>
              <span style={{ margin: "0 10px 0 0", fontSize: "14px" }}>
                กว้าง
              </span>
              <Field name="width" type="text" placeholder="กว้าง (มม.)..." />
              <span style={{ margin: "0 10px 0 0", fontSize: "14px" }}>
                ยาว
              </span>
              <Field name="height" type="text" placeholder="ยาว (มม.)..." />
            </div>

            <h3 className={styles.titalPage}>
              จำนวน
              <ErrorMessage
                name="units"
                render={(msg) => <span className="error">{msg}</span>}
              />
            </h3>
            {values.width && values.height ? (
              // <div className={styles.gruop}>
              <div className={styles.gruop1}>
                {values.optionUnitOptions.map((data) => {
                  let price = pricing(
                    parseInt(values.width),
                    parseInt(values.height),
                    parseInt(data),
                    parseInt(values.fixed_cost),
                    parseInt(values.variable_cost_1),
                    parseInt(values.variable_cost_2)
                  );

                  return (
                    <label className={styles.newLable}>
                      <button type="submit" className={styles.nextButton}>
                        <article
                          className={`${styles.smallCardProductConfig1} ${
                            values.units === data && styles.active
                          }`}
                          onClick={() => {
                            setFieldValue("units", data, true);
                            setFieldValue("price", price.total_price, false);
                          }}
                        ></article>
                      </button>
                      <div className={styles.newGroup}>
                        <h3>{data} ชิ้น</h3>
                        <p>({price.unit_price} บาท/ชิ้น)</p>
                      </div>
                    </label>
                  );
                })}
                {/* {values.optionUnitOptions.map((data) => {
                  let price = pricing(
                    parseInt(values.width),
                    parseInt(values.height),
                    parseInt(data),
                    parseInt(values.fixed_cost),
                    parseInt(values.variable_cost_1),
                    parseInt(values.variable_cost_2)
                  );

                  return (
                    <button type="submit" className={styles.nextButton}>
                      <article
                        className={`${styles.smallCardProductConfig} ${
                          values.units === data && styles.active
                        }`}
                        onClick={() => {
                          setFieldValue("units", data, true);
                          setFieldValue("price", price.total_price, false);
                        }}
                      >
                        <h3>{data} ชิ้น</h3>
                        <p>
                          รวม {price.total_price} บาท ({price.unit_price}{" "}
                          บาท/ชิ้น)
                        </p>
                      </article>
                    </button>
                  );
                })} */}
              </div>
            ) : (
              ""
            )}
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Order1AmountConfigComponent;

function pricing(width, height, count, fixed, variable_1, variable_2) {
  const width_dicut = width + 3;
  const height_dicut = height + 3;

  const cutting_1_width = 300;
  const cutting_1_height = 242;
  const cutting_2_width = 300;
  const cutting_2_height = 157;

  const cutting_1_pattern_1 =
    Math.floor(cutting_1_width / width_dicut) *
    Math.floor(cutting_1_height / height_dicut) *
    4;
  const cutting_1_pattern_2 =
    Math.floor(cutting_1_width / height_dicut) *
    Math.floor(cutting_1_height / width_dicut) *
    4;
  const cutting_2_pattern_1 =
    Math.floor(cutting_2_width / width_dicut) *
    Math.floor(cutting_2_height / height_dicut) *
    4;
  const cutting_2_pattern_2 =
    Math.floor(cutting_2_width / height_dicut) *
    Math.floor(cutting_2_height / width_dicut) *
    4;

  const max_per_meter = Math.max(
    cutting_1_pattern_1,
    cutting_1_pattern_2,
    cutting_2_pattern_1,
    cutting_2_pattern_2
  );
  const production_size = Math.ceil(count / max_per_meter) * 1.1;

  const total_cost =
    fixed + variable_1 * production_size + variable_2 * production_size;
  const total_price = Math.ceil(total_cost * 1.25);
  const unit_price = (total_price / count).toFixed(2);

  let price = {
    width: width,
    height: height,
    count: count,
    total_price: total_price,
    unit_price: unit_price,
  };

  return price;
}
