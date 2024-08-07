import { MensajeAlerta } from "../types"

type AlertaProps = {
    alerta: MensajeAlerta
}

export default function Alerta({alerta}: AlertaProps) {
  return (
    <div className={`${alerta.error ? 'from-red-400  to-red-600' : 'from-indigo-400 to-indigo-500'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white text-font text-sm mb-2`}>
        {alerta.msg}
    </div>
  )
}
