import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {getPosts} from '../../WebAPI';

const Root = styled.div`
  width: 90%;
  margin: 0 auto;
  background: white;
`;
const PostHeader = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: black;
  padding-left: 30px;
  margin-bottom: 10px;
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
  color: #008CBA;
  text-decoration: none;
`
const PostDate = styled.div`
  color: grey;
`
const PostList = styled.div`
  padding: 10px 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
`
function Post({ post }){
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
    
  )
}
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    createdAt: PropTypes.number
  })
}
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    getPosts().then(data=>setPosts(data))
  },[]);
  return (
    <Root>
      <PostHeader>文章列表</PostHeader>
      <PostList>
        {
          posts && posts.map(post=>(
          <Post key={post.id} post={post} />
          ))
        }
      </PostList>
    </Root>
  )
}