const express = require('express')
const cors = require('cors')
const superagent = require('superagent')

const app = express()

app.locals = {
  key: 'value',
  fn: () => 'foo'
}

app.use(cors());

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
})

let requestCounter = 1;

app.get('/documents', (req, res) => {
    setTimeout(() => {
        console.log('stuff happend');
        if (requestCounter % 2 === 0) {
          requestCounter++
          console.log('I serve cool');
          superagent('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf').pipe(res);
        } else {
          requestCounter++
          console.log('I serve skunk');
          res.status(400).send('Bad Request');
        }
    }, 3000);
});

app.use((req, res) => { console.log('/'); res.send(200);})

app.listen(3000, () => console.log('server runs'))
