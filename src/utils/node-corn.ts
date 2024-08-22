import cron from "node-cron";
import OtpModel from "../models/otp.models";
import { Op } from "sequelize";
import { deleteByExpire } from "../query/deleteOtp";
const cornSheduler = () => {
  cron.schedule("*/45 * * * * *", async function () {
    console.log("running a task every 45 second");
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
