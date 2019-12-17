const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mime = require('mime-types');
const sslRedirect = require('heroku-ssl-redirect');

if (process.env.NODE_ENV) {
  app.use(sslRedirect());
}

if (!process.env.NODE_ENV) {
  const dotenv = require('dotenv');
  dotenv.config();
}

app.use(cors());

// Connect Database
const connectDB = require('./server/config/db');
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use('/api/users', require('./server/routes/api/users'));
app.use('/api/auth', require('./server/routes/api/auth'));
app.use('/api/profile', require('./server/routes/api/profile'));
app.use('/api/questions', require('./server/routes/api/questions'));
app.use('/api/tags', require('./server/routes/api/tags'));
app.use('/api/search', require('./server/routes/api/search'));
app.use('/api/news', require('./server/routes/api/articles'));
app.use('/api/upload', require('./server/routes/api/upload'));
app.use('/api/category', require('./server/routes/api/category'));
app.use('/api/roles', require('./server/routes/api/roles'));
app.use('/api/contact', require('./server/routes/api/contact'));
app.use('/api/crm', require('./server/routes/api/hubspot'));
app.use('/api/payment', require('./server/routes/api/payment'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    const hasExtension = req.url.indexOf('.') > -1;
    const type = hasExtension ? mime.contentType(path.extname(req.url)) : null;
    if (hasExtension && type) {
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Content-Type', type);
      res.sendFile(path.join(__dirname, req.url));
    } else {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
