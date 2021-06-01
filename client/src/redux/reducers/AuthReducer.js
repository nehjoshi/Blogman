const AuthReducer = (initState = {
    username: null,
    token: null,
    otp: null
}, action) => {
    switch (action.type){
        case 'AUTH_SUCCESS':
            return {
                username: action.payload.username,
                token: action.payload.token
            }
            break;
        case 'REG':
            return {
                regUsername: action.payload.username,
                regPassword: action.payload.password,
                regEmail: action.payload.email,
                otp: action.payload.otp
            }

            default: return initState
    }
}
export default AuthReducer;