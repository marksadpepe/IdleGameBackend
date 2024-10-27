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
  jwtConfig,
} from "../configs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TelegramMiddleware } from "./middlewares/telegram/telegram.middleware";
import { TokenModule } from "./token/token.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, serverConfig, telegramConfig, jwtConfig],
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
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TelegramMiddleware).forRoutes("*");
  }
}
