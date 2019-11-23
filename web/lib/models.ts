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
  title: string;
  icon: string;
  total: number;
  id: string;
};

export type ServiceOrder = {
  id: string;
  meeting: Meeting;
  fulfilled: boolean;
  requests: ServiceRequest[];
};

export type ServiceRequest = {
  id: string;
  order: ServiceOrder;
  service: Service;
  total: number;
};

export type ServiceOrderInput = {
  meetingId: string;
  requests: ServiceRequestInput[];
};

export type ServiceRequestInput = {
  serviceId: string;
  total: number;
};
