import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const API_ENDPOINT = 'https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc&_limit=10';
const Page = styled.div`
  width: 500px;
  border: 1px solid gray;
  margin: 0 auto;
  padding: 8px 16px;
`;
const Title = styled.h1`
  color: ${props => props.color};
`;
const MessageForm = styled.form`
  margin-top: 10px;
`;
const MessageTextarea = styled.textarea`
  display: block;
  width: 100%;
  height: 200px;
`;
const SubmitButton = styled.button`
  margin-top: 5px;
  border: 2px solid black;
  border-color: #2196F3;
  border-radius: 2px;
  background-color: white;
  color: #2196F3;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #2196F3;
    color: white;
  }
`;
const MessageList = styled.div`
  margin-top: 8px;
`;
const MessageContainer = styled.div`
  border: 1px solid #04AA6D;
  border-radius: 3px;
  padding: 5px 10px;
  & + & {
    margin-top: 10px;
  }
`;
const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MessageAuthor = styled.div`
  margin-right: 10px;
  color: #2196F3;
`;
const MessageTime = styled.div`
  color: grey;
`;
const MessageContent = styled.div`
  margin-top: 10px;
`;
const MessageError = styled.div`
  margin-top: 10px;
  border: 1px solid red;
  border-radius: 3px;
  color: white;
  background-color: red;
  padding: 2px 5px;
  font-size: 18px;
`
const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0, 0.5);
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function Message({ author, time, children }){
  return (
    <MessageContainer>
      <MessageHeader>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHeader>
      <MessageContent>
        {children}
      </MessageContent>
    </MessageContainer>
  )
}
Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node
}
function Board() {
  const [messages, setMessages] = useState([]);
  const [getMessagesError, setgetMessagesError] = useState('');
  const [value, setValue] = useState('');
  const [postMessagesError, setpostMessagesError] = useState('');
  const [isPostingMessages, setIsPostingMessages] = useState(false);
  const fetchMessages = () =>{
    fetch(API_ENDPOINT)
    .then(res => res.json())
    .then(data => setMessages(data))
    .catch(err => setgetMessagesError(err.message))
  }
  useEffect(()=>{
    fetchMessages();
  }, []);
  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  }
  const handleTextareaFocus = () => {
    setpostMessagesError('');
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(isPostingMessages){
      return;//前面的 POST 請求尚在處理，無法執行這次的 POST 請求
    }
    setIsPostingMessages(true);
    fetch('https://student-json-api.lidemy.me/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname: 'Super 亮',
        body: value
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsPostingMessages(false);
      if(data.ok === 0){
        setpostMessagesError(data.message);
        return;
      }
      setValue('');
      fetchMessages();
    }).catch(err => {
      setIsPostingMessages(false);
      setpostMessagesError(err.message);
    })
  }
  return (
    <Page>
      {isPostingMessages && <Loading>Loading...</Loading>}
      <Title color='#2196F3'>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextarea value={value} 
         onFocus={handleTextareaFocus} onChange={handleTextareaChange}/>
        <SubmitButton>送出留言</SubmitButton>
      </MessageForm>
      {postMessagesError && <MessageError>
        Error : {postMessagesError.toString()}
      </MessageError>}
      {getMessagesError && <MessageError>
        Error : {getMessagesError.toString()}
      </MessageError>}
      <MessageList>
        {
          messages && messages.map(message => (
            <Message 
              key={message.id}
              author={message.nickname}
              time={new Date(message.createdAt).toLocaleString()}
            >{message.body}</Message>
          ))
        }
      </MessageList>
    </Page>
  )
}
export default Board;