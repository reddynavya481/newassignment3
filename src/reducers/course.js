const initialState = {
username:'',
password:'',
typ:'user',
coursename:'',
login:false,
player:false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
        return{
            ...state,
            username:action.payload
        }
        // case 'SET_COURSENAME':
        // return{
        //     ...state,
        //     coursename:action.payload
        // }
        case 'SET_PASSWORD':
        return{
            ...state,
            password:action.payload
        }
        case 'SET_NULL':
        return{
            ...state,
            username:'',
            password:''
        }
        case  'SET_USER':
        return{
            ...state,
            typ:action.payload
            
        }
        case 'SET_URL':
        return{
            ...state,
            player:true,
            courseurl:action.payload

        }
        case 'SET_LOGOUT':
        return{
            ...state,
            username:'',
            password:'',
            typ:''
        }
        default:
            return state
    }
}