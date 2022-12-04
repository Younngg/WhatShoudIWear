import React from 'react';
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
      <td>{temp} ℃</td>
      <td>{weather}</td>
      <td>{hashtag.join(', ')}</td>
      <td>
        {userId === post.userId && (
          <Button
            variant='secondary'
            size='sm'
            onClick={() => onDeletePost(post)}
          >
            DEL
          </Button>
        )}
      </td>
    </tr>
  );
};

export default Post;
