import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import { PerfilVeterinarioFormulario } from "../types";
import Alerta from "../components/Alerta";
import { useAppStore } from "../stores/useAppStore";

export default function EditarPerfil() {

    const alerta = useAppStore(state => state.alerta);
    const mostrarAlerta = useAppStore(state => state.mostrarAlerta);

    const auth = useAppStore(state => state.auth);
    const editarPerfil = useAppStore(state => state.editarPerfil);

    const [perfil, setPerfil] = useState<PerfilVeterinarioFormulario>({
        nombre: '',
        email: '',
        telefono: '',
        web: '',
        _id: ''
    });

    useEffect(() => {
        setPerfil({
            nombre: auth.nombre,
            email: auth.email,
            telefono: auth.telefono,
            web: auth.web,
            _id: auth._id
        });
    }, [auth]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerfil(
            {
                ...perfil,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { nombre, email } = perfil;
        if ([nombre, email].includes('')) {
            mostrarAlerta({
                mensaje: 'Todos los campos son Obligatorios',
                error: true
            })
            return;
        }

        //Validar Nombre
        if (!(/^[A-Za-z\s]+$/.test(perfil.nombre))) {
            mostrarAlerta({
                mensaje: 'El Nombre tienen que ser sólo letras',
                error: true
            })
            return;
        }

        //Validar numero de telefono si se agrega uno
        if(perfil.telefono){
            
            if (!(/^[0-9]+$/.test(perfil.telefono))) {
                mostrarAlerta({
                    mensaje: 'El Número tienen que ser sólo números',
                    error: true
                })
                return;
            }
        }

        //Validar email
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        if (!regex.test(perfil.email)) {
            mostrarAlerta({
                mensaje: 'El Email no es valido',
                error: true
            })
            return;
        }

        await editarPerfil(perfil);

    }

    const msg = alerta.mensaje;

    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tú {''}
                <span className="text-indigo-600 font-bold">Informacion aquí.</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shador rounded-lg p-5">

                    {msg &&
                        <Alerta
                            alerta={alerta}
                        />}

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600"> Nombre</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="nombre"
                                value={perfil.nombre}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">Sitio Web</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="web"
                                value={perfil.web || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">Telefono</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="telefono"
                                value={perfil.telefono || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="email"
                                value={perfil.email}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}
