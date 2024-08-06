import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

export const usePacientes = () =>{
    const context = useContext(PacientesContext);
    if(!context){
        throw new Error('UseAuth must be within a AuthProvider')
    }
    return context;
}