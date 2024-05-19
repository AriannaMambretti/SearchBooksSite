document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (bookId) {
        loadBookDetails(bookId);
    } else {
        const detailsContainer = document.getElementById('book-details');
        detailsContainer.innerHTML = '<p>Error: Book ID non trovato</p>';
    }
});

function loadBookDetails(bookId) {
    const apiKey = 'AIzaSyDxO1DNsSQiNg1V_lk2DuH0lC2gY98SBhY';
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayBookDetails(data.volumeInfo);
        })
        .catch(error => console.error('Errore nel fetching:', error));
}

function displayBookDetails(bookInfo) {
    const detailsContainer = document.getElementById('book-details');
    detailsContainer.innerHTML = '';

    const title = bookInfo.title;
    const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
    const description = bookInfo.description || 'no description';
    const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
    const pageCount = bookInfo.pageCount || 'Unknown';
    const publishedDate = bookInfo.publishedDate || 'Unknown';
    const categories = bookInfo.categories ? bookInfo.categories.join(', ') : 'Unknown';
    const language = bookInfo.language || 'Unknown';
    const previewLink = bookInfo.previewLink || '#';

    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');
    bookDetails.innerHTML = `
        <h1>${title}</h1>
        <img src="${thumbnail}" alt="${title}" class="img-fluid">
        <p><strong>Authors:</strong> ${authors}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Page Count:</strong> ${pageCount}</p>
        <p><strong>Published Date:</strong> ${publishedDate}</p>
        <p><strong>Categories:</strong> ${categories}</p>
        <p><strong>Language:</strong> ${language}</p>
        <a href="${previewLink}" target="_blank" id="preview-button" class="btn btn-primary">Preview Book</a>
        <button id="add-to-favorites" class="btn btn-success">Add to Favorites</button>
    `;

    const addToFavoritesButton = bookDetails.querySelector('#add-to-favorites');
    addToFavoritesButton.addEventListener('click', () => {
        addToFavorites(bookInfo);
    });

    detailsContainer.appendChild(bookDetails);
}

function addToFavorites() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
  
    if (bookId) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.includes(bookId)) {
        favorites.push(bookId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Libro aggiunto ai preferiti');
      } else {
        alert('Il libro è già nei preferiti');
      }
    }
}