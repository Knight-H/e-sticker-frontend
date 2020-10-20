import React, { useState, useEffect } from "react";
import { withFormik, useFormikContext, Field } from 'formik';
import styles from './index.module.scss';
import axios from "axios";

import AdminKpi from "../admin-kpi";

const AdminOrderComponent = () => {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions`)
          .then(res => {
            console.log("res.data[0]", res.data[0])
            // setFieldValue("orderID", res.data[0].orderID, false);
          }).catch(function (err) {
            console.log("err", err)
          })
      }, []);

    return (
        <main className={styles.wrapContent}>

            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <h1 className={styles.title}>รายการออเดอร์</h1>

            <section className={styles.productOptions}>
                <article className={styles.cardProductOption}>
                    <h4>รูปแบบสติกเกอร์</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                        <button type="button" className={styles.btnOption} style={{ float: "right" }}>ลบ</button>
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption}>แบบกลม</button>
                        <button type="button" className={styles.btnListOption}>แบบเหลี่ยม</button>
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>รูปแบบสติกเกอร์</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                        <button type="button" className={styles.btnOption} style={{ float: "right" }}>ลบ</button>
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption}>แบบกลม</button>
                        <button type="button" className={styles.btnListOption}>แบบเหลี่ยม</button>
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>รูปแบบสติกเกอร์</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                        <button type="button" className={styles.btnOption} style={{ float: "right" }}>ลบ</button>
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption}>แบบกลม</button>
                        <button type="button" className={styles.btnListOption}>แบบเหลี่ยม</button>
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>รูปแบบสติกเกอร์</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                        <button type="button" className={styles.btnOption} style={{ float: "right" }}>ลบ</button>
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption}>แบบกลม</button>
                        <button type="button" className={styles.btnListOption}>แบบเหลี่ยม</button>
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>รูปแบบสติกเกอร์</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                        <button type="button" className={styles.btnOption} style={{ float: "right" }}>ลบ</button>
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption}>แบบกลม</button>
                        <button type="button" className={styles.btnListOption}>แบบเหลี่ยม</button>
                    </div>
                </article>
            </section>
        </main >
    );
};

const EnhancedAdminOrderComponent = withFormik({
    mapPropsToValues: (props) => ({
        // editStatus:
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;