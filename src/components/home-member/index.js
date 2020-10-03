import React, { useEffect } from "react";
import styles from './index.module.scss';

import { ReactComponent as Circle } from '../approve-layout/circle.svg';
import { ReactComponent as IconPhone } from './icon-phone.svg';
import { ReactComponent as IconUser } from './icon-user.svg';
import { ReactComponent as IconLogout } from './icon-logout.svg';
import { withFormik } from 'formik';
import { useFormikContext } from 'formik';

const LabelSatus = ({status}) => {
    if (status === 1) {
        return <label className={styles.orangeLabel}>สถานะ: กำลังดำเนินการ</label>
    } else if (status === 2) {
        return <label className={`${styles.orangeLabel} ${styles.yellowStatus}`}>สถานะ: กำลังผลิตสินค้า</label>
    } else if (status === 3) {
        return <label className={`${styles.orangeLabel} ${styles.blueStatus}`}>สถานะ: อยู่ระหว่างจัดส่ง</label>
    } else if (status === 4) {
        return <label className={`${styles.orangeLabel} ${styles.redStatus}`}>สถานะ: ขอคืนเงิน</label>
    } else if (status === 5) {
        return <label className={`${styles.orangeLabel} ${styles.greenStatus}`}>สถานะ: คืนเงินสำเร็จ</label>
    } else if (status === 6) {
        return <label className={`${styles.orangeLabel} ${styles.greenStatus}`}>สถานะ: รายการสำเร็จ</label>
    }
}


const HomeMemberComponent = (props) => {
    const { values, errors, touched, setFieldValue, validateField } = useFormikContext();

    useEffect(() => {
        setFieldValue("objectOrder", fakeAPI, false)
    })

    return (
        <main className={styles.wrapContent}>
            <h1 className={styles.title}>รายการออเดอร์</h1>

            <p className={styles.details}>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</p>
            <p className={styles.details}>หมายเลขสมาชิก MEM0001</p>

            <br />

            <label className={styles.greenLabel}><IconPhone />ดูคำสั่งซื้อ</label>
            <label className={styles.greenLabel}><IconUser />จัดการบัญชี</label>
            <label className={styles.greenLabel}><IconLogout />ออกจากระบบ</label>

            <section className={styles.contain}>

                {values.objectOrder.map((fakeAPI) => {
                    return (
                        <article className={styles.borderCard}>
                            <h1 className={styles.title}>ออเดอร์หมายเลข {fakeAPI.orderNumber}</h1>
                            <LabelSatus status={fakeAPI.statusOrder}/>
                            <table>
                                {fakeAPI.listOrder.map((list) => (
                                    <tr>
                                    <td className={styles.iconCol}><Circle /></td>
                                    <td className={styles.detailCol}>
                                        <h4>{list.titalStriker}</h4>
                                        <p>{list.detailStriker}</p>
                                    </td>
                                    <td className={styles.qtyCol}><p>{list.qtyStriker}ชิ้น</p></td>
                                    <td className={styles.priceCol}><p>{list.priceStriker}฿</p></td>
                                </tr>
                                ))}
                            </table>

                            <button type="button">ดูรายละเอียด</button>
                        </article>
                    )
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


const fakeAPI = [
    {
        orderNumber: "#DW0001",
        statusOrder: 1,
        // image: ???
        listOrder: [
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            },
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            },
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            }
        ]
    },
    {
        orderNumber: "#DW0002",
        statusOrder: 2,
        // image: ???
        listOrder: [
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            }
        ]
    },
    {
        orderNumber: "#DW0003",
        statusOrder: 3,
        // image: ???
        listOrder: [
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            }
        ]
    },
    {
        orderNumber: "#DW0004",
        statusOrder: 4,
        // image: ???
        listOrder: [
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            },
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            }
        ]
    },
    {
        orderNumber: "#DW0005",
        statusOrder: 5,
        // image: ???
        listOrder: [
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            },
            {
                titalStriker: "สติกเกอร์แบบกลม",
                detailStriker: "กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm",
                qtyStriker: 300,
                priceStriker: 500
            }
        ]
    }
];