import { useState } from 'react'
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

    return (
        <>
            <NavbarMain 
            onLoginClick={() => setShowLogin(true)}
            onRegistroClick={() => setShowRegistro(true)}
            />
            <Principal />
            <div className="cards-container"><Cards
                title="Título de la Tarjeta"
                text="Este es un texto de ejemplo para la tarjeta."
                imageSrc="https://www.adoptagratis.com/wp-content/uploads/2025/10/IMG_1934-400x300.jpeg.webp"
                buttonLink="#"
                buttonText="Ir a algún lugar"
            /></div>

            <Cards
                title="Título de la Tarjeta"
                text="Este es un texto de ejemplo para la tarjeta."
                imageSrc="https://www.adoptagratis.com/wp-content/uploads/2025/10/IMG_1934-400x300.jpeg.webp"
                buttonLink="#"
                buttonText="Ir a algún lugar"
            />
            <Cards
                title="Título de la Tarjeta"
                text="Este es un texto de ejemplo para la tarjeta."
                imageSrc="https://www.adoptagratis.com/wp-content/uploads/2025/10/IMG_1934-400x300.jpeg.webp"
                buttonLink="#"
                buttonText="Ir a algún lugar"
            />

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
