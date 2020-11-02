import React, { useEffect } from "react";
import { withFormik, useFormikContext, Field } from 'formik';
import styles from './index.module.scss';
import axios from "axios";

import AdminKpi from "../admin-kpi";

const AdminOrderComponent = () => {
    const { values, setFieldValue } = useFormikContext();

    // Fetch Optiom
    useEffect(() => {
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions`)
            .then(res => {
                console.log("res.data[0]", res.data[0])
                setFieldValue("shape", res.data[0].shape, false);
                setFieldValue("material", res.data[0].material, false);
                // setFieldValue("coating", res.data[0].material, false);
                setFieldValue("cuttingList", res.data[0].cuttingList, false);
                setFieldValue("unitOptions", res.data[0].unitOptions, false);
            }).catch(function (err) {
                console.log("err", err)
            })
    }, []);

    // Seclect Coating form materail
    useEffect(() => {
        let materialed = values.material.find(material => `${material.name}` === `${values.materialSelected}`)
        if (materialed) {
            setFieldValue("coating", materialed.coating, false)
        }
    }, [values.materialSelected]);

    const handleChange = event => {
        if (event.target.files) {
            setFieldValue(`${values.modalAdd}-file`, event.target.files[0], false);
        }
    }

    const addOption = () => {
        let data = {
            "name": values[`${values.modalAdd}-text`],
            "imgUrl": ``
        }
        console.log("data", data)
    }

    const ModalAdd = () => {
        return (
            <div className={styles.modal} style={{ display: values.modalAdd ? "block" : "none" }}>
                <div className={styles.modalContent}>
                    <div>
                        <span className={styles.close} onClick={() => setFieldValue("modalAdd", "", false)}>&times;</span>
                    </div>
                    <div className={styles.rowInModal}>
                        <Field name={`${values.modalAdd}-text`} className={styles.text} placeholder="ชื่อตัวเลือก" />
                    </div>
                    <div>
                        <div className={styles.rowInModal}>
                            <input type="file" id="file" onChange={(e) => handleChange(e)} />
                            <label for="file" className={`${styles.buttonUploadFile} ${styles.label}`}>อัพโหลดไฟล์</label>
                        </div>
                    </div>
                    <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                        <button type="button" className={styles.addOption} onClick={() => addOption()}>บันทึก</button>
                    </div>
                </div>
            </div>
        )
    }

    const ModalEdit = () => {
        return (
            <div className={styles.modal} style={{ display: values.modalEdit ? "block" : "none" }}>
                <div className={styles.modalContent}>
                    <div>
                        <span className={styles.close} onClick={() => setFieldValue("modalEdit", false, false)}>&times;</span>
                    </div>
                    <div className={styles.rowInModal}>
                        <Field name="editShape" className={styles.text} placeholder="ชื่อตัวเลือก" />
                    </div>
                    <div>
                        <div className={styles.rowInModal}>
                            <input type="file" id="file" onChange={(e) => handleChange(e)} />
                            <label for="file" className={`${styles.buttonUploadFile} ${styles.label}`}>อัพโหลดไฟล์</label>
                        </div>
                    </div>
                    <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                        <button type="button" className={styles.removeOption}>ลบ</button>
                        <button type="button" className={styles.editOption}>แก้ไข</button>
                    </div>
                </div>
            </div>
        )
    }

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
                        <ModalAdd />
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
                        <ModalEdit />
                    </div>
                </article>

                <article className={styles.cardProductOption}>
                    <h4>วิธีไดคัสภาพ</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalCuttingAdd", false)}>เพิ่ม</button>
                        <ModalAdd />
                    </div>
                    <div>
                        {values.cuttingList.map((cuttingList) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalCuttingEdit", false)}>
                                <img src={cuttingList.imgUrl} className={styles.iconImage} alt="." />{cuttingList.name}
                            </button>)
                        })}
                    </div>
                    <ModalEdit />
                </article>

                <article className={styles.cardProductOption}>
                    <h4>เนื้อวัสดุ</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalMaterialAdd", false)}>เพิ่ม</button>
                        <ModalAdd />
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
                    <ModalEdit />
                </article>

                <article className={styles.cardProductOption}>
                    <h4>การเคลือบผิว</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalCoatingAdd", false)}>เพิ่ม</button>
                        <ModalAdd />
                    </div>
                    <div>
                        {values.coating.map((coating) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalCoatingEdit", false)}>
                                <img src={coating.imgUrl} className={styles.iconImage} alt="." />{coating.name}
                            </button>)
                        })}
                    </div>
                    <ModalEdit />
                </article>

                <article className={styles.cardProductOption}>
                    <h4>จำนวน / ราคา</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalUnitPriceAdd", false)}>เพิ่ม</button>
                        <ModalAdd />
                    </div>
                    <div>
                        {values.unitOptions.map((unitOptions) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalUnitPrice", false)}>{unitOptions.unit}ชิ้น/{unitOptions.price}บาท</button>)
                        })}
                    </div>
                    <ModalEdit />
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

        modalAdd: ""
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;
