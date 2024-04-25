type RegexList = Record<string, { regex: RegExp; message?: string }>;

export const regex: RegexList = {
  password: {
    regex:
      /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9].*)[a-zA-Z0-9!@#$%^&*()-_+=]{8,50}$/,
    message:
      "Password must contain at least 8 characters, 2 lowercase letters, 2 numbers, 2 symbols, and 2 uppercase letters.",
  },
} as const;
