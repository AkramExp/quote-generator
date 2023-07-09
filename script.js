let apiQuotes = [];

// Get quotes from api
async function getQuotes() {
    const apiUrl = ""
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes)
    } catch (error) {
        // catch error here

    }
}

// on load
getQuotes();