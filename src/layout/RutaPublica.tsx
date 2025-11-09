
import Spinner from "../components/Spinner";

import { Navigate } from "react-router-dom";

import { useAppStore } from "../stores/useAppStore";
import AuthLayout from "./AuthLayout";


export default function RutaPublica() {

    const veterinarioAutenticado = useAppStore(state => state.auth);
    const isLoading = useAppStore(state => state.loading);

    return (

        isLoading ?
            <Spinner />
            :
            veterinarioAutenticado._id ? (
                <Navigate to="/admin" />

            ) : <AuthLayout />


    )
}
