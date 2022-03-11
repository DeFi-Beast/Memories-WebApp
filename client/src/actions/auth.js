import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index"


export const signin  =(formData, navigate)=> async(dispatch) => {
    try {
        const {data} = await api.signIn(formData)
        // login user
        dispatch({type:AUTH, data})
        navigate("/")

    } catch (error) {
        console.log(error)
    }
}

export const signup =(formData, navigate)=> async(dispatch) => {
    try {
        const {data} = await api.signUp(formData)
        dispatch({type:AUTH, data})
        
        //signup user

        navigate("/")

    } catch (error) {
        console.log(error)
    }
}

