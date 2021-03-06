const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const db = require('../database/index.js');
const cors = require('cors');
const shrinkRay = require('shrink-ray-current');


app.options('*', cors());
app.get('*', cors());
app.use(cors());
app.use(shrinkRay());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('*/dp/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

//Specific Product Id Fetcher
app.get('/:productId', function (req, res) {
  if (req.params.productId === 'Information') {
    return db.returnData('1')
      .then((currentDVD) => {
        console.log('Retrieved specific DVD', currentDVD);
        res.json(currentDVD);
      })
      .catch((error) => {
        console.log('Error retrieving specific DVD', error);
      });
  }
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});


//API Call for specific product ID
app.get('/Information/:productId', function (req, res) {
  console.log('API CALL Specific DVD Request:', req.params.productId);

  if (req.params.productId) {
    return db.returnData(req.params.productId)
      .then((currentDVD) => {
        console.log('Retrieved specific DVD', currentDVD);
        res.json(currentDVD);
      })
      .catch((error) => {
        console.log('Error retrieving specific DVD', error);
      });
  } else {
    return db.returnData('1')
      .then((currentDVD) => {
        console.log('Retrieved specific DVD', currentDVD);
        res.json(currentDVD);
      })
      .catch((error) => {
        console.log('Error retrieving specific DVD', error);
      });
  }
});



app.listen(port, () => {
  console.log(`Server now listening at http://localhost:${port}`);
});
