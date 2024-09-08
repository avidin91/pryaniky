export const getTokenFromLocalStorage = (): string => {
	const data = localStorage.getItem('x-auth');
	return data ? JSON.parse(data) : '';
};

export const setTokenToLocalStorage = (token: string): void => {
	localStorage.setItem('x-auth', JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
	localStorage.removeItem('x-auth');
};
