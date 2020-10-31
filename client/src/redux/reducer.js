import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    POST_LOGOUT,
    ADD_ALBUM_SUCCESS,
    ADD_ALBUM_FAILURE,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE,
    GET_USER_ALBUMS_SUCCESS,
    GET_USER_ALBUMS_FAILURE,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAILURE,
    SET_FILTER,
    SET_SORT
} from './actionTypes';

const initialState = {
    isRegistered: false,
    albums: [],
    userAlbums: [],
    error: '',
    user_current_page: 1,
    user_total_count: 1,
    main_current_page: 1,
    main_total_count: 1,
    filter: 'default',
    sort: 'default',
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
                userAlbums: [],
                user_current_page: 1,
                user_total_count: 1,
                name: '',
                email: '',
                error: '',
                authToken: '',
                avatar: ''
            };
        }
        case GET_ALBUMS_SUCCESS: {
            return {
                ...state,
                error: '',
                albums: payload.albums,
                main_current_page: payload.page,
                main_total_count: payload.count
            };
        }
        case GET_ALBUMS_FAILURE: {
            return { ...state, error: payload };
        }
        case GET_USER_ALBUMS_SUCCESS: {
            return {
                ...state,
                error: '',
                userAlbums: payload.albums,
                user_current_page: payload.page,
                user_total_count: payload.count
            };
        }
        case GET_USER_ALBUMS_FAILURE: {
            return { ...state, error: payload };
        }
        case PROFILE_UPDATE_SUCCESS: {
            localStorage.setItem('name', JSON.stringify(payload.name));
            return { ...state, name: payload.name, error: '' };
        }
        case PROFILE_UPDATE_FAILURE: {
            return { ...state, error: payload };
        }
        case ADD_ALBUM_SUCCESS: {
            return {
                ...state,
                userAlbums: [...state.userAlbums, payload],
                albums: [...state.albums, payload],
                error: ''
            };
        }
        case ADD_ALBUM_FAILURE: {
            return { ...state, error: payload };
        }
        case SET_SORT: {
            return { ...state, sort: payload };
        }
        case SET_FILTER: {
            return { ...state, filter: payload };
        }
        default:
            return state;
    }
}

export default reducer;
