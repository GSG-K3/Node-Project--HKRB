const xhr = new XMLHttpRequest();

const inputValue = document.getElementById('inputSearch');
const buttonSearch = document.getElementById('buttonSearch');
buttonSearch.addEventListener("click", (event) => {
    event.preventDefault()
    const bookvalue = inputValue.value.trim();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${bookvalue}`;
    apicall(url, bookfunction, bookvalue);

})
const bookList = document.getElementById('bookList');


const apicall = (url, callback, bookvalue) => {
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText);

            if (callback) callback(response);
        }
    };
    xhr.open('GET', `/search=${bookvalue}`, true);

    xhr.send();
};
const bookfunction = (response) => {
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
        firstDiv.appendChild(bookImg);
        secondDiv.appendChild(bookName);
        secondDiv.appendChild(bookAuther);
        bookItem.appendChild(firstDiv);
        bookItem.appendChild(secondDiv);
        bookList.appendChild(bookItem);
        secondDiv.appendChild(bookDescription);
    }
};