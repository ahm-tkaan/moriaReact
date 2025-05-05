import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { userService } from './userService';

export const authService = {
  // Kayıt işlemi
  async register({ email, password, firstName, lastName, phoneNumber }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Kullanıcı profilini güncelle
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      
      // Kullanıcı bilgilerini Firestore'a kaydet
      await userService.createUserProfile(user.uid, {
        firstName,
        lastName,
        email,
        phoneNumber,
        createdAt: new Date()
      });
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Giriş işlemi
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Çıkış işlemi
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Şifre sıfırlama
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Authentication state değişikliklerini dinle
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // Mevcut kullanıcıyı al
  getCurrentUser() {
    return auth.currentUser;
  }
};
