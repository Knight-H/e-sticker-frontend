    import React, {useState} from "react";
import StepProgress from "../step_progress";
import styles from './index.module.scss';
import img_product from './workplace.jpg';
import logoBangkokBank from './BangkokBank.png';
import logoKrungthaiBank from './KrungthaiBank.jpg';
import logoSiamCommercialBank from './SiamCommercialBank.jpg';

const ShoppingCart = () => {
    const [selectStep] = useState(2);
    return (
        <main>
            <div className={styles.body}>
                <StepProgress stepIndex={selectStep}/>
            </div>
            <div className={styles.body}>
                <div className={styles['col-6']}>
                    <div className={styles.row}>
                        <div className={styles.row}>
                            <h2>สรุปออเดอร์</h2>
                        </div>
                        <div className={styles['box-radius']}>
                            <div className={styles.row}>
                                <div className={styles['col-6']}>สินค้า</div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>จำนวน</div>
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>มูลค่า</div>
                                </div>
                            </div>
                            <hr/>
                            <div className={styles.row}>
                                <div className={styles['col-1']}>
                                    <img src={img_product} alt="Product" width="42" height="42" />
                                </div>
                                <div className={styles['col-5']}>
                                    <div className={styles['row-desciption-product']}>
                                        <div className={styles['product-name']}>สติกเกอร์แบบกลม</div>
                                    </div>
                                    <div className={styles['row-desciption-product']}>
                                        <div className={styles['product-detail']}>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm</div>
                                    </div>
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>300</div>
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>500฿</div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles['col-1']}>
                                    <img src={img_product} alt="Product" width="42" height="42" />
                                </div>
                                <div className={styles['col-5']}>
                                    <div className={styles['row-desciption-product']}>
                                        <div className={styles['product-name']}>สติกเกอร์แบบกลม</div>
                                    </div>
                                    <div className={styles['row-desciption-product']}>
                                        <div className={styles['product-detail']}>กระดาษอาร์ต - เคลือบด้าน - กินเนื้อ 1 มม. - ขนาด 10x20 mm</div>
                                    </div>
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>300</div>
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>500฿</div>
                                </div>
                            </div>
                            <hr/>

                            <div className={styles.row}>
                                <div className={styles['col-9']}>
                                    ค่าสินค้ารวม
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>1000฿</div>
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles['col-9']}>
                                    VAT 7%
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>70฿</div>
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles['col-9']}>
                                    <div className={styles['row-desciption-product']}>
                                        <div className={styles['product-name']}>ค่าจัดส่ง</div>
                                    </div>
                                    <div className={styles['row-desciption-product']}>
                                        <div className={styles['product-detail']}>ลงทะเบียน - 5 วันทำการ - 50 บาท</div>
                                    </div>
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>50฿</div>
                                </div>
                            </div>
                            <hr/>

                            <div className={styles.row}>
                                <div className={styles['col-9']}>
                                    รวมทั้งหมด
                                </div>
                                <div className={styles['col-3']}>
                                    <div className={styles['text-center']}>1120฿</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['col-6']}>
                    <div className={styles.row}>
                        <div className={styles.row}>
                            <h2>ระบุที่อยู่</h2>
                        </div>
                        <div className={styles.row}>
                            <div className={styles['col-6']}>
                                อีเมล*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>
                            <div className={styles['col-6']}>
                                เบอร์โทรศัพท์*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>

                            <div className={styles['col-6']}>
                                ที่อยู่*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>
                            <div className={styles['col-6']}>
                                ชื่อ นามสกุล*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>

                            <div className={styles['col-6']}>
                                แขวง*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>
                            <div className={styles['col-6']}>
                                เขต*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>

                            <div className={styles['col-6']}>
                                จังหวัด*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>
                            <div className={styles['col-6']}>
                                รหัสไปรษณีย์*
                                <div className={styles['row-form-control']}>
                                    <input />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.row}>
                            <h2>เลือก การจัดส่ง</h2>
                        </div>
                        <div className={styles['col-4']}>
                            <div className={styles['box-radius-small']}>
                                <div className={styles['date-receive-desciption']}>รับสินค้าโดยประมาณ</div>
                                <div className={styles['date-receive']}>14 สิงหา (5-7วัน)</div>
                                <div className={styles['price']}>50บาท</div>
                            </div>
                        </div>

                        <div className={styles['col-4']}>
                            <div className={styles['box-radius-small']}>
                                <div className={styles['date-receive-desciption']}>รับสินค้าโดยประมาณ</div>
                                <div className={styles['date-receive']}>10 สิงหา (3-4วัน)</div>
                                <div className={styles['price']}>200บาท</div>
                            </div>
                        </div>
                    </div>


                    <div className={styles.row}>
                        <div className={styles.row}>
                            <h2>ชำระเงิน</h2>
                        </div>
                        <div className={styles['col-12']}>
                            <div className={styles['box-radius-small']}>
                                <img src={logoBangkokBank} alt="Product" className={styles['logo-bank']} />
                                Bangkok Bank
                            </div>

                            <div className={styles['box-radius-small']}>
                                <img src={logoSiamCommercialBank} alt="Product" className={styles['logo-bank']} />
                                Siam Commercial Bank
                            </div>

                            <div className={styles['box-radius-small']}>
                                <img src={logoKrungthaiBank} alt="Product" className={styles['logo-bank']} />
                                Krungthai Bank
                            </div>

                            <div className={styles['box-radius-small']}>
                                <img src={img_product} alt="Product" className={styles['logo-bank']}/>
                                Credit / Debit
                            </div>
                        </div>
                    </div>


                    <div className={styles.row}>
                        <div className={styles.row}>
                            <h2>ออกใบกำกับภาษี</h2>
                        </div>
                        <div className={styles.row}>
                            ข้อมูลเดียวกับที่อยู่
                        </div>
                        <button>ถัดไป</button>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    
                </div>
            </div>
        </main>
    );
};

export default ShoppingCart;