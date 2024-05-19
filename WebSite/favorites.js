document.addEventListener('DOMContentLoaded', () => {
  const favoritesListContainer = document.getElementById('favorites-list-container');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length > 0) {
    favorites.forEach(bookId => {
      loadFavoriteBookDetails(bookId, favoritesListContainer);
    });
  } else {
    favoritesListContainer.innerHTML = '<p>Nessun libro nei preferiti</p>';
  }
});

function loadFavoriteBookDetails(bookId, container) {
  const apiKey = 'AIzaSyDxO1DNsSQiNg1V_lk2DuH0lC2gY98SBhY';
  const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayFavoriteBook(data.volumeInfo, container, bookId);
    })
    .catch(error => console.error('Error fetching favorite book details:', error));
}

function displayFavoriteBook(bookInfo, container, bookId) {
  const title = bookInfo.title;
  const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
  const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

  const favoriteBook = document.createElement('div');
  favoriteBook.classList.add('favorite-book');
  favoriteBook.innerHTML = `
    <h3>${title}</h3>
    <img src="${thumbnail}" alt="${title}" class="img-fluid">
    <p><strong>Authors:</strong> ${authors}</p>
    <button class="btn btn-danger" onclick="removeFavorite('${bookId}')">Remove</button>
  `;

  container.appendChild(favoriteBook);
}

function removeFavorite(bookId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(id => id !== bookId);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  
  location.reload();
}
