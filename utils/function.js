const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

const url = "mongodb+srv://vadhil:Alhafidz135@cluster0.pclmzog.mongodb.net/mongoDB";
const client = new MongoClient(url);


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((con) => {
    console.log("Connected to database");
})

const contactSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
})

const Contact =  mongoose.model('Contact', contactSchema);

Contact.find()
    .then(data => {
        // const contacts = data;
        console.log(data);
        // return contacts;
    })
    .catch(error => {
        console.log(error);
});

// const readContacts = Contact.find();

// toSave 
// person2.save().then((doc) => {console.log(doc)}).catch((err) => {console.log(err)});


module.exports = Contact.find;