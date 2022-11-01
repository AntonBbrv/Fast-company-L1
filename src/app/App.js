import { React } from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navBar'
import Users from './components/users'
import Main from './components/Pages/main'
import Login from './components/Pages/login'
import userPage from './components/Pages/userPage'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={userPage} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  )
}

export default App
