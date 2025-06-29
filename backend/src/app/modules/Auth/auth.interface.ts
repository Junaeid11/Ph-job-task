export type TLoginUser = {
    email: string;
    password: string;

}

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  photoURL?: string;
};

export type TJwtPayload = {
  id: string;
  email: string;
  name: string;
};