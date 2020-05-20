import { connect } from 'react-redux'
import Register from '../components/Register/Register1'
const mapStateToProps = (state) => {
    return {
        username: state.course.username,
        password: state.course.password,
        typ: state.course.typ,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get handleUserName() {
            return (value) =>
                dispatch({
                    type: 'SET_USERNAME',
                    payload: value
                })
        },
        get handlePassword() {
            return (value) =>
                dispatch({
                    type: 'SET_PASSWORD',
                    payload: value
                })
        },
        get handleUser() {
            return (value) => {
                dispatch({
                    type: 'SET_USER',
                    payload: value
                })
            }
        },
        get onLogout() {
            return () =>
                dispatch({
                    type: 'SET_LOGOUT'
                })
        },
        get handlenull() {
            return () => {
                dispatch({
                    type: 'SET_NULL'
                })
            }
        }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)