export const isLoggedIn = async () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  };