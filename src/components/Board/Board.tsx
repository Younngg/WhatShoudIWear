import React from 'react';
import Post from '../Post/Post';
import { Post as PostInterface, Posts } from '../../service/postsRepository';
import './board.css';
import Spinner from './../Spinner/Spinner';

type Props = {
  setAllHashtags: React.Dispatch<any>;
  posts: Posts;
  onDeletePost: (post: PostInterface) => void;
  userId: string;
  filteredPosts: any;
  isLoading: boolean;
};

const Board = ({
  posts,
  onDeletePost,
  userId,
  filteredPosts,
  isLoading,
}: Props) => {
  return (
    <>
      <table className='board-table'>
        <thead>
          <tr>
            <th className='date-th'>날짜</th>
            <th className='city-th'>지역</th>
            <th className='temp-th'>기온</th>
            <th className='weather-th'>날씨</th>
            <th className='clothes-th'>옷</th>
            <th className='del-th'></th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts
            ? Object.keys(filteredPosts)
                .sort((a, b) => {
                  return (
                    new Date(posts[b]['date']).valueOf() -
                    new Date(posts[a]['date']).valueOf()
                  );
                })
                .map((key: any) => (
                  <Post
                    key={key}
                    post={posts[key]}
                    onDeletePost={onDeletePost}
                    userId={userId}
                  />
                ))
            : Object.keys(posts)
                .sort((a, b) => {
                  return (
                    new Date(posts[b]['date']).valueOf() -
                    new Date(posts[a]['date']).valueOf()
                  );
                })
                .map((key: any) => (
                  <Post
                    key={key}
                    post={posts[key]}
                    onDeletePost={onDeletePost}
                    userId={userId}
                  />
                ))}
        </tbody>
      </table>
      {isLoading && <Spinner />}
    </>
  );
};

export default Board;
