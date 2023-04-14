const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {readContacts, Contact} = require('./utils/function');


const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));


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
        const contacts = await readContacts();
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
app.post('/contact', (req, res) => {
    const contact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
  
    contact.save()
      .then(() => {
        console.log('Contact added successfully!');
        res.redirect('/contact');
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Internal server error');
      });
  });
app.get('/add-contact', (req, res) => {
    res.render('add-contact', {
        layout: 'layout/main',
        title: "add contact form"
    })
})
// app.get('/:name/deleted', async (req, res) => {
//     const contact= await readContacts({name : req.params.name});
//     Contact.deleteOne({ name: 'John Doe' })
//   .then(() => {
//     console.log('Contact deleted successfully!');
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//     res.render('add-contact', {
//         layout: 'layout/main',
//         title: "add contact form"
//     })
// })
app.get('/contact/:name',  async(req, res) => {
    const contact= await readContacts({name : req.params.name});
    // console.log(contact[0].name);
    res.render('detail', {
        layout: 'layout/main',
        title: "detail contact",
        contact,
    })})
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

