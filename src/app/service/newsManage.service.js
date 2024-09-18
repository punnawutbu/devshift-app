const axios = require("axios");

require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });