const express = require('express')
const cors = require('cors')
const app=express()
const upload=require('express-fileupload')
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => { 
    res.send("Funziona")
  })
app.use( 
    upload({ 
      useTempFiles: true, 
      safeFileNames: true, 
      preserveExtension: true, 
      tempFileDir: `${__dirname}/public/files/temp` 
    }) 
  )  
app.post('/upload', (req, res, next) => { 
    let uploadFile = req.files.file//si riferisce al file come nome nel campo di input.
    const name = uploadFile.name 
    uploadFile.mv(`${__dirname}/../src/immagini/${name}`, function(err) { 
        if (err) { 
        return res.status(500).send(err ) 
        } 
        return res.status(200).json({ status: 'uploaded', name }) })
    })

app.listen(3001,()=>console.log('listen in port 3001'))