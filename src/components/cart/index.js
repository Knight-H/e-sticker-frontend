import React, {useState, useEffect} from "react";
import { useFormikContext } from 'formik';
import { withFormik, Form, Field, ErrorMessage } from 'formik';

import StepProgress from "../step_progress";
import LocationFieldsComponent from '../location-fields';

import styles from './index.module.scss';
import logoCreditCard from './credit.png';
import img_product from './workplace.jpg';
import logoBangkokBank from './BangkokBank.png';
import logoKrungthaiBank from './KrungthaiBank.jpg';
import logoSiamCommercialBank from './SiamCommercialBank.jpg';

import fake_data from "./fake-api.json";

const CartComponent = () => {
    // API [GET] /order/
    var _apiData = fake_data;
    
    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(2);
    const [checkedBox, setCheckedBox] = useState(false);

    useEffect(() => {
        setFieldValue("priceTotal", _apiData.priceTotal, false);
        setFieldValue("orderID", _apiData.orderID, false);
    }, [_apiData]);

    return (
        <>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep}/>
            </section>
            
            <Form>
                <section className={styles.section2}>
                    {/* Child Box #1 */}
                    <div className={styles.boxChild1}>
                        <h2>สรุปออเดอร์</h2>
                        <div className={styles.wrapTable}>
                            <table className={styles.tableCustom}>
                                <thead className={styles.borderBottom}>
                                    <tr>
                                        <th className={styles.textLeft}>สินค้า</th>
                                        <th>จำนวน</th>
                                        <th>มูลค่า</th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    {
                                        _apiData.data.map((dataObjectMapped, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className={`${styles.containerRow} ${styles.flexNoWrap}`}>
                                                            <img src={img_product} className={styles.productPreview} alt="Product" />
                                                            <div className={styles.containerCol}>
                                                                <div className={styles.name}>{dataObjectMapped.name}</div>
                                                                <div className={styles.desciption}>{dataObjectMapped.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={styles.textCenter}>{dataObjectMapped.amount}</td>
                                                    <td className={styles.textCenter}>{dataObjectMapped.price}฿</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot className={styles.borderTop}>
                                    <tr>
                                        <td colspan="2">ค่าสินค้ารวม</td>
                                        <td className={styles.textCenter}>{_apiData.price}฿</td>
                                    </tr>

                                    <tr>
                                        <td colspan="2">VAT 7%</td>
                                        <td className={styles.textCenter}>{_apiData.vat}฿</td>
                                    </tr>

                                    <tr>
                                        <td colspan="2">
                                            <div className={styles.containerCol}>
                                                <div className={styles.name}>ค่าจัดส่ง</div>
                                                <div className={styles.desciption}>ลงทะเบียน - 5 วันทำการ - 50 บาท</div>
                                            </div>
                                        </td>
                                        <td className={styles.textCenter}>{_apiData.feeShipping}฿</td>
                                    </tr>

                                    <tr className={styles.borderTop}>
                                        <td colspan="2">รวมทั้งหมด</td>
                                        <td className={styles.textCenter}>{_apiData.priceTotal}฿</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Child Box #2 */}
                    <div className={styles.boxChild2}>
                        <h2>เลือก การจัดส่ง <ErrorMessage name="shippingDate" render={msg => <span style={{color: "red"}}>{msg}</span>}/></h2>
                        
                        <SelectShipping name="shippingDate" id="shippingDate" values={values} options={[
                                {value: "dateType1", name: "dateType1"},
                                {value: "dateType2", name: "dateType2"},
                            ]} />

                        <h2>ชำระเงิน <ErrorMessage name="payment" render={msg => <span style={{color: "red"}}>{msg}</span>}/></h2>
                        <SelectPayment name="payment" id="payment" values={values} options={[
                                {value: "bangkok", name: "Bangkok Bank", logoBank: logoBangkokBank},
                                {value: "scb", name: "Siam Commercial Bank", logoBank: logoSiamCommercialBank},
                                {value: "ktb", name: "Krungthai Bank", logoBank: logoKrungthaiBank},
                                {value: "credit", name: "Credit / Debit", logoBank: logoCreditCard},
                            ]} />

                        <h2>ออกใบกำกับภาษี</h2>
                        <div className={styles.containerRow}>
                            <div className={styles.containerColBank}>
                                <Field name="checkedBoxInfo" type="checkbox" checked={checkedBox} onClick={() => setCheckedBox(!checkedBox)} />
                            </div>
                            <div className={styles.containerColBank}>
                                ข้อมูลเดียวกับที่อยู่
                            </div>
                        </div>
                        
                        <div className={checkedBox ? styles.contentDisplayBlock : styles.contentDisplayNone}>
                            <h2>ระบุที่อยู่</h2>
                            <LocationFieldsComponent/>
                        </div>
                        <button type="submit" className={styles.buttonNext}>ถัดไป</button>
                    </div>
                    
                </section>
            </Form>
        </>
    );
};

const SelectShipping = ({ values, name, options }) => {
    return (
        <div className={styles.containerRow}>
            {options.map((list, index) => {
                return (
                    <div className={`${styles.boxRadiusSmall} ${styles.selectBoxInput}`}>
                        <Field name={name} type="radio" value={list.value} id={`${name}-${index + 1}`}
                            checked={`${values[name]}` === `${list.value}` ? true : false} />
                    </div>
                )
            })}

            <ul className={`${styles.selectBoxList}`}>
                {options.map((list, index) => {
                    return (
                        <li className={`${styles.optionShipping} ${styles.boxRadiusSmall} ${`${values.shippingDate}`===`${list.value}` ? styles.active:styles.deactive}`} >
                            <label className={styles.selectBoxOption} for={`${name}-${index + 1}`}>
                                <p className={styles.dateReceiveDesciption}>รับสินค้าโดยประมาณ</p>
                                <div className={styles.dateReceive}>14 สิงหา (5-7วัน)</div>
                                <div className={styles.price}>50บาท</div>
                            </label>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
};


const SelectPayment = ({ values, name, options }) => {
    return (
        <div className={styles.containerCol}>
            {options.map((list, index) => {
                return (
                    <div className={`${styles.boxRadiusSmall} ${styles.selectBoxInput}`}>
                        <Field name={name} type="radio" value={list.value} id={`${name}-${index + 1}`}
                            checked={`${values[name]}` === `${list.value}` ? true : false} />
                    </div>
                )
            })}

            <ul className={`${styles.containerCol}`}>
                {options.map((list, index) => {
                    return (
                        <li className={`${styles.optionShipping} ${styles.boxRadiusSmall} ${`${values.payment}`===`${list.value}` ? styles.active:styles.deactive}`} >
                            <label className={styles.selectBoxOption} for={`${name}-${index + 1}`}>
                                <div className={styles.containerRow}>
                                    <div className={styles.containerColBank}>
                                        <img src={list.logoBank} alt="Product" className={styles.logoBank} />
                                    </div>
                                    <div className={styles.containerColBank}>
                                        {list.name}
                                    </div>
                                </div>
                            </label>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
};

const EnhancedCartComponent = withFormik({
    mapPropsToValues: () => ({
        orderID: '',
        priceTotal: '',
        shippingDate: '',
        payment: '',
        email: '',
        phone: '',
        address: '',
        district: '',
        zone: '',
        provice: '',
        zip: '',
        checkedBoxInfo: false
    }),
    validate: values => {
        const errors = {};
        console.log("values", values)
        if (values.orderID === "") { errors.orderID = "Required" }
        if (values.priceTotal === "") { errors.priceTotal = "Required" }
        if (values.shippingDate === "") { errors.shippingDate = "Required" }
        if (values.payment === "") { errors.payment = "Required" }

        if (values.checkedBoxInfo) {
            if (values.email === "") { errors.email = "Required" }
            if (values.phone === "") { errors.phone = "Required" }
            if (values.address === "") { errors.address = "Required" }
            if (values.fullname === "") { errors.fullname = "Required" }
            if (values.district === "") { errors.district = "Required" }
            if (values.zone === "") { errors.zone = "Required" }
            if (values.provice === "") { errors.provice = "Required" }
            if (values.zip === "") { errors.zip = "Required" }
        }

        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 0);
    },
    displayName: 'CartComponentForm',
})(CartComponent);

export default EnhancedCartComponent;