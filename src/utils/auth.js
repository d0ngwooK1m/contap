export const saveToken = (token) => window.localStorage.setItem('jwt', token);
export const getToken = () => window.localStorage.getItem('jwt');
export const removeToken = () => window.localStorage.removeItem('jwt');
