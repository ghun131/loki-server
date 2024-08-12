import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivateController } from './activate/activate.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeorm from './config/typeorm';
import { DevicesModule } from './devices/devices.module';
import { HealthModule } from './health/health.module';
import { SignController } from './sign/sign.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
    DevicesModule,
    HealthModule,
    DevicesModule,
  ],
  controllers: [AppController, SignController, ActivateController],
  providers: [AppService],
})
export class AppModule {}
