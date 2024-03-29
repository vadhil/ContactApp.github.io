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
        layout: 'home',
        title: 'Home'
    });
});
// app.get('/', (req, res) => {
//   res.render('layout/index', { title: 'App Contact' });
// });
// app.get('/playground', (req, res) => {
//     res.render('playground', {
//         layout: 'layout/index',
//         title: "contact ",
//         contacts
//     })
// })
app.get('/playground', (req, res) => {
  const title = "Playground";
  res.render('playground', {
      layout: 'layout/index',
      title,
      contacts
  })
})

app.get('/contact', async (req, res) => {
    try {
        const contacts = await readContacts();
        res.render('contact', {
            layout: 'layout/index',
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
        layout: 'layout/index',
        title: "add contact form"
    })
})
app.get('/update/:name', async (req, res) => {
    const contact = await readContacts({ name: req.params.name });

    res.render('update', {
        layout: 'layout/index',
        title: "update form",
        contact,
    })
})

app.post('/update/:name', async (req, res) => {
    try {
      const contact = await readContacts({ name: req.params.name });
      await Contact.updateOne({ name: contact[0].name }, {
        name: req.body.name,
        phone: req.body.phone
      });
      console.log('Contact updated successfully!');
      res.redirect('/contact');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });
  

app.delete('/delete/:name', async (req, res) => {
    try {
      const contact = await readContacts({ name: req.params.name });
      if (contact.length === 0) {
        res.status(404).send('Contact not found');
        return;
      }
      await Contact.deleteOne({ name: contact[0].name });
      console.log('Contact deleted successfully!');
      res.redirect('/contact');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

app.get('/contact/:name',  async(req, res) => {
    const contact= await readContacts({name : req.params.name});
    console.log(contact[0].name);
    res.render('detail', {
        layout: 'layout/index',
        title: "detail contact",
        contact,
    })})
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layout/index',
        title: "about"
       
    })
})
app.use('', (req, res) => {
    res.render('chatgpt', {
        layout: 'chatgpt',
        title: "chatgpt"
    })
})







const port = 3000;
app.listen(process.env.PORT || port,() => {
    console.log(`listening on ${port}`);
});
