
// db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'ls-748579094099b0766a964caacd8cc4a4b73ec231.czwhjvdkncwk.us-east-2.rds.amazonaws.com',
  user: 'team',
  password: 'event_team',
  database: 'test_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

export default connection;

