import React, { useEffect, useState } from "react";
import AdminKpi from "../admin-kpi";
import styles from './index.module.scss';
import fake_data from "./fake-api.json";
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

const MemberListComponent = (props) => {
    const [loading, setLoading] = useState(false);
    // API [GET] /admin/
    var _apiData = fake_data;
    var statusFilter = {
        ALL: "แสดงทั้งหมด",
        ACTIVE: "ok",
        BAN: "notOk",
    }

    let countOrder = {
        ALL: 0,
        ACTIVE: 0,
        BAN: 0,
    }
    // var dateNow = new Date();
    // var monthNow = dateNow.getMonth();

    const [customerArr, setCustomerArr] = useState([])
    useEffect(() => {
        setLoading(true);
        axiosInst.get("customers").then((res) => {
            console.log(res.data[0])
            setLoading(false);
            setCustomerArr(res.data)
        })
    }, [])

    const [selectStatus, setSelectStatus] = useState(statusFilter.ALL);
    const [textSearch, setTextSearch] = useInputChange();
    const [selectMonth, setSelectMonth] = useInputChange(); //useState(monthNow))
    _apiData.data.map((dataObjectMapped, index) => {
        if (dataObjectMapped.status === statusFilter.ACTIVE) { countOrder.ACTIVE = countOrder.ACTIVE + 1; }
        else if (dataObjectMapped.status === statusFilter.BAN) { countOrder.BAN = countOrder.BAN + 1; }
        countOrder.ALL = countOrder.ALL + 1;
    })

    return (
        <React.Fragment>
            <div class={`loader loader-default ${loading ? 'is-active' : ''}`}></div>
            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>
            <section className={styles.section2}>
                <div className={`${styles.containerCol} ${styles.containerMargin}`}>
                    <h3>รายการสมาชิก</h3>
                </div>
                <div className={`${styles.containerRow} ${styles.containerMargin}`}>
                    <div className={`${styles.statusAdmin} ${styles.statusDone} ${styles.statusMargin} ${styles.divButton} ${`${selectStatus}` === `${statusFilter.DONE}` && styles.divButtonActive}`} onClick={() => setSelectStatus(statusFilter.ACTIVE)}>
                        ปกติ - {countOrder.DONE} รายการ
                    </div>
                    <div className={`${styles.statusAdmin} ${styles.statusCancel} ${styles.statusMargin} ${styles.divButton} ${`${selectStatus}` === `${statusFilter.CANCEL}` && styles.divButtonActive}`} onClick={() => setSelectStatus(statusFilter.BAN)}>
                         - {countOrder.CANCEL} รายการ
                    </div>
                    <div className={`${styles.statusAdmin} ${styles.statusNormal} ${styles.statusMargin} ${styles.divButton} ${`${selectStatus}` === `${statusFilter.ALL}` && styles.divButtonActive}`} onClick={() => setSelectStatus(statusFilter.ALL)}>
                        แสดงทั้งหมด
                    </div>

                    {/* <select name="month" className={styles.inputAdmin} onChange={setSelectMonth}>
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
                    </select> */}

                    <input type="text" name="search" className={styles.inputAdmin} placeholder="ค้นหา" onChange={setTextSearch} />
                </div>
            </section>
            <div className={styles.adminTable}>
                <table>
                    <thead>
                        <tr>
                            {/* <th>เลขที่สมาชิก</th> */}
                            <th>ชื่อ นามสกุล</th>
                            <th>เบอร์โทรศัพท์</th>
                            <th>อีเมล</th>
                            {/* <th>ใช้งานล่าสุด</th>
                            <th>ออเดอร์ล่าสุด</th>
                            <th>จำนวนสินค้่า</th>
                            <th>จำนวนออเดอร์</th>
                            <th>ยอดการสั่ง</th> */}
                            <th>สถานะ</th>
                            <th>Role</th>
                            <th>จัดการ</th>
                        </tr>
                        
                    </thead>
                    <tbody>{(() => {
                        if (!Array.isArray(customerArr)) return
                        return customerArr.map((dataObjectMapped) => {
                            let statusOrder = styles.statusCancel
                            console.log("dataObjectMapped.first_name", dataObjectMapped.first_name)

                            const fullname = dataObjectMapped.fullname || ''
                            let textSearchMatch = fullname.match(textSearch['search']);

                            if (dataObjectMapped.status === statusFilter.ACTIVE) { statusOrder = styles.statusDone; }
                            else if (dataObjectMapped.status === statusFilter.BAN) { statusOrder = styles.statusCancel; }

                            if ((selectStatus === dataObjectMapped.status || selectStatus == statusFilter.ALL) && (textSearchMatch !== null)) {
                                return (<tr>
                                    {/* <td>{dataObjectMapped.customerID}</td> */}
                                    <td>{dataObjectMapped.fullname}</td>
                                    <td>{dataObjectMapped.phone}</td>
                                    <td>{dataObjectMapped.email}</td>
                                    {/* <td>{dataObjectMapped?.last_login}</td>
                                    <td>{dataObjectMapped?.last_order}</td>
                                    <td>{dataObjectMapped?.amount_product}</td>
                                    <td>{dataObjectMapped?.amount_order}</td>
                                    <td>{dataObjectMapped?.total_order_price}</td> */}
                                    <td>
                                        <div className={`${styles.statusAdmin} ${styles.statusCenter} ${statusOrder}`}>
                                            {dataObjectMapped.status === "ok" ? "ปกติ" : "แบน"}
                                        </div>
                                    </td>
                                    <td>{dataObjectMapped.isAdmin === "true" ? "ผู้ดูแล" : "สมาชิก"}</td>
                                    <td>
                                        <Link to={"/admin/member" + "?user_id=" + dataObjectMapped.customerID}>จัดการ</Link>
                                    </td>
                                </tr>)
                            }
                        })
                    })()}</tbody>

                    {/* <tbody>
                        {
                            _apiData.data.map((dataObjectMapped, index) => {
                                var statusOrder = styles.statusCancel;
                                console.log("dataObjectMapped.first_name", dataObjectMapped.first_name)
                                var textSearchMatch = dataObjectMapped.first_name.match(textSearch['search']);

                                if (dataObjectMapped.status === statusFilter.ACTIVE) { statusOrder = styles.statusDone; }
                                else if (dataObjectMapped.status === statusFilter.BAN) { statusOrder = styles.statusCancel; }

                                if ((selectStatus === dataObjectMapped.status || selectStatus == statusFilter.ALL) && (textSearchMatch !== null))
                                 return (
                                    <tr>
                                        <td>{dataObjectMapped.user_id}</td>
                                        <td>{dataObjectMapped.first_name} {dataObjectMapped.last_name}</td>
                                        <td>{dataObjectMapped.phone}</td>
                                        <td>{dataObjectMapped.email}</td>
                                        <td>{dataObjectMapped.last_login}</td>
                                        <td>{dataObjectMapped.last_order}</td>
                                        <td>{dataObjectMapped.amount_product}</td>
                                        <td>{dataObjectMapped.amount_order}</td>
                                        <td>{dataObjectMapped.total_order_price}</td>
                                        <td>
                                            <div className={`${styles.statusAdmin} ${styles.statusCenter} ${statusOrder}`}>
                                                {dataObjectMapped.status}
                                            </div>
                                        </td>
                                        <td>
                                            <Link to={"/admin/member" + "?user_id=" + dataObjectMapped.user_id}>{dataObjectMapped.organize}</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody> */}
                </table>
            </div>
        </React.Fragment>
    );
};

export default MemberListComponent;