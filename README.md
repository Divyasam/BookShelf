# Idendity Management using Blockchain - Passport services
MERN stack web app

npm install bcrypt@1.0.3 body-parser@1.18.2 concurrently@3.5.1 cookie-parser@1.4.3 --save
npm install express@4.16.2 jsonwebtoken@8.0.1 moment-js@1.1.15 mongoose@4.10.8 --save

check engines in package.json and update with the node version

cd client
npm install axios@0.17.1 redux@3.7.2 react-redux@5.0.6 react-router-dom@4.2.2 redux-promise@0.5.3 --save
npm install react-fontawesome@1.6.1 react-simple-sidenav@0.1.6 redux-thunk@2.2.0 --save

To run in localhost:
Install mongoDB: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

To run mongoDB: 
1st cmd: "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
2nd cmd: "C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe"

Heroku Deployment:
https://obscure-mesa-19334.herokuapp.com/

To register new user initially,
Open postman
Post: http://localhost:3001/api/register
Header: 
Key: Content-type
Value: application/json
Body:
{
    "email":"admin@gmail.com",
    "password":"password123",
    "name":"admin",
    "lastname":"T"
}

Open Robo3T and check under Bookshelf

To run: npm run dev
