import express from 'express';
import control from './routes/index';

const api = express();
const port = process.env.PORT || 5000;

api.use(express.json());

control(api);

api.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default api;
