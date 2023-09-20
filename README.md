# Evolver-events-backend

## Authentication
The app uses social login for authentication (google and twitter). If the user does not exist, it creates a new user in the database using the google or twitter profile and if the user exists, it finds the user.
The authentication is session-based and uses cookie sessions for storage.

### Endpoints
GET /auth/google
GET /auth/twitter

### Setup
run npm install on your cmd, create your .env file including your clientid and secret for google and consumerkey and secret for twitter. Also include your session key and secret

### Run
```
node app.js
```