import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { withFormik, useFormikContext } from "formik";
import { Field, Form, ErrorMessage } from "formik";

import { auth } from "../../firebase/index.js";
import { axiosInst } from "../common-scss/common";

const AdminLoginComponent = () => {
  const { values } = useFormikContext();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("user", user);
    });
  }, []);

  return (
    <main>
      <Form className={styles.formAdminLogin}>
        <h3>Stickerwish Admin Login</h3>
        {values.checkLogin && (
          <p className={`error`} style={{ margin: "0 0 5px 0"}}>
            username หรือ password ไม่ถูกต้อง
          </p>
        )}
        <label>
          อีเมล
          <ErrorMessage
            name="email"
            render={(msg) => <span className="error">{msg}</span>}
          />
        </label>
        <Field
          name="email"
          type="email"
          className={styles.inputText}
          placeholder=""
        />

        <label>
          รหัสผ่าน
          <ErrorMessage
            name="password"
            render={(msg) => <span className="error">{msg}</span>}
          />
        </label>
        <Field
          name="password"
          type="password"
          className={styles.inputText}
          placeholder=""
        />

        <button type="submit">เข้าสู่ระบบ</button>
      </Form>
    </main>
  );
};

const EnhancedAdminLoginComponent = withFormik({
  mapPropsToValues: (props) => ({
    email: "",
    password: "",

    checkLogin: false,
  }),
  validate: (values) => {
    const errors = {};

    if (values.email === "") {
      errors.email = "กรุณากรอกอีเมล";
    }

    if (values.password === "") {
      errors.password = "กรุณากรอกใส่รหัสผ่าน";
    }

    return errors;
  },
  handleSubmit: (values, { setFieldValue, props }) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        axiosInst
          .get(`customers/${res.user.uid}`, {
            headers: {
              Authorization:  'Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg=='
            }
           })
          .then((res) => {
            console.log("1")
            if (res.data.isAdmin) {
              console.log("2")
              localStorage.setItem("isAdmin", true);
              setFieldValue("checkLogin", false, false);
              props.history.push("/admin");
            } else {
              console.log("3")
              props.history.push("/cart");
              setFieldValue("loading", false, false);
            }
          })
          .catch((reason) => {
            console.log(reason);
          });
      })
      .catch((error) => {
        console.log("Error", error);
        setFieldValue("checkLogin", true, false);
      });
  },
})(AdminLoginComponent);

export default EnhancedAdminLoginComponent;
