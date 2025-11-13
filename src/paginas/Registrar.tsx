import { useState } from "react"
import { Link } from "react-router-dom"
import { Veterinario } from "../types"
import Alerta from "../components/Alerta";
import { useAppStore } from "../stores/useAppStore";

export default function Registrar() {

  const registrarVeterinario = useAppStore(state => state.registrarVeterinario);
  const alertaFormulario = useAppStore(state => state.alerta);
  const mostrarAlerta = useAppStore(state => state.mostrarAlerta);

  const [veterinario, setVeterinario] = useState<Veterinario>({
    nombre: '',
    email: '',
    password: '',
    repetirPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVeterinario({
      ...veterinario,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(veterinario).includes('')) {
      mostrarAlerta({ mensaje: 'Hay Campos vacios', error: true })
      return
    }

    //Validar Nombre
    if (!(/^[A-Za-z\s]+$/.test(veterinario.nombre))) {
      mostrarAlerta({
        mensaje: 'El Nombre tienen que ser sólo letras',
        error: true
      })
      return;
    }

    //Validar email
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (!regex.test(veterinario.email)) {
      mostrarAlerta({
        mensaje: 'El Email no es valido',
        error: true
      })
      return;
    }

    //Validar Password
    if (veterinario.password.length < 6) {
      mostrarAlerta({ mensaje: 'La Contraseña tiene que ser de al menos 6 carácteres', error: true })
      return;
    }

    if (veterinario.password !== veterinario.repetirPassword) {
      mostrarAlerta({ mensaje: 'Las contraseñas no son iguales', error: true })
      return;
    }

    await registrarVeterinario(veterinario);

    setVeterinario({
      nombre: '',
      email: '',
      password: '',
      repetirPassword: ''
    })
    /*
    //Crear el usuario en la API
    try {
      await clienteAxios.post(`/veterinarios`, {
        nombre: veterinario.nombre,
        email: veterinario.email,
        password: veterinario.password
      });

      mostrarAlerta({ mensaje: 'Creado Correctamente, Revisa tú email', error: false })

      //Reiniciar state
      setVeterinario({
        nombre: '',
        email: '',
        password: '',
        repetirPassword: ''
      })

    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        mostrarAlerta({
          mensaje: error.response?.data?.msg,
          error: true
        })
      } else {
        console.log('Error desconocido al actualizar el perfil');
      }
  
      setVeterinario({
        ...veterinario,
        password: '',
        repetirPassword: ''
      })
    }
    */
  }


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tú cuenta y Administra tus
          <span className="text-black"> Pacientes
          </span>
        </h1>
      </div>

      <div className="mt-2 md:mt-0 shadow-lg px-5 py-10 rounded-xl bg-white">

        {alertaFormulario.mensaje &&
          <Alerta
            alerta={alertaFormulario}
          />
        }
        <form
          action=""
          onSubmit={handleSubmit}>

          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
            <input
              type="text"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Tú Nombre"
              name="nombre"
              value={veterinario.nombre}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input
              type="text"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Email de Registro"
              name="email"
              value={veterinario.email}
              onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Tú Password"
              name="password"
              value={veterinario.password}
              onChange={handleChange} />
          </div>

          <div className="mb-5">
            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
            <input
              type="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              placeholder="Repite tú password"
              name="repetirPassword"
              value={veterinario.repetirPassword}
              onChange={handleChange} />
          </div>


          <input
            type="submit"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
            value="Crea tú cuenta"
          />

        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes Cuenta? Inicia Sesión</Link>
          <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}