import React, { useEffect } from "react";
import styles from "./index.module.scss";
import axios from "axios";

import { ReactComponent as Circle } from "../approve-layout/circle.svg";
import { ReactComponent as IconPhone } from "./icon-phone.svg";
import { ReactComponent as IconUser } from "./icon-user.svg";
import { ReactComponent as IconLogout } from "./icon-logout.svg";
import { withFormik } from "formik";
import { useFormikContext } from "formik";
import { STATUS_ORDERS_TYPE } from "../constant-variable.js";
import { auth } from "../../firebase/index";
import { axiosInst } from "../common-scss/common";

const LabelSatus = ({ status }) => {
  if (status === STATUS_ORDERS_TYPE.DOING) {
    return (
      <label className={`${styles.statusLabel} ${styles.orangeLabel}`}>
        สถานะ: กำลังดำเนินการ
      </label>
    );
  } else if (status === STATUS_ORDERS_TYPE.WAIT_PAYMENT) {
    return (
      <label className={`${styles.statusLabel} ${styles.blueStatus}`}>
        สถานะ: รอชำระเงิน
      </label>
    );
  } else if (status === STATUS_ORDERS_TYPE.PRODUCTION) {
    return (
      <label className={`${styles.statusLabel} ${styles.yellowStatus}`}>
        สถานะ: กำลังผลิตสินค้า
      </label>
    );
  } else if (status === STATUS_ORDERS_TYPE.DELIVERY) {
    return (
      <label className={`${styles.statusLabel} ${styles.blueStatus}`}>
        สถานะ: อยู่ระหว่างจัดส่ง
      </label>
    );
  } else if (status === STATUS_ORDERS_TYPE.REFUND) {
    return (
      <label className={`${styles.statusLabel} ${styles.redStatus}`}>
        สถานะ: ขอคืนเงิน
      </label>
    );
  } else if (status === STATUS_ORDERS_TYPE.REFUNDED) {
    return (
      <label className={`${styles.statusLabel} ${styles.greenStatus}`}>
        สถานะ: คืนเงินสำเร็จ
      </label>
    );
  } else if (status === STATUS_ORDERS_TYPE.FINISH) {
    return (
      <label className={`${styles.statusLabel} ${styles.greenStatus}`}>
        สถานะ: รายการสำเร็จ
      </label>
    );
  }
};

const HomeMemberComponent = (props) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("loading", true, false);
    auth.onAuthStateChanged((user) => {
      if (user) {
        axios
          .get(
            `https://asia-east2-digitalwish-sticker.cloudfunctions.net/orders?customerID=${user.uid}`, {
              headers: {
                Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
              }
             }
          )
          .then((res) => {
            // console.log("res.data[0]", res.data)
            setFieldValue(
              "objectOrder",
              res.data &&
                res.data.slice().sort((a, b) => {
                  console.log(
                    "new Date(b.timeStamp) - new Date(a.timeStamp)",
                    new Date(b.timeStamp) - new Date(a.timeStamp)
                  );
                  return new Date(b.timeStamp) - new Date(a.timeStamp);
                }),
              false
            );
            setFieldValue("loading", false, false);
          })
          .catch(function (err) {
            console.log("err", err);
            setFieldValue("loading", false, false);
          });

        // IF Login fetch address
        axiosInst
          .get("customers", {
            params: {
              customerID: auth.currentUser.uid,
            },
              headers: {
                Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
              }
          })
          .then((res) => {
            // Temporary for filtering the customer data
            const customerInfo = res.data.filter((data) => {
              if (auth.currentUser) {
                setFieldValue("loading", false, false);
                return data["customerID"] === auth.currentUser.uid;
              }
            })[0];
            if (customerInfo) {
              setFieldValue("loading", false, false);
              setFieldValue("fullname", customerInfo.fullname, false);
            }
          });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.wrapContent}>
      <div
        class={`loader loader-default ${values.loading ? "is-active" : ""}`}
      ></div>
      <h1 className={styles.title}>รายการออเดอร์</h1>

      <p className={styles.details}>
        สวัสดีคุณ {values.fullname} เลือกเมนูการใช้งานได้เลยค่ะ
      </p>
      {/* <p className={styles.details}>หมายเลขสมาชิก MEM0001</p> */}

      <br />

      <label className={styles.greenLabel}>
        <IconPhone />
        ดูคำสั่งซื้อ
      </label>
      <label
        className={styles.greenLabel}
        onClick={() => {
          props.history.push("/member/setting");
        }}
      >
        <IconUser />
        จัดการบัญชี
      </label>
      <label
        className={styles.greenLabel}
        onClick={() => {
          auth.signOut();
          localStorage.removeItem("isAdmin");
          props.history.push("/");
        }}
      >
        <IconLogout />
        ออกจากระบบ
      </label>

      <section className={styles.container}>
        {/* {console.log("values", values.objectOrder)} */}
        {values.objectOrder.length !== 0 ? (
          values.objectOrder.map((fakeAPI) => {
            // console.log("map")
            if (fakeAPI) {
              // console.log(">>>>")
              return (
                <article className={styles.borderCard}>
                  <h1 className={styles.title}>
                    ออเดอร์หมายเลข {fakeAPI.orderID}
                  </h1>
                  <LabelSatus status={fakeAPI.status} />
                  <table>
                    {fakeAPI.itemsList &&
                      fakeAPI.itemsList.map((list) => (
                        <tr>
                          <td className={styles.iconCol}>
                            <Circle />
                          </td>
                          <td className={styles.detailCol}>
                            <h4>{list.shape}</h4>
                            <p>
                              {list.material} - {list.coat} - ขนาด {list.width}x
                              {list.height} cm.
                            </p>
                          </td>
                          <td className={styles.qtyCol}>
                            <p>{list.units}ชิ้น</p>
                          </td>
                          <td className={styles.priceCol}>
                            <p>{list.price}฿</p>
                          </td>
                        </tr>
                      ))}
                  </table>

                  <button
                    type="button"
                    onClick={() =>
                      props.history.push(`/myorder/${fakeAPI.myID}`)
                    }
                  >
                    ดูรายละเอียด
                  </button>
                </article>
              );
            }
          })
        ) : (
          <p>ไม่มีรายการคำสั่งซื้อ</p>
        )}
      </section>
    </main>
  );
};

const EnhancedHomeMemberComponentComponent = withFormik({
  mapPropsToValues: (props) => ({
    objectOrder: [],
    loading: false,
  }),
})(HomeMemberComponent);

export default EnhancedHomeMemberComponentComponent;
