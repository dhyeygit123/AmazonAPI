const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");

function analyzeSentiment(text) {
  const tokens = tokenizer.tokenize(text);
  return analyzer.getSentiment(tokens);
}

module.exports = { analyzeSentiment };