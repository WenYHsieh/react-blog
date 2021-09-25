import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getPosts } from '../../api'
import { Loading } from '../../components/Loading'

const BlogPostWrapper = styled.div`
  width: 80%;
  margin: 20px auto;
`
const BlogPostTitle = styled.div`
  font-size: 18px;
  color: #5e5e5e;
`
const BlogPostInfos = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #b4b4b4;
  align-items: baseline;
`
const BlogPostDate = styled.div`
  font-size: 16px;
  color: #b4b4b4;
  min-width: 150px;
  text-align: right;
`
const BlogPostContent = styled.div`
  font-size: 16px;
  color: #b4b4b4;
`

function BlogPostItem({ blogPost }) {
  return (
    <>
      <BlogPostWrapper>
        <BlogPostInfos>
          <BlogPostTitle>{blogPost.title}</BlogPostTitle>
          <BlogPostDate>
            {new Date(blogPost.createdAt).toDateString()}
          </BlogPostDate>
        </BlogPostInfos>
        <BlogPostContent>{blogPost.body}</BlogPostContent>
      </BlogPostWrapper>
    </>
  )
}

export default function BlogPost() {
  const { id } = useParams()
  const [blogPost, setBlogPosts] = useState([])
  let [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getPosts(id, '').then((data) => {
      if (data) {
        setBlogPosts(data.data)
        setIsLoaded(true)
      }
    })
  }, [id])

  return <>{isLoaded ? <BlogPostItem blogPost={blogPost} /> : <Loading />}</>
}
