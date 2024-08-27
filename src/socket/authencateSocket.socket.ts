// authenticateSocket.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import { DecodedToken, UserTpyedModel } from "../interface";
import { ExtendedError } from "socket.io/dist/namespace";
import User from "../models/user.models";

export const authenticateSocket = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.query.token as string;
  if (!token) {
    return next(new Error("Authentication error token is not send"));
  }

  // Verify the token and attach user information to the socket
  verifyToken(token, (err, user) => {
    if (err || !user) {
      return next(new Error("Authentication error invalid token") as ExtendedError);
    }
    (socket as any).user = user; // Attach user info to the socket
    next();
  });
};
async function verifyToken(
  token: string,
  callback: (err: Error | null, user?: UserTpyedModel) => void
) {
  try {
    const decodedToken: string | JwtPayload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as DecodedToken;
  const user:UserTpyedModel | null = await User.findByPk(decodedToken.id)
  if(!user){
throw new Error("User not found")
  }
    callback(null, user);
  } catch (error) {
    return callback(error as ExtendedError);
  }
  

  
}
