declare module "user" {
  export type RegisterUserForm = {
    address: string;
    detailAddress: string;
    email: string;
    farmName: string;
    code: string;
    name: string;
    password: string;
    passwordConfirm: string;
    phone: string;
    terms: boolean | number;
    registrationPath: string;
    registrationPath_etc: string;
  };

  export type UpdateRegisterUserForm = {
    email: string;
    code: string;
    name: string;
    password: string;
    registrationPath: string;
    phone: string;
    address: string;
    // terms: boolean | number;
  };

  export type SignInRequest = {
    id: string;
    password: string;
  };
}
