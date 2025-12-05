import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import articleRoutes from './routes/articleRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});