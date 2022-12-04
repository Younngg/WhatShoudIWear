import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  remove,
  Database,
} from 'firebase/database';
import { firebaseApp } from './firebase';

export interface Post {
  [index: string]: any;
  city: string;
  id: string;
  temp: number;
  userId: any;
  weather: string;
  hashtag: string[];
  date: string;
}

export interface Posts {
  [index: string]: Post;
}

class PostRepository {
  db: Database;
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  syncPosts(onUpdate: any) {
    const postsRef = ref(this.db, `posts/`);
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(postsRef);
  }

  savePost(post: any) {
    set(ref(this.db, `posts/${post.id}`), post);
  }

  removePost(post: any) {
    remove(ref(this.db, `posts/${post.id}`));
  }
}

export default PostRepository;
