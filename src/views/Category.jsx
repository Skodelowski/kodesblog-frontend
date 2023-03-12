import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosRequest from '@services/axiosRequest'
import { Container, Breadcrumb, Col, Row } from 'react-bootstrap'
import PostCard from '@components/PostCard'

const Category = () => {
  const [category, setCategory] = useState({})
  const [parentCategory, setParentCategory] = useState({})
  const [postsList, setPostsList] = useState(null)
  const userConnected = localStorage.getItem('token')

  let categorySlug = useParams()

  let colCount = 0
  let row = '</Row><Row>'

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

    const getPosts = async (slug) => {
      try {
        await axiosRequest
          .get(`/categories/${slug}/posts`)
          .then((res) => res.data.posts)
          .then((data) => {
            let posts = []
            data.map((post) => {
              posts.push(post)
            })
            setPostsList(posts)
          })
      } catch (err) {
        console.log(err)
      }
    }
    getPosts(categorySlug.slug)
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
          {userConnected && postsList && (
            <Row>
              {postsList.length > 0 &&
                postsList.map((post, key) => {
                  colCount = colCount === 3 ? 0 : colCount++
                  return (
                    <>
                      {colCount === 3 && { row }}
                      <Col>
                        <PostCard key={key} post={post} />
                      </Col>
                    </>
                  )
                })}
            </Row>
          )}
        </Container>
      )}
    </div>
  )
}

export default Category
