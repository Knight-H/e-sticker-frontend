import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { withFormik, useFormikContext, Field } from 'formik';
import axios from "axios";

import StepProgress from "../step_progress";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";
import { STATUS_ORDERS_TYPE } from '../constant-variable.js';

import { auth } from '../../firebase/index.js';
const ApproveLayoutComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(3);
    const [guestMode] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                let url = window.location.search;
                const urlParams = new URLSearchParams(url);
                let myID = urlParams.get('myID');
                axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders/${myID}`)
                    .then(res => {
                        console.log("res.data", res.data)
                        setFieldValue("myID", res.data.myID, false);

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
                        // props.history.push('/customize')
                    })
            }
        })
    }, []);


    // const searchOrderNumber = () => {
    //     let orderNumber = fakeAPI.find(orderNumber => `${orderNumber.orderNumber}` === `${values.orderNumber}`);
    //     if (orderNumber) {
    //         console.log("orderNumber", orderNumber)
    //         setFieldValue("orderID", orderNumber.orderNumber);
    //         setFieldValue("status", orderNumber.status);
    //         setFieldValue("itemsList", orderNumber.itemsList);
    //     }
    // };

    return (
        <main className={styles.wrapContent}>

            {/* {guestMode &&
                <>
                    <h1 className={styles.title}>ตรวจสอบสถานะออเดอร์</h1>
                    <p>หมายเลขออเดอร์</p>
                    <Field name="orderNumber" className={styles.inputGreen} />
                    <button type="button" className={styles.btnGreen} onClick={() => searchOrderNumber()}>ตรวจสอบสถานะ</button>
                </>
            } */}

            <h1 className={styles.title}>รายการออเดอร์</h1>
            <p>ออเดอร์หมายเลข #{values.orderID}
                <LabelSatus status={values.status} />
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

            <section className={styles.groupDeliveryPayment} style={guestMode ? { border: '1px solid #009473' } : {}}>
                <GroupDeliveryPayment />
            </section>
        </main >
    );
};

const EnhancedApproveLayoutComponent = withFormik({
    mapPropsToValues: (props) => ({
        orderNumber: '', //สำหรับค้นหาหมายเลขออเดอร์
        massage: '',  //สำหรับ Chat Room
        expandCard: 0, //สำหรับเลือกว่ากด Card ไหน

        orderID: '',
        status: '',
        itemsList: [],
    })
})(ApproveLayoutComponent);

export default EnhancedApproveLayoutComponent;

const LabelSatus = ({ status }) => {
    if (status === STATUS_ORDERS_TYPE.DOING) {
        return <label className={`${styles.labelStatus} ${styles.orangeStatus}`}>สถานะ: กำลังดำเนินการ</label>
    } else if (status === STATUS_ORDERS_TYPE.PRODUCTION) {
        return <label className={`${styles.labelStatus} ${styles.yellowStatus}`}>สถานะ: กำลังผลิตสินค้า</label>
    } else if (status === STATUS_ORDERS_TYPE.DELIVERY) {
        return <label className={`${styles.labelStatus} ${styles.blueStatus}`}>สถานะ: อยู่ระหว่างจัดส่ง</label>
    } else if (status === STATUS_ORDERS_TYPE.REFUND) {
        return <label className={`${styles.labelStatus} ${styles.redStatus}`}>สถานะ: ขอคืนเงิน</label>
    } else if (status === STATUS_ORDERS_TYPE.REFUNDED) {
        return <label className={`${styles.labelStatus} ${styles.greenStatus}`}>สถานะ: คืนเงินสำเร็จ</label>
    } else if (status === STATUS_ORDERS_TYPE.FINISH) {
        return <label className={`${styles.labelStatus} ${styles.greenStatus}`}>สถานะ: รายการสำเร็จ</label>
    } else {
        return <label></label>
    }
}
