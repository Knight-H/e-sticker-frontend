import React from 'react'
import Firebase from 'firebase'
import auth from '../../firebase/index'
import axios from 'axios'
import { i18_th } from './i18_text'

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


/**
 * Change password helper function
 * 
 * @param {Firebase.User} firebaseUser currentUser instance
 * @param {string} oldPassword old password to be replaced
 * @param {string} newPassword new password to be used
 */
export async function changePasswordHelper(firebaseUser, oldPassword, newPassword) {

    // re-provide their sign-in credentials
    // https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user

    // Getting fresh credential
    // https://stackoverflow.com/a/37812541

    // Makeing credential object
    // https://firebase.google.com/docs/reference/js/firebase.auth.EmailAuthProvider#.credential
    // TL;DR use the Prototype(Class) itself's auth not the instance
    // Firebase.auth IS NOT EQUAL TO Firebase.auth()

    // get credential
    let freshCredential = null
    try {
        freshCredential = Firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, oldPassword)
    } catch (e) {
        alert("eeee", e)
    }

    // Referesh credential
    try {
        await firebaseUser.reauthenticateWithCredential(freshCredential)
    } catch (e) {
        alert(e)
    }

    // Update password
    try {
        await firebaseUser.updatePassword(newPassword)

        console.log("password changed ok")
        alert(i18_th.account_password_change_success)
    } catch (e) {
        console.log("failed to change", e)
        alert(i18_th.account_password_change_failed_general, e)
    }
}

export let axiosConfig = {
    baseURL: "https://asia-east2-digitalwish-sticker.cloudfunctions.net/"
}

export const axiosInst = axios.create(axiosConfig)

export default {
    dummyHandleSubmit: dummyHandleSubmit,
    dummyValidateError: dummyValidateError,
    DummyDiv: DummyDiv,
    changePasswordHelper: changePasswordHelper,
    axiosInst: axiosInst,
}