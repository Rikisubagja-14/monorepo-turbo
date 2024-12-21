import { SET_USER, SET_LOADING, SET_ERROR } from './actions';

const initialState = {
  user: null,
  loading: false,
  error: '',
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
