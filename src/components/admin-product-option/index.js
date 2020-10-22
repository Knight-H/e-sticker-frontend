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
            setFieldValue("shape", res.data[0].shape, false);
            setFieldValue("material", res.data[0].material, false);
            setFieldValue("coating", res.data[0].material.coating, false);
            setFieldValue("cuttingList", res.data[0].cuttingList, false);
            setFieldValue("unitOptions", res.data[0].unitOptions, false);
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
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption}><img src={values.shape.imgUrl} className={styles.iconImage} alt="." />{values.shape.name}</button>
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>วิธีไดคัสภาพ</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                    </div>
                    <div>
                    {values.cuttingList.map((cuttingList) => {
                            return ( <button type="button" className={styles.btnListOption}><img src={cuttingList.imgUrl} className={styles.iconImage} alt="." />{cuttingList.name}</button> )
                        })}
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>เนื้อวัสดุ</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption}><img src={values.material.imgUrl} className={styles.iconImage} alt="." />{values.material.name}</button>
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>การเคลือบผิว</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                    </div>
                    <div>
                        {values.coating.map((coating) => {
                            return ( <button type="button" className={styles.btnListOption}><img src={coating.imgUrl} className={styles.iconImage} alt="." />{coating.name}</button> )
                        })}
                    </div>
                </article>
                <article className={styles.cardProductOption}>
                    <h4>จำนวน / ราคา</h4>
                    <div>
                        <button type="button" className={styles.btnOption}>เพิ่ม</button>
                    </div>
                    <div>
                    {values.unitOptions.map((unitOptions) => {
                            return ( <button type="button" className={styles.btnListOption}>{unitOptions.unit}ชิ้น/{unitOptions.price}บาท</button> )
                        })}
                    </div>
                </article>
            </section>
        </main >
    );
};

const EnhancedAdminOrderComponent = withFormik({
    mapPropsToValues: (props) => ({
        shape: [],
        material: [],
        coating: [],
        cuttingList: [],
        unitOptions: [],

    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;