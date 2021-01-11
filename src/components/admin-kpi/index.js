import React from "react";
import styles from './index.module.scss';
import { useHistory  } from "react-router-dom";

const AdminKpiComponent = (props) => {
    let history = useHistory();
    return (
        <>
            <main className={styles.containerKPI}>
                <article className={styles.cardOval}>
                    <p>คำสั่งซื้อ</p>
                    <h3>{props.kpi.order.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                </article>
                <article className={styles.cardOval}>
                    <p>ยอดขาย</p>
                    <h3>{props.kpi.sales.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                </article>
                <article className={styles.cardOval}>
                    <p>สมาชิก</p>
                    <h3>{props.kpi.member.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                </article>
            </main >
            <section>
                <button className={styles.buttonList} onClick={() => {history.push("/admin")}}>รายการคำสั่งซื้อ</button>
                <button className={styles.buttonList} onClick={() => {history.push("/admin/demo")}}>รายการขอตัวอย่าง</button>
                <button className={styles.buttonList} onClick={() => {history.push("/admin/customer")}}>รายการสมาชิก</button>
                <button className={styles.buttonList} onClick={() => {history.push("/admin/product")}}>รายการออเดอร์ และ รายการจัดส่ง</button>
            </section>
        </>
    );
};

export default AdminKpiComponent;