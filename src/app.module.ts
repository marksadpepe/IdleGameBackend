import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  serverConfig,
  databaseConfig,
  getTypeormOptions,
  DBConfigType,
  DB_CONFIGURATION_KEY,
  telegramConfig,
  jwtConfig,
  gameConfig,
} from "../configs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TelegramMiddleware } from "./middlewares/telegram/telegram.middleware";
import { TokenModule } from "./token/token.module";
import { GameModule } from "./game/game.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { XpschedulerModule } from "./xpscheduler/xpscheduler.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        databaseConfig,
        serverConfig,
        telegramConfig,
        jwtConfig,
        gameConfig,
      ],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        getTypeormOptions(
          config.getOrThrow<DBConfigType>(DB_CONFIGURATION_KEY),
        ),
      inject: [ConfigService],
    }),
    TokenModule,
    GameModule,
    UserModule,
    AuthModule,
    XpschedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TelegramMiddleware).forRoutes("*");
  }
}
