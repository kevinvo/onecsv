import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TemplateModal = ({ templateName, onInputTemplateName, ...props }) => {
  const [show, setShow] = useState(false)
  const [templates, setTemplates] = useState([])
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    fetchListTemplates()
  }

  const navigate = useNavigate()

  const fetchListTemplates = () => {
    axios
      .get('/api/csv_template')
      .then(response => {
        setTemplates(response.data.templates)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onSaveTemplateName = () => {
    const data = {
      template_name: templateName,
    }

    axios
      .post('/api/csv_template', data)
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
      .post('/api/csv_header', data)
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
              { templates.length > 0 ? (
                <Form.Select aria-label="Default select template_name">
                  <option>Open this select the template</option>
                  {
                    templates.map((template, index) => (
                      <option value={template.id}>{template.name}</option>
                    ))
                  }
                </Form.Select>
              ) : (
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={templateName}
                    onChange={(event) => onInputTemplateName(event)}
                />
              )}
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
