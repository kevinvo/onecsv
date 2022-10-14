import React, { Dispatch, SetStateAction } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

type AutohideToastProps = {
  message: string
  showToast: boolean
  setShowToast: Dispatch<SetStateAction<string>>
}

export default function AutohideToast({ message, showToast, setShowToast }: AutohideToastProps) {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer position='top-end' className='p-3'>
          <Toast
            bg='success'
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={2000}
            autohide
          >
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  )
}
