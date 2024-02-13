// backend/src/config.js
import 'dotenv/config';

const config = {
    port: process.env.PORT || 8080,
    icon: {
        url: process.env.ICON_URL,
        apiKey: process.env.ICON_API_KEY,
    },
    mongodbUri: process.env.MONGODB_URI,
};

export default config;
