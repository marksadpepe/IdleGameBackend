import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SERVER_CONFIGURATION_KEY, ServerConfigType } from "../configs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { port } = configService.get<ServerConfigType>(
    SERVER_CONFIGURATION_KEY,
    { infer: true },
  );

  await app.listen(port, (): void => {
    Logger.log(`Application is running on ${port} port`, "Bootstrap");
  });
}
bootstrap();
