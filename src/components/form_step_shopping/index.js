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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
  console.log("values", values)
  return (
    <>
      {step}
    </>
  );
};

const WizardStep = ({ children }) => children;

const AppComponent = () => {
  // const { values, errors, touched, setFieldValue, validateField } = useFormikContext();
  return (
    <Wizard>
      <WizardStep>
        <Order1ProductConfigComponent />
      </WizardStep>
      <WizardStep>
        <UploadFileComponent />
      </WizardStep>
      <WizardStep>
        <ShoppingComponent />
      </WizardStep>
    </Wizard>
  );
};

const EnhancedAppComponent = withFormik({
  mapPropsToValues: (props) => ({
    stepProgress: 0,
    // Step one
    kindSticker: '',
    materialSticker: '',
    coatingStricker: '',
    dieCutStricker: '',
    widthStricker: '',
    heightStricker: '',
    quantityStricker: '',

    // Step two
    approvalStricker: 0,
    uploadFileStricker: [],
    remarkStricker: '',
  })
})(AppComponent);

export default EnhancedAppComponent;