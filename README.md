# NodeJs and NestJs API Example

* Auth
* User CRUD
* User roles
* Example CRUD

# Necessary instalations

* [pmpn](https://pnpm.io/es/installation)
* [NodeJs](https://nodejs.org/en/download)
* [NestJs](https://docs.nestjs.com/first-steps)

## Environment values

* Copy .env.template to .env file and:
  * Replace user, password, host and port for yours own values.
    DATABASE_URL="mysql://user:password@host:port/exampleDb"
  * Secret word to encrypt passwords.
    JWT_SECRET=an_aleatory_hash
  * Create a space to upload images in [Cloudinary](https://cloudinary.com/)
    * CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@
    * CLOUDINARY_FOLDER=

## Node-Modules

* pnpm i

## Database start

To instal database run docker command: docker compose up -d

* You need install [docker](https://docs.docker.com/engine/install/).

## Create database

Generate Prisma Client `npx prisma migrate dev --name init`

## Start project

* Run this API `pnpm start:dev`

## Api DOCS

* localhost:[port]/api/docs

## Create the first user into database

* Start project.
* Call to end-point POST user/firstuser
* IMPORTANT: For safety, delete the related methods from userController and userService when you has been created the first user.
* Now you can access the api with with email: 'admin@correo.com' and password: 'A123456b'.
* TIP: You can edit the values for the first user before run this end-point (into userService.ts file) and use the email and password that you set to login.
