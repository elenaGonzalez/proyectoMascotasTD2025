import NavbarMain from '../component/layout/Navbar.jsx'
import Principal from '../component/layout/Principal.jsx'
import Footer from '../component/layout/Footer.jsx'
import Cards from '../component/layout/Cards.jsx'
import CarruselMascotas from '../component/layout/CarruselMascotas.jsx'

function Home() {
    return (
        <>
            <NavbarMain />
            <Principal />

            <CarruselMascotas />

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
            <Cards />

            <Footer />
        </>
    )
}

export default Home
