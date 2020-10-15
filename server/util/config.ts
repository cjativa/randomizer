import dotenv from "dotenv";

dotenv.config();

const Config = {
  port: process.env.PORT || 4000,
};

export default Config;
