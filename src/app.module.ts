import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  serverConfig,
  databaseConfig,
  getTypeormOptions,
  DBConfigType,
  DB_CONFIGURATION_KEY,
  telegramConfig,
} from "../configs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TelegramMiddleware } from "./middlewares/telegram/telegram.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, serverConfig, telegramConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        getTypeormOptions(
          config.getOrThrow<DBConfigType>(DB_CONFIGURATION_KEY),
        ),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TelegramMiddleware).forRoutes("*");
  }
}
