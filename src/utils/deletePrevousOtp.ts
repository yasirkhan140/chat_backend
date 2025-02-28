import {OtpModel} from "../models/associations";
import { deleteByExpire } from "../query/deleteOtp";
const deletePrevousOtp = async() => {
 
    const currentDate = new Date();
    // await OtpModel.destroy({
    //   where: { expire: { [Op.lte]: new Date() } },
    // });
    await OtpModel.sequelize?.query(deleteByExpire, {
      replacements: { currentDate }, // use parameter replacement to avoid SQL injection
    });
};
export default deletePrevousOtp;
 