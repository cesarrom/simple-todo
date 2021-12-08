import * as dotenv from "dotenv";

export default (dir: string) => {
  dotenv.config({
    path: `${dir}/.env`,
  });

  dotenv.config({
    path: `${dir}/${process.env.NODE_ENV || ""}.env`,
  });
};
