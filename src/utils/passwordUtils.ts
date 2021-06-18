import argon2 from "argon2";

export const hashPassword = async (password: string) => {
  const newPassword = await argon2.hash(password);
  return newPassword;
};

export const comparePassword = async (
  hashedPassword: string,
  password: string
) => {
  const valid = await argon2.verify(hashedPassword, password);
  return valid;
};
