import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Board from './../components/Board/Board';
import AddPostForm from './../components/AddPostForm/AddPostForm';
import PostRepository from '../service/postsRepository';
import Filter from './../components/Filter/Filter';
import { Post } from './../service/postsRepository';
import Header from './../components/Header/Header';
import AuthService from './../service/authService';
import { User, UserCredential } from 'firebase/auth';

const postRepository = new PostRepository();
const authService = new AuthService();

const Home = () => {
  const [allHashtags, setAllHashtags] = useState<any>([]);
  const [posts, setPosts] = useState({});
  const [allDates, setAllDates] = useState<string[] | []>([]);
  const [userId, setUserId] = useState<string>('');

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
      setAllDates((cur: any) => {
        const arr = [...cur];
        Object.keys(posts).forEach((key: any) => {
          arr.push(posts[key]['date']);
        });
        return arr.filter((ele, index) => arr.indexOf(ele) === index);
      });
    });
  }, []);
  console.log(userId);
  useEffect(() => {
    authService.onAuthChange((user: User) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });
  }, []);

  const onDeletePost = (post: Post) => {
    setPosts((cur: any) => {
      const updated = { ...cur };
      delete updated[post.id];
      return updated;
    });
    postRepository.removePost(post);
  };

  const onLogin = () => {
    authService
      .login('Google')
      .then((data: UserCredential) => setUserId(data.user.uid));
  };

  const onLogout = () => {
    authService.logout();
  };

  return (
    <Container>
      <Header onLogin={onLogin} onLogout={onLogout} userId={userId} />
      <AddPostForm
        postRepository={postRepository}
        allHashtags={allHashtags}
        userId={userId}
      />
      <Filter dates={allDates} setPosts={setPosts} />
      <Board
        postRepository={postRepository}
        setAllHashtags={setAllHashtags}
        posts={posts}
        onDeletePost={onDeletePost}
        userId={userId}
      />
    </Container>
  );
};

export default Home;
