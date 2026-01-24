import { AlertTriangle } from 'lucide-react';
import './ModalConfimacionPresupuesto.css';

const ModalConfirmacion = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    titulo = "¿Estás seguro?", 
    mensaje, 
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",
    tipo = "danger"
}) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="modal-confirmacion-overlay" onClick={onClose}>
            <div className="modal-confirmacion-content" onClick={(e) => e.stopPropagation()}>
                <div className={`modal-confirmacion-icon ${tipo}`}>
                    <AlertTriangle size={48} />
                </div>

                <h2 className="modal-confirmacion-titulo">{titulo}</h2>
                
                {mensaje && (
                    <p className="modal-confirmacion-mensaje">{mensaje}</p>
                )}

                <div className="modal-confirmacion-actions">
                    <button
                        className="boton-secundario boton-largo"
                        onClick={onClose}
                    >
                        {textoCancelar}
                    </button>
                    <button
                        className={`boton-primario boton-largo ${tipo === 'danger' ? 'boton-danger' : ''}`}
                        onClick={handleConfirm}
                    >
                        {textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;