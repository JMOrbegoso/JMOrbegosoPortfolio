import React from 'react';
import { Modal } from 'react-bootstrap';

type Props = {
  title: string;
  message: string;
  show: boolean;
  onHide: any;
};

const ModalResult = ({ title, message, show, onHide }: Props) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ModalResult;
