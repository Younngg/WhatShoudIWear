import { firebaseApp } from './firebase';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

class AuthService {
  firebaseAuth: Auth;
  googleProvider;
  constructor() {
    this.firebaseAuth = getAuth(firebaseApp);
    this.googleProvider = new GoogleAuthProvider();
  }
  login(providerName: string) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.firebaseAuth, authProvider);
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged: any) {
    this.firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName: string) {
    switch (providerName) {
      case 'Google':
        return this.googleProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
