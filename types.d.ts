export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    country: string;
  };
  email: string;
  login: {
    uuid: string;
  };
  picture: {
    medium: string;
  };
}
interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
}
export interface IupdateUser {
  id: string;
  email: string;
  city: string;
  country: string;
  streetName: string;
  streetNumber: string;
  firstName: string;
  lastName: string;
}

export interface UsersResponse {
  results: User[];
}
