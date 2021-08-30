
const express = require('express');
const app = express();

app.use(express.static('webapp'));
app.listen(8011);
