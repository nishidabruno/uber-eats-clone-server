export const auth = {
  secret_token: String(process.env.JWT_SECRET),
  expires_in_token: '1d',
};
