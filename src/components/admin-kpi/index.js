import React, { useEffect, useState } from "react";
import styles from './index.module.scss';
import { useHistory  } from "react-router-dom";

import { axiosInst } from '../common-scss/common'

const AdminKpiComponent = (props) => {
    let history = useHistory();
    const [countCustomer, setCountCustomer] = useState('')
    const [countOrder, setCountOrder] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let totalPrice = 0;
        axiosInst.get("orders", {
            headers: {
              Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
            }
           }).then((res) => {
            setCountOrder(res.data.length)
            res.data.map((data) => {
                totalPrice = totalPrice + data.totalCost
            })
            setTotalPrice(totalPrice)
        }).catch((reason) => {
            console.log(reason)
        })
        axiosInst.get("customers", {
            headers: {
              Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
            }
           }).then((res) => {
            setCountCustomer(res.data.length)
        }).catch((reason) => {
            console.log(reason)
        })
    }, [])

    return (
        <>
            <main className={styles.containerKPI}>
                <article className={styles.cardOval}>
                    <p>คำสั่งซื้อ</p>
                    <h3>{countOrder.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                </article>
                <article className={styles.cardOval}>
                    <p>ยอดขาย</p>
                    <h3>{totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                </article>
                <article className={styles.cardOval}>
                    <p>สมาชิก</p>
                    <h3>{countCustomer.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h3>
                </article>
            </main >
            <section>
                <button className={styles.buttonList} onClick={() => {history.push("/admin")}}>รายการคำสั่งซื้อ</button>
                <button className={styles.buttonList} onClick={() => {history.push("/admin/demo")}}>รายการขอตัวอย่าง</button>
                <button className={styles.buttonList} onClick={() => {history.push("/admin/customer")}}>รายการสมาชิก</button>
                <button className={styles.buttonList} onClick={() => {history.push("/admin/product")}}>ตั้งค่าตัวเลือก</button>
            </section>
        </>
    );
};

export default AdminKpiComponent;