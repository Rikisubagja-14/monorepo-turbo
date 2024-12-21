import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/user';
import { UserCollection } from '../repository/userCollection';

const userCollection = new UserCollection();


export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, name, phoneNumber, address } = req.body;
  try {
    await userCollection.registerUser(email, password, {
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;
  try {
    const token = await userCollection.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};


export const updateUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const uid = req.params.uid;
  const userData: User = req.body;
  try {
    await userCollection.updateUserData(uid, userData);
    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const fetchUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const uid = req.params.uid;
  try {
    const userData = await userCollection.fetchUserDataById(uid);
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

export const fetchAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userCollection.fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const uid = req.params.uid;
  try {
    await userCollection.deleteUserData(uid);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
