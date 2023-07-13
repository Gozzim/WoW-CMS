import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

const transports =
{
    console: new winston.transports.Console
    ({
        level: 'silly',
        format: winston.format.combine
        (
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.colorize({ all: true, colors: { info: 'blue', debug: 'yellow', error: 'red' } }),
            winston.format.printf((info: winston.Logform.TransformableInfo) =>
            {
                return `[WoW-CMS] ${ info.timestamp } [${ info.level }] [${ info.context ? info.context : info.stack }] ${ info.message }`;
            })
        )
    }),
    combinedFile: new winstonDailyRotateFile
    ({
        dirname: 'logs',
        filename: 'combined',
        extension: '.log',
        level: 'info',
    }),
    errorFile: new winstonDailyRotateFile
    ({
        dirname: 'logs',
        filename: 'error',
        extension: '.log',
        level: 'error',
    }),
};

async function bootstrap(): Promise<void>
{
    const logger: Logger = new Logger('Bootstrap');
    const app: INestApplication = await NestFactory.create(AppModule);
    const port: number = +process.env.PORT || 4001;

    app.useLogger
    (
        WinstonModule.createLogger
        ({
            format: winston.format.combine
            (
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json(),
            ),
            transports: [transports.console, transports.combinedFile, transports.errorFile],
        }),
    );
    app.enableCors({ origin: process.env.CORS, credentials: true });
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle('WoW-CMS API')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', description: 'Enter Access Token', in: 'header' }, 'JsonWebToken')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    logger.log(`Application running on http://localhost:${ port }`);
    logger.log(`Swagger running on http://localhost:${ port }/api`);
    logger.log(`GraphQL running on http://localhost:${ port }/graphql`);
}

bootstrap();