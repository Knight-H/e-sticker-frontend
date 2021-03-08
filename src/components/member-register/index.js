import React from "react";
import styles from "./index.module.scss";
import { auth } from "../../firebase";

import LocationFieldsComponent from "../location-fields";
import { LoginCredentialsComponent2 } from "../login-credentials";

import { withFormik, Field, Form, useFormikContext } from "formik";
import { axiosInst } from "../common-scss/common";
import { i18_th as i18 } from "../common-scss/i18_text";

const MemberRegisterComponent = (props) => {
  const { values } = useFormikContext();

  return (
    <main className={styles.pageContainer}>
      <div
        class={`loader loader-default ${values.loading ? "is-active" : ""}`}
      ></div>
      <h2>สมัครสมาชิก</h2>

      {(() => {
        if (
          values.isRegisterSuccessfulText === i18.account_creation_successful
        ) {
          return (
            <p className={styles.accountCreateSuccess}>
              {values.isRegisterSuccessfulText}
            </p>
          );
        } else if (values.isRegisterSuccessfulText !== null) {
          return (
            <p className={styles.accountCreateFailed}>
              {values.isRegisterSuccessfulText}
            </p>
          );
        }
        return <p>　</p>;
      })()}

      <Form className={styles.flexWrapper}>
        <section className={styles.loginCredentials}>
          <LoginCredentialsComponent2 isRegistering={true} />
        </section>

        <section className={styles.userInfo}>
          <LocationFieldsComponent onlyLocation={true} />
          <Field
            type="submit"
            className={styles.greenButton}
            value="สมัครสมาชิก"
          />
        </section>
      </Form>
    </main>
  );
};

const EnchancedMemberRegisterComponent = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => {
    return {
      isRegisterSuccessfulText: null,

      email: "",
      password: "",
      password_repeat: "",
      phone: "",

      address: "",
      fullname: "",

      county: "",
      city: "",

      provice: "",
      zip: "",

      loading: false,
    };
  },
  validate: (values) => {
    const errors = {};

    // Assumes that all fields are required.
    Object.entries(values)
      .filter(([fieldName, fieldValue]) => {
        return !["isRegisterSuccessfulText", "loading"].includes(fieldName);
      })
      .forEach(([fieldName, fieldValue]) => {
        // console.log(fieldName, "-", fieldValue, "-", Boolean(fieldValue))
        if (!fieldValue) {
          errors[fieldName] = i18.required;
        }
      });

    if (values.password !== values.password_repeat) {
      errors.password = i18.password_repeat_different;
    }

    return errors;
  },
  // handleSubmit: dummyHandleSubmit,
  handleSubmit: (values, { props, setFieldValue }) => {
    // console.log("handleSubmit")
    setFieldValue("loading", true, false);
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredential) => {
        // Also logged in

        const moreUserInfo = {};
        Object.assign(moreUserInfo, { customerID: userCredential.user.uid });

        Object.keys(values)
          .filter((fieldName) => {
            return ![
              "password",
              "password_repeat",
              "isRegisterSuccessfulText",
              "loading",
            ].includes(fieldName);
          })
          .forEach((fieldName) => {
            moreUserInfo[fieldName] = values[fieldName];
          });

        const customerSchemaInfo = {
          email: moreUserInfo?.email || "",
          shippingAddress: {
            address: moreUserInfo?.address || "",
            zip: moreUserInfo?.zip || "",
            city: moreUserInfo?.city || "",
            county: moreUserInfo?.county || "",
            provice: moreUserInfo?.provice || "",
            fullname: moreUserInfo?.fullname || "",
          },
          fullname: moreUserInfo?.fullname || "",
          phone: moreUserInfo?.phone || "",
          customerID: userCredential.user.uid,
          status: "ok",
        };
        console.log(customerSchemaInfo);

        axiosInst
          .post(
            "customers",
            {
              // uid: userCredential.user.uid,
              ...customerSchemaInfo,
            },
            {
              headers: {
                Authorization: "Basic ZGlnaXRhbHdpc2g6SzZDd2N3dkF6QVNDRGZWNg==",
              },
            }
          )
          .then((res) => {
            setFieldValue("loading", false, false);
          })
          .catch((reason) => {
            console.log(reason);
            setFieldValue("loading", false, false);
          })
          .finally(() => {
            setFieldValue("loading", false, false);
            props.history.push("/");
          });
      })
      .catch((reason) => {
        const { code } = reason;

        if (code === "auth/email-already-in-use") {
          console.log(
            "i18.account_creation_failed_email_already_exists",
            i18.account_creation_failed_email_already_exists
          );
          setFieldValue("loading", false, false);
          setFieldValue(
            "isRegisterSuccessfulText",
            i18.account_creation_failed_email_already_exists,
            false
          );
        } else {
          setFieldValue("loading", false, false);
          console.log(
            "i18.account_creation_failed_general",
            i18.account_creation_failed_general
          );
          setFieldValue(
            "isRegisterSuccessfulText",
            i18.account_creation_failed_general,
            false
          );
        }
      });
  },
})(MemberRegisterComponent);

export default EnchancedMemberRegisterComponent;
