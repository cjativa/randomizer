import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface ModalProps {
    shouldBeOpen: boolean,
    onRequestClose?: () => void,
    component?: JSX.Element
};

const Modal = (props: ModalProps) => {
    return (
        <ReactModal
            isOpen={props.shouldBeOpen}
            onRequestClose={props.onRequestClose}
            className="Modal"
            overlayClassName="Overlay"
        >
            {props.component}
        </ReactModal>

    );
};

export default Modal;