import express from 'express';
import bodyParser from 'body-parser';
import videoRoutes from './routes/videoRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/videos', videoRoutes);
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
