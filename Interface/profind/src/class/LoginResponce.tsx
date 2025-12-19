// this class is for decoding the responce from the login api
export interface LoginResponce {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
}
