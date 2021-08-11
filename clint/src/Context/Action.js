export const LoadingStart = (userCredential)=>({
    type:"LOGIN_START",
})
export const LoadingSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user,
})
export const LoadingFailour = ()=>({
    type:"LOGIN_FAILOUR",
})
export const Logout = ()=>({
    type:"LOGOUT",
})

export const UpdateStart = (userCredential)=>({
    type:"UPDATE_START",
})
export const UpdateSuccess = (user)=>({
    type:"UPDATE_SUCCESS",
    payload:user,
})
export const UpdateFailour = ()=>({
    type:"UPDATE_FAILOUR",
})