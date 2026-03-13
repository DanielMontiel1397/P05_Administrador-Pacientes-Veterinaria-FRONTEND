// paginas/NoEncontrado.tsx
export default function NoEncontrado() {
  return (
    <div className="flex h-screen items-center justify-center flex-col bg-gray-100">
      <h1 className="text-6xl font-extrabold text-gray-700">404</h1>
      <p className="mt-4 text-xl text-gray-500">La página que buscas no existe.</p>
      <a href="/" className="mt-6 text-indigo-600 font-bold hover:underline">
        Volver al inicio
      </a>
    </div>
  );
}