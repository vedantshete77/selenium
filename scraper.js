const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Scrape quotes from the website
async function scrapeQuotes() {
  try {
    const { data } = await axios.get('http://quotes.toscrape.com/');
    const $ = cheerio.load(data);
    const quotes = [];

    $('.quote').each((index, element) => {
      const quote = $(element).find('.text').text();
      const author = $(element).find('small.author').text();
      const tags = [];
      
      $(element).find('.tags a.tag').each((i, tag) => {
        tags.push($(tag).text());
      });
      
      quotes.push({ quote, author, tags });
    });

    // Save the scraped data to a file
    fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2));
    console.log('Quotes scraped and saved to quotes.json');
  } catch (error) {
    console.error('Error scraping the website:', error);
  }
}

// Run the scraper
scrapeQuotes();
