import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

interface ModalProps {
    shouldBeOpen: boolean,
    onRequestClose?: () => void,
    component?: JSX.Element
};

const customStyles = {
    content: {
        top: '3em',
        bottom: '3em',
    }
};

const Modal = (props: ModalProps) => {
    return (
        <ReactModal
            isOpen={props.shouldBeOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
        >
            {props.component}
        </ReactModal>

    );
};

export default Modal;