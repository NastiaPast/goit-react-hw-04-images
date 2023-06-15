import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container, Overlay } from './Modal.styled';

const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) onCloseModal();
  };
  return (
    <Overlay onClick={handleBackdropClick}>
      <Container>{children}</Container>
    </Overlay>
  );
};
Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
