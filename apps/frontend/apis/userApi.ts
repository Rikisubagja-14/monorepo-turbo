import { master } from "./base_api";
import { UserData, UserLogin } from "./user";


export const registerUser = async (userData: UserData) => {
  const response = await master.post('/api/register', userData); 
  return response.data;
};

export const loginUser = async (credentials: UserLogin) => {
  let payload = {
    email: credentials.email,
    password: credentials.password,
  };
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return master.post("/api/login", payload, config);
};


export const updateUser = async (id: string, userData: any) => {
  return master.put(`/api/users-update/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};

export const getUser = async () => {
  return master.get(`/api/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};

export const getUserById = async (userId: string) => {
  return master.get(`/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};

export const DeleteUser = async (userId: string) => {
  return master.delete(`/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};

