let apiQuotes = [];

const quoteContainer = window.document.getElementById("quote-container");
// const quoteText = window.document.getElementById("quote-text");
const quoteText = window.document.getElementById("quote");
const quoteAuthor = window.document.getElementById("author");
const twitter = window.document.getElementById("twitter");
const newQuote = window.document.getElementById("new-quote");
const loader = window.document.getElementById("loader");

//Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function getNewQuote() {
    
    //get ramdom quote
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //check if the quote author field is not there, it is replace with "unknow"
    if (!quote.author){
        quote.author = "Unknow";
    } 
    
    return quote;
}



//Get quotes from API
async function getQuotes() {
    loading();
    
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    // const apiUrl = "./quotes.js";
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
    //   newQuote();
       let newQuote = getNewQuote();
       quoteText.textContent = newQuote.text;
       quoteAuthor.textContent = newQuote.author;
       twitter.addEventListener('click', tweetQuote);
    } catch (error) {
        //Catch error
    }

    complete() ;
}

//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}
//Load the function
getQuotes();