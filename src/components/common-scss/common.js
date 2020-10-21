import React from 'react'

export function dummyHandleSubmit(values) {
    // Alert the values which are submitted

    setTimeout(() => {
        console.log("DUMMY_HANDLE_SUBMIT", values)
        alert(JSON.stringify(values, null, 2))
    }, 10)
}

export function dummyValidateError(values) {
    // Apply error to every field 

    const errors = {}

    Object.entries(values).forEach(([key, value], idx) => {
        errors[key] = "DUMMY ERROR"
    })

    return errors
}

export function DummyDiv(props) {
    // Div that shows all the property

    return (<div>{JSON.stringify(props)}</div>)
}

export default {
    dummyHandleSubmit: dummyHandleSubmit,
    dummyValidateError: dummyValidateError,
    DummyDiv: DummyDiv,
}