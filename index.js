// import express from 'express'; // Es2015 modules
const express = require('express'); // CommonJS modules 
// ^^^^^^^^^^^^^^^^^^^^^^
// nmp i express
const Hubs = require('./data/hubs-model.js');

const server = express();
server.use(express.json()); // needed for POST and PUT/PATCH requests
// ^^^ Teaches express how to read JSON from the body of the request

server.get('/', (req, res) => {
    res.json({ hello: 'Web 26'})
})

// view a list of hubs
server.get('/api/hubs', (req, res) => {
    // go and get the hubs from the databse
    Hubs.find()
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'opps'})
    });
})

// add a hub
server.post('/api/hubs', (req, res) => {
    // axios.post(url, data, options); the data will be in the body of the request
    const hubInfo = req.body;
    console.log('body', req.body)
    // validate the data, and if the data is valid save it
    Hubs.add(hubInfo)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'opps'})
    })
})

// delete
server.delete('/api/hubs/:hubid', (req, res) => {
    Hubs.remove(req.params.hubid)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'opps'})
        })
})

const port = 5000;
server.listen(port , () => console.log(`\n API on port ${port} \n`));

