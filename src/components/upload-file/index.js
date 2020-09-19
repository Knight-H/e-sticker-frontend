import React from "react";
import styles from './index.module.scss';

const UploadFileComponent = () => {
    const onChangeHandler = event =>{

        console.log(event.target.files[0])
    
    }
    return (
        <main>
            <div className={styles.square}></div>
            <input type="file" name="file" onChange={(e) => onChangeHandler(e)}/>

        </main>
    );
};

export default UploadFileComponent;