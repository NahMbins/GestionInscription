import { useLocation,Navigate } from "react-router-dom";

export const setToken = (token)=>{
    localStorage.setItem('token',token)
}

export const fetchToken = (token) =>{
    return localStorage.getItem('token')
}

export function RequireToken({children}){
    let auth = fetchToken()
    let location = useLocation()

    if(!auth){
        return <Navigate to='/auth' state = {{from: location}}/>;
    }
    return children;
}