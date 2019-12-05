import { getQueryString } from '../utils';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
    return localStorage.getItem('token') || getQueryString('token') || '';
}

export function setAuthority(authority) {
    return localStorage.setItem('token', authority);
}
