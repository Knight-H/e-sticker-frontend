import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { useFormikContext } from 'formik';

import MessageImage from './checkbox.png';

const Order1ProductConfigComponent = (props) => {
    const [orderIDLast, setOrderIDLast] = useState("");

    useEffect(() => {
        var orderIDLast = localStorage.getItem("orderIDLast");
        setOrderIDLast(orderIDLast);
      }, []);

    return (
        <main>
            <div className={styles.centerImg}>
                <h2>หมายเลขออเดอร์ของคุณคือ {orderIDLast}</h2>
                <img src={MessageImage} width="300" />
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;