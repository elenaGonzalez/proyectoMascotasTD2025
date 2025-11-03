import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function Contacto({ show, onHide }) {
return (
    <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
        <Modal.Title>Contáctanos</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <h5 className="text-primary text-center mb-3">Información de contacto</h5>
        <p><strong>📍 Dirección:</strong> Av. Principal 4517, Corrientes, Argentina</p>
        <p><strong>📞 Teléfono:</strong> +54 (379) 4 123 456</p>
        <p><strong>✉️ Correo electrónico:</strong> contacto@electroweb.com</p>
        <div className="mt-3">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28316.206254477373!2d-58.81148898345227!3d-27.48401923122374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sus!4v1748461896754!5m2!1ses!2sus"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
        ></iframe>
        </div>
    </Modal.Body>
    </Modal>
);
}

export default Contacto;
