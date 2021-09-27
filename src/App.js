import { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import About from './pages/About'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register/Register'
import NavBar from './components/NavBar'
import AddPostPage from './pages/AddPostPage/AddPostPage'
import SinglePostPage from './pages/SinglePostPage/SinglePostPage'
import PostArchivesPage from './pages/PostArchivesPage/PostArchivesPage'
import { ResetStyle, GlobalStyle } from './constants/globalStyle'
import { PageWrapper } from './components/PageWrapper'
import { AuthContext } from './context'
import { getMe } from './api'
import { getAuthToken } from './utils'

export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((res) => {
        setUser(res.data.data)
      })
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <ResetStyle />
        <GlobalStyle />
        <PageWrapper>
          <NavBar />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/archive'>
              <PostArchivesPage />
            </Route>
            {user && (
              <Route path='/addPost'>
                <AddPostPage />
              </Route>
            )}
            <Route path='/posts/:id' children={<SinglePostPage />} />
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </PageWrapper>
      </Router>
    </AuthContext.Provider>
  )
}
