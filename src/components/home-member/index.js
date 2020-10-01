import React from "react";
import styles from './index.module.scss';

import { ReactComponent as Circle } from '../approve-layout/circle.svg';
import { ReactComponent as IconPhone } from './icon-phone.svg';
import { ReactComponent as IconUser } from './icon-user.svg';
import { ReactComponent as IconLogout } from './icon-logout.svg';

const HomeMemberComponent = (props) => {
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
                <article className={styles.borderCard}>
                    <h1 className={styles.title}>ออเดอร์หมายเลข #DW0001</h1>
                    <label className={styles.orangeLabel}>สถานะ: กำลังดำเนินการ</label>
                    <table>
                        <tr>
                            <td className={styles.iconCol}><Circle /></td>
                            <td className={styles.detailCol}>
                                <h4>สติกเกอร์แบบกลม</h4>
                                <p>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm </p>
                            </td>
                            <td className={styles.qtyCol}><p>300ชิ้น</p></td>
                            <td className={styles.priceCol}><p>500฿</p></td>
                        </tr>
                    </table>

                    <button type="button">ดูรายละเอียด</button>
                </article>

                <article className={styles.borderCard}>
                    <h1 className={styles.title}>ออเดอร์หมายเลข #DW0002</h1>
                    <label className={styles.orangeLabel}>สถานะ: กำลังดำเนินการ</label>
                    <table>
                        <tr>
                            <td className={styles.iconCol}><Circle /></td>
                            <td className={styles.detailCol}>
                                <h4>สติกเกอร์แบบกลม</h4>
                                <p>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm </p>
                            </td>
                            <td className={styles.qtyCol}><p>300ชิ้น</p></td>
                            <td className={styles.priceCol}><p>500฿</p></td>
                        </tr>

                        <tr>
                            <td className={styles.iconCol}><Circle /></td>
                            <td className={styles.detailCol}>
                                <h4>สติกเกอร์แบบกลม</h4>
                                <p>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm </p>
                            </td>
                            <td className={styles.qtyCol}><p>300ชิ้น</p></td>
                            <td className={styles.priceCol}><p>500฿</p></td>
                        </tr>
                    </table>
                    <button type="button">ดูรายละเอียด</button>
                </article>

                <article className={styles.borderCard}>
                    <h1 className={styles.title}>ออเดอร์หมายเลข #DW0002</h1>
                    <label className={styles.orangeLabel}>สถานะ: กำลังดำเนินการ</label>
                    <table>
                        <tr>
                            <td className={styles.iconCol}><Circle /></td>
                            <td className={styles.detailCol}>
                                <h4>สติกเกอร์แบบกลม</h4>
                                <p>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm </p>
                            </td>
                            <td className={styles.qtyCol}><p>300ชิ้น</p></td>
                            <td className={styles.priceCol}><p>500฿</p></td>
                        </tr>

                        <tr>
                            <td className={styles.iconCol}><Circle /></td>
                            <td className={styles.detailCol}>
                                <h4>สติกเกอร์แบบกลม</h4>
                                <p>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm </p>
                            </td>
                            <td className={styles.qtyCol}><p>300ชิ้น</p></td>
                            <td className={styles.priceCol}><p>500฿</p></td>
                        </tr>
                    </table>
                    <button type="button">ดูรายละเอียด</button>
                </article>

            </section>
        </main>
    )
}

export default HomeMemberComponent;