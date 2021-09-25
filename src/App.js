import { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import About from './pages/About'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register/Register'
import NavBar from './components/NavBar'
import BlogPost from './pages/BlogPost/BlogPost'
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
            <Route path='/posts/:id' children={<BlogPost />} />
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </PageWrapper>
      </Router>
    </AuthContext.Provider>
  )
}
// 登入頁面：輸入帳號密碼後可以登入
// 註冊頁面：可以開放使用者註冊
// About 頁面：隨意顯示一些關於這個部落格的話
// 文章列表頁面：可以看到所有文章，一頁只會顯示 5 筆，需要支援分頁功能，可以換頁
// 單篇文章頁面：點進去文章以後可以看到文章完整內容
// 發表文章頁面：可以輸入標題跟內文發文
