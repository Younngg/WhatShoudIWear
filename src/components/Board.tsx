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
      <table className='border w-full text-sm md:text-base'>
        <thead className='border-b h-10'>
          <tr>
            <th>날짜</th>
            <th>지역</th>
            <th>기온</th>
            <th className='hidden sm:table-cell'>날씨</th>
            <th>옷</th>
            <th></th>
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
