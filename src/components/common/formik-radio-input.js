import React from 'react';
import { useField } from 'formik';

const RadioInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    //     props.name

    //https://jaredpalmer.com/formik/docs/api/useField
    // checked?: boolean - Whether or not the input is checked, this is only defined if useField is passed an object with a name, type: 'checkbox' or type: radio.
    //value: Value - The field's value (plucked out of values) or, if it is a checkbox or radio input, then potentially the value passed into useField.
    const [field, meta] = useField(props);
    // console.log("meta.error", meta.error)

    return (
        <>
            <input type='radio' {...field} {...props} />

            {meta.touched && meta.error ? (
                <div className="error">
                    <span className="tooltiptext">{meta.error}</span>
                </div>
            ) : null
            }
        </>
    );
};
export default RadioInput;