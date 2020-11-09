import React, { useEffect } from "react";
import { withFormik, useFormikContext, Field } from 'formik';
import styles from './index.module.scss';
import axios from "axios";

import AdminKpi from "../admin-kpi";
import firebaseApp from '../../firebase/index.js';
import ModalShipping from './modalShipping.js';
import ModalQuality from './modalQuality.js';

const AdminOrderComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    // Fetch Optiom
    useEffect(() => {
        // axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions`)
        //     .then(res => {
        //         // console.log("res.data[0]", res.data[0])
        //         setFieldValue("myID", res.data[0].myID, false);
        //         setFieldValue("shape", res.data[0].shape, false);
        //         setFieldValue("material", res.data[0].material, false);
        //         setFieldValue("cuttingList", res.data[0].cuttingList, false);
        //         setFieldValue("unitOptions", res.data[0].unitOptions, false);
        //         setFieldValue("fetch", false, false);
        //     }).catch(function (err) {
        //         console.log("err", err)
        //     })

        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`)
            .then(res => {
                setFieldValue("shape", res.data.shape_list, false);
            }).catch(function (err) {
                console.log("err", err)
            })
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`)
            .then(res => {
                // console.log("res.data[0]", res.data)
                setFieldValue("material", res.data.material_list, false);
            }).catch(function (err) {
                console.log("err", err)
            })
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/Rf8b0x8ktshu0y0VGzyV`)
            .then(res => {
                // console.log("res.data[0]", res.data.count_list)
                setFieldValue("unitOptions", res.data.count_list, false);
            }).catch(function (err) {
                console.log("err", err)
            })

        // Shipping option
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions`)
            .then(res => {
                // console.log("res.data[0]", res.data)
                setFieldValue("shippingOption", res.data, false);
                setFieldValue("fetch", false, false);
            }).catch(function (err) {
                console.log("err", err)
            })
    }, [values.fetch]);

    // Seclect Coating form materail
    useEffect(() => {
        let materialed = values.material.find(material => `${material.name}` === `${values.materialSelected}`)
        if (materialed) {
            setFieldValue("coating", materialed.coating_list, false)
        }
    }, [values.materialSelected]);

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
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalShapeAdd", false)}>เพิ่ม</button>
                        {/* <ModalAdd modalAdd="modalShapeAdd" values={values} setFieldValue={setFieldValue}
                            addOption={addOption} handleChangeImgAdd={handleChangeImgAdd} /> */}
                    </div>
                    <div>
                        {values.shape.map((shape) => {
                            return (
                                <button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalShapeEdit", false)}>
                                    <img src={shape.imgUrl} className={styles.iconImage} alt="." />
                                    {shape.name}
                                </button>
                            )
                        })}
                        {/* <ModalEdit modalEdit="modalShapeEdit" values={values} setFieldValue={setFieldValue}
                            addOption={addOption} handleChangeImgAdd={handleChangeImgAdd} /> */}
                    </div>
                </article>

                <article className={styles.cardProductOption}>
                    <h4>เนื้อวัสดุ</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalMaterialAdd", false)}>เพิ่ม</button>
                        {/* <ModalAdd modalAdd="modalMaterialAdd" values={values} setFieldValue={setFieldValue}
                            addOption={addOption} handleChangeImgAdd={handleChangeImgAdd} /> */}
                    </div>
                    <div>
                        {values.material.map((material) => {
                            return (
                                <div className={styles.btnRow}>
                                    <button type="button" className={`${styles.btnListOption90} ${material.name === values.materialSelected && styles.active}`} onClick={() => setFieldValue("materialSelected", material.name, false)}>
                                        <img src={material.imgUrl} className={styles.iconImage} alt="." />{material.name}
                                    </button>
                                    <button className={styles.btnEdit} type="button" onClick={() => setFieldValue("modalEdit", "modalMaterialEdit", false)}>แก้ไข</button>
                                </div>
                            )
                        })}
                    </div>
                    {/* <ModalEdit modalAdd="modalMaterialEdit" /> */}
                </article>

                <article className={styles.cardProductOption}>
                    <h4>การเคลือบผิว</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalCoatingAdd", false)}>เพิ่ม</button>
                        {/* <ModalAdd modalAdd="modalCoatingAdd" values={values} setFieldValue={setFieldValue}
                            addOption={addOption} handleChangeImgAdd={handleChangeImgAdd} /> */}
                    </div>
                    <div>
                        {values.coating.map((coating) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalCoatingEdit", false)}>
                                <img src={coating.imgUrl} className={styles.iconImage} alt="." />{coating.name}
                            </button>)
                        })}
                    </div>
                    {/* <ModalEdit modalAdd="modalCoatingEdit" /> */}
                </article>

                <article className={styles.cardProductOption}>
                    <h4>จำนวน</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalQuality", "modalQualityAdd", false)}>เพิ่ม</button>
                        <ModalQuality values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        {values.unitOptions.map((unitOptions) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalUnitPrice", false)}>{unitOptions} ชิ้น</button>)
                        })}
                    </div>
                    {/* <ModalEdit modalAdd="modalUnitPrice" /> */}
                </article>

            </section>

            <h1 className={styles.title}>รายการจัดส่ง</h1>

            <section className={styles.productOptions}>
                <article className={styles.cardProductOption}>
                    <h4>รูปแบบการจัดส่ง</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalShipping", "modalShippingAdd", false)}>เพิ่ม</button>
                        <ModalShipping values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        {values.shippingOption.map((shipping) => {
                            return (
                                <button type="button" className={styles.btnListOption} onClick={() => {
                                    setFieldValue("modalShipping", "modalShippingEdit", false);
                                    setFieldValue("shippingID", shipping.myID, false);
                                }}>
                                    {shipping.courier} {shipping.duration} วัน {shipping.rate}฿
                                </button>
                            )
                        })}
                        <ModalShipping values={values} setFieldValue={setFieldValue} />
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

        shippingOption: [],

        modalAdd: "",
        fetch: false
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;