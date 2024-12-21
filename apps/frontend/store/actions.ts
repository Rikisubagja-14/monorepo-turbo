export const SET_USER = 'SET_USER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const setUser = (user: any) => ({
  type: SET_USER,
  payload: user,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string) => ({
  type: SET_ERROR,
  payload: error,
});
