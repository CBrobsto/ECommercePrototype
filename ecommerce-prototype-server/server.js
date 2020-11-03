const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let Item = require('./Item.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/prototype', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});

const inventoryRoutes = express.Router();

inventoryRoutes.route('/').get(function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

inventoryRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
});

inventoryRoutes.route('/add').post(function(req, res) {
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'item added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new item failed');
        });
});

inventoryRoutes.route('/update/:id').post(function(req, res) {
    Item.findById(req.params.id, function(err, item) {
        if (!item)
            res.status(404).send("data is not found");
        else
            item.item_description = req.body.item_description;
            item.item_id = req.body.item_id;
            item.item_quantity = req.body.item_quantity;
            item.item_price = req.body.item_price;

            item.save().then(item => {
                res.json('Item updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/inventory', inventoryRoutes);

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});
