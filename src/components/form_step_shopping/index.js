// TEST `MultistepWizard`
// https://github.com/formium/formik/blob/master/examples/MultistepWizard.js
// https://medium.com/javascript-in-plain-english/how-to-create-a-multi-step-form-with-react-hooks-53a85efdff62
import React, { useState } from "react";
import * as Yup from "yup";

import Order1ProductConfigComponent from "./../order-1-product-config";
import UploadFileComponent from "./../upload-file";
import ShoppingComponent from "./../shopping";

import { withFormik } from 'formik';
import { useFormikContext } from 'formik';

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit }) => {
  const { values, errors, touched, setFieldValue, validateField } = useFormikContext();

  const [stepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const step = steps[values.stepProgress];
  return (
    <>
      {step}
    </>
  );
};

const WizardStep = ({ children }) => children;

const AppComponent = () => {
  return (
    <Wizard>
      <WizardStep>
        <Order1ProductConfigComponent />
      </WizardStep>
      <WizardStep>
        <UploadFileComponent />
      </WizardStep>
    </Wizard>
  );
};

const EnhancedAppComponent = withFormik({
  mapPropsToValues: (props) => ({
    stepProgress: 0,
    // Step one
    kindSticker: 0,
    materialSticker: 0,
    coatingStricker: 0,
    dieCutStricker: 0,
    widthStricker: '',
    heightStricker: '',
    quantityStricker: 0,

    // Step two
    approvalStricker: 0,
    isCheckUploadFileStricker: false,
    uploadFileStricker: [],
    remarkStricker: '',
  }),
  validate: values => {
    const errors = {};

    // Step 1
    if (values.stepProgress === 0) {
      if (values.kindSticker === 0) {
        errors.kindSticker = "Require"
      }
      if (values.materialSticker === 0) {
        errors.materialSticker = "Require"
      }
      if (values.coatingStricker === 0) {
        errors.coatingStricker = "Require"
      }
      if (values.materialSticker === 0) {
        errors.materialSticker = "Require"
      }
      if (values.dieCutStricker === 0) {
        errors.dieCutStricker = "Require"
      }
      if (values.widthStricker === "") {
        errors.widthStricker = "Require"
      }
      if (values.heightStricker === "") {
        errors.heightStricker = "Require"
      }
      if (values.quantityStricker === 0) {
        errors.quantityStricker = "Require"
      }
    } else if (values.stepProgress === 1) {

      // Step two
      if (values.approvalStricker === 0) {
        errors.approvalStricker = "Require"
      }
      if (values.isCheckUploadFileStricker === false) {
        errors.uploadFileStricker = "Require"
      }
    }
    return errors;
  },
  handleSubmit: (values, { setSubmitting }) => {
    console.log("values", values)
    if (values.stepProgress === 0) {
      console.log(">>>>>>0")
      values.stepProgress = 1
    } else {
      console.log(">>>>>>1")
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 0);
    }
  }
})(AppComponent);

export default EnhancedAppComponent;