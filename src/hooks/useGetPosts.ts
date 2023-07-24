import { useQuery } from 'react-query';
import postRepository from '../service/postsRepository';

const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postRepository.syncPosts,
  });
};

export default useGetPosts;
