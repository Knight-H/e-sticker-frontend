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

    const handleChange = event => {
        if (event.target.files) {
            setFieldValue("uploadFileStrickerForFirebase", event.target.files[0], false);
            setFieldValue("uploadFileStricker", URL.createObjectURL(event.target.files[0]), true);
            setFieldValue("isCheckUploadFileStricker", true, false);
        }
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
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("showModalShapeAdd", true, false)}>เพิ่ม</button>

                        <div className={styles.modal} style={{ display: values.showModalShapeAdd ? "block" : "none" }}>
                            <div className={styles.modalContent}>
                                <div>
                                    <span className={styles.close} onClick={() => setFieldValue("showModalShapeAdd", false, false)}>&times;</span>
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
                                    <button type="button" className={styles.addOption}>บันทึก</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption} onClick={() => setFieldValue("showModalShape", true, false)}>
                            <img src={values.shape.imgUrl} className={styles.iconImage} alt="." />
                            {values.shape.name}
                        </button>
                    </div>

                    <div className={styles.modal} style={{ display: values.showModalShape ? "block" : "none" }}>
                        <div className={styles.modalContent}>
                            <div>
                                <span className={styles.close} onClick={() => setFieldValue("showModalShape", false, false)}>&times;</span>
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

                </article>
                <article className={styles.cardProductOption}>
                    <h4>วิธีไดคัสภาพ</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("showModalCuttingAdd", true, false)}>เพิ่ม</button>

                        <div className={styles.modal} style={{ display: values.showModalCuttingAdd ? "block" : "none" }}>
                            <div className={styles.modalContent}>
                                <div>
                                    <span className={styles.close} onClick={() => setFieldValue("showModalCuttingAdd", false, false)}>&times;</span>
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
                                    <button type="button" className={styles.addOption}>บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {values.cuttingList.map((cuttingList) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("showModalCutting", true, false)}>
                                <img src={cuttingList.imgUrl} className={styles.iconImage} alt="." />{cuttingList.name}
                            </button>)
                        })}
                    </div>
                    <div className={styles.modal} style={{ display: values.showModalCutting ? "block" : "none" }}>
                        <div className={styles.modalContent}>
                            <div>
                                <span className={styles.close} onClick={() => setFieldValue("showModalCutting", false, false)}>&times;</span>
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
                </article>
                <article className={styles.cardProductOption}>
                    <h4>เนื้อวัสดุ</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("showModalMaterialAdd", true, false)}>เพิ่ม</button>

                        <div className={styles.modal} style={{ display: values.showModalMaterialAdd ? "block" : "none" }}>
                            <div className={styles.modalContent}>
                                <div>
                                    <span className={styles.close} onClick={() => setFieldValue("showModalMaterialAdd", false, false)}>&times;</span>
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
                                    <button type="button" className={styles.addOption}>บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="button" className={styles.btnListOption} onClick={() => setFieldValue("showModalMaterial", true, false)}>
                            <img src={values.material.imgUrl} className={styles.iconImage} alt="." />{values.material.name}
                        </button>
                    </div>
                    <div className={styles.modal} style={{ display: values.showModalMaterial ? "block" : "none" }}>
                        <div className={styles.modalContent}>
                            <div>
                                <span className={styles.close} onClick={() => setFieldValue("showModalMaterial", false, false)}>&times;</span>
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
                </article>
                <article className={styles.cardProductOption}>
                    <h4>การเคลือบผิว</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("showModalCoatingAdd", true, false)}>เพิ่ม</button>

                        <div className={styles.modal} style={{ display: values.showModalCoatingAdd ? "block" : "none" }}>
                            <div className={styles.modalContent}>
                                <div>
                                    <span className={styles.close} onClick={() => setFieldValue("showModalCoatingAdd", false, false)}>&times;</span>
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
                                    <button type="button" className={styles.addOption}>บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {values.coating.map((coating) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("showModalCoating", true, false)}>
                                <img src={coating.imgUrl} className={styles.iconImage} alt="." />{coating.name}
                            </button>)
                        })}
                    </div>
                    <div className={styles.modal} style={{ display: values.showModalCoating ? "block" : "none" }}>
                        <div className={styles.modalContent}>
                            <div>
                                <span className={styles.close} onClick={() => setFieldValue("showModalCoating", false, false)}>&times;</span>
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
                </article>
                <article className={styles.cardProductOption}>
                    <h4>จำนวน / ราคา</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("showModalUnitPriceAdd", true, false)}>เพิ่ม</button>

                        <div className={styles.modal} style={{ display: values.showModalUnitPriceAdd ? "block" : "none" }}>
                            <div className={styles.modalContent}>
                                <div>
                                    <span className={styles.close} onClick={() => setFieldValue("showModalUnitPriceAdd", false, false)}>&times;</span>
                                </div>
                                <div className={styles.rowInModal}>
                                    <Field name="editShape" className={styles.text} placeholder="จำนวน ชิ้น" />
                                </div>
                                <div className={styles.rowInModal}>
                                    <Field name="editShape" className={styles.text} placeholder="ราคา บาท" />
                                </div>
                                <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                                    <button type="button" className={styles.removeOption}>ลบ</button>
                                    <button type="button" className={styles.editOption}>แก้ไข</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        {values.unitOptions.map((unitOptions) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("showModalUnitPrice", true, false)}>{unitOptions.unit}ชิ้น/{unitOptions.price}บาท</button>)
                        })}
                    </div>

                    <div className={styles.modal} style={{ display: values.showModalUnitPrice ? "block" : "none" }}>
                        <div className={styles.modalContent}>
                            <div>
                                <span className={styles.close} onClick={() => setFieldValue("showModalUnitPrice", false, false)}>&times;</span>
                            </div>
                            <div className={styles.rowInModal}>
                                <Field name="editShape" className={styles.text} placeholder="จำนวน ชิ้น" />
                            </div>
                            <div className={styles.rowInModal}>
                                <Field name="editShape" className={styles.text} placeholder="ราคา บาท" />
                            </div>
                            <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                                <button type="button" className={styles.removeOption}>ลบ</button>
                                <button type="button" className={styles.editOption}>แก้ไข</button>
                            </div>
                        </div>
                    </div>

                </article>
            </section>
        </main >
    );
};

const EnhancedAdminOrderComponent = withFormik({
    mapPropsToValues: (props) => ({
        shape: [],
        showModalShape: false,
        showModalShapeAdd: false,

        material: [],
        showModalMaterial: false,
        showModalMaterialAdd: false,

        coating: [],
        showModalCoating: false,
        showModalCoatingAdd: false,

        cuttingList: [],
        showModalCutting: false,
        showModalCuttingAdd: false,

        unitOptions: [],
        showModalUnitPrice: false,
        showModalUnitPriceAdd: false
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;