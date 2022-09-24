import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TemplateModal = ({ templateName, onInputTemplateName, ...props }) => {
  const [show, setShow] = useState(false)
  const [templates, setTemplates] = useState([])
  const [templateId, setTemplateId] = useState()
  const [showNewTemplate, setShowNewTemplate] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    fetchListTemplates()
  }
  const handleShowNewTemplate = () => setShowNewTemplate(true)
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
  const onUpdateTemplate = () => {
    axios
      .put("/api/csv_template/" + templateId)
      .then(response => {
        setShow(false)
        navigate('/clean-and-finalize')
      })
      .catch(error => {console.log(error)})
  }

  const onSaveTemplate = () => {
    const data = {
      template_name: templateName,
    }

    axios
      .post('/api/template', data)
      .then(function (response) {
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

  const handleChange = (event) => {
    setTemplateId(event.target.value)
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
              { (templates.length > 0 && showNewTemplate === false) ? (
                <Form.Select aria-label="Default select template_name" onChange={(e) => handleChange(e)}>
                  {
                    templates.map((template, index) => (
                      <option key={index} value={template.id}>{template.name}</option>
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
          {
            (templates.length > 0 && showNewTemplate === false) ?  (
                <>
                  <Button variant='primary' onClick={() => handleShowNewTemplate()}>
                    Create New Template
                  </Button>
                  <Button variant='primary' onClick={() => onUpdateTemplate()}>
                    Update Changes
                  </Button>
                </>
              ) : (
              <Button variant='primary' onClick={() => onSaveTemplate()}>
                Save Changes
              </Button>
            )
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TemplateModal
