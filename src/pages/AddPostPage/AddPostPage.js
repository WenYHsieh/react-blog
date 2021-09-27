import styled from 'styled-components'
import { useState } from 'react'
import { addPost } from '../../api'

const AddPostWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`
const Title = styled.div`
  font-size: 30px;
  margin: 20px 0;
  color: #5e5e5e;
`
const TitleInput = styled.input`
  width: 100%;
  height: 35px;
  margin: 20px 0;
  border: 1px solid #b4b4b4;
  padding: 20px;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 1px solid #e3adff;
  }
  &::placeholder {
    color: #b4b4b4;
  }
`
const ContentInput = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #b4b4b4;
  padding: 20px;
  border-radius: 5px;
  resize: vertical;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 1px solid #e3adff;
  }
  &::placeholder {
    color: #b4b4b4;
  }
`
const SubmitBtn = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px 20px;
  border: 1px solid #b4b4b4;
  border-radius: 15px;
  margin-top: 25px;
  font-size: 16px;
  color: #b4b4b4;
  text-align: center;
  transition: 0.5s linear;
  &:hover {
    cursor: pointer;
    background-color: #e3adff;
    color: white;
  }
`
const AlertMsg = styled.div`
  color: red;
  margin-top: 20px;
`
export default function AddPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  const handleInputChange = (e) => {
    e.target.name === 'title'
      ? setTitle(e.target.value)
      : setContent(e.target.value)
  }

  const handleAddPost = () => {
    addPost({
      title: title,
      body: content,
    })
      .then((res) => {
        if (res.status === 201) {
          setAlertMsg('POSTED!')
        }
      })
      .catch((err) => {
        setAlertMsg(err.response.data.message)
      })
  }
  return (
    <>
      <AddPostWrapper>
        <Title>Write whatever you want ...</Title>
        <TitleInput
          name='title'
          placeholder='Title'
          onChange={(e) => handleInputChange(e)}
        ></TitleInput>
        <ContentInput
          name='content'
          placeholder='Content here ...'
          onChange={(e) => handleInputChange(e)}
        ></ContentInput>
        <SubmitBtn onClick={handleAddPost}>Submit</SubmitBtn>
        <AlertMsg>{alertMsg}</AlertMsg>
      </AddPostWrapper>
    </>
  )
}
