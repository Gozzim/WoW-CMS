import { Module } from '@nestjs/common';
import { Pool, createPool } from 'mysql2/promise';

@Module
({
    providers:
    [
        {
            provide: 'AUTH_DATABASE',
            useFactory: async(): Promise<Pool> =>
            {
                return createPool
                ({
                    host: process.env.AUTH_DATABASE_HOST,
                    port: +process.env.AUTH_DATABASE_PORT,
                    database: process.env.AUTH_DATABASE_NAME,
                    user: process.env.AUTH_DATABASE_USERNAME,
                    password: process.env.AUTH_DATABASE_PASSWORD
                });
            }
        },
        {
            provide: 'CHARACTERS_DATABASE',
            useFactory: async(): Promise<{ [key: string]: Pool }> =>
            {
                const charactersDatabases: { [key: string]: Pool } = { };

                for (let i = 0; i < +process.env.CHARACTER_DATABASE_LENGTH + 1; i++)
                {
                    charactersDatabases[process.env[`CHARACTERS_${ i }_DATABASE_REALM_NAME`]] = createPool
                    ({
                        host: process.env[`CHARACTERS_${ i }_DATABASE_HOST`],
                        port: +process.env[`CHARACTERS_${ i }_DATABASE_PORT`],
                        database: process.env[`CHARACTERS_${ i }_DATABASE_NAME`],
                        user: process.env[`CHARACTERS_${ i }_DATABASE_USERNAME`],
                        password: process.env[`CHARACTERS_${ i }_DATABASE_PASSWORD`]
                    });
                }

                return charactersDatabases;
            }
        },
        {
            provide: 'WORLD_DATABASE',
            useFactory: async(): Promise<Pool> =>
            {
                return createPool
                ({
                    host: process.env.WORLD_DATABASE_HOST,
                    port: +process.env.WORLD_DATABASE_PORT,
                    database: process.env.WORLD_DATABASE_NAME,
                    user: process.env.WORLD_DATABASE_USERNAME,
                    password: process.env.WORLD_DATABASE_PASSWORD
                });
            }
        },
        {
            provide: 'WEB_DATABASE',
            useFactory: async(): Promise<Pool> =>
            {
                return createPool
                ({
                    host: process.env.WEB_DATABASE_HOST,
                    port: +process.env.WEB_DATABASE_PORT,
                    database: process.env.WEB_DATABASE_NAME,
                    user: process.env.WEB_DATABASE_USERNAME,
                    password: process.env.WEB_DATABASE_PASSWORD
                });
            }
        }
    ],
    exports: ['AUTH_DATABASE', 'CHARACTERS_DATABASE', 'WORLD_DATABASE', 'WEB_DATABASE']
})
export class DatabaseModule
{

}
