export type UserType = {
  id: string;
  password?: string;
  name?: string;
  role?: { name: string }[];
};
