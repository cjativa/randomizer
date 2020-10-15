import dotenv from "dotenv";

dotenv.config();

const Config = {
  port: process.env.PORT || 8000,
};

export default Config;
