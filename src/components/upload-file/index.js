import React, { useState } from "react";
import styles from './index.module.scss';

const UploadFileComponent = () => {
    const [file, setFile] = useState("");
    console.log("file", file)
    const handleChange = event => {
        setFile(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <main className={styles.wrap_content}>
            <img src={file} className={styles.square} />
            <input type="file" onChange={(e) => handleChange(e)} />
        </main>
    );
};

export default UploadFileComponent;