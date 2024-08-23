import cron from "node-cron";
import OtpModel from "../models/otp.models";
import { deleteByExpire } from "../query/deleteOtp";
const cornSheduler = () => {
  cron.schedule("*/60 * * * * *", async function () {
    const currentDate = new Date();
    // await OtpModel.destroy({
    //   where: { expire: { [Op.lte]: new Date() } },
    // });
    await OtpModel.sequelize?.query(deleteByExpire, {
      replacements: { currentDate }, // use parameter replacement to avoid SQL injection
    });
  });
};
export default cornSheduler;
