declare module "user" {
  export type RegisterUserForm = {
    address: string;
    detailAddress: string;
    email: string;
    farmName: string;
    id: string;
    name: string;
    password: string;
    passwordConfirm: string;
    phone: string;
    terms: boolean;
    path: string;
  };

  export type SignInRequest = {
    id: string;
    password: string;
  };
}
