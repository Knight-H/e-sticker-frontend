import React, { useState } from "react";
import styles from './index.module.scss';
import '../../fontawesome-free/css/all.css';
import { ReactComponent as IconUploadFile } from './icon-upload-file.svg';
import { ReactComponent as IconCart } from './icon-cart.svg';

const UploadFileComponent = () => {
    const [file, setFile] = useState("");
    const handleChange = event => {
        setFile(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <main className={styles.wrapContent}>
            <img src={file} className={styles.square} />

            <div className={styles.rightContent}>
                <label>อนุมัติรูปแบบงาน</label>
                <div className={styles.boxInput}>
                    <i class="fas fa-check"></i>
                    <select>
                        <option>
                            <i class="fas fa-check"></i> 
                            ต้องการอนุมัติ</option>
                        <option>ไม่ต้องการอนุมัติ</option>
                    </select>
                </div>

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
        </main>
    );
};

export default UploadFileComponent;