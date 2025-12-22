// {"id":1,"fullName":"Anaskln","year":"2025","bio":"Sample bio",
// "skills":"SQL, Python","department":"Software","phonenumber":"+1234567890"
// ,"avatarUrl":"https://example.com/avatar.jpg","role":"PROFESSOR"
// ,"altemail":"alt@example.com"}
export interface Professor {
  id: number;
  fullName: string;
  // title: string;
  department: string;
  altemail: string;
  phonenumber: string;
  office: string;
  bio: string;
  skills: string[];
  publications: string[];
  officeHours: string;
  avatarUrl: string;
}
