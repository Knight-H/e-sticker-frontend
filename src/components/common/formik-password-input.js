import React from 'react';
import { useField } from 'formik';

const PasswordInput = ({ ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    //     props.name
    const [field, meta] = useField(props);
    // console.log("meta.error", meta.error)

    return (
        <>
            <input type='password' {...field} {...props} />
            {props.redBorderForError !== "error-in-table"
                ?
                meta.touched && meta.error ? (
                    <div className="error">
                        <span className="tooltiptext">{meta.error}</span>
                    </div>
                ) : null
                :
                <div className="error2">{meta.error}</div>
            }
        </>
    );
};
export default PasswordInput;