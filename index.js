const express = require('express')
const cors = require('cors')
const app = express()
const upload = require('express-fileupload')
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())

app.get('/prova', (req, res) => {
  res.send("Funziona")
})
app.use(
  upload({
    useTempFiles: false,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/public/files/temp`
  })
)
app.post('/upload', (req, res) => {
  const testFolder = './client/src/immagini'
  let uploadFile = req.files.file//si riferisce al file come nome nel campo di input.
  const name = uploadFile.name
  fs.readdir(testFolder, (error, files) => {
    if (error) { return res.status(500).send(error) }
    if (files.length >= 9) {
      uploadFile.mv(`${__dirname}/client/src/immagini/${name}`, function (err) {
        if (err) { return res.status(500).send(err) }
      })
      return res.status(200).json('Troppe immagini in memoria')
    } else {
      if (fs.existsSync(`./client/src/immagini/${name}`)) {
        return res.status(200).json("foto esistente!!!!")
      }
      uploadFile.mv(`${__dirname}/client/src/immagini/${name}`, function (err) {
        if (err) { return res.status(500).send(err) }
        return res.status(200).json({ status: 'uploaded', name })
      })

    }
  })
})

app.post('/delete', (req, res) => {
  const filePath = { ...req.body }
  if (fs.existsSync(filePath.imgDelete)) {
    fs.unlink(filePath.imgDelete, (err) => {
      if (err) { return res.status(500).send(err) }
      return res.status(200).json({ status: 'deleted', filePath })
    })
  }
  else { return res.status(404).json({ status: 'not found' }) }
})

app.post('/deleteAll', (req, res) => {
  const testFolder = './client/src/immagini'
  fs.readdir(testFolder, (error, files) => {
    if (error) { return res.status(500).send(error) }
    files.forEach(file => {
      if (file != 'chicken-curry-black-cup-with-rice-noodles.jpg') {
        fs.unlink(`./client/src/immagini/${file}`, (err) => {
          if (err) { return res.status(500).send(err) }
        })
      }
    })
    return res.status(200).json({ status: 'deleted all img' })
  })
})

app.use(express.static(path.resolve(__dirname, 'client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
})

app.listen(3001, () => console.log('listen in port 3001'))