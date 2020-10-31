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
import axios from 'axios';

export const postLogin = (data) => {
    return (dispatch) => {
        return axios({
            method: 'POST',
            url: 'http://localhost:5000/api/login',
            data: data,
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => dispatch(loginSuccess(res.data)))
            .catch((error) => dispatch(loginFailure(error.response.data)));
    };
};

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload
    };
};

export const postRegister = (data) => {
    return (dispatch) => {
        return axios({
            method: 'POST',
            url: 'http://localhost:5000/api/register',
            data: data,
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => dispatch(registerSuccess(res.data)))
            .catch((error) => dispatch(registerFailure(error.response.data)));
    };
};

export const registerSuccess = (payload) => ({
    type: REGISTER_SUCCESS,
    payload
});

export const registerFailure = (payload) => ({
    type: REGISTER_FAILURE,
    payload
});

export const postLogout = () => ({
    type: POST_LOGOUT,
    payload: 'logout'
});

export const getAlbumsSuccess = (payload) => ({
    type: GET_ALBUMS_SUCCESS,
    payload
});

export const getAlbumsFailure = (payload) => ({
    type: GET_ALBUMS_FAILURE,
    payload
});

export const getAlbums = (page = 1) => {
    return (dispatch) => {
        return axios({
            method: 'GET',
            url: `http://localhost:5000/api/albums?page=${page}`
        })
            .then((res) => dispatch(getAlbumsSuccess(res.data)))
            .catch((error) => dispatch(getAlbumsFailure(error.response.data)));
    };
};

export const getUserAlbumsSuccess = (payload) => {
    console.log(payload);
    return {
        type: GET_USER_ALBUMS_SUCCESS,
        payload
    };
};

export const getUserAlbumsFailure = (payload) => ({
    type: GET_USER_ALBUMS_FAILURE,
    payload
});

export const getUserAlbums = (authToken, email, page = 1) => {
    return (dispatch) => {
        return axios({
            method: 'GET',
            url: `http://localhost:5000/api/user/albums?email=${email}&page=${page}`,
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then((res) => dispatch(getUserAlbumsSuccess(res.data)))
            .catch((error) =>
                dispatch(getUserAlbumsFailure(error.response.data))
            );
    };
};

export const updateProfileSuccess = (payload) => ({
    type: PROFILE_UPDATE_SUCCESS,
    payload
});

export const updateProfileFailure = (payload) => ({
    type: PROFILE_UPDATE_FAILURE,
    payload
});

export const updateProfile = (authToken, data) => {
    return (dispatch) => {
        return axios({
            method: 'PUT',
            url: `http://localhost:5000/api/updateprofile`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            data
        })
            .then((res) => dispatch(updateProfileSuccess(res.data)))
            .catch((error) =>
                dispatch(updateProfileFailure(error.response.data))
            );
    };
};

export const addAlbumSuccess = (payload) => ({
    type: ADD_ALBUM_SUCCESS,
    payload
});

export const addAlbumFailure = (payload) => ({
    type: ADD_ALBUM_FAILURE,
    payload
});

export const addAlbum = (authToken, data) => {
    return (dispatch) => {
        return axios({
            method: 'POST',
            url: 'http://localhost:5000/api/addalbum',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            data
        })
            .then((res) => dispatch(addAlbumSuccess(res.data)))
            .catch((error) => dispatch(addAlbumFailure(error.response.data)));
    };
};

export const setFilter = (payload) => ({
    type: SET_FILTER,
    payload
});

export const setSort = (payload) => {
    return { type: SET_SORT, payload };
};
