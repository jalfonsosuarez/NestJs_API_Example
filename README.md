# Duacode project

* Auth
* User CRUD
* User roles
* Duacode CRUD

# Necessary instalations

* [pmpn](https://pnpm.io/es/installation)
* [NodeJs](https://nodejs.org/en/download)
* [NestJs](https://docs.nestjs.com/first-steps)

## Environment values

* Replace user, password, host and port for yours own values.
  DATABASE_URL="mysql://user:password@host:port/duacode"
* Secret word to encrypt passwords
  JWT_SECRET=an_aleatory_hash
* Create a space to upload images in [Cloudinary](https://cloudinary.com/)
  * CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@
  * CLOUDINARY_FOLDER=

## Node-Modules

* pnpm i

## Database start

To instal database run docker command: docker compose up -d

* You need to be installed [docker](https://docs.docker.com/engine/install/).

## Create database

Generate Prisma Client `npx prisma generate`

## Start project

* Ejecutar proyecto `npm run start:dev`

## Api DOCS

* localhost:3000/api/docs


