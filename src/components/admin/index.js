import React, { useEffect, useState } from "react";
import AdminKpi from "../admin-kpi";
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

import { axiosInst } from '../common-scss/common'

const useInputChange = () => {
    const [input, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    return [input, handleInputChange]
}

const AdminComponent = (props) => {
    var statusFilter = {
        ALL: "แสดงทั้งหมด",
        DOING: "กำลังดำเนินการ",
        PRODUCING: "กำลังผลิตสินค้า",
        DILIVERING: "อยู่ระหว่างจัดส่ง",
        REFUN: "ขอเงินคืน",
        DONE_REFUN: "คืนเงินสำเร็จ",
        DONE: "เสร็จสิ้น",
        CANCEL: "ยกเลิก"
    }

    let countOrder = {
        ALL: 0,
        DOING: 0,
        DONE: 0,
        CANCEL: 0
    }

    const [selectStatus, setSelectStatus] = useState(statusFilter.ALL);
    const [textSearch, setTextSearch] = useInputChange();
    const [selectMonth, setSelectMonth] = useInputChange(); //useState(monthNow))
    // console.log("selectMonth", selectMonth)

    const [orderData, setOrderData] = useState(null)
    useEffect(() => {
        axiosInst.get("orders").then((res) => {
            setOrderData(res.data)
        }).catch((reason) => {
            console.log(reason)
        })
    }, [])


    if (Array.isArray(orderData)) {
        orderData.map((dataObjectMapped) => {
            if (dataObjectMapped.status === statusFilter.DONE || dataObjectMapped.status === statusFilter.DONE_REFUN) { countOrder.DONE = countOrder.DONE + 1; }
            else if (dataObjectMapped.status === statusFilter.DOING || dataObjectMapped.status === statusFilter.PRODUCING || dataObjectMapped.status === statusFilter.DILIVERING) { countOrder.DOING = countOrder.DOING + 1; }
            else if (dataObjectMapped.status === statusFilter.CANCEL || dataObjectMapped.status === statusFilter.REFUN) { countOrder.CANCEL = countOrder.CANCEL + 1; }
            countOrder.ALL = countOrder.ALL + 1;
            return null;
        })
    }
    console.log("orderData", orderData)
    return (
        <React.Fragment>
            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>
            <section className={styles.section2}>
                <div className={`${styles.containerCol} ${styles.containerMargin}`}>
                    <h3>รายการคำสั่งซื้อ</h3>
                </div>
                <div className={`${styles.containerRow} ${styles.containerMargin}`}>
                    <div className={`${styles.statusAdmin} ${styles.statusDoing} ${styles.statusMargin} ${styles.divButton} ${`${selectStatus}` === `${statusFilter.DOING}` && styles.divButtonActive}`} onClick={() => setSelectStatus(statusFilter.DOING)}>
                        กำลังดำเนินการ - {countOrder.DOING} รายการ
                    </div>
                    <div className={`${styles.statusAdmin} ${styles.statusDone} ${styles.statusMargin} ${styles.divButton} ${`${selectStatus}` === `${statusFilter.DONE}` && styles.divButtonActive}`} onClick={() => setSelectStatus(statusFilter.DONE)}>
                        เสร็จสิ้น - {countOrder.DONE} รายการ
                    </div>
                    <div className={`${styles.statusAdmin} ${styles.statusCancel} ${styles.statusMargin} ${styles.divButton} ${`${selectStatus}` === `${statusFilter.CANCEL}` && styles.divButtonActive}`} onClick={() => setSelectStatus(statusFilter.CANCEL)}>
                        ยกเลิก - {countOrder.CANCEL} รายการ
                    </div>
                    <div className={`${styles.statusAdmin} ${styles.statusNormal} ${styles.statusMargin} ${styles.divButton} ${`${selectStatus}` === `${statusFilter.ALL}` && styles.divButtonActive}`} onClick={() => setSelectStatus(statusFilter.ALL)}>
                        แสดงทั้งหมด
                    </div>

                    <select name="month" className={styles.inputAdmin} onChange={setSelectMonth}>
                        <option value="1">มกราคม</option>
                        <option value="2">กุมภาพันธ์</option>
                        <option value="3">มีนาคม</option>
                        <option value="4">เมษายน</option>
                        <option value="5">พฤษภาคม</option>
                        <option value="6">มิถุนายน</option>
                        <option value="7">กรกฎาคม</option>
                        <option value="8">สิงหาคม</option>
                        <option value="9">กันยายน</option>
                        <option value="10">ตุลาคม</option>
                        <option value="11">พฤศจิกายน</option>
                        <option value="12">ธันวาคม</option>
                    </select>

                    <input type="text" name="search" className={styles.inputAdmin} placeholder="ค้นหา" onChange={setTextSearch} />
                </div>
            </section>
            <div className={styles.adminTable}>
                <table>
                    <thead>
                        <tr>
                            <th>วันที่ออเดอร์</th>
                            <th>เลขออเดอร์</th>
                            {/* <th>เลขสมาชิก</th> */}
                            <th>ชื่อ นามสกุล</th>
                            <th>เบอร์โทรศัพท์</th>
                            <th>รายการสินค้า</th>
                            <th>ราคารวม</th>
                            <th>สถานนะ</th>
                            <th>เลขการที่จัดส่ง</th>
                            <th>ผู้รับผิดชอบ</th>
                            <th>จัดการ</th>
                        </tr>

                    </thead>
                    <tbody>{(() => {
                        if (orderData === null) return
                        return orderData.map((dataObjectMapped) => {
                            // console.log(dataObjectMapped)
                            if (dataObjectMapped.orderID) {
                                var statusOrder = styles.statusCancel;
                                var textSearchMatch = dataObjectMapped.orderID.match(textSearch['search']);

                                if (dataObjectMapped.status === statusFilter.DONE || dataObjectMapped.status === statusFilter.DONE_REFUN) { statusOrder = styles.statusDone; }
                                else if (dataObjectMapped.status === statusFilter.DOING || dataObjectMapped.status === statusFilter.PRODUCING || dataObjectMapped.status === statusFilter.DILIVERING) { statusOrder = styles.statusDoing; }
                                else if (dataObjectMapped.status === statusFilter.CANCEL || dataObjectMapped.status === statusFilter.REFUN) { statusOrder = styles.statusCancel; }

                                if ((selectStatus === dataObjectMapped.status || selectStatus === statusFilter.ALL) && (textSearchMatch !== null)) {
                                    // console.log("hi", dataObjectMapped)
                                    return (
                                        <tr key={dataObjectMapped.orderID}>
                                            <td>{dataObjectMapped.timestamp}</td>
                                            <td>{dataObjectMapped.orderID}</td>
                                            {/* <td>{dataObjectMapped.customerID}</td> */}
                                            <td>{dataObjectMapped.shippingAddress.fullname}</td>
                                            <td>{dataObjectMapped?.shippingAddress.phone}</td>
                                            <td>{dataObjectMapped?.itemsList?.length || 0}</td>
                                            <td>{dataObjectMapped.totalCost}</td>
                                            <td>
                                                <div className={`${styles.statusAdmin} ${styles.statusCenter} ${statusOrder}`}>
                                                    {dataObjectMapped.status}
                                                </div>
                                            </td>
                                            <td>{dataObjectMapped.shippingNumber}</td>
                                            <td>{dataObjectMapped?.reposiable_name}</td>
                                            <td><Link to={"/admin/myorder/" + dataObjectMapped.myID}>จัดการ</Link></td>
                                        </tr>
                                    )
                                }
                                else {
                                    return null
                                }
                            } else {
                                return null
                            }
                        })
                    })()}</tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default AdminComponent;