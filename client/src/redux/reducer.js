import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    POST_LOGOUT,
    GET_USER_ALBUMS_SUCCESS,
    GET_USER_ALBUMS_FAILURE,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILURE
} from './actionTypes';

const initialState = {
    isRegistered: false,
    albums: [],
    userAlbums: [],
    error: '',
    current_page: 1,
    total_count: 1,
    name: JSON.parse(localStorage.getItem('name')) || '',
    email: JSON.parse(localStorage.getItem('email')) || '',
    avatar: JSON.parse(localStorage.getItem('avatar')) || '',
    authToken: JSON.parse(localStorage.getItem('authToken')) || ''
};

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case REGISTER_SUCCESS: {
            return { ...state, error: '', isRegistered: true };
        }
        case REGISTER_FAILURE: {
            return { ...state, error: payload };
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem(
                'authToken',
                JSON.stringify(payload.authToken)
            );
            localStorage.setItem('name', JSON.stringify(payload.name));
            localStorage.setItem('email', JSON.stringify(payload.email));
            localStorage.setItem('avatar', JSON.stringify(payload.avatar));
            return {
                ...state,
                error: '',
                name: payload.name,
                email: payload.email,
                avatar: payload.avatar,
                authToken: payload.authToken
            };
        }
        case LOGIN_FAILURE: {
            return { ...state, error: payload };
        }
        case POST_LOGOUT: {
            localStorage.clear();
            return {
                ...state,
                isRegistered: false,
                name: '',
                email: '',
                error: '',
                authToken: ''
            };
        }
        case GET_USER_ALBUMS_SUCCESS: {
            return { ...state, error: '', userAlbums: payload };
        }
        case GET_USER_ALBUMS_FAILURE: {
            return { ...state, error: payload };
        }
        case PROFILE_UPDATE_SUCCESS: {
            localStorage.setItem('name', JSON.stringify(payload.name));
            return { ...state, name: payload.name };
        }
        case PROFILE_UPDATE_FAILURE: {
            return { ...state, error: payload };
        }
        default:
            return state;
    }
}

export default reducer;
