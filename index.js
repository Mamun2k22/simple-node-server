const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Running your Server');
});

app.use(cors());
app.use(express.json());
const users = [

    { id: 1, name: 'Mamun', gmail: 'mamun12@gmail.com' },
    { id: 2, name: 'Music', gmail: 'music@gmail.com' },
    { id: 3, name: 'Gojol', gmail: 'Gojol@gmail.com' },
    { id: 4, name: 'Hamdah', gmail: 'hmanasid@gmail.com' }

    // Username: dbUser1
    // Password: AUpHxn26rqeqRmEE
];


const uri = "mongodb+srv://dbUser1:AUpHxn26rqeqRmEE@cluster0.ldmt6s4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users')
        const user = { name: 'Khan Mamun ', gmail: 'mamun580@gmail.com', age: '20' }
        // const result = await userCollection.insertOne(user);
        // console.log(result);
        app.post('/users', async (req, res) => {
            // console.log('POST API Called');
            const user = req.body;
            // user.id = user.length + 1; // User er Sathe new data add kora
            // users.push(user);
            // console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user.id = result.insertedId;
            // console.log(req.body);
            res.send(user);
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


app.get('/users', (req, res) => {
    res.send(users);
})
// app.post('/users', (req, res) => {
//     console.log('POST API Called');
//     const user = req.body;
//     user.id = user.length + 1; // User er Sathe new data add kora
//     users.push(user);
//     // console.log(user);
//     console.log(req.body);
//     res.send(user);
// })
app.listen(port, () => {
    console.log('Server not Running Port');
})