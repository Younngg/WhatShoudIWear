import React, { useState, useEffect } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import AddPostForm from '../components/AddPostForm/AddPostForm';
import Post from '../components/Post/Post';
import PostRepository from './../service/postsRepository';
import './board.css';

const postRepository = new PostRepository();

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allHashtags, setAllHashtags] = useState<any>([]);

  const [dateFilter, setDateFilter] = useState([]);

  useEffect(() => {
    postRepository.syncPosts((posts: any) => {
      setPosts(posts);
      setAllHashtags((cur: any) => {
        const arr = [...cur];
        Object.keys(posts).forEach((key: any) => {
          arr.push(...posts[key]['hashtag']);
        });
        return arr.filter((ele, index) => arr.indexOf(ele) === index);
      });
    });
  }, []);

  useEffect(() => {}, [posts]);

  console.log(allHashtags);

  return (
    <Container>
      <AddPostForm postRepository={postRepository} allHashtags={allHashtags} />
      <Table bordered className='board-table'>
        <thead>
          <tr>
            <th className='date-th'>날짜</th>
            <th className='city-th'>지역</th>
            <th className='temp-th'>기온</th>
            <th className='weather-th'>날씨</th>
            <th className='clothes-th'>옷</th>
            <th className='del-th'>DEL</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(posts).map((key: any) => (
            <Post key={key} post={posts[key]} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
