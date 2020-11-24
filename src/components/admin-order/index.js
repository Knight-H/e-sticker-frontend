import React, { useState, useEffect } from "react";
import { withFormik, useFormikContext, Field } from 'formik';
import styles from './index.module.scss';
import axios from "axios";

import StepProgress from "../step_progress";
import AdminKpi from "../admin-kpi";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";
import { STATUS_ORDERS_TYPE } from '../constant-variable.js';

import { ReactComponent as IconArrow } from '../upload-file/icon-arrow.svg';

const AdminOrderComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(3);

    // GET Orders From API
    useEffect(() => {
        var pathArray = window.location.pathname.split('/');
        var myID = pathArray[3];
        if (!myID) {
            props.history.push('/admin');
        } else {
            axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders/${myID}`)
                .then(res => {
                    // console.log("res.data", res.data)
                    setFieldValue("myID", myID, false);

                    setFieldValue("orderID", res.data.orderID, false);
                    setFieldValue("status", res.data.status, false);
                    setFieldValue("itemsList", res.data.itemsList, false);
                    setFieldValue("shippingAddress", res.data.shippingAddress, false);

                    setFieldValue("shippingCourier", res.data.shippingCourier, false);
                    setFieldValue("itemsCost", res.data.itemsCost, false);
                    setFieldValue("shippingCost", res.data.shippingCost, false);
                    setFieldValue("vatCost", res.data.vatCost, false);
                    setFieldValue("totalCost", res.data.totalCost, false);
                }).catch(function (err) {
                    console.log("err", err)
                })
        }
    }, [values.fetchMsg]);

    return (
        <main className={styles.wrapContent}>

            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <h1 className={styles.title}>รายการออเดอร์</h1>
            <p>ออเดอร์หมายเลข #DW0001
            <SelectBox name="status" values={values} options={[
                    {
                        color: "orangeStatus",
                        name: STATUS_ORDERS_TYPE.DOING
                    },
                    {
                        color: "yellowStatus",
                        name: STATUS_ORDERS_TYPE.PRODUCTION
                    },
                    {
                        color: "blueStatus",
                        name: STATUS_ORDERS_TYPE.DELIVERY
                    },
                    {
                        color: "redStatus",
                        name: STATUS_ORDERS_TYPE.REFUND
                    },
                    {
                        color: "greenStatus",
                        name: STATUS_ORDERS_TYPE.REFUNDED
                    },
                    {
                        color: "greenStatus",
                        name: STATUS_ORDERS_TYPE.FINISH
                    }
                ]} />
                <button type="button" className={styles.btnWhite} onClick={() => alert(values.status)}>บันทึก</button>
            </p>

            <section className={styles.stepProgressBar}>
                <StepProgress stepIndex={selectStep} />
            </section>

            <section>
                <CardOrder />
            </section>

            <section className={styles.previewImage}>
                <PreviewImage />
            </section>

            <section className={styles.groupDeliveryPayment} style={{ border: '1px solid #009473' }}>
                <GroupDeliveryPayment />
            </section>

        </main >
    );
};

const EnhancedAdminOrderComponent = withFormik({
    mapPropsToValues: (props) => ({
        status: 0,
        massage: "",  //สำหรับ Chat Room
        orderNumber: "", //สำหรับค้นหาเลขที่ออเดอร์
        expandCard: 0, //สำหรับเลือกว่ากด Card ไหน

        orderID: [],
        status: [],
        itemsList: [],

        fetchMsg: false
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;

const SelectBox = ({ values, name, options }) => {
    return (
        <div className={styles.selectBox}>
            <div className={styles.selectBoxCurrent} tabindex="1">
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <div className={styles.selectBoxValue}>
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.name} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.name}` ? true : false} />
                            <p className={`${styles.selectBoxInputText} ${styles[list.color]}`}>{list.name}</p>
                        </div>
                    )
                })}

                <div className={styles.selectBoxValue}>
                    <Field name={name} type="radio" className={styles.selectBoxInput} value="0" id={`${name}-0`}
                        checked={`${values[name]}` === `${0}` ? true : false} />
                    <p className={styles.selectBoxInputText}>กรุณาเลือก...</p><IconArrow />
                </div>
            </div>
            <ul className={styles.selectBoxList}>
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <li>
                            <label className={`${styles.selectBoxOption} ${styles[list.color]}`} for={`${name}-${lastIndex}`}>{list.name}</label>
                        </li>
                    )
                })}
                <li>
                    <label className={styles.selectBoxOption} for={`${name}-0`}>กรุณาเลือก...</label>
                </li>
            </ul>
        </div>
    )
};
