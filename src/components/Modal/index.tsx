import React from 'react';
import styles from './Modal.module.scss';


const Modal = (props: {
    styles?: any,
    onClose: any,
    children: React.ReactNode
}) => {



    return (
        <div className={styles.modalOverlay} onClick={props.onClose} >
            <div className={styles.modalContent} style={props.styles} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={props.onClose}>
                    &times;
                </button>



                {props.children}

            </div>
        </div>
    );
};

export default Modal;
