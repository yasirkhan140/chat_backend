// authenticateSocket.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import { DecodedToken } from "../interface";
import { ExtendedError } from "socket.io/dist/namespace";

export const authenticateSocket = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.query.token as string;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  // Verify the token and attach user information to the socket
  verifyToken(token, (err, user) => {
    if (err || !user) {
      return next(new Error("Authentication error") as ExtendedError);
    }
    (socket as any).user = user; // Attach user info to the socket
    next();
  });
};
async function verifyToken(
  token: string,
  callback: (err: Error | null, user?: string | JwtPayload) => void
) {
  try {
    const decodedToken: string | JwtPayload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as DecodedToken;
  
    callback(null, decodedToken);
  } catch (error) {
    return callback(error as ExtendedError);
  }
  

  
}
