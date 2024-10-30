import { join } from "path";
import { DBConfigType } from "../configurations";
import { DataSourceOptions } from "typeorm";

export const getTypeormOptions = ({
  username,
  password,
  port,
  host,
  database,
}: DBConfigType): DataSourceOptions => {
  const entitiesPath = join(
    __dirname,
    "..",
    "..",
    "src",
    "entities",
    "**.entity{.ts,.js}",
  );

  return {
    type: "postgres",
    username,
    password,
    port,
    host,
    database,
    entities: [entitiesPath],
    synchronize: false,
    logging: false,
  };
};
