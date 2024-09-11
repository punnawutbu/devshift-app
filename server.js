const express = require('express');
const next = require('next');
const axios = require('axios'); // Import axios

const port = process.env.PORT || 4001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Example of custom route using axios
  server.get('/custom-route', async (req, res) => {
    try {
      const response = await axios.get('https://api.example.com/data'); // Replace with your API
      const data = response.data;

      // Pass data to your Next.js page
      return app.render(req, res, '/custom-page', { ...req.query, data });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
