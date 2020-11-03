import React, { useEffect } from "react";
import { withFormik, useFormikContext, Field } from 'formik';
import styles from './index.module.scss';
import axios from "axios";

import AdminKpi from "../admin-kpi";
import firebaseApp from '../../firebase/index.js';
import ModalShipping from './modalShipping.js';

const AdminOrderComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    // Fetch Optiom
    useEffect(() => {
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions`)
            .then(res => {
                // console.log("res.data[0]", res.data[0])
                setFieldValue("myID", res.data[0].myID, false);
                setFieldValue("shape", res.data[0].shape, false);
                setFieldValue("material", res.data[0].material, false);
                setFieldValue("cuttingList", res.data[0].cuttingList, false);
                setFieldValue("unitOptions", res.data[0].unitOptions, false);
                setFieldValue("fetch", false, false);
            }).catch(function (err) {
                console.log("err", err)
            })

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
            setFieldValue("coating", materialed.coating, false)
        }
    }, [values.materialSelected]);

    const handleChangeImgAdd = event => {
        if (event.target.files) {
            setFieldValue(`${values.modalAdd}File`, event.target.files[0], false);
        }
    }

    const addOption = () => {
        const storageRef = firebaseApp.storage().ref();
        let timeStamp = new Date().toISOString().slice(0, 10);

        storageRef.child(`productOption/${timeStamp}-${values[`${values.modalAdd}File`]}`).put(values[`${values.modalAdd}File`])
            .then((snapshot) => {
                console.log(snapshot)
                snapshot.ref.getDownloadURL().then((url) => {
                    let data = {
                        "name": values[`${values.modalAdd}Text`],
                        "imgUrl": url
                    }

                    console.log("data", data)
                    // axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/${values.myID}`, data)
                    //     .then(res => {
                    //         console.log("res", res);
                    //         setFieldValue("fetchMsg", true, false);
                    //     }).catch(function (err) {
                    //         console.log("err", err)
                    //     })

                });
            })
            .catch((error) => {
                console.log(error)
            })
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
                    <h4>วิธีไดคัสภาพ</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalCuttingAdd", false)}>เพิ่ม</button>
                        {/* <ModalAdd modalAdd="modalCuttingAdd" values={values} setFieldValue={setFieldValue}
                            addOption={addOption} handleChangeImgAdd={handleChangeImgAdd} /> */}
                    </div>
                    <div>
                        {values.cuttingList.map((cuttingList) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalCuttingEdit", false)}>
                                <img src={cuttingList.imgUrl} className={styles.iconImage} alt="." />{cuttingList.name}
                            </button>)
                        })}
                    </div>
                    {/* <ModalEdit modalAdd="modalCuttingEdit" /> */}
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
                    <h4>จำนวน / ราคา</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalAdd", "modalUnitPriceAdd", false)}>เพิ่ม</button>
                        {/* <ModalAddNoImg modalAdd="modalUnitPriceAdd" values={values} setFieldValue={setFieldValue}
                            addOption={addOption} handleChangeImgAdd={handleChangeImgAdd} /> */}
                    </div>
                    <div>
                        {values.unitOptions.map((unitOptions) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => setFieldValue("modalEdit", "modalUnitPrice", false)}>{unitOptions.unit}ชิ้น/{unitOptions.price}บาท</button>)
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
                        <ModalShipping modalShipping="modalShippingAdd" values={values} setFieldValue={setFieldValue} />
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
                        <ModalShipping modalShipping="modalShippingEdit" values={values} setFieldValue={setFieldValue} />
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


const ModalAdd = ({ modalAdd, values, setFieldValue, handleChangeImgAdd, addOption }) => {
    // console.log(">>", modalAdd)
    if (modalAdd === values.modalAdd) {
        return (
            <div className={styles.modal} style={{ display: values.modalAdd ? "block" : "none" }}>
                <div className={styles.modalContent}>
                    <div>
                        <span className={styles.close} onClick={() => setFieldValue("modalAdd", "", false)}>&times;</span>
                    </div>
                    <div className={styles.rowInModal}>
                        <Field name={`${values.modalAdd}Text`} className={styles.text} placeholder="ชื่อตัวเลือก" onChange={(e) => {
                            setFieldValue(`${values.modalAdd}Text`, e.target.value, false)
                        }} />
                    </div>
                    <div>
                        <div className={styles.rowInModal}>
                            <input type="file" id="file" onChange={(e) => handleChangeImgAdd(e)} />
                            <label for="file" className={`${styles.buttonUploadFile} ${styles.label}`}>อัพโหลดไฟล์</label>
                        </div>
                    </div>
                    <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                        <button type="button" className={styles.addOption} onClick={() => addOption()}>บันทึก</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

const ModalEdit = ({ modalEdit, values, setFieldValue, handleChangeImgAdd, addOption }) => {
    if (modalEdit === values.modalEdit) {
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
                            {/* <input type="file" id="file" onChange={(e) => handleChange(e)} /> */}
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
    } else {
        return null;
    }
}

const ModalAddNoImg = ({ modalAdd, values, setFieldValue, addOption }) => {
    // console.log(">>", modalAdd)
    if (modalAdd === values.modalAdd) {
        return (
            <div className={styles.modal} style={{ display: values.modalAdd ? "block" : "none" }}>
                <div className={styles.modalContent}>
                    <div>
                        <span className={styles.close} onClick={() => setFieldValue("modalAdd", "", false)}>&times;</span>
                    </div>
                    <div className={styles.rowInModal}>
                        <Field name={`${values.modalAdd}Text`} className={styles.text} placeholder="จำนวนชิ้น" onChange={(e) => {
                            setFieldValue(`${values.modalAdd}Text`, e.target.value, false)
                        }} />
                    </div>
                    <div className={styles.rowInModal}>
                        <Field name={`${values.modalAdd}Text`} className={styles.text} placeholder="ราคา" onChange={(e) => {
                            setFieldValue(`${values.modalAdd}Text`, e.target.value, false)
                        }} />
                    </div>
                    <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                        <button type="button" className={styles.addOption} onClick={() => addOption()}>บันทึก</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}