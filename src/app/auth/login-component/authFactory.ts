import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/firebaseConfig';

export function authFactory() {
  const app = getApp(); 
  const auth = getAuth(app);

  return {
    login(email: string, password: string): Promise<void> {
      return signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          // console.log('User logged in:', result.user);
        })
        .catch((error) => {
          console.error('Login error:', error);
          throw error;
        });
    },
    register(email: string, password: string): Promise<void> {
        return createUserWithEmailAndPassword(auth, email, password)
          .then((result) => {
            // console.log('User registered:', result.user);
          })
          .catch((error) => {
            console.error('Registration error:', error);
            throw error; // 同上，可以选择不抛出错误
          });
    },
    signOut(): Promise<void> {
        return auth.signOut()
        .then(() => {
        console.log('User signed out');
        })
        .catch((error) => {
        console.error('Sign out error:', error);
        throw error;
        });
    },
    getCurrentUserId(): string | null {
        const user = auth.currentUser;
        return user ? user.uid : null;
      }
  };
  
}
