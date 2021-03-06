import React, { useEffect, useState } from "react";
import AdminKpi from "../admin-kpi";
import styles from './index.module.scss';
import fake_data from "./fake-api.json";
import { Link } from 'react-router-dom';
import { axiosInst } from '../common-scss/common'

const AdminDemoMTG = (props) => {

    const [datelist, setDataLIst] = useState([]);
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        axiosInst.get("demo").then((res) => {
            // console.log(res.data)
            setDataLIst(res.data);
            setLoading(false);
            setCheckUpdate(false)
        })
    }, [checkUpdate])

    const handleRemove = (index) => {
        // console.log(">>>>", datelist[index].myID)
        setLoading(true);
        axiosInst.delete(`demo/${datelist[index].myID}`)
            .then((res) => {
                console.log("res", res);
                setLoading(false);
                setCheckUpdate(true)
            }).catch((err) => {
                setLoading(false);
                console.log("err", err)
            })
    }

    return (
        <React.Fragment>
            <div class={`loader loader-default ${loading ? 'is-active' : ''}`}></div>
            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>
            <section className={styles.section2}>
                <div className={`${styles.containerCol} ${styles.containerMargin}`}>
                    <h3>รายการขอตัวอย่าง</h3>
                </div>
            </section>
            <div className={styles.adminTable}>
                <table>
                    <thead>
                        <tr>
                            <th>ชื่อ นามสกุล*</th>
                            <th>อีเมล*</th>
                            <th>ที่อยู่*</th>
                            <th>เบอร์โทรศัพท์*</th>
                            <th>แขวง*</th>
                            <th>เขต*</th>
                            <th>จังหวัด*</th>
                            <th>รหัสไปรษณีย์*</th>
                            {/* <th>สถานะ</th> */}
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datelist.map((data, index) => (
                            <tr>
                                <td>{data.fullname}</td>
                                <td>{data.email}</td>
                                <td>{data.shippingAddress.address}</td>
                                <td>{data?.phone}</td>
                                <td>{data?.shippingAddress.city}</td>
                                <td>{data?.shippingAddress.county}</td>
                                <td>{data?.shippingAddress.provice}</td>
                                <td>{data?.shippingAddress.zip}</td>
                                {/* <th>
                                    <select name="status" className={`${styles.selectStatus}`}>
                                        <option value="waitProcess" className={`${styles.statusCancel}`}>ยังไม่ได้ดำเนินการ</option>
                                        <option value="onProcess" className={`${styles.statusDoing}`}>กำลังดำเนินการ</option>
                                        <option value="successProcess" className={`${styles.statusDone}`}>ดำเนินการเสร็จสิ้น</option>
                                    </select>
                                </th> */}
                                <th><button type="button" className={styles.removeThisDemo} onClick={() => handleRemove(index)}>ลบ.</button></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default AdminDemoMTG;