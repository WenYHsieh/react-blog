import styled from 'styled-components'
import { useContext } from 'react'
import { AuthContext } from '../../context'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { ReactComponent as DittoSvg } from '../../icons/ditto.svg'
import { setAuthToken } from '../../utils'

const NavBarWrapper = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f5f4;
`

const NavBarLink = styled(Link)`
  color: #bababa;
  text-decoration: none;
  font-size: 18px;
  margin: 0px 20px;
  transition: 0.5s;
  &:hover {
    color: #8bbdd6;
  }
  ${(props) =>
    props.$active &&
    `
    color: #8bbdd6;
  `}
`

const DittoIcon = styled(DittoSvg)`
  width: 35px;
  height: 35px;
  fill: #f4f5f4;
  transition: 0.8s;
  &:hover {
    fill: #e3adff;
  }
`

export default function NavBar() {
  const history = useHistory()
  const location = useLocation()
  const { user, setUser } = useContext(AuthContext)
  const handleLogOut = () => {
    if (location.pathname !== '/') history.push('/')
    setAuthToken('')
    setUser(null)
  }
  return (
    <>
      <NavBarWrapper>
        <DittoIcon />
        <NavBarLink to='/' $active={'/' === location.pathname}>
          Home
        </NavBarLink>
        <NavBarLink to='/about' $active={'/about' === location.pathname}>
          About
        </NavBarLink>
        <NavBarLink to='/register' $active={'/register' === location.pathname}>
          Register
        </NavBarLink>
        {!user && (
          <NavBarLink to='/login' $active={'/login' === location.pathname}>
            Login
          </NavBarLink>
        )}
        {user && (
          <NavBarLink to='/' onClick={handleLogOut}>
            Logout
          </NavBarLink>
        )}
      </NavBarWrapper>
    </>
  )
}
