import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const userService = {
  // Kullanıcı profili oluştur
  async createUserProfile(userId, userData) {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Kullanıcı profilini getir
  async getUserProfile(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return { success: true, data: userSnap.data() };
      } else {
        return { success: false, error: 'Kullanıcı bulunamadı' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Kullanıcı profilini güncelle
  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, updates);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
