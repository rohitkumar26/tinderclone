import express from 'express'
import mongoose from 'mongoose'
import Cards from './models/dbCards.js'
import Cors from 'Cors';



const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:eBoNXZ4c2ou7p5ZI@cluster0.jvjee.mongodb.net/tinderdbs?retryWrites=true&w=majority'

mongoose.connect(connection_url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });



app.use(express.json());
app.use(Cors());

app.get('/', (req, res) => {
    res.status(200).send('hello world');
})

app.post('/tinder/card', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
})
app.get('/tinder/card', async (req, res) => {
    try {
        const result = await Cards.find().exec();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port, () => console.log(`listening on port ${port}`));