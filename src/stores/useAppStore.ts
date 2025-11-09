import { create } from "zustand";
import { authSlice, AuthSliceType } from "./authSlice";
import { devtools } from "zustand/middleware";
import { alertaFormularioSlice, AlertaFormularioSliceType } from "./alertaFormularioSlice";
import { pacienteSlice, PacienteSliceType } from "./pacientesSlice";

export const useAppStore = create<AuthSliceType & AlertaFormularioSliceType & PacienteSliceType >()(devtools(
    ((...a) => ({
        ...authSlice(...a),
        ...pacienteSlice(...a),
        ...alertaFormularioSlice(...a)
    }))
))
