import React from "react";
import { Field, ErrorMessage } from 'formik';

import styles from './index.module.scss';

const LocationFieldsComponent = ({ onlyLocation = false, emailDisabled = false }) => {
    return (
        <div className={styles.gridContainer}>
            {/*  GRID ITEM ISN"T EVEN USED? DONT EVEN HAVE SCSS WTF? */}

            {!onlyLocation &&
                <>
                    <div className={styles.gridItem}>
                        <div className={styles.formControl}>
                            <p>อีเมล* <ErrorMessage name="tax_email" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                            <Field name="tax_email" type="email" disabled={emailDisabled} />
                        </div>
                    </div>

                    <div className={styles.gridItem}>
                        <div className={styles.formControl}>
                            <p>เบอร์โทรศัพท์* <ErrorMessage name="tax_phone" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                            <Field name="tax_phone" type="text"/>
                        </div>
                    </div>
                </>
            }


            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ที่อยู่* <ErrorMessage name="tax_address" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="tax_address" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>ชื่อ นามสกุล* <ErrorMessage name="tax_fullname" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="tax_fullname" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>แขวง* <ErrorMessage name="tax_district" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="tax_district" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>เขต* <ErrorMessage name="tax_zone" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="tax_zone" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>จังหวัด* <ErrorMessage name="tax_provice" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="tax_provice" type="text"/>
                </div>
            </div>

            <div className={styles.gridItem}>
                <div className={styles.formControl}>
                    <p>รหัสไปรษณีย์* <ErrorMessage name="tax_zip" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                    <Field name="tax_zip" type="text"/>
                </div>
            </div>

        </div>
    );
}

export default LocationFieldsComponent;