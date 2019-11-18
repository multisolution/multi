export type User = {
  id: string;
  email: string;
  role: Role;
};

export type UserInput = {
  email: string;
  password: string;
  role?: Role;
  id?: string;
  inviteCode?: string;
};

export type InputServiceRequest = {
  serviceId: string;
  roomId: string;
  hostId: string;
  total: number;
};

export enum Role {
  ADMINISTRATOR = "ADMINISTRATOR",
  COLLABORATOR = "COLLABORATOR"
}

export type MeetingRoom = {
  id: string;
  roomNumber: number;
  description: string;
  color: string;
};

export type Meeting = {
  id: string;
  startsAt: Date;
  endsAt: Date;
  room: MeetingRoom;
};

export type MeetingInput = {
  title: string;
  roomId: string;
  startsAt: string;
  endsAt: string;
};

export type CalendarTime = {
  hour: string;
  meetings: Meeting[];
};

export type Calendar = {
  date: string;
  times: CalendarTime[][];
};
export type Service = {
  label: string;
  icon: string;
  total: number;
  id: number;
};
