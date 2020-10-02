// TEST `MultistepWizard`
// https://github.com/formium/formik/blob/master/examples/MultistepWizard.js
// https://medium.com/javascript-in-plain-english/how-to-create-a-multi-step-form-with-react-hooks-53a85efdff62
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Order1ProductConfigComponent from "./../order-1-product-config";
import UploadFileComponent from "./../upload-file";
import ShoppingComponent from "./../shopping";
import ApproveLayoutComponent from "./../approve-layout";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = values => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = values => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      console.log("onSubmit")
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik initialValues={snapshot} onSubmit={handleSubmit} validationSchema={step.props.validationSchema}>
      {(formik) => (
        <Form>
          {step}
          <div style={{ display: "flex" }}>
            {stepNumber > 0 && (
              <button onClick={() => previous(formik.values)} type="button">
                Back
              </button>
            )}
            <div>
              <button disabled={formik.isSubmitting} type="submit">
                {isLastStep ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const WizardStep = ({ children }) => children;

const App = () => (
  <div>
    {/* <h1>Formik Multistep Wizard</h1> */}
    <Wizard
      initialValues={{
        // Step one
        kindSticker: '',
        materialSticker: '',
        coatingStricker: '',
        dieCutStricker: '',
        widthStricker: '',
        heightStricker: '',
        quantityStricker: '',

        // Step two
        approvalStricker: '',
        uploadFileStricker: [],
        remarkStricker: '',
      }}
      onSubmit={async values => sleep(300).then(() => console.log("Wizard submit >>>", values))}
    >
      <WizardStep
        onSubmit={() => console.log("Step1 onSubmit")}
        validationSchema={Yup.object({
          kindSticker: Yup.string().required("กรุณาเลือกรูปแบบ"),
          materialSticker: Yup.string().required("กรุณาเลือกวัสดุ"),
          coatingStricker: Yup.string().required("กรุณาเลือกการเคลือผิว"),
          dieCutStricker: Yup.string().required("กรุณาเลือกวิธีไดคัตภาพ"),
          widthStricker: Yup.string().required("กรุณาเลือกความกว้าง"),
          heightStricker: Yup.string().required("กรุณาเลือกความสูง"),
          quantityStricker: Yup.string().required("กรุณาเลือกจำนวน")
        })}
      >
        <Order1ProductConfigComponent Field={Field} ErrorMessage={ErrorMessage} />
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log("Step2 onSubmit")}
        validationSchema={Yup.object({
          approvalStricker: Yup.string().required("กรุณาเลือก"),
          // uploadFileStricker: Yup.string().required("กรุณาอัพโหลดไฟล์")
        })}
      >
        <UploadFileComponent Field={Field} ErrorMessage={ErrorMessage} />
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log("Step3 onSubmit")}
      // validationSchema={Yup.object({
      //     shipment: Yup.string().min(3, 'โปรดเลือก').required(),
      // })}
      >
        <ShoppingComponent />

      </WizardStep>

      <WizardStep
        onSubmit={() => console.log("Step4 onSubmit")}
      // validationSchema={Yup.object({
      //   email: Yup.string()
      //     .email("Invalid email address")
      //     .required("required")
      // })}
      >
        <ApproveLayoutComponent />
      </WizardStep>
    </Wizard>
  </div>
);

export default App;