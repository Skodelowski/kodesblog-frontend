import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axiosRequest from '@services/axiosRequest'
import { Container, ButtonGroup, Button, Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faPlus } from '@fortawesome/free-solid-svg-icons'

const Category = () => {
  const [category, setCategory] = useState({})
  const [parentCategory, setParentCategory] = useState({})

  let categorySlug = useParams()

  useEffect(() => {
    const getCategory = async (slug) => {
      axiosRequest
        .get(`/categories/${slug}`)
        .then((res) => res.data)
        .then((categoryData) => {
          const category = categoryData.category
          const parentCategory = categoryData.parent
          setCategory(category)
          setParentCategory(parentCategory)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getCategory(categorySlug.slug)
  }, [])

  //console.log(category, parentCategory)

  return (
    <div>
      {category && (
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/categories">Categories</Breadcrumb.Item>
            {parentCategory && parentCategory._id !== category._id && (
              <Breadcrumb.Item href={`/categories/${parentCategory.slug}`}>
                {parentCategory.title}
              </Breadcrumb.Item>
            )}
            <Breadcrumb.Item href={`/categories/${category.slug}`}>
              {category.title}
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1>{category.title}</h1>
          <p>...</p>
        </Container>
      )}
    </div>
  )
}

export default Category
