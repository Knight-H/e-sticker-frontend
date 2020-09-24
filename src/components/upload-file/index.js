import React, { useState } from "react";
import styles from './index.module.scss';
import { Link } from "react-router-dom";

import StepProgress from "../step_progress";

import { ReactComponent as IconUploadFile } from './icon-upload-file.svg';
import { ReactComponent as IconCart } from './icon-cart.svg';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import { ReactComponent as IconCheckSVG } from './icon-check.svg';

import IconCheck from './icon-check.png';
const UploadFileComponent = () => {
    const [file, setFile] = useState("");
    const [selectStep] = useState(2);
    const [dropDawn, setDropDawn] = useState(0);

    const handleChangeDropDawn = (e) => {
        // console.log("e>>>", e.value)
        setDropDawn(e.value);
    };

    const handleChange = event => {
        if (event.target.files) {
            setFile(URL.createObjectURL(event.target.files[0]))
        }
    }

    return (
        <main>
            <section style={{ display: "flex" }}>
                <StepProgress stepIndex={selectStep} />
            </section>
            <section className={styles.wrapContent}>
                <img src={file} className={styles.square} alt="."/>

                <div className={styles.rightContent}>
                    <label className={styles.label}>อนุมัติรูปแบบงาน</label>

                    <div className={styles.selectBox}>
                        <div className={styles.selectBoxCurrent} tabindex="1">
                            <div className={styles.selectBoxValue}>
                                <input className={styles.selectBoxInput} type="radio" id="1" value="1" checked={`${dropDawn}` === `${1}` ? true : false}
                                    onChange={(e) => handleChangeDropDawn(e.target)} />
                                <p className={styles.selectBoxInputText}><IconCheckSVG className={styles.positionIcon}/>ต้องการอนุมัติ</p>
                            </div>
                            <div className={styles.selectBoxValue}>
                                <input className={styles.selectBoxInput} type="radio" id="0" value="0" checked={`${dropDawn}` === `${0}` ? true : false}
                                    onChange={(e) => handleChangeDropDawn(e.target)} />
                                <p className={styles.selectBoxInputText}>กรุณาเลือก...</p>
                                <IconArrow />
                            </div>
                        </div>
                        <ul className={styles.selectBoxList}>
                            <li>
                                <label className={styles.selectBoxOption} for="1"><img src={IconCheck} width="16px" style={{marginRight: "10px"}} alt="."/>ต้องการอนุมัติ</label>
                            </li>
                            <li>
                                <label className={styles.selectBoxOption} for="0">กรุณาเลือก...</label>{/* aria-hidden="aria-hidden" */}
                            </li>
                        </ul>
                    </div>

                    <label className={styles.label} style={{ marginTop: "10px" }}>อัพโหลดไฟล์งาน</label>

                    <input type="file" id="file" onChange={(e) => handleChange(e)} />
                    <label for="file" className={`${styles.buttonUploadFile} ${styles.label}`}>
                        <IconUploadFile />
                    อัพโหลดไฟล์
                </label>

                    <label className={styles.label}>เพิ่มเติม</label>
                    <textarea rows="5"></textarea>

                    <Link className={styles.link} to="/in_cart">
                        <button type="button" className={styles.btnCart}><IconCart /><b>ใส่ในตะกร้า</b></button>
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default UploadFileComponent;