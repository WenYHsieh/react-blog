import styled from 'styled-components'
import { PageWrapper } from '../../components/PageWrapper'
import { login, getMe } from '../../api'
import { setAuthToken } from '../../utils'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../context'

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
const ErrorMsg = styled.div`
  color: red;
  margin-top: 20px;
`
export default function Login() {
  const { setUser } = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const handleSubmit = () => {
    setErrorMsg('')
    login(
      JSON.stringify({
        username: userName,
        password: password,
      })
    )
      .then((res) => {
        if (res.data.ok === 1) {
          setAuthToken(res.data.token)
          getMe().then((res) => {
            if (res.data.ok !== 1) {
              setAuthToken(null)
            }
            setUser(res.data.data)
            history.push('/')
          })
        }
      })
      .catch((err) => setErrorMsg(err.response.data.message))
  }
  const handleInputChange = (e) => {
    e.target.getAttribute('name') === 'userName'
      ? setUserName(e.target.value)
      : setPassword(e.target.value)
  }
  return (
    <>
      <PageWrapper>
        <Title> Login </Title>
        <FormWrapper>
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
          <ErrorMsg>{errorMsg}</ErrorMsg>
        </FormWrapper>
      </PageWrapper>
    </>
  )
}
