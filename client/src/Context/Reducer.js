import { userActions } from "./Action"

const Reducer = (state, action) => {

    switch (action.type) {

        case userActions.LoadingStart:
            return {
                user: null,
                isFeching: true,
                error: false
            };
        case userActions.LoadingSuccess:
            return {
                user: action.payload,
                isFeching: false,
                error: false
            };
        case userActions.LoadingFailour:
            return {
                user: null,
                isFeching: false,
                error: true
            };
        case userActions.Logout:
            return {
                user: null,
                isFeching: false,
                error: false
            };

        case userActions.UpdateStart:
            return {
                user: state.user,
                isFeching: true,
                error: false
            };
        case userActions.UpdateSuccess:
            return {
                user: action.payload,
                isFeching: false,
                error: false
            };
        case userActions.UpdateFailour:
            return {
                user: state.user,
                isFeching: false,
                error: true
            };

        default:
            return state
    }
}
export default Reducer