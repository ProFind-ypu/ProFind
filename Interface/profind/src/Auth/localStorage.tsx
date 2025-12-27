//the back end dont uuse cookies soo i had to use the local storage to manage the jwt token
//
export const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};
