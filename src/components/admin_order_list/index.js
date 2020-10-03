import React from "react";
import AdminKpi from "../admin-kpi";
import styles from './index.module.scss';

const AdminTable = (props) => {
    return (
        <React.Fragment>
            <section className={styles.section1}>
                <AdminKpi kpi={{"order":10, "sales":1234567, "member": 1000}}/>
            </section>
            <section className={styles.section2}>
                <div className={`${styles.containerCol} ${styles.containerMargin}`}>
                    <h3>รายการคำสั่งซื้อ</h3>
                </div>
                <div className={`${styles.containerRow} ${styles.containerMargin}`}>
                    <div className={`${styles.statusAdmin} ${styles.statusDoing} ${styles.statusMargin}`}>
                        กำหนดการดำเนินการ - 500 รายการ
                    </div>
                    <div className={`${styles.statusAdmin} ${styles.statusDone} ${styles.statusMargin}`}>
                        เสร็จสิน - 500 รายการ
                    </div>
                    <div className={`${styles.statusAdmin} ${styles.statusCancel} ${styles.statusMargin}`}>
                        ยกเลิก - 10 รายการ
                    </div>

                    <div className={`${styles.statusAdmin} ${styles.statusNormal} ${styles.statusMargin}`}>
                        แสดงทั้งหมด
                    </div>


                    <select className={styles.inputAdmin}>
                        <option>มกราคม</option>
                        <option>กุมภาพันธ์</option>
                        <option>มีนาคม</option>
                        <option>เมษายน</option>
                        <option>พฤษภาคม</option>
                        <option>มิถุนายน</option>
                        <option>กรกฎาคม</option>
                        <option>สิงหาคม</option>
                        <option>กันยายน</option>
                        <option>ตุลาคม</option>
                        <option>พฤศจิกายน</option>
                        <option>ธันวาคม</option>
                    </select>

                    <input type="text" className={styles.inputAdmin} placeholder="ค้นหา"/>
                </div>
                
            </section>
            <div className={styles.adminTable}>
                <table>
                    <thead>
                        <tr>
                            <th>วันที่ออเดอร์</th>
                            <th>เลขออเดอร์</th>
                            <th>เลขสมาชิก</th>
                            <th>ช์่ิอ นามสกุล</th>
                            <th>เบอร์โทร</th>
                            <th>รายการสินค้า</th>
                            <th>ราคารวม</th>
                            <th>สถานนะ</th>
                            <th>เลขการที่จัดส่ง</th>
                            <th>ผู้รับผิดชอบ</th>
                            <th>จัดการ</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <td>20 july 2020</td>
                            <td>STK0001</td>
                            <td>MEM0001</td>
                            <td>นาย</td>
                            <td>0900000</td>
                            <td>6</td>
                            <td>5000</td>
                            <td>
                                <div className={`${styles.statusAdmin} ${styles.statusDoing} ${styles.statusCenter}`}>
                                    <div>กำหนดการดำเนินการ</div>
                                </div>
                            </td>
                            <td>fgrkeishf</td>
                            <td>นายa</td>
                            <td>จัดการ</td>
            
                        </tr>
                        <tr>
                            <td>20 july 2020</td>
                            <td>STK0002</td>
                            <td>MEM0002</td>
                            <td>นาย</td>
                            <td>0900000</td>
                            <td>6</td>
                            <td>5000</td>
                            <td>
                                <div className={`${styles.statusAdmin} ${styles.statusDone} ${styles.statusCenter}`}>
                                    <div>เสร็จสิน</div>
                                </div>
                            </td>
                            <td>fgrkeishf</td>
                            <td>นายb</td>
                            <td>จัดการ</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default AdminTable;