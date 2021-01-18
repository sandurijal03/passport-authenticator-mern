import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { myContext } from './Context';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const App = () => {
  const ctx = useContext(myContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {ctx ? (
          <>
            {ctx.isAdmin && <Route path='/admin' component={AdminPage} />}
            <Route path='/profile' component={Profile} />
          </>
        ) : (
          <>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </>
        )}
        <Route exact path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
