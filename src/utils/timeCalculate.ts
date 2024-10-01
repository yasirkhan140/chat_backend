const isWithinTwoMinutes = (createdAt: Date) => {
    const createdAtDate: number = new Date(createdAt).getTime();
    const now: number = new Date().getTime();
    const diffInMillis = now - createdAtDate;
    const diffInMinutes = diffInMillis / (1000 * 60);
    const twoMinmilli = parseInt(process.env.OTP_RENERATE_TIME as string);
    return [diffInMinutes < 2, (twoMinmilli - diffInMillis) / 1000];
  };
  export default isWithinTwoMinutes