import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  CLOUDINARY_URL: string;
  CLOUDINARY_FOLDER: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    CLOUDINARY_URL: joi.string().required(),
    CLOUDINARY_FOLDER: joi.string().required(),
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
  cloudinary: {
    url: envVars.CLOUDINARY_URL,
    folder: envVars.CLOUDINARY_FOLDER,
  },
};
