import React from "react";
import { Field, ErrorMessage } from 'formik';

import styles from './index.module.scss';

const LocationFieldsComponent = ({ onlyLocation = false, email = null, emailDisabled = false }) => {
    return (
        <div className={styles.gridContainer}>
            {/*  GRID ITEM ISN"T EVEN USED? DONT EVEN HAVE SCSS WTF? */}

            {!onlyLocation &&
                <>
                    <div className={styles.gridItem}>
                        <div className={styles.formControl}>
                            <p>อีเมล* <ErrorMessage name="email" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                            <Field name="email" type="email" value={email} disabled={emailDisabled} />
                        </div>
                    </div>

                    <div className={styles.gridItem}>
                        <div className={styles.formControl}>
                            <p>เบอร์โทรศัพท์* <ErrorMessage name="phone" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                            <Field name="phone" type="text"/>
                        </div>
                    </div>
                </>
            }


            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ที่อยู่* <ErrorMessage name="address" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="address" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ชื่อ นามสกุล* <ErrorMessage name="fullname" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="fullname" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>แขวง* <ErrorMessage name="district" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="district" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>เขต* <ErrorMessage name="zone" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="zone" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>จังหวัด* <ErrorMessage name="provice" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="provice" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>รหัสไปรษณีย์* <ErrorMessage name="zip" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="zip" type="text"/>
                </div>
            </div>

        </div>
    );
}

export default LocationFieldsComponent;