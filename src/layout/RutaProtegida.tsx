import { Outlet, Navigate } from "react-router-dom"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppStore } from "../stores/useAppStore";
import Spinner from "../components/Spinner";

export default function RutaProtegida() {

  const veterinarioAutenticado = useAppStore(state => state.auth);
  const isLoading = useAppStore(state => state.loading);
 
  return (
    <>
      <Header />
      {
        isLoading ?
          <Spinner />
          :
          veterinarioAutenticado._id ? (
            <main className="container mx-auto mt-10">
              <Outlet />
            </main>
          ) : <Navigate to="/" />

      }
      <Footer />
    </>
  )
}
