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

export const getUserAlbumsSuccess = (payload) => ({
    type: GET_USER_ALBUMS_SUCCESS,
    payload
});

export const getUserAlbumsFailure = (payload) => ({
    type: GET_USER_ALBUMS_FAILURE,
    payload
});

export const getUserAlbums = (authToken, email) => {
    return (dispatch) => {
        return axios({
            method: 'GET',
            url: `http://localhost:5000/api/user/albums?email=${email}`,
            headers: { Authorization: `Bearer ${authToken}` }
        })
            .then((res) => dispatch(getUserAlbumsSuccess(res.data)))
            .catch((error) =>
                dispatch(getUserAlbumsSuccess(error.response.data))
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
