module.exports = {
  enabled: true,
  origin: [
    'http://localhost:3000',       
    'http://your-domain.com',      
    /\.your-domain\.com$/,        
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  keepHeaderOnError: true,
};