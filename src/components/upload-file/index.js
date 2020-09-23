import React, { useState } from "react";
import styles from './index.module.scss';
import StepProgress from "../step_progress";
import '../../fontawesome-free/css/all.css';
import { ReactComponent as IconUploadFile } from './icon-upload-file.svg';
import { ReactComponent as IconCart } from './icon-cart.svg';

const UploadFileComponent = () => {
    const [file, setFile] = useState("");
    const [selectStep] = useState(2);
    const handleChange = event => {
        if (event.target.files) {
            setFile(URL.createObjectURL(event.target.files[0]))
        }
    }
    console.log("file", file)
    return (
        <main>
            <section style={{display: "flex"}}>
                <StepProgress stepIndex={selectStep}/>
            </section>
            <section className={styles.wrapContent}>
                <img src={file} className={styles.square} />

                <div className={styles.rightContent}>
                    <label>อนุมัติรูปแบบงาน</label>

                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                    <select>
                        <option>&#xf00c; ต้องการอนุมัติ</option>
                        <option>&#xf00d;ไม่ต้องการอนุมัติ</option>
                    </select>

                    <label>อัพโหลดไฟล์งาน</label>

                    <input type="file" id="file" onChange={(e) => handleChange(e)} />
                    <label for="file" className={styles.buttonUploadFile}>
                        <IconUploadFile />
                    อัพโหลดไฟล์
                </label>

                    <label>เพิ่มเติม</label>
                    <textarea rows="5"></textarea>

                    <button type="button" className={styles.btnCart}><IconCart /><b>ใส่ในตะกร้า</b></button>
                </div>
            </section>
        </main>
    );
};

export default UploadFileComponent;