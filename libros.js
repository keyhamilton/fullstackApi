window.onload = () => {
    loadBooks();
}

const loadBooks = async () => {
    console.log('funcionou?')
    const res = await fetch('http://localhost:3000/books');
    const biblioteca = await res.json();
    console.log(biblioteca);
}