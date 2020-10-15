import { GiftRandomizerDatabase } from "./db/GiftRandomizerDatabase";
import express from "express";
import apiRouter from "./api/routes/apiRouter";
import Config from "./util/config";

export class AppServer {
  private readonly app = express();
  private readonly db: GiftRandomizerDatabase = GiftRandomizerDatabase.getInstance();

  constructor() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use("/api", apiRouter);
    this.db
      .init()
      .then(() =>
        this.app.listen(Config.port, () =>
          console.log(`Server now listening on port ${Config.port}`)
        )
      )
      .catch((e) => console.log(e));
  }
}

new AppServer();
