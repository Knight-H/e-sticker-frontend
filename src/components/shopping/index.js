import React, {useState} from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';
import img_product from './workplace.jpg';
import logoBangkokBank from './BangkokBank.png';
import logoKrungthaiBank from './KrungthaiBank.jpg';
import logoSiamCommercialBank from './SiamCommercialBank.jpg';

const ShoppingComponent = () => {
    const [selectStep] = useState(2);
    return (
        <main>
            <section className={styles.section1}>
                <StepProgress stepIndex={selectStep}/>
            </section>
            
            <section className={styles.section2}>
                <div className={styles.boxChild1}>
                    <h2>สรุปออเดอร์</h2>
                    <div className={styles.wrapTable}>
                        <table className={styles.tableCustom}>
                            <thead className={styles.borderBottom}>
                                <tr>
                                    <th className={styles.textLeft}>สินค้า</th>
                                    <th>จำนวน</th>
                                    <th>มูลค่า</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={styles.containerRow}>
                                            <img src={img_product} className={styles.productPreview} alt="Product" />
                                            <div className={styles.containerCol}>
                                                <div className={styles.name}>สติกเกอร์แบบกลม</div>
                                                <div className={styles.desciption}>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.textCenter}>300</td>
                                    <td className={styles.textCenter}>500฿</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.containerRow}>
                                            <img src={img_product} className={styles.productPreview} alt="Product" />
                                            <div className={styles.containerCol}>
                                                <div className={styles.name}>สติกเกอร์แบบเหลี่ยม</div>
                                                <div className={styles.desciption}>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.textCenter}>300</td>
                                    <td className={styles.textCenter}>500฿</td>
                                </tr>
                            </tbody>
                            <tfoot className={styles.borderTop}>
                                <tr>
                                    <td colspan="2">ค่าสินค้ารวม</td>
                                    <td className={styles.textCenter}>1000฿</td>
                                </tr>

                                <tr>
                                    <td colspan="2">VAT 7%</td>
                                    <td className={styles.textCenter}>70฿</td>
                                </tr>

                                <tr>
                                    <td colspan="2">
                                        <div className={styles.containerCol}>
                                            <div className={styles.name}>ค่าจัดส่ง</div>
                                            <div className={styles.desciption}>ลงทะเบียน - 5 วันทำการ - 50 บาท</div>
                                        </div>
                                    </td>
                                    <td className={styles.textCenter}>50฿</td>
                                </tr>

                                <tr className={styles.borderTop}>
                                    <td colspan="2">รวมทั้งหมด</td>
                                    <td className={styles.textCenter}>1120฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button className={styles.buttonGreen}>สั่งสินค้าอย่างอื่น</button>
                    
                </div>
                



                <div className={styles.boxChild2}>
                    <h2>ระบุที่อยู่</h2>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>อีเมล*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>

                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>เบอร์โทรศัพท์*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>

                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>ที่อยู่*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>

                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>ชื่อ นามสกุล*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>

                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>แขวง*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>

                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>เขต*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>

                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>จังหวัด*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>

                        <div className={styles.gridItem}>
                            <div className={styles.formControl}>
                                <p>รหัสไปรษณีย์*</p>
                                <div ><input type="text" value=""/></div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <h2>เลือก การจัดส่ง</h2>
                    <div className={styles.containerRow}>
                        <div className={styles.boxRadiusSmall}>
                            <div className={styles.dateReceiveDesciption}>รับสินค้าโดยประมาณ</div>
                            <div className={styles.dateReceive}>14 สิงหา (5-7วัน)</div>
                            <div className={styles.price}>50บาท</div>
                        </div>
                        <div className={styles.boxRadiusSmall}>
                            <div className={styles.dateReceiveDesciption}>รับสินค้าโดยประมาณ</div>
                            <div className={styles.dateReceive}>14 สิงหา (5-7วัน)</div>
                            <div className={styles.price}>50บาท</div>
                        </div>
                    </div>

                    <h2>ชำระเงิน</h2>
                    <div className={styles.containerCol}>
                        <div className={styles.boxRadiusSmall}>
                            <div className={styles.containerRow}>
                                <div className={styles.containerColBank}>
                                    <img src={logoBangkokBank} alt="Product" className={styles.logoBank} />
                                </div>
                                <div className={styles.containerColBank}>
                                    Bangkok Bank
                                </div>
                            </div>
                        </div>
                        <div className={styles.boxRadiusSmall}>
                            <div className={styles.containerRow}>
                                <div className={styles.containerColBank}>
                                    <img src={logoSiamCommercialBank} alt="Product" className={styles.logoBank} />
                                </div>
                                <div className={styles.containerColBank}>
                                    Siam Commercial Bank
                                </div>
                            </div>
                        </div>

                        <div className={styles.boxRadiusSmall}>
                            <div className={styles.containerRow}>
                                <div className={styles.containerColBank}>
                                    <img src={logoKrungthaiBank} alt="Product" className={styles.logoBank} />
                                </div>
                                <div className={styles.containerColBank}>
                                    Krungthai Bank
                                </div>
                            </div>
                        </div>

                        <div className={styles.boxRadiusSmall}>
                            <div className={styles.containerRow}>
                                <div className={styles.containerColBank}>
                                    <img src={img_product} alt="Product" className={styles.logoBank} />
                                </div>
                                <div className={styles.containerColBank}>
                                    Credit / Debit
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2>ออกใบกำกับภาษี</h2>
                    <div className={styles.containerRow}>
                        <div className={styles.containerColBank}>
                            <input type="checkbox" value=""></input>
                        </div>
                        <div className={styles.containerColBank}>
                            ข้อมูลเดียวกับที่อยู่
                        </div>
                    </div>
                    
                    <button className={styles.buttonNext}>ถัดไป</button>
                    
                    
                </div>
            </section>
        </main>
    );
};

export default ShoppingComponent;