import React, { useState } from 'react';
import PostRepository, {
  Post as PostInterface,
} from './../../service/postsRepository';
import { Button } from 'react-bootstrap';

interface PostProps {
  post: PostInterface;
  onDeletePost: (post: PostInterface) => void;
  userId: string;
}

const Post: React.FC<PostProps> = ({ post, onDeletePost, userId }) => {
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
          <Button
            variant='secondary'
            size='sm'
            onClick={() => onDeletePost(post)}
          >
            삭제
          </Button>
        )}
      </td>
    </tr>
  );
};

export default Post;
