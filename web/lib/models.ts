export type User = {
  id: string;
  email: string;
  role: Role;
};

export type UserInput = {
  email: string;
  password: string;
  role: Role;
};
export type UserLoginInput = {
  email: string;
  password: string;
};
export type UserLogin = {
  email: string;
  password: string;
};

export enum Role {
  ADMINISTRATOR = "ADMINISTRATOR",
  COLLABORATOR = "COLLABORATOR"
}

export type MeetingRoom = {
  id: string;
  roomNumber: number;
}
