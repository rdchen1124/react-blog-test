import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {getPosts} from '../../WebAPI';

const Root = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2); 
  padding: 16px;
  align-items: flex-end;
`;
const PostTitle = styled(Link)`
  font-size: 20px;
  color: seagreen;
  text-decoration: none;
`
const PostDate = styled.div`
  color: grey;
`
function Post({ post }){
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
    
  )
}
Post.prototype = {
  post: PropTypes.object
}
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    getPosts().then(data=>setPosts(data))
  },[]);
  return (
    <Root>
      {
        posts && posts.map(post=>(
        <Post key={post.id} post={post} />
        ))
      }
    </Root>
  )
}