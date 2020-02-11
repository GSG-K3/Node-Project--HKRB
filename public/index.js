// import { response } from "express";

// eslint-disable-next-line no-plusplus

const xhr = new XMLHttpRequest();

const inputValue = document.getElementById('inputSearch');
const bookList = document.getElementById('bookList');
const searchButton = document.getElementById('buttonSearch');


const apicall = (url, callback) => {
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText);
            if (callback) callback(response);
        }
    };
    xhr.open('GET', url);
    xhr.send();
};
const bookfunction = (response) => {
    for (let i = 0; i < 4; i++) {
        const firstDiv = document.createElement('div');
        const bookItem = document.createElement('div');
        const secondDiv = document.createElement('div');
        const bookImg = document.createElement('img');
        const bookName = document.createElement('h2');
        const bookAuther = document.createElement('p');

        bookImg.className = 'book-logo';
        bookName.className = 'book_name';
        bookAuther.className = 'book_auther';
        bookName.innerHTML = response.items[i].title;
        // bookItem.src=response.items.imageLinks.smallThumbnail
        firstDiv.appendChild(bookImg);
        secondDiv.appendChild(bookName);
        secondDiv.appendChild(bookAuther);
        bookItem.appendChild(firstDiv);
        bookItem.appendChild(secondDiv);
        bookList.appendChild(bookItem);
    }
};
searchButton.addEventListener('click', (event) => {
    const bookvalue = inputValue.value.trim();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookvalue}`;
    console.log('hi');
    apicall(url, bookfunction);
    bookvalue.value = '';
});