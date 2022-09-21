import React, {useEffect, useState} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export default function AutohideToast(props) {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position="top-end" className="p-3">
          <Toast bg='success' onClose={() => props.setShowToast(false)} show={props.showToast} delay={2000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto"></strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  )
}