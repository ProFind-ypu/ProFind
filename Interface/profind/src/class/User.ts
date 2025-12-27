export interface User {
  id: number;
  fullname: string;
  email: string;
  uniId?: string;
  roles: string;
  token?: string;
  avatarUrl: string;
  accountStatus?: string;
  tags: string[];
  createdAt?: string;
}
// export type User = {
//   id: number;
//
// };
// {
//     "sub": "1",
//     "iat": 1766123688,
//     "exp": 1766127288,
//     "email": "professor@example.com",
//     "roles": "PROFESSOR",
//     "fullname": "Dr. Smith",
//     "avatarUrl": "",
//     "accountStatus": "OPEN",
//     "tags": ""
// }
