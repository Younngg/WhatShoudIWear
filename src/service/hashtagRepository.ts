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

class HashtagRepository {
  db: Database;
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  syncHashtags(onUpdate: any) {
    const tagsRef = ref(this.db, `hashtags/`);
    onValue(tagsRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(tagsRef);
  }

  saveHashtags(hashtag: any) {
    set(ref(this.db, `hashtags/${hashtag.id}`), hashtag);
  }

  removeHashtags(hashtag: any) {
    remove(ref(this.db, `hashtags/${hashtag.id}`));
  }
}

export default HashtagRepository;
