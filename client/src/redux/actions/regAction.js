const regAction = (email, username, password, otp) => {
    return {
        type: "REG",
        payload: {
            email: email,
            username: username,
            password: password,
            otp: otp
        }
    }
}
export default regAction;