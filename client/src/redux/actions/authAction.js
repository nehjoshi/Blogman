const authAction = (username, token) => {
    return {
        type: 'AUTH_SUCCESS',
        payload: {
            username: username,
            token: token
        }
    }
}
export default authAction;