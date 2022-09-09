const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const Advisor = require('./models/Advisor');
const Client = require('./models/Client');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

mongoose
  .connect(
    'mongodb://localhost:27017/pattern_db?retryWrites=true'
  )
  .then(result => Advisor.deleteMany({}))
  .then(result => Client.deleteMany({}))
  .then(result => {
    const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
    console.log(data);
    

    const advisors = data['financial_advisors'];
    advisors.forEach(advisor => {
        const ad = new Advisor({
            name: advisor['name'],
            focus_areas: advisor['focus_areas']
        });
        ad.save();
    });

    const clients = data['clients'];
    clients.forEach(client => {
        const c = new Client({
            first_name: client['first_name'],
            last_name: client['last_name'],
            accounts: client['accounts']
        });
        c.save();
    });

    app.listen(8080);
  })
  .catch(err => console.log(err));