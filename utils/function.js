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
    .then(()=> {
    })
    .catch(error => {
        console.log(error);
});
function readContacts(query) {
    return Contact.find(query);
}

const person1 = new Contact({
    name: "keysha",
    phone: "0895349545744",
    email: "keysha@gmail.com"
})

// Contact.deleteOne()
//   .then(result => {
//     console.log(`Deleted ${result.deletedCount} document(s)`);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// function deleteContacts(query) {
//     return Contact.deleteOne(query);
// }


// toSave 
// person1.save().then((doc) => {console.log(doc)}).catch((err) => {console.log(err)});


  
  module.exports ={ readContacts, Contact};

// const readContacts = Contact.find();

// deleteContacts

// module.exports = Contact.find;