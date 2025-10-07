const rateLimit = require('express-rate-limit');

app.set('trust proxy', true);
// Define the limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later. in marathi bss n bhau kiti vela reload krshil bss ata bss"
});

// Export the limiter
module.exports = limiter;