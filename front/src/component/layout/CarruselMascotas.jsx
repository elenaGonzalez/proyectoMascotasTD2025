import Carousel from 'react-bootstrap/Carousel';

// Puedes usar imágenes de prueba mientras integran la API.
const imagenesCarrusel = [
  { id: 1, src: 'https://www.adoptagratis.com/wp-content/uploads/2025/10/IMG_1934-400x300.jpeg.webp', alt: 'Perro feliz' },
  { id: 2, src: 'https://www.adoptagratis.com/wp-content/uploads/2025/10/CACHORRO-3-400x300.jpg.webp', alt: 'Gato dormido' },
  { id: 3, src: 'https://www.adoptagratis.com/wp-content/uploads/2024/11/20231224_194640-400x300.jpg.webp', alt: 'Adoptar es genial' },
];

function CarruselMascotas() {
  return (
    <div className="my-5">
      {/* 1. Usar el componente Carousel de React-Bootstrap */}
      <Carousel interval={5000} pause="hover"> 
        
        {/* 2. Mapear (recorrer) el arreglo de imágenes para crear cada slide */}
        {imagenesCarrusel.map((item) => (
          <Carousel.Item key={item.id}>
            
            {/* Imagen del Carrusel */}
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            
            {/* Texto que aparece sobre la imagen */}
            <Carousel.Caption>
              <h3>{item.alt}</h3>
              <p>¡El momento de adoptar es ahora!</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarruselMascotas;