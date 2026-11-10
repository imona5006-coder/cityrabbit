import express from 'express'
const app = express();
const port = 3001;
app.set('view engine', 'ejs');
let users = [];
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.render('index', {users: users,
        editingPost: null
    });
});
app.get('/create', (req,res) => {
    res.render('create');
});
app.post('/submit', (req,res) => {
    const newPost = {
        id: users.length +1,
        title: req.body.title,
        content: req.body.content
    }
    console.log(newPost);
    users.push(newPost);
    res.redirect('/');

});
// / Edit Route: Renders the index page with the post details to be edited
app.get('/edit/:id', (req, res) => {
    const id = Number(req.params.id);
    const editingPost = users[id]; // Directly grab the post object using the array index number
    
    // Pass the index along so the update route knows which item to change later
    res.render('index', { users: users, editingPost: editingPost, editingId: id });
});

// Update Route: Overwrites old post details at the target index
app.post('/update/:id', (req, res) => {
    const id = Number(req.params.id);
    
    if (users[id]) {
        users[id].title = req.body.title;
        users[id].content = req.body.content;
    }
    res.redirect('/');
});

// Delete Route: Removes post from array by its index position
app.post('/delete/:id', (req, res) => {
    const id = Number(req.params.id);
    
    // Check if the array index actually contains data before removing it
    if (id >= 0 && id < users.length) {
        users.splice(id, 1);
    }
    res.redirect('/');
});

app.get('/about', (req,res) => {
    res.render('about');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});