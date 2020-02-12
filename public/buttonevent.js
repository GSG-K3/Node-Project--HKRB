const inputValue = document.getElementById('inputSearch');
const searchButton = document.getElementById('buttonSearch');
const form = document.getElementById("form")
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const bookvalue = inputValue.value.trim();
    form.action = `/${bookvalue}`;
});









// // const url = `https://www.googleapis.com/books/v1/volumes?q=${bookvalue}`;
// // console.log('hi');
// // apicall(url, bookfunction);
// // bookvalue.value = '';