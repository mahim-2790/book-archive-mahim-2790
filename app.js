const spinner = dis => {
    document.getElementById('spinner').style.display = dis;
}

const showError = (message = '') => {
    const error = document.getElementById('error-message');
    if (message.trim() !== '') {
        error.innerText = message;
        error.style.display = 'inline-block';
    }
    else {
        error.textContent = '';
        error.style.display = 'none';
    }
}
const searchBooks = () => {
    document.getElementById('show-div').textContent = '';
    document.getElementById('search-numbers').textContent = '';
    showError('');
    const inputField = document.getElementById('search-input');
    const searchValue = inputField.value;
    if (searchValue.trim() === '') {
        showError('Search with the name of book.');
    }
    else {
        spinner('block');
        const url = `https://openlibrary.org/search.json?q=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data));
    }
}

const displayBooks = data => {
    const bookNumber = data.numFound;
    if (bookNumber !== 0) {
        const searchNum = document.getElementById('search-numbers');
        searchNum.innerHTML = `<p>Showing ${data.docs.length} of ${bookNumber} results.</p>`;
        searchNum.style.display = 'block';
        data.docs.forEach(book => {
            const imgPath = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${imgPath}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">Author: ${book.author_name}</p>
                    <p class="card-text">Publisher: ${book.publisher}</p>
                    <p class="card-text">Published On: ${book.first_publish_year}</p>
                </div>
            </div>`;
            document.getElementById('show-div').appendChild(div);
        })
        spinner('none');
    } else {
        spinner('none');
        showError('No Book Found.')
    }
}
