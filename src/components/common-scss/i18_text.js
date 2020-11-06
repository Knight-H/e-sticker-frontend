


export const i18_th = {
    required: "*กรุณาระบุ",

    password_repeat_different: "*รหัสต่างกัน",

    password: {
        wrong_previous_password: "wrong previous password",
        wrong_general: "General wrong password"
    },

    label: {
        password_previous: "Your old password"
    },

    login_successful: "เข้าสู้ระบบสำเร็จ",
    login_failed: "username หรือ password ผิด",
    account_creation_successful: "สร้างบัญชีสำเร็จ",
    account_creation_failed_general: "สร้างบัญชีไม่สำเร็จ",
    account_creation_failed_email_already_exists: "E-mail มีใช้งานอยู่แล้ว",
    account_creation_failed_password_too_weak: "password อ่อนเกินไป",

    account_password_change_success: "Password changed",
    account_password_change_failed_general: "password failed to change",

    account_password_previous_is_wrong: "Previous password is wrong!",

    account_information_update_success: "Information updated!",
    account_information_update_failed_general: "Update failed!",

    account_my_account: "โปรไฟล์ของฉัน",
    account_login: "เข้าสู่ระบบ",
    account_my_cart: "My Cart",
}

function language_mapper(lang_ISO639) {
    switch (lang_ISO639) {
        case "en":
            return {
                123: "wow"
            }
        default:
            return {}
    }
}

function _i18() {
    const lang = {
        success: {
            id: 123
        }
    }

    Object.keys(lang).forEach((key) => {
        lang[key]["text"] = language_mapper("en")[lang[key]?.id]
    })

    return lang
}

// console.log(_i18().success)
