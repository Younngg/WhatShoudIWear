import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import AddPostForm from '../components/AddPostForm';
import postRepository from '../service/postsRepository';
import Filter from '../components/Filter';
import { Post } from './../service/postsRepository';
import Header from '../components/Header';
import AuthService from './../service/authService';
import { User } from 'firebase/auth';
import TodayWeather from '../components/TodayWeather';

const authService = new AuthService();

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState({ date: '', city: '', temp: '' });
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filtered = posts.filter((post) => {
    if (post.date.includes(filter.date) && post.city.includes(filter.city)) {
      if (filter.temp === '') return post;
      else if (
        post.temp > parseInt(filter.temp[0]) &&
        post.temp <= parseInt(filter.temp[1])
      )
        return post;
    }
    return undefined;
  });

  const tags =
    posts.length < 1
      ? []
      : ([...new Set(posts.flatMap((post) => post.hashtag))] as string[]);
  const dates =
    posts.length < 1
      ? []
      : ([...new Set(posts.map((post) => post.date))] as string[]);

  useEffect(() => {
    setIsLoading(true);
    postRepository.syncPosts((data: { [index: string]: Post }) => {
      const posts = Object.values(data).sort((a, b) =>
        a.date < b.date ? 1 : -1
      );
      setPosts(posts);
    });
    setIsLoading(false);
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
    <div className='max-w-screen-lg mx-auto p-2'>
      <Header onLogin={onLogin} onLogout={onLogout} userId={userId} />
      <TodayWeather isLoading={isLoading} />
      {userId ? (
        <AddPostForm allHashtags={tags} userId={userId} />
      ) : (
        <div className='mb-5 text-center'>
          글을 작성하려면 로그인이 필요해요 :)
        </div>
      )}
      <Filter dates={dates} setFilter={setFilter} />
      <Board
        isLoading={isLoading}
        posts={filtered}
        onDeletePost={onDeletePost}
        userId={userId}
      />
    </div>
  );
};

export default Home;
