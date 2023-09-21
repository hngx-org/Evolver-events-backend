
import express from 'express';
import bodyParser from 'body-parser';
import getEventsDetails from './controllers/eventController/methods/getEventDetails.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use the getEventsController
app.use('/api', getEventsDetails);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
