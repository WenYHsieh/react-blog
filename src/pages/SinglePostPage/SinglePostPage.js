import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getPosts } from '../../api'
import { Loading } from '../../components/Loading'

const SinglePostWrapper = styled.div`
  width: 60%;
  margin: 20px auto;
`
const SinglePostTitle = styled.div`
  font-size: 18px;
  color: #5e5e5e;
`
const SinglePostInfos = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #b4b4b4;
  align-items: baseline;
`
const SinglePostDate = styled.div`
  font-size: 16px;
  color: #b4b4b4;
  min-width: 150px;
  text-align: right;
`
const SinglePostContent = styled.div`
  font-size: 16px;
  color: #b4b4b4;
`

function SinglePostItem({ SinglePost }) {
  return (
    <>
      <SinglePostWrapper>
        <SinglePostInfos>
          <SinglePostTitle>{escape(SinglePost.title)}</SinglePostTitle>
          <SinglePostDate>
            {new Date(SinglePost.createdAt).toDateString()}
          </SinglePostDate>
        </SinglePostInfos>
        <SinglePostContent>
          {SinglePost.body.split('\n').map((item, id) => {
            return (
              <span key={id}>
                {item}
                <br />
              </span>
            )
          })}
        </SinglePostContent>
      </SinglePostWrapper>
    </>
  )
}

export default function SinglePost() {
  const { id } = useParams()
  const [SinglePost, setSinglePosts] = useState([])
  let [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getPosts(id, '').then((data) => {
      if (data) {
        setSinglePosts(data.data)
        setIsLoaded(true)
      }
    })
  }, [id])

  return (
    <>{isLoaded ? <SinglePostItem SinglePost={SinglePost} /> : <Loading />}</>
  )
}
