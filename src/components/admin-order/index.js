import React, { useState, useEffect } from "react";
import { withFormik, useFormikContext, Field } from 'formik';
import styles from './index.module.scss';
import axios from "axios";

import StepProgress from "../step_progress";
import AdminKpi from "../admin-kpi";
import CardOrder from "../card-order";
import PreviewImage from "../preview-image";
import GroupDeliveryPayment from "../group-delivery-payment";

import { ReactComponent as IconArrow } from '../upload-file/icon-arrow.svg';

const AdminOrderComponent = () => {
    const { values, setFieldValue } = useFormikContext();
    const [selectStep] = useState(3);

    useEffect(() => {
        axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders`)
          .then(res => {
            console.log("res.data[0]", res.data[0])
            setFieldValue("orderID", res.data[0].orderID, false);
            setFieldValue("status", res.data[0].status, false);
            setFieldValue("itemsList", res.data[0].itemsList, false);
            setFieldValue("shippingAddress", res.data[0].shippingAddress, false);

            setFieldValue("shippingCourier", res.data[0].shippingCourier, false);
            setFieldValue("itemsCost", res.data[0].itemsCost, false);
            setFieldValue("shippingCost", res.data[0].shippingCost, false);
            setFieldValue("vatCost", res.data[0].vatCost, false);
            setFieldValue("totalCost", res.data[0].totalCost, false);
          }).catch(function (err) {
            console.log("err", err)
          })
      }, []);

    return (
        <main className={styles.wrapContent}>

            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <h1 className={styles.title}>รายการออเดอร์</h1>
            <p>ออเดอร์หมายเลข #DW0001
            <SelectBox name="editStatus" values={values} options={[
                    {
                        color: "orangeStatus",
                        value: "1",
                        name: "รอการอนุมัติแบบ"
                    },
                    {
                        color: "yellowStatus",
                        value: "2",
                        name: "กำลังผลิตสินค้า"
                    },
                    {
                        color: "blueStatus",
                        value: "3",
                        name: "อยู่ระหว่างจัดส่ง"
                    },
                    {
                        color: "redStatus",
                        value: "4",
                        name: "ขอคืนเงิน"
                    },
                    {
                        color: "greenStatus",
                        value: "5",
                        name: "คืนเงินสำเร็จ"
                    },
                    {
                        color: "greenStatus",
                        value: "6",
                        name: "รายการสำเร็จ"
                    }
                ]} />
                <button type="button" className={styles.btnWhite} onClick={() => alert(values.editStatus)}>บันทึก</button>
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
        editStatus: fakeAPI[0].status,
        massage: "",  //สำหรับ Chat Room
        orderNumber: "", //สำหรับค้นหาเลขที่ออเดอร์
        expandCard: 0, //สำหรับเลือกว่ากด Card ไหน

        orderID: fakeAPI[0].orderID,
        status: fakeAPI[0].status,
        itemsList: fakeAPI[0].itemsList,
    })
})(AdminOrderComponent);

export default EnhancedAdminOrderComponent;

const fakeAPI = [
    {
        orderNumber: "DW0001",
        status: 1,
        // image: ???
        itemsList: [
            {
                orderID: "ITM00001",
                shape: 'สติกเกอร์แบบกลม',
                material: 'กระดาษอาร์ต',
                coat: 'เคลือบด้าน',
                cutting: 'กินเนื้อ 1 มม.',
                width: '10',
                height: '20',
                units: '300',
                price: '500',
                status: 1,

                messages: [
                    {
                        type: "text",
                        content: "สวัสดีครับ",
                        info: "",
                        by: "ลูกค้า"

                    },
                    {
                        type: "text",
                        content: "สวัสดีครับ",
                        info: "",
                        by: "พนักงาน"

                    },
                    {
                        type: "text",
                        content: "เด่วจะส่งแบบให้นะครับ",
                        info: "",
                        by: "ลูกค้า"

                    }
                ]
            }
        ]
    }
]


const SelectBox = ({ values, name, options }) => {
    return (
        <div className={styles.selectBox}>
            <div className={styles.selectBoxCurrent} tabindex="1">
                {options.map((list, index) => {
                    let lastIndex = index + 1;
                    return (
                        <div className={styles.selectBoxValue}>
                            <Field name={name} type="radio" className={styles.selectBoxInput} value={list.value} id={`${name}-${lastIndex}`}
                                checked={`${values[name]}` === `${list.value}` ? true : false} />
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