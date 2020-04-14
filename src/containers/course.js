import { connect } from 'react-redux'
import Register from '../components/Register/Register'
const mapStateToProps = (state) => {
    console.log(state)
    return {
       username:state.course.username,
       password:state.course.password,
       typ:state.course.typ,
    //    coursename:state.course.coursename
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // get handleCourseName(){
        //     return (value)=>
        //     dispatch({
        //         type:'SET_COURSENAME',
        //         payload:value
        //     })
        // },
        get handleUserName(){
            return (value)=>
                dispatch({
                    type:'SET_USERNAME',
                    payload:value
                })
        },
        get handlePassword(){
            return (value)=>
            dispatch({
                type:'SET_PASSWORD',
                payload:value
            })
        },
        get handleUser(){
            return (value)=>{
                dispatch({
                    type:'SET_USER',
                    payload:value
                })
            }
        },
        get handlenull(){
            return()=>{
                dispatch({
                    type:'SET_NULL'
                })
            }
        }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)