import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getPosts } from '../../api'
import { Loading } from '../../components/Loading'

const PostWrapper = styled.div`
  width: 80%;
  height: 60px;
  border-bottom: 1px solid #b4b4b4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  position: relative;
`

const PostTitle = styled(Link)`
  font-size: 18px;
  color: #5e5e5e;
  &:hover {
    color: #bababa;
  }
`

const PostDate = styled.div`
  font-size: 14px;
  color: #b4b4b4;
  min-width: 150px;
  text-align: right;
`

function Post({ post }) {
  return (
    <>
      <PostWrapper>
        <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toDateString()}</PostDate>
      </PostWrapper>
    </>
  )
}

export default function HomePage() {
  const [posts, setPosts] = useState([])
  let [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getPosts('', '?_sort=createdAt&_order=desc').then((data) => {
      if (data) {
        setPosts(data.data)
        setIsLoaded(true)
      }
    })
  }, [])

  return (
    <>{isLoaded ? posts.map((post) => <Post post={post} />) : <Loading />}</>
  )
}

Post.propTypes = {
  post: PropTypes.object,
}
