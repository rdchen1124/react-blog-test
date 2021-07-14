import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPost, addPost } from '../../WebAPI';
// import { getAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';
import PropTypes from 'prop-types';
import {
  useParams,
  useHistory
} from "react-router-dom";
const PostContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  background: white;
`;
const PostHeader = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: black;
  padding-left: 30px;
  margin-bottom: 10px;
`;
const PostFormContainer = styled.div`
  padding: 10px 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  padding-bottom: 28px;
`;
const PostForm = styled.form`
`;
const PostFromInput = styled.div`
  display: block;
  color: #008CBA;
  font-size: 16px;
  font-weight: bold;
  margin: 5px 10px;
  & + & {
    margin-top: 10px;
  }
  div + div {
    margin-top: 10px;
  }
`;
const PostFormText = styled.input`
  width: 100%;
  padding: 5px 5px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`
const PostFormTextarea = styled.textarea`
  width: 100%;
  padding: 8px 5px;
  height: 300px;
  box-sizing: border-box;
  border-radius: 5px;
`
const SubmitButton = styled.button`
  height: 30px;
  padding: 3px 5px;
  background-color: white;
  color: black;
  font-size: 16px;
  border: 1px solid #008CBA;
  border-radius: 3px;
  cursor: pointer;
  transition-duration: 0.3s;
  &:hover {
    background: #008CBA;
    color: white;
  }
`
const PostError = styled.div`
  position: absolute;
  background: red;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  bottom: 1px;
  right:30px;
  left:30px;
`
export default function Post() {
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postError, setPostError] = useState('');
  const history = useHistory();
  const handleTitleChange = (e)=>{
    setTitle(e.target.value);
  }
  const handleContentChange = (e)=>{
    setContent(e.target.value);
  }
  const handlePostSubmit = (e) => {
    e.preventDefault();
    setPostError('');
    if(user){
      addPost(title, content).then(res=>{
        if(res.ok === 0){
          return setPostError(res.message);
        }
        history.push('/');
      })
    }else{
      return setPostError('您沒有權限新增文章');
    }
  }
  return (
    <PostContainer>
      <PostHeader>新增文章</PostHeader>
      <PostFormContainer>
        <PostForm onSubmit={handlePostSubmit}>
          <PostFromInput>
            <div>文章標題:{" "}</div>
            <div>
              <PostFormText type='text' value={title} onChange={handleTitleChange} />
            </div>
          </PostFromInput>
          <PostFromInput>
            <div>文章內容:{" "}</div>
            <div>
              <PostFormTextarea type='text' value={content} onChange={handleContentChange} />
            </div>
          </PostFromInput>
          <PostFromInput>
            <SubmitButton>發布文章</SubmitButton>
          </PostFromInput>
          {
          postError && <PostError>{postError.toString()}</PostError>
          }
        </PostForm>
      </PostFormContainer>
    </PostContainer>
  )
}
const Root = styled.div`
  width: 90%;
  margin: 0 auto;
  background: white;
`;
const SinglePostContainer = styled.div`
  padding: 5px 10px;
`
const SinglePostTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #008CBA;
`
const SinglePostContent = styled.div`
  margin-top: 10px;
  white-space: pre-line;
  padding: 10px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`
const SinglePostDate = styled.div`
  font-size: 12px;
  color: grey;
`
function SinglePost({ article }){
  return (
    <SinglePostContainer>
      <SinglePostTitle>{article.title}</SinglePostTitle>
      <SinglePostContent>{article.body}</SinglePostContent>
      <SinglePostDate>{new Date(article.createdAt).toLocaleString()}</SinglePostDate>
    </SinglePostContainer>
  )
}
SinglePost.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.number
  })
}
export function Article() {
  let { postId } = useParams();
  const [article, setArticle] = useState({});
  useEffect(()=>{
    getPost(Number(postId)).then(data=>setArticle(data[0]))
  },[postId])
  return (
    <Root>
      <SinglePost article={article} />
    </Root>
  )
}