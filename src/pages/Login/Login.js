import React, { useContext, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../contexts';
const ErrorMessage = styled.div`
  background: red;
  color: white;
  padding: 2px 5px;
  width: 300px;
`
export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMesg, setErrMesg] = useState('');
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMesg('');
    login(username, password).then(data=>{
      if(data.ok === 0){
        return setErrMesg(data.message);
      }
      setAuthToken(data.token);
      getMe().then(res => {
        if(res.ok !== 1){
          setAuthToken(null);
          return setErrMesg(res.message);
        }
        setUser(res.data)
        history.push('/');
      })
      
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>username: {" "}
        <input 
          type='text'
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
      </div>
      <div>password: {" "}
        <input
          type='password'
          value={password}
          onChange={e=>setPassword(e.target.value)}
        /></div>
      <button>send</button>
      {
        errMesg && <ErrorMessage>{errMesg.toString()}</ErrorMessage>
      }
    </form>
  )
}