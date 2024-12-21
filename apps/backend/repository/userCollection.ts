import admin, { generateJWT } from '../config/firebaseConfig'; 
import { User } from '../entities/user';

export class UserCollection {
  private readonly collectionName = 'users';

  async registerUser(email: string, password: string, userData: User): Promise<string> {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: userData.name,
    });
     
    await admin.firestore().collection(this.collectionName).doc(userRecord.uid).set({
      uid: userRecord.uid,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  
    return userRecord.uid;
  }
  

  async loginUser(email: string, password: string): Promise<string> {
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = generateJWT(user.uid);
     return token; 
  }

  async updateUserData(uid: string, userData: User): Promise<void> {
    try {
      await admin.firestore().collection(this.collectionName).doc(uid).set(userData, { merge: true });
    } catch (error) {
      console.error(`Error updating user data for ${uid}:`, error);
      throw new Error('Failed to update user data'); 
    }
  }


  async fetchUserDataById(uid: string): Promise<User | null> {
    try {
      const userDoc = await admin.firestore().collection(this.collectionName).doc(uid).get();
      return userDoc.exists ? (userDoc.data() as User) : null
    } catch (error) {
      console.error(`Error fetching user data for ${uid}:`, error);
      throw new Error('Failed to fetch user data');
    }
  }
  

  async fetchAllUsers(): Promise<User[]> {
    try {
      const snapshot = await admin.firestore().collection(this.collectionName).get();
      return snapshot.docs.map(doc => doc.data() as User);
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch all users');
    }
  }

  async deleteUserData(uid: string): Promise<void> {
    try {
      await admin.auth().deleteUser(uid);
      await admin.firestore().collection(this.collectionName).doc(uid).delete();
    } catch (error) {
      console.error(`Error deleting user data for ${uid}:`, error);
      throw new Error('Failed to delete user data');
    }
  }
}  
