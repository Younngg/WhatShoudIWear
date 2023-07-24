import React from 'react';
import Post from './Post';
import {
  Post as PostType,
  Post as PostInterface,
} from '../service/postsRepository';
import Spinner from './Spinner';

type Props = {
  posts: PostType[];
  onDeletePost: (post: PostInterface) => void;
  userId: string;
  isLoading: boolean;
};

const Board = ({ posts, onDeletePost, userId, isLoading }: Props) => {
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
          {posts.map((post: PostType) => (
            <Post
              key={post.id}
              post={post}
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
