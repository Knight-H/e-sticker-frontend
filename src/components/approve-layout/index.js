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
import firebaseApp from '../../firebase/index.js';
const ApproveLayoutComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();
    const [selectStep, setSelectStep] = useState(3);
    const [guestMode, setGuestMode] = useState(false);
    const [catchOrders, setCatchOrders] = useState([]);
    const [notFound, setNotFound] = useState(true);

    useEffect(() => {
        setFieldValue("loading", true, false);
        auth.onAuthStateChanged(user => {
            if (user) {
                var pathArray = window.location.pathname.split('/');
                var myID = pathArray[2];
                // console.log("myID", myID)
                if (!myID) {
                    // props.history.push('/customize');
                    setGuestMode(true)
                    axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders`)
                        .then(res => {
                            console.log("res.data", res.data)
                            setFieldValue("allOrder", res.data, false);
                            setFieldValue("fetchMsg", false, false);
                            setFieldValue("loading", false, false);
                            searchOrderNumber();
                        }).catch(function (err) {
                            console.log("err", err)
                            setFieldValue("loading", false, false);
                        })
                } else {
                    axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders/${myID}`)
                        .then(res => {
                            console.log("res.data", res.data)
                            setFieldValue("fullFetchData", res.data, false);

                            setFieldValue("myID", myID, false);

                            setFieldValue("orderID", res.data.orderID, false);
                            setFieldValue("status", res.data.status, false);
                            setFieldValue("itemsList", res.data.itemsList, false);
                            setFieldValue("shippingAddress", res.data.shippingAddress, false);
                            setFieldValue("shippingNumber", res.data.shippingNumber, false);

                            setFieldValue("shippingCourier", res.data.shippingCourier, false);
                            setFieldValue("itemsCost", res.data.itemsCost, false);
                            setFieldValue("shippingCost", res.data.shippingCost, false);
                            setFieldValue("vatCost", res.data.vatCost, false);
                            setFieldValue("totalCost", res.data.totalCost, false);
                            setFieldValue("paymentMethod", res.data.paymentMethod, false);
                            setFieldValue("paymentStatus", res.data.paymentStatus, false);
                            setFieldValue("paymentConfirm", res.data.paymentConfirm, false);
                            setFieldValue("fetchMsg", false, false);
                            setFieldValue("loading", false, false);
                        }).catch(function (err) {
                            console.log("err", err)
                            setFieldValue("loading", false, false);
                        })
                }
            } else {
                setGuestMode(true)
                axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders`)
                    .then(res => {
                        console.log("res.data", res.data)
                        setFieldValue("allOrder", res.data, false);
                        setFieldValue("fetchMsg", false, false);
                        setFieldValue("loading", false, false);
                        searchOrderNumber();
                    }).catch(function (err) {
                        console.log("err", err)
                        setFieldValue("loading", false, false);
                    })
            }
        })
    }, [values.fetchMsg]);

    const searchOrderNumber = () => {
        let orderNumber = values.allOrder.find(orderNumber => `${orderNumber.orderID}` === `${values.orderNumber}`);
        if (orderNumber) {
            // console.log("orderNumber", orderNumber)
            setFieldValue("myID", orderNumber.myID, false);

            setFieldValue("orderID", orderNumber.orderID, false);
            setFieldValue("status", orderNumber.status, false);
            setFieldValue("itemsList", orderNumber.itemsList, false);
            setFieldValue("shippingAddress", orderNumber.shippingAddress, false);
            setFieldValue("shippingNumber", orderNumber.shippingNumber, false);

            setFieldValue("shippingCourier", orderNumber.shippingCourier, false);
            setFieldValue("itemsCost", orderNumber.itemsCost, false);
            setFieldValue("shippingCost", orderNumber.shippingCost, false);
            setFieldValue("vatCost", orderNumber.vatCost, false);
            setFieldValue("totalCost", orderNumber.totalCost, false);
            setFieldValue("paymentMethod", orderNumber.paymentMethod, false);
            setFieldValue("paymentStatus", orderNumber.paymentStatus, false);
            setFieldValue("paymentConfirm", orderNumber.paymentConfirm, false);
            setCatchOrders([])
        } else if (values.orderNumber) {
            let catchID = values.allOrder.filter(orderNumber => {
                return orderNumber.orderID.search(values.orderNumber) > -1
            });

            if (catchID.length > 0) {
                setCatchOrders(catchID)
            } else {
                setCatchOrders(catchID)
                setNotFound(false)
            }
        }
    };

    useEffect(() => {
        if (values.status === "รายการสำเร็จ" || values.status === "คืนเงินสำเร็จ") {
            setSelectStep(4)
        }
    }, [values.status])

    return (
        <main className={styles.wrapContent}>
            <div class={`loader loader-default ${values.loading ? 'is-active' : ''}`}></div>
            {guestMode &&
                <>
                    <h1 className={styles.title}>ตรวจสอบสถานะออเดอร์</h1>
                    <p>หมายเลขออเดอร์</p>
                    <Field name="orderNumber" className={styles.inputGreen} />
                    <button type="button" className={styles.btnGreen} onClick={() => searchOrderNumber()}>ตรวจสอบสถานะ</button>
                </>
            }
            {
                !notFound &&
                <p style={{ margin: "5px 0", color: "orange" }}>ไม่พบรายการที่ใกล้เคียง</p>
            }
            {
                catchOrders.length >= 1 &&
                <p>หมายเลขออเดอร์ที่ใกล้เคียง</p>
            }
            {
                catchOrders.length >= 1 && catchOrders.map((data, index) => {
                    if (index <= 4) {
                        return <p style={{ margin: "5px 0", color: "orange" }}>{data.orderID}</p>
                    }
                })

            }

            {values.orderID ?
                <>
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

                    {
                        values.paymentConfirm.length !== 0 &&
                        <section className={styles.groupSlipPayment}>
                            <h3>การแจ้งการชำระเงิน</h3>

                            <div className={styles.flexRow}>
                                {values.paymentConfirm.map((data, index) => {
                                    return (
                                        <acticle className={styles.cardSlip}>
                                            <p>ชื่อ นามสกุล*: {data.name}</p>
                                            <p>เบอร์โทรศัพท์*: {data.phone}</p>
                                            <p>ยอดชำระเงิน: {data.amount}</p>
                                            <p>ธนาคารที่โอน: {data.bank}</p>
                                            <p>วันที่โอน: {data.date}</p>
                                            <p>เวลา: {data.time}</p>
                                            <p>สลิปการโอนเงิน:  <a className={styles.dowloadFileMsg} href={data.photo} downloadFile>ดาวน์โหลด.</a></p>
                                        </acticle>
                                    )
                                })}
                            </div>
                        </section>
                    }
                </>
                :
                ""
            }

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

        paymentConfirm: [],
        allOrder: [],
        fetchMsg: false,

        // modal bank
        name: null,
        phone: null,
        bank: null,
        date: null,
        time: null,
        photo: null,
        amount: null,
        isCheckphoto: 0,
        isAdmin: false,

        waitProcess: false,
        loading: false
    }),
    validate: values => {
        const errors = {};
        if (!values.name) {
            errors.name = "*กรุณาระบุ"
        }
        if (!values.phone) {
            errors.phone = "*กรุณาระบุ"
        }
        if (!/^\d+$/.test(values.phone)) {
            errors.phone = "*ต้องเป็นตัวเลข 0-9"
        }
        if (!values.bank) {
            errors.bank = "*กรุณาระบุ"
        }
        if (!values.date) {
            errors.date = "*กรุณาระบุ"
        }
        if (!values.time) {
            errors.time = "*กรุณาระบุ"
        }
        if (!values.photo) {
            errors.photo = "*กรุณาระบุ"
        }
        if (!values.amount) {
            errors.amount = "*กรุณาระบุ"
        }

        return errors;
    },
    handleSubmit: (values, { setFieldValue, props }) => {
        setFieldValue("waitProcess", true, false);
        setFieldValue("loading", true, false);
        const storageRef = firebaseApp.storage().ref();
        let timeStamp = new Date().toISOString().slice(0, 10)

        let cloneFullFetchData = { ...values.fullFetchData };

        auth.onAuthStateChanged(user => {
            if (user) {// User is signed in.
                storageRef.child(`${user.uid}/${timeStamp}-${values.photo.name}`).put(values.photo)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            let newData = {
                                name: values.name,
                                phone: values.phone,
                                bank: values.bank,
                                date: values.date,
                                time: values.time,
                                photo: url,
                                amount: values.amount,
                            }
                            cloneFullFetchData.paymentConfirm = [...cloneFullFetchData.paymentConfirm, newData];
                            // console.log("cloneFullFetchData", cloneFullFetchData)

                            axios.put(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders/${cloneFullFetchData.id}`, cloneFullFetchData)
                                .then(res => {
                                    console.log("res", res)
                                    setFieldValue("fetchMsg", true, false)
                                    setFieldValue("name", '', false)
                                    setFieldValue("bank", '', false)
                                    setFieldValue("phone", '', false)
                                    setFieldValue("photo", '', false)
                                    setFieldValue("date", '', false)
                                    setFieldValue("time", '', false)
                                    setFieldValue("amount", '', false)
                                    setFieldValue("waitProcess", false, false);
                                    setFieldValue("loading", false, false);
                                })
                                .catch(err => {
                                    console.log("err", err)
                                    setFieldValue("loading", false, false);
                                    setFieldValue("waitProcess", false, false);
                                });

                        });
                    });
            }
        })
    }
})(ApproveLayoutComponent);

export default EnhancedApproveLayoutComponent;

const LabelSatus = ({ status }) => {
    if (status === STATUS_ORDERS_TYPE.DOING) {
        return <label className={`${styles.labelStatus} ${styles.orangeStatus}`}>สถานะ: กำลังดำเนินการ</label>
    } else if (status === STATUS_ORDERS_TYPE.WAIT_PAYMENT) {
        return <label className={`${styles.labelStatus} ${styles.navyStatus}`}>สถานะ: รอชำระเงิน</label>
    }  else if (status === STATUS_ORDERS_TYPE.PRODUCTION) {
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
