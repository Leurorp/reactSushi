const express = require('express')
const cors = require('cors')
const app=express()
const upload=require('express-fileupload')
const path = require('path')
app.use(cors())
app.use(express.json())

app.get('/prova', (req, res) => { 
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
    uploadFile.mv(`${__dirname}/client/src/immagini/${name}`, function(err) { 
        if (err) { 
        return res.status(500).send(err ) 
        } 
        return res.status(200).json({ status: 'uploaded', name }) })
    })

app.use(express.static(path.resolve(__dirname, 'client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))})

app.listen(3001,()=>console.log('listen in port 3001'))