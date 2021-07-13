import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPost } from '../../WebAPI';
// import PropTypes from 'prop-types';
import {
  useParams
} from "react-router-dom";

export default function Post() {
  return (
    <div>Post article</div>
  )
}
const Root = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const SinglePostContainer = styled.div`
  padding: 5px 10px;
`
const SinglePostTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: skyblue;
`
const SinglePostContent = styled.div`
  margin-top: 10px;
  white-space: pre-line;
  padding: 10px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`
function SinglePost({ article }){
  return (
    <SinglePostContainer>
      <SinglePostTitle>{article.title}</SinglePostTitle>
      <SinglePostContent>{article.body}</SinglePostContent>
    </SinglePostContainer>
  )
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