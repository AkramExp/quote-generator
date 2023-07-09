const quoteContainer = document.getElementById("quote-generator");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// show new quote
function newQuote() {
  // to pick a random quote from array of quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//   check if the author field is empty and replace it with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
  
  quoteText.textContent = quote.text;
}

// Get quotes from api
async function getQuotes() {
  const apiUrl = "";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error here
  }
}

// on load
getQuotes();
