import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import { MensajeAlerta } from "../types";
import { useAuth } from "../hooks/useAuth";


export default function CambiarPassword() {

  const [alerta,setAlerta] = useState<MensajeAlerta>({
    msg: '',
    error: false
  });

  const {cambiarPassword} = useAuth();

  const [passwordPerfil,setPasswordPerfil] = useState({
    passwordActual: '',
    nuevoPassword: '',
    repetirNuevoPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordPerfil({
      ...passwordPerfil,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(Object.values(passwordPerfil).includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    //Validar Password
    if(passwordPerfil.nuevoPassword.length < 6){
      setAlerta({msg: 'La Contraseña tiene que ser de al menos 6 carácteres', error: true})
      return;
    }
    
    if(passwordPerfil.nuevoPassword !== passwordPerfil.repetirNuevoPassword){
      setAlerta({msg: 'Las contraseñas no son iguales', error: true})
      return;
    }

    const resultado = await cambiarPassword({
      passwordActual: passwordPerfil.passwordActual,
      nuevoPassword: passwordPerfil.nuevoPassword
    })

    setAlerta(resultado)

    setPasswordPerfil({
      passwordActual: '',
      nuevoPassword: '',
      repetirNuevoPassword: ''
    })
  }


  const {msg} = alerta;

  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-5">Cambiar Passsword</h2>
        <p className="text-xl my-2 text-center">Modifica tú {''}
            <span className="text-indigo-600 font-bold">Password aquí.</span>
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
                        <label htmlFor="" className="uppercase font-bold text-gray-600"> Password Actual</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="passwordActual"
                            onChange={handleChange}
                            value={passwordPerfil.passwordActual}
                        />
                    </div>

                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Nuevo Password</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nuevoPassword"
                            onChange={handleChange}
                            value={passwordPerfil.nuevoPassword}
                        />
                    </div>

                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Repetir Nuevo Password</label>
                        <input 
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="repetirNuevoPassword"
                            onChange={handleChange}
                            value={passwordPerfil.repetirNuevoPassword}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Guardar Password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer"
                         />
                </form>
            </div>
        </div>
    </>
  )
}
