const http = require('http');
const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');
const {addNote} = require("./notesController");

const port = 3000
const basePath = path.join(__dirname,'pages')


const server = http.createServer(async (req, res) => {

  if(req.method === 'GET'){
  const content = await fs.readFile(path.join(basePath,'index.ejs'))
    res.end(content)
  }else if(req.method === 'POST'){
    const body = []
    res.writeHead(200,{
      'Content-Type': 'text/plain; charset=utf-8'
    })
    req.on('data',(data)=>{
      body.push(Buffer.from(data))
    })
    req.on('end',()=>{
      const title = body.toString().split('=')[1].replaceAll('+',' ')
      addNote(title)
      res.end(`title=${title}`)
    })

  }

})

server.listen(port,()=>{
  console.log(chalk.green(`Servet has been started on ${port}...`));
});

// const yargs = require('yargs')
// const {addNote, printNotes,removeNotes} = require("./notesController");
//
// yargs.command({
//   command:"add",
//   disable:"add new note to list",
//   builder:{
//     title:{
//       type:'string',
//       description:'note title',
//       demandOption:true
//     }
//   },
//   handler({title}){
//     addNote(title)
//     console.log('add command:', title)
//   }
// })
//
// yargs.command({
//   command:"list",
//   disable:"print all notes",
//   async handler () {
//     printNotes()
//   }
// })
// yargs.command({
//   command: "remove",
//   describe: "Remove note by id",
//   builder: {
//     id: {
//       type: "string",
//       describe: "Note ID",
//       demandOption: true,
//     },
//   },
//   handler({ id }) {
//     removeNotes(id);
//   },
// });
//
//
// yargs.parse()
//
