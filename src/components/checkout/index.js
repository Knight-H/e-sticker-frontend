import React from "react";
import { withFormik, Form } from 'formik';

import LoginComponent from '../login';
import styles from './index.module.scss';
import img_product from './workplace.jpg';

const CartComponent = () => {
    return (
        <main>
            <section className={styles.section2}>
                <div className={styles.boxChild1}>
                    <h2>ตะกร้าสินค้า</h2>
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
                                        <div className={[styles.containerRow, styles.flexNoWrap].join(' ')}>
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
                                        <div className={[styles.containerRow, styles.flexNoWrap].join(' ')}>
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
                                <tr className={styles.borderTop}>
                                    <td colspan="2">ค่าสินค้ารวม</td>
                                    <td className={styles.textCenter}>1000฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button className={styles.buttonGreen}>สั่งสินค้าอย่างอื่น</button>
                </div>

                <div className={styles.boxChild2}>
                    <h2>ระบบสมาชิก</h2>
                    <div className={styles.wrapTable}>
                        <Form>
                            <LoginComponent />
                        </Form>
                    </div>
                    
                    <br /><br />
                    <h2>Checkout as Guest</h2>
                    <button className={styles.buttonGreenFit}>Checkout as Guest</button>
                </div>
            </section>
        </main>
    );
};

const EnhancedMemberCartComponent = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: values => {
        const errors = {};

        if (values.email === "") {
            errors.email = "Required"
        }

        if (values.password === "") {
            errors.password = "Required"
        }

        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 0);
    },
    displayName: 'CartComponentForm',
})(CartComponent);

export default EnhancedMemberCartComponent;