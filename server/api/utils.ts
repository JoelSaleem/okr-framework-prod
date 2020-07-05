export type Token = {
  userId: number;
  iat: number;
};

export const getUserId = (ctx: any): number | undefined => {
  const context: any = ctx;
  const token: Token | undefined = context.token;

  return token?.userId;
};
