import * as actionTypes from '../actions/actions';

const initialState = {
  notes: [],
  creatingNote: false,
  currentNote: [],
  filteredNotes: [],
  searchText: '',
  searching: false,
  isAuth: false,
  authMessage: '',
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETTING_NOTES:
      return {
        ...state,
        gettingNotes: true,
      };
    case actionTypes.NOTES_RECEIVED:
      return {
        ...state,
        notes: [...action.payload],
        gettingNotes: false,
      };
    case actionTypes.CREATE_NOTE:
      return {
        ...state,
        addingNote: true,
      };
    case actionTypes.NOTE_CREATED:
      return {
        ...state,
        notes: [...action.payload],
        addingNote: true,
      };
    case actionTypes.GET_NOTE:
      return {
        ...state,
        currentNote: state.notes.filter((note) => note._id === action.payload),
        addingNote: false,
      };
    case actionTypes.DELETE_NOTE:
      return {
        ...state,
        deletingNote: true,
        currentNote: [],
      };
    case actionTypes.NOTE_DELETED:
      return {
        ...state,
        deletingNote: false,
        notes: [...action.payload],
        currentNote: [],
      };
    case actionTypes.UPDATE_NOTE:
      return {
        ...state,
        updatingNote: true,
        currentNote: [],
      };
    case actionTypes.NOTE_UPDATED:
      return {
        ...state,
        updatingNote: false,
        notes: [...action.payload],
        currentNote: [],
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        filteredNotes: state.notes.filter(
          (note) =>
            note.noteTitle
              .toLowerCase()
              .indexOf(action.payload.toLowerCase()) >= 0 ||
            note.noteBody.toLowerCase().indexOf(action.payload.toLowerCase()) >= 0
        ),
        searching: true,
        searchText: action.payload,
      };
    case actionTypes.RESETSEARCH:
      return {
        ...state,
        searching: action.payload,
        filteredNotes: [],
      };
    case actionTypes.NON_MATCH:
      return {
        ...state,
        authMessage: 'Passwords do not match.',
      };
    case actionTypes.USER_REGISTERED:
      return {
        ...state,
        isAuth: true,
        userID: action.payload.user._id,
        authMessage: 'Welcome!',
      };
    case actionTypes.USER_AUTHENTICATED:
      return {
        ...state,
        isAuth: true,
        userID: action.payload.user._id,
        authMessage: 'Welcome!',
      };
    case actionTypes.USER_UNAUTHENTICATED:
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      return {
        ...state,
        isAuth: false,
        authMessage: 'Logged Out.',
      };
    case actionTypes.USER_NOT_REGISTERED:
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      return {
        ...state,
        isAuth: false,
        authMessage: 'Unable to register. Please try again.',
      };
    default:
      return state;
  }
};