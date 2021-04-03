import React, { useEffect } from "react";
import { withFormik, useFormikContext } from 'formik';
import styles from './index.module.scss';
import axios from "axios";

import AdminKpi from "../admin-kpi";
import ModalShipping from './modalShipping.js';
import ModalQuality from './modalQuality.js';
import ModalShape from './modalShape.js';
import ModalMaterial from './modalMaterial.js';
import ModalCoat from './modalCoat.js';
import ModalVariable from './modalVariable.js';
import firebaseApp from "../../firebase/index.js";

const AdminOrderComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    // Fetch Optiom
    useEffect(() => {
        setFieldValue("loading", true, false);
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/HOnTVwWrX27N7tql4WQE`, {
            headers: {
              Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
            }
           })
            .then(res => {
                setFieldValue("shape", res.data.shape_list, false);
                setFieldValue("fetch", false, false);

                axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/h03eqnOmkdOFxZqJxRWy`, {
                    headers: {
                      Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                    }
                   })
                    .then(res => {
                        // console.log("res.data[0]", res.data)
                        setFieldValue("material", res.data.material_list, false);
                        setFieldValue("fetch", false, false);

                        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/productOptions/Rf8b0x8ktshu0y0VGzyV`, {
                            headers: {
                              Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                            }
                           })
                            .then(res => {
                                // console.log("res.data[0]", res.data.count_list)
                                setFieldValue("unitOptions", res.data.count_list, false);
                                setFieldValue("fetch", false, false);

                                // Shipping option
                                axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/shippingOptions`, {
                                    headers: {
                                      Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                                    }
                                   })
                                    .then(res => {
                                        // console.log("res.data[0]", res.data)
                                        setFieldValue("shippingOption", res.data, false);
                                        setFieldValue("fetch", false, false);

                                        setFieldValue("loading", false, false);
                                    }).catch(function (err) {
                                        console.log("err", err)
                                        setFieldValue("loading", false, false);

                                    })
                            }).catch(function (err) {
                                console.log("err", err)
                                setFieldValue("loading", false, false);

                            })
                    }).catch(function (err) {
                        console.log("err", err)
                        setFieldValue("loading", false, false);

                    })
            }).catch(function (err) {
                console.log("err", err)
                setFieldValue("loading", false, false);

            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.fetch]);

    // Seclect Coating form materail
    useEffect(() => {
        if (values.materialSelected || values.materialSelected === 0) {
            setFieldValue("coating", values.material[values.materialSelected].coating_list, false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.materialSelected]);

    const handleChangePDF = (event) => {
        console.log('event', event)
        const storageRef = firebaseApp.storage().ref();
        if (event.target.files) {

          storageRef
            .child(`pdf`)
            .put(event.target.files[0])
            .then((snapshot) => {
                console.log('snapshot', snapshot)
                snapshot.ref.getDownloadURL().then((url) => {
                    setFieldValue(`PDF`, url, false);
                })
            }).catch((err) => {
                console.log(err)
            })

        }
      };
      console.log("PDF", values.PDF)
    return (
        <main className={styles.wrapContent}>
            <div class={`loader loader-default ${values.loading ? 'is-active' : ''}`}></div>
            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <h1 className={styles.title}>รายการออเดอร์</h1>

            <section className={styles.productOptions}>

                <article className={styles.cardProductOption}>
                    <h4>รูปแบบสติกเกอร์</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalShape", "modalShapeAdd", false)}>เพิ่ม</button>
                        <ModalShape values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        {values.shape.map((shape, index) => {
                            return (
                                <div className={styles.btnRow}>
                                    <button type="button" className={`${styles.btnListOption90} ${index === values.shapeID && styles.active}`}
                                        onClick={() => {
                                            setFieldValue("shapeID", index, false);
                                        }}>
                                        <img src={shape.imgUrl} className={styles.iconImage} alt="." />
                                        {shape.name}
                                    </button>
                                    <button className={styles.btnEdit} type="button" onClick={() => {
                                        setFieldValue("modalShape", "modalShapeEdit", false);
                                        setFieldValue("shapeID", index, false);
                                    }}>แก้ไข</button>
                                </div>
                            )
                        })}
                    </div>
                </article>

                <article className={styles.cardProductOption}>
                    <h4>เนื้อวัสดุ</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalMaterial", "modalMaterialAdd", false)}>เพิ่ม</button>
                        <ModalMaterial values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        {values.material.map((material, index) => {
                            return (
                                <div className={styles.btnRow}>
                                    <button type="button" className={`${styles.btnListOption90} ${index === values.materialSelected && styles.active}`}
                                        onClick={() => {
                                            setFieldValue("materialSelected", index, false);
                                        }}>
                                        <img src={material.imgUrl} className={styles.iconImage} alt="." />{material.name}
                                    </button>
                                    <button className={styles.btnEdit} type="button" onClick={() => {
                                        setFieldValue("modalMaterial", "modalMaterialEdit", false);
                                        setFieldValue("materialID", index, false);
                                    }}>แก้ไข</button>
                                </div>
                            )
                        })}
                    </div>
                </article>

                <article className={styles.cardProductOption}>
                    <h4>การเคลือบผิว</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => values.materialSelected || values.materialSelected === 0 ? setFieldValue("modalCoating", "modalCoatingAdd", false) : null}>เพิ่ม</button>
                        <ModalCoat values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        {values.coating && values.coating.map((coating, index) => {
                            return (
                                <div className={styles.btnRow}>
                                    <button type="button" className={`${styles.btnListOption90} ${index === values.coatingSelected && styles.active}`}
                                        onClick={() => {
                                            setFieldValue("coatingSelected", index, false);
                                        }}>
                                        <img src={coating.imgUrl} className={styles.iconImage} alt="." />{coating.name}
                                    </button>
                                    <button className={styles.btnEdit} type="button" onClick={() => {
                                        setFieldValue("modalCoating", "modalCoatingEdit", false);
                                        setFieldValue("coatingID", index, false);
                                    }}>แก้ไข</button>
                                </div>
                            )
                        })}
                    </div>
                </article>

                <article className={styles.cardProductOption}>
                    <h4>จำนวน</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() =>
                            values.coatingSelected || values.coatingSelected === 0 ?
                                setFieldValue("modalVariable", "modalVariableAdd", false) :
                                null}>เพิ่ม</button>
                                {/* disabled={values.coating.length > 0 ? true : false} */}
                        <ModalVariable values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        {values.coating && (values.coatingSelected || values.coatingSelected === 0) && values.coating.map((coating, index) => {
                            if (coating.price && values.coatingSelected === index) {
                                return (
                                    <div className={styles.btnRow}>
                                        <button type="button" className={`${styles.btnListOption90} ${index === values.variableSelected && styles.active}`}
                                            onClick={() => {
                                                setFieldValue("variableSelected", index, false);
                                            }}>
                                            <p>Fixed: {coating.price.fixed_cost}</p>
                                            <p>Variable_1: {coating.price.variable_cost_1}</p>
                                            <p>Variable_2: {coating.price.variable_cost_2}</p>
                                        </button>
                                        <button className={styles.btnEdit} type="button" onClick={() => {
                                            setFieldValue("modalVariable", "modalVariableEdit", false);
                                            setFieldValue("variableID", index, false);
                                        }}>แก้ไข</button>

                                    </div>
                                )
                            } else return null;
                        })}
                    </div>
                </article>

                <article className={styles.cardProductOption}>
                    <h4>จำนวน</h4>
                    <div>
                        <button type="button" className={styles.btnOption} onClick={() => setFieldValue("modalQuality", "modalQualityAdd", false)}>เพิ่ม</button>
                        <ModalQuality values={values} setFieldValue={setFieldValue} />
                    </div>
                    <div>
                        {values.unitOptions.map((unitOptions, index) => {
                            return (<button type="button" className={styles.btnListOption} onClick={() => {
                                setFieldValue("modalQuality", "modalQualityEdit", false);
                                setFieldValue("qualityID", index, false);
                            }}>{unitOptions} ชิ้น</button>)
                        })}
                    </div>
                </article>

            </section>

            <h1 className={styles.title}>รายการจัดส่ง</h1>

            <section className={styles.productOptions} style={{ justifyContent: "start" }}>
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
                    </div>
                </article>
            </section>
            
            <h1 className={styles.title}>เงื่อนไข</h1>

            <section className={styles.productOptions} style={{ justifyContent: "start" }}>
                <article className={styles.cardProductOption}>
                    <h4>เอกสารเงื่อนไข</h4>
                    <input
                        type="file"
                        id="pdf"
                        onChange={(e) => {
                            handleChangePDF(e)
                        }}
                    />
                    <label
                        for="pdf"
                        className={`${styles.buttonUploadFile} ${styles.label}`}
                        style={{ display: "flex", maxWidth: '204px', justifyContent: 'center'}}
                    >
                        อัพโหลดไฟล์
                    </label>
                    <a className={styles.btnListOption} href='https://firebasestorage.googleapis.com/v0/b/digitalwish-sticker.appspot.com/o/pdf?alt=media&token=e5de51a0-3f36-4507-8edf-71828552cde4' style={{ display: 'flex', maxWidth: '204px', justifyContent: 'center' }}>
                        ดูเอกสาร
                    </a>
                </article>
            </section>

        </main >
    );
};

const EnhancedAdminOrderComponent = withFormik({
    mapPropsToValues: (props) => ({
        loading: false,
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