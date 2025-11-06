import { useEffect, useState } from 'react'
import NavbarMain from '../component/layout/Navbar.jsx'
import Principal from '../component/layout/Principal.jsx'
import Footer from '../component/layout/Footer.jsx'
import Cards from '../component/layout/Cards.jsx'
import Login from '../component/auth/Login.jsx'
import Registro from '../component/auth/Registro.jsx'
import Soporte from "../component/support/Soporte.jsx"
import Contacto from "../pages/Contacto.jsx";

function Home() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegistro, setShowRegistro] = useState(false)
    const [showSoporte, setShowSoporte] = useState(false)
    const [showContacto, setShowContacto] = useState(false);

    /*
    const [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/publicaciones')
            .then((response) => response.json())
            .then((data) => setPublicaciones(data))
    }, []);
    */

    const [mascotas, setMascotas] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/mascotas')
            .then((response) => response.json())
            .then((data) => setMascotas(data))
    }, []);

const [publicaciones, setPublicaciones] = useState([]);
  useEffect(()=>{
fetch('http://localhost:3000/api/publicaciones')
        .then((response)=> response.json())
        .then((data)=> setPublicaciones(data))
  },[]);

    return (
        <>
            {console.log(mascotas)}
            <NavbarMain
                onLoginClick={() => setShowLogin(true)}
                onRegistroClick={() => setShowRegistro(true)}
            />
            <Principal />

            <Cards mascotas={mascotas} />




            <Footer
                onLoginClick={() => setShowLogin(true)}
                onRegistroClick={() => setShowRegistro(true)}
                onSoporteClick={() => setShowSoporte(true)}
                onContactoClick={() => setShowContacto(true)}
            />

            <Login show={showLogin} onHide={() => setShowLogin(false)} />
            <Registro show={showRegistro} onHide={() => setShowRegistro(false)} />
            <Soporte show={showSoporte} onHide={() => setShowSoporte(false)} />
            <Contacto show={showContacto} onHide={() => setShowContacto(false)} />

        </>
    )
}

export default Home
