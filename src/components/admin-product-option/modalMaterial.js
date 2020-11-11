import React, { useEffect } from "react";
import styles from './index.module.scss';
import { Field } from 'formik';
import axios from "axios";
import firebaseApp from '../../firebase/index.js';

const ModalShipping = ({ values, setFieldValue }) => {

    useEffect(() => {
        if (values.materialID || values.materialID === 0) {
            setFieldValue(`${values.modalMaterial}Kind`, values.material[values.materialID].name, false);
            setFieldValue(`${values.modalMaterial}File`, values.material[values.materialID].imgUrl, false);
        } else {
            setFieldValue(`${values.modalMaterial}Kind`, "", false);
            setFieldValue(`${values.modalMaterial}File`, "", false);
        }
    }, [values.materialID]);

    const addOptionMaterial = () => {
        let data = values[`${values.modalMaterial}Kind`];
        const storageRef = firebaseApp.storage().ref();
        let timeStamp = new Date().toISOString().slice(0, 10);
        // console.log(values[`${values.modalMaterial}File`])
        if (values[`${values.modalMaterial}File`]) {
            storageRef.child(`productOptions/${timeStamp}-${values[`${values.modalMaterial}File`].name}`).put(values[`${values.modalMaterial}File`])
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        // console.log(url)
                        let dataPost = {
                            "imgUrl": url,
                            "name": data,
                            "coating_list": []
                        }
                        values.material.push(dataPost);

                        let dataPostNew = {
                            "material_list": values.material
                        }
                        // console.log(dataPostNew)
                        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, dataPostNew)
                            .then(res => {
                                setFieldValue("fetch", true, false);
                                setFieldValue("modalMaterial", '', false)
                            }).catch(function (err) {
                                console.log("err", err)
                            })
                    })
                })
        } else {
            let dataPost = {
                "imgUrl": "",
                "name": data,
                "coating_list": []
            }
            values.material.push(dataPost);

            let dataPostNew = {
                "material_list": values.material
            }
            axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, dataPostNew)
                .then(res => {
                    setFieldValue("fetch", true, false);
                    setFieldValue("modalMaterial", '', false)
                }).catch(function (err) {
                    console.log("err", err)
                })
        }

    }

    const editOptionMaterial = () => {
        const storageRef = firebaseApp.storage().ref();
        let timeStamp = new Date().toISOString().slice(0, 10);
        // console.log(values[`${values.modalMaterial}File`])
        if (values[`${values.modalMaterial}File`]) {
            if (typeof values[`${values.modalMaterial}File`] !== 'object') {
                values.material[values.materialID].name = values[`${values.modalMaterial}Kind`]
                values.material[values.materialID].imgUrl = values[`${values.modalMaterial}File`]

                let dataPost = {
                    "material_list": values.material
                }
                // console.log(dataPost)
                axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, dataPost)
                    .then(res => {
                        setFieldValue("fetch", true, false);
                        setFieldValue("modalMaterial", '', false)
                    }).catch(function (err) {
                        console.log("err", err)
                    })
            } else {
                storageRef.child(`productOptions/${timeStamp}-${values[`${values.modalMaterial}File`].name}`).put(values[`${values.modalMaterial}File`])
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        values.material[values.materialID].name = values[`${values.modalMaterial}Kind`]
                        values.material[values.materialID].imgUrl = url

                        let dataPost = {
                            "material_list": values.material
                        }
                        // console.log(dataPost)
                        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, dataPost)
                            .then(res => {
                                setFieldValue("fetch", true, false);
                                setFieldValue("modalMaterial", '', false)
                            }).catch(function (err) {
                                console.log("err", err)
                            })
                    })
                })
            }
        } else {
            values.material[values.materialID].name = values[`${values.modalMaterial}Kind`]
            values.material[values.materialID].imgUrl = ""

            let dataPost = {
                "material_list": values.material
            }
            console.log(dataPost)
            axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, dataPost)
                .then(res => {
                    setFieldValue("fetch", true, false);
                    setFieldValue("modalMaterial", '', false)
                }).catch(function (err) {
                    console.log("err", err)
                })
        }

    }

    const removeOptionMaterial = () => {
        values.material.splice(values.materialID, 1);
        // console.log(values.material)
        let dataPost = {
            "material_list": values.material
        }

        axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, dataPost)
            .then(res => {
                setFieldValue("fetch", true, false);
                setFieldValue("modalMaterial", '', false)
            }).catch(function (err) {
                console.log("err", err)
            })
    }

    const handleChangeImgMaterial = event => {
        if (event.target.files) {
            setFieldValue(`${values.modalMaterial}File`, event.target.files[0], false);
        }
    }

    return (
        <div className={styles.modal} style={{ display: values.modalMaterial ? "block" : "none" }}>
            <div className={styles.modalContent}>
                <div>
                    <span className={styles.close} onClick={() => {
                        setFieldValue("modalMaterial", "", false);
                        setFieldValue("materialID", "", false);
                    }}>&times;</span>
                </div>
                <div className={styles.rowInModal}>
                    <Field name={`${values.modalMaterial}Kind`} className={styles.text} placeholder="รูปแบบ" />
                </div>
                <div className={styles.rowInModal}>
                    <input type="file" id="fileMaterial" onChange={(e) => handleChangeImgMaterial(e)} />
                    <label for="fileMaterial" className={`${styles.buttonUploadFile} ${styles.label}`}>อัพโหลดไฟล์</label>
                </div>
                <div className={`${styles.floatRight} ${styles.rowInModal}`}>
                    {values.materialID || values.materialID === 0 ?
                        <button type="button" className={styles.removeOption} onClick={() => removeOptionMaterial()}>ลบ</button> :
                        null}
                    <button type="button" className={styles.addOption} onClick={() => values.materialID || values.materialID === 0 ? editOptionMaterial() : addOptionMaterial()}>บันทึก</button>
                </div>
            </div>
        </div>
    )
}

export default ModalShipping;