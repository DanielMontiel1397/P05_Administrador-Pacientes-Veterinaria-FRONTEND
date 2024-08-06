import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('UseAuth must be within a AuthProvider')
    }
    return context;
}