const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const port = 8080;

app
  .set('port', port)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(fileUpload())
  .use(cors())
  .use(routes)
  .get('/login', (req, res) => {
    res.send({
      user: {
        name: 'Carlos',
        age: 20,
      }
    });
  })
  .get('/post', (req, res) => {
    const data = {
      img: "http://elvortex.com/wp-content/uploads/2016/11/code_geass___lelouch-wallpaper-960x600-e1480304041668.jpg",
      extract: "## [Hello this is my first post](/post)\n\nIf you think this is gonna hard maybe try to think again",
      post: '## Hello This was write with Markdown',
      comments: [
        {
          id: 'sad9s895sad65+6',
          comment: 'This is my comment',
          responses: [
            {
              response: 'Hi'
            }
          ]
        }
      ]
    };
    res.send(data);
  })
  .get('/post/:id', (req, res) => {
    const data = {
      img: "http://elvortex.com/wp-content/uploads/2016/11/code_geass___lelouch-wallpaper-960x600-e1480304041668.jpg",
      extract: "## [Hello this is my first post](/post)\n\nIf you think this is gonna hard maybe try to think again",
      post: '## Hello This was write with Markdown',
      comments: [
        {
          id: 'sad9s895sad65+6',
          comment: 'This is my comment',
          responses: [
            {
              response: 'Hi'
            }
          ]
        }
      ]
    };
    res.send(data);
  });

module.exports = app;