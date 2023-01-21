import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Board from './../components/Board/Board';
import AddPostForm from './../components/AddPostForm/AddPostForm';
import PostRepository, { Posts } from '../service/postsRepository';
import Filter from './../components/Filter/Filter';
import { Post } from './../service/postsRepository';
import Header from './../components/Header/Header';
import AuthService from './../service/authService';
import { User, UserCredential } from 'firebase/auth';
import TodayWeather from '../components/TodayWeather/TodayWeather';
import useClothes from './../hooks/useClothes';

const postRepository = new PostRepository();
const authService = new AuthService();

const Home = () => {
  const clothes = useClothes();

  const [posts, setPosts] = useState<Posts>({});
  const [filteredPosts, setFilteredPosts] = useState<Posts | false>(false);

  const [allHashtags, setAllHashtags] = useState<any>(clothes);
  const [allDates, setAllDates] = useState<string[] | []>([]);
  const [userId, setUserId] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
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

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    authService.onAuthChange((user: User) => {
      setUserId(user ? user.uid : '');
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

  const onLogin = async () => {
    const data = await authService.login('Google');
    setUserId(data.user.uid);
  };

  const onLogout = () => {
    authService.logout();
  };

  return (
    <Container>
      <Header onLogin={onLogin} onLogout={onLogout} userId={userId} />
      <TodayWeather isLoading={isLoading} />
      {userId ? (
        <AddPostForm
          postRepository={postRepository}
          allHashtags={allHashtags}
          userId={userId}
        />
      ) : (
        <div className='mb-5 text-center'>
          글을 작성하려면 로그인이 필요해요 :)
        </div>
      )}

      <Filter
        dates={allDates}
        setFilteredPosts={setFilteredPosts}
        posts={posts}
      />
      <Board
        isLoading={isLoading}
        setAllHashtags={setAllHashtags}
        posts={posts}
        onDeletePost={onDeletePost}
        userId={userId}
        filteredPosts={filteredPosts}
      />
    </Container>
  );
};

export default Home;
