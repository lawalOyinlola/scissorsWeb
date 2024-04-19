import { useEffect } from "react";
import "../css/modal.css";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  // Close modal after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal">
      <p className="modal-content">{message}</p>
    </div>
  );
};

export default Modal;
