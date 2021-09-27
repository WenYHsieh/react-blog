import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPosts } from '../../api'
import { Loading } from '../../components/Loading'

const Title = styled.div`
  font-size: 30px;
  width: 200px;
  text-align: center;
  margin: 20px auto;
  color: #5e5e5e;
`

const PostWrapper = styled.div`
  width: 60%;
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
const PostSummary = styled.div`
  width: 60%;
  font-size: 16px;
  margin: 0 auto;
  color: #5e5e5e;
  text-align: center;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
`

const PaginationText = styled.div`
  &:hover {
    cursor: pointer;
    color: #bababa;
  }
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

export default function PostArchivesPage() {
  const [posts, setPosts] = useState([])
  const [postsLength, setPostsLength] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getPosts('', `?_sort=createdAt&_order=desc`).then((data) => {
      if (data) {
        setPostsLength(data.data.length)
      }
    })
  }, [])

  useEffect(() => {
    getPosts(
      '',
      `?_sort=createdAt&_page=${currentPage}&_limit=7&_order=desc`
    ).then((data) => {
      if (data) {
        setPosts(data.data)
        setIsLoaded(true)
      }
    })
  }, [currentPage])

  const handlePagination = (e) => {
    e.target.getAttribute('name') === 'back'
      ? setCurrentPage(currentPage - 1)
      : setCurrentPage(currentPage + 1)
  }

  return (
    <>
      {isLoaded ? <Title>Archive</Title> : null}
      {isLoaded ? posts.map((post) => <Post post={post} />) : <Loading />}
      {isLoaded ? (
        <PostSummary>
          {currentPage !== 1 ? (
            <PaginationText name='back' onClick={(e) => handlePagination(e)}>
              Back
            </PaginationText>
          ) : (
            <PaginationText></PaginationText>
          )}
          {`${currentPage} / ${Math.ceil(postsLength / 7)}`}
          {currentPage !== Math.ceil(postsLength / 7) ? (
            <PaginationText name='next' onClick={(e) => handlePagination(e)}>
              Next
            </PaginationText>
          ) : (
            <PaginationText></PaginationText>
          )}
        </PostSummary>
      ) : null}
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object,
}
