import { collection, getDocs } from 'firebase/firestore/lite';

export default async function getBooks(db) {
    const booksCol = collection(db, 'books');
    const bookSnapshot = await getDocs(booksCol);
    const bookList = bookSnapshot.docs.map(doc => doc.data()).sort((a, b) => b.data.seconds-a.data.seconds);
    return bookList;
  }