document.addEventListener('DOMContentLoaded', () => {
  const apiKey = 'AIzaSyDxO1DNsSQiNg1V_lk2DuH0lC2gY98SBhY';
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const resultsContainer = document.getElementById('results-container');
  const nextPageButton = document.getElementById('next-page-button');
  const prevPageButton = document.getElementById('prev-page-button');
  let startIndex = 0;


  searchButton.addEventListener('click', () => {
    startIndex = 0;
    performSearch();
  });

  nextPageButton.addEventListener('click', () => {
    startIndex += 9;
    performSearch();
  });

  prevPageButton.addEventListener('click', () => {
    if (startIndex >= 9) {
      startIndex -= 9;
      performSearch();
    }
  });

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(searchTerm)}&startIndex=${startIndex}&maxResults=9&key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayResults(data.items);
        updatePaginationButtons(data.totalItems);
      })
      .catch(error => console.error('Error in the request:', error));
  }

  function displayResults(books) {
    resultsContainer.innerHTML = '';
  
    if (books && books.length > 0) {
      books.forEach(book => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
  
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
  
        const link = document.createElement('a');
        link.href = `details.html?id=${book.id}`;
        link.innerHTML = `
          <img  class="card-img-top" src="${thumbnail}" alt="${title}">
          <div  class="card text-center" style="width: 18rem; border:transparent">
            <h3>${title}</h3>
            <p>Author: ${authors}</p>
          `;
  
        bookCard.addEventListener('click', () => {
          window.location.href = link.href;
          searchInput.value = '';
        });
  
        bookCard.appendChild(link);
        resultsContainer.appendChild(bookCard);
      });
    } else {
      resultsContainer.innerHTML = '<p>No results found</p>';
    }
  }

  function updatePaginationButtons(totalItems) {
    nextPageButton.style.display = startIndex + 9 < totalItems ? 'block' : 'none';
    prevPageButton.style.display = startIndex >= 9 ? 'block' : 'none';

    nextPageButton.disabled = nextPageButton.style.display === 'none';
    prevPageButton.disabled = prevPageButton.style.display === 'none';

    nextPageButton.style.opacity = nextPageButton.disabled ? '0' : '1';
    prevPageButton.style.opacity = prevPageButton.disabled ? '0' : '1';
}


});