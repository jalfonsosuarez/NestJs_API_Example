/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerGuard } from './auth/guards/swagger.guard';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Duacode')
    .setDescription('The Duacode API description')
    .setVersion('1.0')
    .addTag('duacode')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  app.use('/api', (req, res, next) => {
    const guard = new SwaggerGuard();
    try {
      guard.canActivate({
        switchToHttp: () => ({ getRequest: () => req }),
      } as any);
      next();
    } catch (err: unknown) {
      const status = (err as any)?.getStatus?.() || HttpStatus.UNAUTHORIZED;
      const message = (err as any)?.message || 'Unauthorized access';
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger"');
      res.status(status).send(message);
    }
  });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(envs.port ?? 3000);
  logger.log(`App running on port ${envs.port}`, `Bootstrap`);
}
void bootstrap();
