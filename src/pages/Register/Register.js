import styled from 'styled-components'
import { PageWrapper } from '../../components/PageWrapper'
import { register } from '../../api'
import { useState } from 'react'
import { setAuthToken } from '../../utils'

const Title = styled.div`
  font-size: 30px;
  width: 200px;
  text-align: center;
  margin: 20px auto;
  color: #5e5e5e;
`

const Input = styled.input`
  width: 300px;
  height: 40px;
  color: gray;
  border: 1px solid #b4b4b4;
  border-radius: 15px;
  margin-top: 20px;
  padding: 20px;
  transition: 0.5s;
  font-size: 16px;
  &:hover {
    width: 400px;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #b4b4b4;
    text-align: center;
  }
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubmitBtn = styled.div`
  width: 300px;
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
export default function Register() {
  const [nickName, setNickName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    register(
      JSON.stringify({
        nickname: nickName,
        username: userName,
        password: password,
      })
    ).then((data) => {
      if (data.data.ok === 1) {
        setAuthToken(data.data.token)
      }
    })
  }
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case 'nickName':
        setNickName(e.target.value)
        break
      case 'userName':
        setUserName(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        console.log('im default')
    }
  }
  return (
    <>
      <PageWrapper>
        <Title> Register </Title>
        <FormWrapper>
          <Input
            name='nickName'
            placeholder='NICK NAME'
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
          <Input
            name='userName'
            placeholder='USER NAME'
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
          <Input
            name='password'
            type='password'
            placeholder='PASSWORD'
            onChange={(e) => {
              handleInputChange(e)
            }}
          />
          <SubmitBtn onClick={handleSubmit}> SUBMIT </SubmitBtn>
        </FormWrapper>
      </PageWrapper>
    </>
  )
}
