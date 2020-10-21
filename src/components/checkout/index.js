import React from "react";
import { withFormik, Form } from 'formik';

import LoginComponent from '../login';
import styles from './index.module.scss';
import img_product from './workplace.jpg';
import fake_data from "./fake-api.json";

const CheckoutComponent = (props) => {
    // API [GET] /order/
    var _apiData = fake_data;

    return (
        <main>
            <section className={styles.section2}>
                <div className={styles.boxChild1}>
                    <h2>ตะกร้าสินค้า</h2>
                    <div className={styles.wrapTable}>
                        <table className={styles.tableCustom}>
                            <thead className={styles.borderBottom}>
                                <tr>
                                    <th colspan="3" className={styles.textLeft}>สินค้า</th>
                                    <th>จำนวน</th>
                                    <th>มูลค่า</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    _apiData.data.map((dataObjectMapped) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td colspan="3">
                                                        <div className={`${styles.containerRowCart} ${styles.flexNoWrap}`} >
                                                            <img src={img_product} className={styles.productPreview} alt="Product" />
                                                            <div className={styles.containerCol}>
                                                                <div className={styles.name}>{dataObjectMapped.name}</div>
                                                                <div className={styles.desciption}>{dataObjectMapped.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{dataObjectMapped.amount}</td>
                                                    <td className={`${styles.textCenter} ${styles.textCenterMobile}`}>{dataObjectMapped.price}฿</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" className={`${styles.textCenterMobileNewRow}`}>จำนวน {dataObjectMapped.amount} ชิ้น</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" className={`${styles.textCenterMobileNewRow}`}>ราคา {dataObjectMapped.price}฿</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot className={styles.borderTop}>
                                <tr className={styles.borderTop}>
                                    <td colspan="2">ค่าสินค้ารวม</td>
                                    <td className={styles.textCenter}>1000฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button type="button" onClick={() => props.history.push("/customize")} className={styles.buttonGreen}>สั่งสินค้าอย่างอื่น</button>
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

const EnhancedCheckoutComponent = withFormik({
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
    displayName: 'CheckoutComponent',
})(CheckoutComponent);

export default EnhancedCheckoutComponent;