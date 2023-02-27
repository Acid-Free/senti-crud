# Senti AI CRUD API

A job posting CRUD API to be showcased at Senti AI for Cloud Engineer position.

## Live server links

http://ec2-35-77-197-119.ap-northeast-1.compute.amazonaws.com:5500/

http://35.77.197.119:5500/

## Technologies

- Node (version 18.xx.x) and Express (JS)
- MongoDB
- EJS

## How to run locally

1. Install `npm`
2. Install dependencies with `npm install`
3. Get your MongoDB connection string URI. More info at https://www.mongodb.com/docs/guides/atlas/connection-string/.
4. If Step 3 is not possible, use `"mongodb+srv://foo:bar@crud-learn-mongodb.ltursjo.mongodb.net/senti-crud?retryWrites=true&w=majority"`
5. Create an .env file in project root directory and add the following: 

```
PORT=5500
API_URL="http://localhost:5500"
DB_URL=<your MongoDB connection URI>
```
6. Run application with `npm run start`
7. Access `http://localhost:5500`

## Screenshots
<p>
<img src="screenshots/homepage-v2.png" alt="index route screenshot" width="800px">

<em>Homepage, showing all job postings and form for creating one</em>
</p>

<br />

<p>
<img src="screenshots/edit-job-posting-v2.png" alt="update job posting route screenshot" width="800px">

<em>Update job posting page, shows current values to be edited</em>
</p>
