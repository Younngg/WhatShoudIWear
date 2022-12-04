import React from 'react';
import { Post as PostInterface } from './../../service/postsRepository';

interface PostProps {
  post: PostInterface;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { city, temp, weather, hashtag, userId, date } = post;

  return (
    <tr>
      <td>{date}</td>
      <td>{city}</td>
      <td>{temp} ℃</td>
      <td>{weather}</td>
      <td>{hashtag.join(', ')}</td>
      <td>{userId}</td>
    </tr>
  );
};

export default Post;
