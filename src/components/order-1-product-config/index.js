import React from "react";
import styles from './index.module.scss';

const Order1ProductConfigComponent = () => {
    return (
        <main>
            <div className="DONUTTIMELINE" style={{height: "160px"}}></div>
            <div className={styles.wrapContent}>
                <img className={styles.square} />
                <section>
                    <label htmlFor="stickerConfiguration">รูปแบบสติกเกอร์</label>
                    <select id="stickerConfiguration">
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                    </select>

                </section>
            </div>
        </main>
    )
}

export default Order1ProductConfigComponent;