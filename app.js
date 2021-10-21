const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model('Article', articleSchema);

app
  .route('/articles')
  // will get ALL of the articles from the DB
  .get((req, res) => {
    Article.find((err, foundArticles) => {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  // will POST an article to the DB
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send('Successfully saved the article!');
      } else {
        res.send(err);
      }
    });
  })
  // will delete all article from the DB
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send('Successfully deleted all articles');
      } else {
        res.send(err);
      }
    });
  });

app.listen(port, () => {
  console.log(`I am listening on port ${port}`);
});
