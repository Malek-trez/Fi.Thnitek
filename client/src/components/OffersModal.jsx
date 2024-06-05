import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import AddOffer from "./Offers.jsx";
import { NavDropdown } from 'react-bootstrap';

function OffersModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Add New Offer</NavDropdown.Item>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          < AddOffer />
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit" className="button-5"  form="AddOfferForm" onClick={handleClose} >submit</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OffersModal;