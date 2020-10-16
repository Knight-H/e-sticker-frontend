import React from "react";
import styles from './index.module.scss';

const AdminKpiComponent = (props) => {
    return (
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
    );
};

export default AdminKpiComponent;