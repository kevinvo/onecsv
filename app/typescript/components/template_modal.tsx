import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TemplateModal = ({ headers }) => {
  const [show, setShow] = useState(false)
  const [templates, setTemplates] = useState([])
  const [templateId, setTemplateId] = useState()
  const [showNewTemplate, setShowNewTemplate] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleShowNewTemplate = () => setShowNewTemplate(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('/api/template')
      .then(response => {
        const templates = response.data.templates
        const currentTemplate = response.data.current_template
        setTemplates(templates)
        setTemplateId(currentTemplate.id)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const onUpdateTemplate = () => {
    axios
      .put("/api/template/" + templateId)
      .then(response => {
        setShow(false)
        onSaveHeaders()
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
        onSaveHeaders()
        navigate('/clean-and-finalize')
      })
      .catch(function (error) {
        console.log(error)
        setShow(true)
      })
  }

  function onSaveHeaders() {
    const data = {
      csv_headers: headers,
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

  const onInputTemplateName = (e) => {
    const value = e.target.value
    setTemplateName(value)
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
                <Form.Select aria-label="Default select template_name" defaultValue={templates[0].id} onChange={(e) => handleChange(e)}>
                  {
                    templates.map((template, index) => (
                      <option key={index} value={template.id}>
                        {template.name}
                      </option>
                    ))
                  }
                </Form.Select>
              ) : (
                <Form.Control
                  type='text'
                  placeholder='Enter name'
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
