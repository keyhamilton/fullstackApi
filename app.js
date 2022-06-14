import {initializeApp} from 'firebase/app'
import { getFirestore, doc, setDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import firebaseConfig from './firebaseConfig.js'
import getBooks from './getBooks.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const firestoreApp = initializeApp(firebaseConfig());
const db = getFirestore(firestoreApp)
import express from 'express'
const app = express()
const port = 3000


app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+'/index.html'))
})


app.get('/books', async (req, res) => {
  const books = await getBooks(db)
  res.status(200).json({...books});
})

app.use('/books', express.json())

app.post('/books', async (req, res)=>{
  const booksRef = collection(db, 'books')
  await setDoc(doc(booksRef), {
    autor: req.body.autor,
    titulo: req.body.titulo,
    paginas: req.body.paginas,
    data: serverTimestamp()
  })
  res.status(201).json(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })