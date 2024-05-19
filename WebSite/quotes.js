document.addEventListener('DOMContentLoaded', () => {
    const quoteTextElement = document.getElementById('quote-text');
    const bookInfoElement = document.getElementById('book-info');
    const newQuoteButton = document.getElementById('button');
  
    function getNewQuote() {
      
      fetch('https://recite.onrender.com/random/quote')
        .then(response => response.json())
        .then(data => {
          displayQuote(data.data);
           
        })
        .catch(error => {
          console.error('Error fetching quote:', error);
          
        });
    }
  
    function displayQuote(quoteData) {
      quoteTextElement.textContent = `"${quoteData.quote}"`;
      bookInfoElement.textContent = `- ${quoteData.author}, ${quoteData.book}`;
    }

    getNewQuote();

    
  });

  
  