const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');

// const {findContacts} = require('./utils/function');


const app = express();
const url = "mongodb+srv://vadhil:Alhafidz135@cluster0.pclmzog.mongodb.net/mongoDB";
const client = new MongoClient(url);


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

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

const person1 = new Contact({
    name: "fakhri",
    phone: "089539545744",
    email: "fakhri135@gmail.com"
})
const person2 = new Contact({
    name: "fathul",
    phone: "089535455744",
    email: "fahmimajid01@gmail.com"
})

// const contacts = Contact.find()
// .then(users => console.log(users.length))
// .catch(err => console.log(`OH NOOO, ${err.message}`));


Contact.find()
    .then(data => {
        // const contacts = data;
        console.log(data);
        // return contacts;
    })
    .catch(error => {
        console.log(error);
});

const contacts = Contact.find();

// console.log(typeof(contacts));
// console.log(contacts);

// person2.save().then((doc) => {console.log(doc)}).catch((err) => {console.log(err)});

  //layout

app.get('/', (req, res) => {
    res.render('home', {
        layout: 'layout/main',
        title: 'Home'
    });
});
app.get('/playground', (req, res) => {
    res.render('playground', {
        layout: 'layout/main',
        title: "contact ",
        contacts
    })
})
// app.get('/contact', (req, res) => {
//     res.render('contact', {
//         layout: 'layout/main',
//         title: "contact ",
//         contacts
//     })
// }) contoh yang salah
app.get('/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render('contact', {
            layout: 'layout/main',
            title: "contact ",
            contacts
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/add-contact', (req, res) => {
    res.render('add-contact', {
        layout: 'layout/main',
        title: "add contact form"
    })
})
app.get('/detail', (req, res) => {
    res.render('detail', {
        layout: 'layout/main',
        title: "detail contact "
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layout/main',
        title: "about us"
    })
})






const port = 3000;
app.listen(process.env.PORT || port,() => {
    console.log(`listening on ${port}`);
});

