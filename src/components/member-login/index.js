import React from "react";
import { withRouter } from "react-router-dom";
import { withFormik, Form, useFormikContext } from "formik";

import styles from "./index.module.scss";

import LoginComponent from "../login";
import { auth } from "../../firebase";

import { i18_th as i18 } from "../common-scss/i18_text";
import { axiosInst } from "../common-scss/common";

const MemberLoginComponent = (props) => {
  const { values } = useFormikContext();

  return (
    <main className={styles.container}>
      <div
        class={`loader loader-default ${values.loading ? "is-active" : ""}`}
      ></div>
      <Form>
        <h2>มุมสมาชิก</h2>
        <LoginComponent />
      </Form>
    </main>
  );
};

export const EnhancedMemberLoginComponent = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    loading: false,
  }),
  validate: (values) => {
    const errors = {};

    if (values.email === "") {
      errors.email = i18.required;
    }

    if (values.password === "") {
      errors.password = i18.required;
    }

    return errors;
  },
  // handleSubmit: dummyHandleSubmit,

  handleSubmit: (values, { props, setFieldValue }) => {
    setFieldValue("loading", true, false);
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        axiosInst
          .get(`customers/${res.user.uid}`)
          .then((res) => {
            if (res.data.isAdmin) {
              localStorage.setItem("isAdmin", true);
              setFieldValue("loading", false, false);
              props.history.push("/cart");
            } else {
              props.history.push("/cart");
              setFieldValue("loading", false, false);
            }
          })
          .catch((reason) => {
            console.log(reason);
          });
      })
      .catch((error) => {
        setFieldValue("loading", false, false);
      });
  },
  displayName: "MemberLoginComponentForm",
})(withRouter(MemberLoginComponent));

export default EnhancedMemberLoginComponent;
