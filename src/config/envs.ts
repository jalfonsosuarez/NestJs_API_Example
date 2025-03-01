import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  SWAGGER_USERNAME: string;
  SWAGGER_PASSWORD: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    SWAGGER_USERNAME: joi.string().required(),
    SWAGGER_PASSWORD: joi.string().required(),
  })
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`config validation error: ${error.message}`);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  swagger: {
    userName: envVars.SWAGGER_USERNAME,
    password: envVars.SWAGGER_PASSWORD,
  },
};
