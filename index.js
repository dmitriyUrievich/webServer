const chalk = require('chalk');
const express = require("express");
const path = require('path');
const {addNote,getNote, removeNotes} = require("./notesController");

const port = 3000
// const basePath = path.join(__dirname,'pages')
const app = express()


app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname,'public')))

app.get('/', async (req, res) => {
    res.render('index',{
    title:'Express App',
    notes: getNote(),
    created:false
  })
})

app.post('/',async (req, res)=>{
  await addNote(req.body.title)
  res.render('index',{
    title:'Express App',
    notes: await getNote(),
    created:true
  })
})
app.delete('/:id',async(req,ses)=>{
  await removeNotes(req.params.id)
  res.render('index',{
    title:'Express App',
    notes: await getNote(),
    created:true
  })
})






app.listen(port, () => {
  console.log(chalk.bgGreen(`Server started on port ${port}`))
})









