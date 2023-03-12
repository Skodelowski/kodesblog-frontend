import { Form, Col, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const TagsInput = ({ postTags }) => {
  const [tags, setTags] = useState([])

  if (postTags) {
    useEffect(() => {
      setTags(postTags.split(','))
    }, [])
  }

  function handleTags(e) {
    if (e.key !== ' ') return
    const value = e.target.value

    if (!value.trim()) return

    let finalValue = value.toLowerCase()
    setTags([...tags, finalValue])
    e.target.value = ''
  }

  const deleteTag = (index) => {
    setTags(tags.filter((el, i) => i !== index))
  }

  return (
    <Row>
      <Col className="col-md-4">
        <Form.Control
          type="text"
          onKeyDown={handleTags}
          placeholder="Tags (space to add)"
        />
        <Form.Control type="hidden" name="tags" value={tags} />
      </Col>
      <Col className="col-md-8">
        <div className="tags-input-container">
          {tags.map((tag, index) => (
            <div className="tag-item" key={index}>
              <span className="text">{tag}</span>
              <span className="close" onClick={() => deleteTag(index)}>
                &times;
              </span>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  )
}

export default TagsInput
