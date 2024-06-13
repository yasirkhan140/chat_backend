export const deleteByExpire = `delete FROM public."Otp"
 WHERE "expire" < :currentDate `;
