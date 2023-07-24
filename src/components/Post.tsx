import React, { useState } from 'react';
import { Post as PostInterface } from '../service/postsRepository';

type Props = {
  post: PostInterface;
  onDeletePost: (post: PostInterface) => void;
  userId: string;
};

const Post = ({ post, onDeletePost, userId }: Props) => {
  const { city, temp, weather, hashtag, date } = post;

  return (
    <tr>
      <td>{date}</td>
      <td>{city}</td>
      <td>{temp}°</td>
      <td>{weather}</td>
      <td className='text-start text-wrap'>{hashtag.join(', ')}</td>
      <td>
        {userId === post.userId && (
          <button onClick={() => onDeletePost(post)}>삭제</button>
        )}
      </td>
    </tr>
  );
};

export default Post;
