const Reducer = (state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFeching:true,
                error:false
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFeching:false,
                error:false
            };
        case "LOGIN_FAILOUR":
            return{
                user:null,
                isFeching:false,
                error:true
            };
        case "LOGOUT":
            return{
                user:null,
                isFeching:false,
                error:false
            };

            case "UPDATE_START":
                return{
                    user:state.user,
                    isFeching:true,
                    error:false
                };
            case "UPDATE_SUCCESS":
                return{
                    user:action.payload,
                    isFeching:false,
                    error:false
                };
            case "UPDATE_FAILOUR":
                return{
                    user:state.user,
                    isFeching:false,
                    error:true
                };

        default:
            return state
    }
}
export default Reducer