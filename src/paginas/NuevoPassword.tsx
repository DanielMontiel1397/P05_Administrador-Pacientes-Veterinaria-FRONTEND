import { useEffect, useState } from "react"
import { useParams, Link, useNavigate} from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAppStore } from "../stores/useAppStore";

type VeterinarioPassword = {
  password: string,
  repetirPassword: string
}

export default function NuevoPassword() {

  const navigate = useNavigate();
  const params = useParams();
  const {token} = params;

  const [password, setPassword] = useState<VeterinarioPassword>({
    password: '',
    repetirPassword: ''
  });

  const alerta = useAppStore(state => state.alerta);
  const mostrarAlerta = useAppStore(state =>state.mostrarAlerta);
  const comprobarToken = useAppStore(state => state.comprobarToken);
  const nuevoPassword = useAppStore(state => state.nuevoPassword);

  const [tokenValido,setTokenValido] = useState(false)
  const [passwordModificado,setPasswordModificado] =useState(false);

  useEffect(()=>{
    
    const ejecutarFuncionComprobarToken = async () => {
      
      const respuestaToken = await comprobarToken(token);
      setTokenValido(respuestaToken);

    }
      
     
     ejecutarFuncionComprobarToken()
    
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(password).includes('')){
      mostrarAlerta({mensaje: 'Hay Campos vacios', error: true})
      return 
    }

    if(password.password.length < 6){
      mostrarAlerta({mensaje: 'El Password es muy corto', error: true})
      return;
    }

    if(password.password !== password.repetirPassword){
      mostrarAlerta({mensaje: 'Los password no son iguales', error: true});
      return;
    }
    
    const respuesta = await nuevoPassword({
      token: token,
      password: password.password
    })

    if(respuesta){
      setPasswordModificado(true)
      //Reiniciar State
      setPassword({
        password: '',
        repetirPassword: ''
      })
      navigate('/');
    }

  }

  const msg = alerta.mensaje;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Reestablece tú Password y no pierdas Acceso a tus 
              <span className="text-black"> Pacientes
              </span>
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

          {msg &&
            <Alerta
              alerta={alerta}
            />
          }
          
          {tokenValido && (
            <>
            <form 
              action=""
              onSubmit={handleSubmit}>

              <div>
                <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                <input 
                  type="password" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    placeholder="Tú Password"
                    name="password"
                    value={password.password}
                    onChange={handleChange}/>
              </div>

              <div className="mb-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                <input 
                  type="password" 
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                  placeholder="Repite tú password"
                  name="repetirPassword"
                  value={password.repetirPassword}
                  onChange={handleChange}/>
              </div>


              <input 
                type="submit" 
                className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10" 
                value="Guardar Nuevo Password"
                />
              
            </form>

            {passwordModificado && (
              <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes Cuenta? Inicia Sesión</Link>
            )}
            </>
          )}

        </div>

    </>
  )
}
