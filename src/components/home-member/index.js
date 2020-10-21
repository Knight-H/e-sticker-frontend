import React, { useEffect } from "react";
import styles from './index.module.scss';
import axios from "axios";

import { ReactComponent as Circle } from '../approve-layout/circle.svg';
import { ReactComponent as IconPhone } from './icon-phone.svg';
import { ReactComponent as IconUser } from './icon-user.svg';
import { ReactComponent as IconLogout } from './icon-logout.svg';
import { withFormik } from 'formik';
import { useFormikContext } from 'formik';
import { STATUS_ORDERS_TYPE } from '../constant-variable.js';
import { auth } from '../../firebase/index'
import { axiosInst } from '../common-scss/common'

const LabelSatus = ({ status }) => {
    if (status === STATUS_ORDERS_TYPE.DOING) {
        return <label className={`${styles.statusLabel} ${styles.orangeLabel}`}>สถานะ: กำลังดำเนินการ</label>
    } else if (status === STATUS_ORDERS_TYPE.PRODUCTION) {
        return <label className={`${styles.statusLabel} ${styles.yellowStatus}`}>สถานะ: กำลังผลิตสินค้า</label>
    } else if (status === STATUS_ORDERS_TYPE.DELIVERY) {
        return <label className={`${styles.statusLabel} ${styles.blueStatus}`}>สถานะ: อยู่ระหว่างจัดส่ง</label>
    } else if (status === STATUS_ORDERS_TYPE.REFUND) {
        return <label className={`${styles.statusLabel} ${styles.redStatus}`}>สถานะ: ขอคืนเงิน</label>
    } else if (status === STATUS_ORDERS_TYPE.REFUNDED) {
        return <label className={`${styles.statusLabel} ${styles.greenStatus}`}>สถานะ: คืนเงินสำเร็จ</label>
    } else if (status === STATUS_ORDERS_TYPE.FINISH) {
        return <label className={`${styles.statusLabel} ${styles.greenStatus}`}>สถานะ: รายการสำเร็จ</label>
    }
}

const HomeMemberComponent = (props) => {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                axios.get(`https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders?customerID=${user.uid}`)
                    .then(res => {
                        console.log("res.data[0]", res.data)
                        setFieldValue("objectOrder", res.data, false);
                    }).catch(function (err) {
                        console.log("err", err)
                    })

                // IF Login fetch address
                axiosInst.get("customers", {
                    params: {
                        customerID: auth.currentUser.uid
                    }
                }).then((res) => {
                    // Temporary for filtering the customer data
                    const customerInfo = res.data.filter((data) => {
                        return data["customerID"] === auth.currentUser.uid
                    })[0]
                    setFieldValue("fullname", customerInfo.fullname, false);
                })
            }
        })
    }, []);

    return (
        <main className={styles.wrapContent}>
            <h1 className={styles.title}>รายการออเดอร์</h1>

            <p className={styles.details}>สวัสดีคุณ  {values.fullname}  เลือกเมนูการใช้งานได้เลยค่ะ</p>
            {/* <p className={styles.details}>หมายเลขสมาชิก MEM0001</p> */}

            <br />

            <label className={styles.greenLabel}><IconPhone />ดูคำสั่งซื้อ</label>
            <label className={styles.greenLabel} onClick={() => { props.history.push("/member/setting") }}><IconUser />จัดการบัญชี</label>
            <label className={styles.greenLabel} onClick={() => {
                auth.signOut()
                props.history.push("/")
            }}><IconLogout />ออกจากระบบ</label>

            <section className={styles.container}>

                {values.objectOrder.map((fakeAPI) => {
                    if (fakeAPI) {
                        return (
                            <article className={styles.borderCard}>
                                <h1 className={styles.title}>ออเดอร์หมายเลข {fakeAPI.orderID}</h1>
                                <LabelSatus status={fakeAPI.shippingStatus} />
                                <table>
                                    {fakeAPI.itemsList && fakeAPI.itemsList.map((list) => (
                                        <tr>
                                            <td className={styles.iconCol}><Circle /></td>
                                            <td className={styles.detailCol}>
                                                <h4>{list.shape}</h4>
                                                <p>{list.material} - {list.coat} - {list.cutting} - ขนาด {list.width}x{list.height} mm.</p>
                                            </td>
                                            <td className={styles.qtyCol}><p>{list.units}ชิ้น</p></td>
                                            <td className={styles.priceCol}><p>{list.price}฿</p></td>
                                        </tr>
                                    ))}
                                </table>

                                <button type="button" onClick={() => props.history.push(`/myorder?orderID=${fakeAPI.orderID}`)}>ดูรายละเอียด</button>
                            </article>
                        )
                    }
                })}

            </section>
        </main>
    )
}

const EnhancedHomeMemberComponentComponent = withFormik({
    mapPropsToValues: (props) => ({
        objectOrder: []
    })
})(HomeMemberComponent);

export default EnhancedHomeMemberComponentComponent;