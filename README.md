<div align="center">
   <h1 align="center" style="margin-top: -12px">Art Connect</h1>
    <h3>An application that allows users to buy commissioned art and for artist to sell their works. Made with Ruby on Rails and ReactJS</h3>
</div>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#features">Features</a> •
  <a href="#environment">Enviroment Variables</a> •
  <a href="#api-reference">Api Reference</a> •
  <a href="#run-locally">Run locally</a> •
  <a href="#run-test">Run Test</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#libraries">Libraries</a> •
  <a href="#for-improvements">For Improvements</a>  •
  <a href="#feedback">Feedback and Suggestions</a>
</p>

## <a name="introduction">Introduction</a>
Art Connect is my final project for our backend course at Avion School. It is a Ruby on Rails API and ReactJS application. 

## Links:
[Art Connect](https://artconnect.vercel.app) 

[Frontend Repository](https://github.com/michelle-santiago/artconnect) (this repository)

[Backend Repository](https://github.com/michelle-santiago/artconnect-api)




## <a name="features">Features</a>
Click to watch demo at loom
## Customizable Artist Page
[<img src="https://cdn.loom.com/sessions/thumbnails/52ef4a991236425ba36fdc2a61c21c5b-with-play.gif" width="600" height="300"/>](https://www.loom.com/embed/52ef4a991236425ba36fdc2a61c21c5b?sid=105cfa59-ad5b-4185-b10b-2b27101b7ffd)
## Commission management and processing features with messaging
[<img src="https://cdn.loom.com/sessions/thumbnails/b9841544c78d47f3be2dfa55f7a4e227-with-play.gif" width="600" height="300"/>](https://www.loom.com/embed/b9841544c78d47f3be2dfa55f7a4e227?sid=a290a3c2-de77-47a5-b342-8b3425e90702)
## Direct Messaging
[<img src="https://cdn.loom.com/sessions/thumbnails/11a9a49abf4f4d2e87b1f4ce14b3b53c-1688124781468-with-play.gif" width="600" height="300"/>](https://www.loom.com/embed/11a9a49abf4f4d2e87b1f4ce14b3b53c?sid=ad423014-70be-48dd-9855-54c8496bcd3e)

## <a name="environment">Environment Variables</a>

To run this project, you will need to add the following environment variables.

Create .env.development and .env.production to the root of your project. I used dotenv for loading environment variables

## Frontend (this repository)

.env.development
```bash
VITE_API_URL = http://localhost:3000/api/v1

VITE_CABLE_URL = ws://localhost:3000/cable
```
.env.production

```bash
VITE_API_URL = https://artconnect.onrender.com/api/v1
VITE_CABLE_URL = wss://artconnect.onrender.com/cable
```

## Backend

## Active Storage

config/environments/development.rb

```bash
config.active_storage.service = :local
```
config/environments/production.rb

```bash
  config.active_storage.service = :cloudinary
  config.action_cable.url = "wss://artconnect.onrender.com/cable"
  config.action_cable.allowed_request_origins =["https://artconnect.vercel.app" ]
```

 ## .env

 Add to .gitignore. The following enviroment variables for cloudinary and database
```bash 
/.env
```
 ## Cloudinary 
 [Read docs here](https://cloudinary.com/documentation/rails_integration) 


```bash
CLOUDINARY_NAME = "something"
CLOUDINARY_API_KEY = "something"
CLOUDINARY_API_SECRET = "something"
```
## Database (PostgreSQL)

Development

 ```bash
  DATABASE_USERNAME = "username"
  DATABASE_PASSWORD = "password"
```
Production Render 

[Read docs here](https://render.com/docs/databases)
 ```bash
  DATABASE_URL = "username"
```
## Action Cable
Redis for production. Add on render environment variables

`REDIS_URL`

## Cors 
config/initializers/cors.rb

develop branch
```bash
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:5173"
    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete :options, :head]
  end
end
```
main branch
```bash
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://artconnect.vercel.app"
    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete :options, :head]
  end
end
```
## <a name="api-reference">Api Reference</a>
[Postman Collection](https://web.postman.co/workspace/7dd19245-d99f-4d73-8302-90a538f3fa92/collection/27386181-86d94386-97d9-4425-837d-12d08b0b70c6)
to view the endpoints for my artconnect-api project. Apologies as there are no description yet for each endpoints. Will update soon

## <a name="run-locally">Run locally</a>

Frontend (this repository)

clone the project

```bash
  git clone https://github.com/michelle-santiago/artconnect.git
```

Go to the project directory

```bash
  cd artconnect
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Backend

clone the project

```bash
  git clone https://github.com/michelle-santiago/artconnect-api.git
```

Go to the project directory

```bash
  cd artconnect-api
```

Install dependencies

```bash
  bundle install
  npm install
```

Start the database service

```bash
  sudo service postgresql start
```

Start the server

```bash
  rails s
```

## <a name="run-test">Run test</a>
To run tests, run the following command
```bash
  rails spec
```
## <a name='tech-stack'>Tech Stack</a>
Frontend (this repository)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)


Backend

![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## <a name='libraries'>Libraries</a>

Frontend (this repository)

- flowbite, flowbite react, react lazy load image component, react loading skeleton,  axios, action cable, react hot toast, react quill, dotenv

Backend
- Factory bot, faker, database cleaner, simplecov, cloudinary, dotenv rails

## <a name="for-improvements">For Improvements</a>

- Dark theme
- Payment feature
- Admin feature
- Account Profile Management
- Archive / Delete features
- Send media feature to messages

## <a name='feedback'>Feedback and Suggestions</a>

I would love to hear any feedback or suggestions to improve my project. If you have any feedback or suggestions, please reach out to me at mdcsantiago0@gmail.com ❤️