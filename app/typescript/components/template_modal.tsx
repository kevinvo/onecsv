import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TemplateModal = ({ templateName, onInputTemplateName, ...props }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const navigate = useNavigate()

  const onSaveTemplateName = () => {
    const data = {
      template_name: templateName,
    }

    axios
      .post('/api/template', data)
      .then(function (response) {
        console.log(response)
        setShow(false)
        onSave()
        navigate('/clean-and-finalize')
      })
      .catch(function (error) {
        console.log(error)
        setShow(true)
      })
  }

  function onSave() {
    const data = {
      csv_headers: props.headers,
    }

    axios
      .post('/api/header', data)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <Button type='button' className='btn btn-md btn-primary' onClick={handleShow}>
        Save & Continue
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please input your template name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Template Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={templateName}
                onChange={(event) => onInputTemplateName(event)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => onSaveTemplateName()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TemplateModal
