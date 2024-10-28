import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SERVER_CONFIGURATION_KEY, ServerConfigType } from "../configs";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Idle Game")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

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
