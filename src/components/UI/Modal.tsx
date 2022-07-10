import Button from "./Button";

import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

interface ModalProps {
  show: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = (props) => {
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={props.onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>{props.title}</h4>
        </div>
        <div className={styles.modalBody}>{props.children}</div>
        <p className={styles.modalDescription}>
          Are you sure you want to do that?
        </p>
        <div className={styles.modalFooter}>
          <div className={styles.modalAction}>
            <Button onClick={props.onConfirm} type="button">
              Yes
            </Button>
          </div>
          <div className={styles.modalAction}>
            <Button
              className={styles.buttonModal}
              onClick={props.onClose}
              type="button"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
