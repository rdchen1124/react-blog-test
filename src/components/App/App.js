import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from '../Header' 
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Post, { Article } from '../../pages/Post';
import { AuthContext } from '../../contexts';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';
const Root = styled.div`
  padding-top: 60px;
`;
function App() {
  const [user, setUser] = useState(null);
  useLayoutEffect(()=>{
    //(TODO) 有 token 才會 call getMe() 檢查 token，若檢查完成才算登入
    if(getAuthToken()){
      getMe().then(res=>{
        if(res.ok){
          setUser(res.data);
        }
      })
    }
  }, [])
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/post'>
              <Post />
            </Route>
            <Route path='/posts/:postId'>
              <Article />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  )
}
export default App;