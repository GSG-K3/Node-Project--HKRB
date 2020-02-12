// import { response } from "express";

// import { response } from "express";

// eslint-disable-next-line no-plusplus

const xhr = new XMLHttpRequest();

const inputValue = document.getElementById('inputSearch');
const buttonSearch = document.getElementById('buttonSearch');
buttonSearch.addEventListener("click", (event) => {
    event.preventDefault()
    const bookvalue = inputValue.value.trim();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookvalue}`;
    //console.log("bbbbb")
    apicall(url, bookfunction, bookvalue);

})
const bookList = document.getElementById('bookList');
// const searchButton = document.getElementById('buttonSearch');


const apicall = (url, callback, bookvalue) => {
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText);

            // console.log("hhhe", response);

            if (callback) callback(response);
        }
    };
    xhr.open('GET', `/search=${bookvalue}`, true);
    console.log(bookvalue, "44444")

    xhr.send();
};
const bookfunction = (response) => {
    //console.log(response, "000000000")
    bookList.innerText = "";

    for (let i = 0; i < 4; i++) {
        const firstDiv = document.createElement('div');
        const bookItem = document.createElement('div');
        const secondDiv = document.createElement('div');
        const bookImg = document.createElement('img');
        const bookName = document.createElement('h2');
        const bookAuther = document.createElement('p');
        const bookDescription = document.createElement('p');

        bookImg.className = 'book-logo';
        bookName.className = 'book_name';
        bookAuther.className = 'book_auther';
        bookName.innerHTML = response.items[i].volumeInfo.title;
        bookAuther.innerHTML = response.items[i].volumeInfo.authors[0];
        bookImg.src = response.items[i].volumeInfo.imageLinks.thumbnail;
        bookDescription.innerHTML = response.items[i].volumeInfo.description;
        // bookItem.src=response.items.imageLinks.smallThumbnail
        firstDiv.appendChild(bookImg);
        secondDiv.appendChild(bookName);
        secondDiv.appendChild(bookAuther);
        bookItem.appendChild(firstDiv);
        bookItem.appendChild(secondDiv);
        bookList.appendChild(bookItem);
        secondDiv.appendChild(bookDescription);
    }
};
//console.log(inputValue, "11111")

//module.exports = apicall;