import React from 'react';
import { Post as PostInterface } from '../service/postsRepository';

type Props = {
  post: PostInterface;
  onDeletePost: (post: PostInterface) => void;
  userId: string;
};

const Post = ({ post, onDeletePost, userId }: Props) => {
  const { city, temp, weather, hashtag, date } = post;

  return (
    <tr className='text-center h-14 border-b'>
      <td className='sm:w-auto w-20'>{date.replace(/-/g, '.')}</td>
      <td className='sm:w-auto w-12'>{city}</td>
      <td className='sm:w-auto w-12'>{temp}°</td>
      <td className='sm:w-auto w-16 hidden sm:table-cell'>{weather}</td>
      <td className='text-left px-1'>{hashtag.join(', ')}</td>
      <td className='px-2'>
        {userId === post.userId && (
          <button
            onClick={() => onDeletePost(post)}
            className='w-10 bg-red-500 text-white'
          >
            삭제
          </button>
        )}
      </td>
    </tr>
  );
};

export default Post;
