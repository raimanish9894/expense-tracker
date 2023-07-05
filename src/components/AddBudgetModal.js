import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudget } from "../context/BugetContextApi";

const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef();
  const maxSpendingRef = useRef();

  const { addBudget } = useBudget()

  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxSpendingRef.current.value)
          })
    handleClose()
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group controlId="max" className="mb-3">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxSpendingRef}
              type="number"
              required
              min={0}
              step={1}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
