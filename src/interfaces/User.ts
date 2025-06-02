interface User {
  email: string;
  emailVerified: boolean;
  familyName: string;
  givenName: string;
  termsAndConditions: string;
  phoneNumber?: string;
  postcode?: string;
}
export default User;
