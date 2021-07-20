import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import axios from "axios";
import { auth } from "../../firebase/index";

import MessageImage from './checkbox.png';

const Order1ProductConfigComponent = (props) => {
    const [orderIDLast, setOrderIDLast] = useState("");
    const [myID, setMyID] = useState("");

    useEffect(() => {
        var orderIDLast = localStorage.getItem("orderIDLast");
        setOrderIDLast(orderIDLast);
        localStorage.removeItem("cart")
    }, []);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
              axios
                .get(
                  `https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders?customerID=${user.uid}`, {
                    headers: {
                      Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
                    }
                   }
                )
                .then((res) => {
                  const OrderMatch = res.data.find((ele) => { return ele.orderID === localStorage.getItem("orderIDLast")})
                  console.log('OrderMatch', OrderMatch)
                  if (OrderMatch) {
                    setMyID(OrderMatch.myID)
                  }
                })
                .catch(function (err) {
                  console.log("err", err);
                });
            }
          });
    }, [])

    return (
        <main>
            <div className={styles.centerImg}>
                <h2>หมายเลขออเดอร์ของคุณคือ {orderIDLast}</h2>
                <p>กรุณาบันทึกเลข Order สำหรับติดตามสถานะ</p>
                <img alt="." src={MessageImage} width="300" />
                <button className={styles.btnToMyorder} onClick={() => {
                    props.history.push(`/myorder/${myID}`)
                }}>ดูคำสั่งซื้อ</button>
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;