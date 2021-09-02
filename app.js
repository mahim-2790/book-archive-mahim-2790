const spinner = dis => {
    document.getElementById('spinner').style.display = dis;
}
const searchBooks = () => {
    document.getElementById('show-div').textContent = '';
    document.getElementById('search-numbers').textContent = '';
    const error = document.getElementById('error-message');
    error.textContent = '';
    const inputField = document.getElementById('search-input');
    const searchValue = inputField.value;
    if (searchValue.trim() === '') {
        error.innerText = 'Search with the name of book.';
        error.style.display = 'inline-block';
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
    const searchNum = document.getElementById('search-numbers');
    searchNum.innerHTML = `<p>Showing ${data.docs.length} of ${data.numFound} results.</p>`;
    searchNum.style.display = 'block';
    data?.docs.forEach(book => {
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
}
