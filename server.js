const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = '';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Function to connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        db = client.db('laundry_app');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
}

connectDB();

// API to fetch all vendors
app.get('/vendors', async (req, res) => {
    try {
        if (!db) throw new Error('Database not connected');
        const vendors = await db.collection('Vendor').find().toArray();
        res.json(vendors);
    } catch (err) {
        console.error('Error fetching all vendors:', err); // Debugging line
        res.status(500).json({ message: err.message });
    }
});

// API to search vendors by location (latitude, longitude) and service
app.get('/vendors/search', async (req, res) => {
    try {
        if (!db) throw new Error('Database not connected');
        console.log('Search query parameters:', req.query); // Debugging line
        
        const { latitude, longitude, service } = req.query;

        // Check for missing query parameters
        if (!latitude || !longitude || !service) {
            return res.status(400).json({ message: 'Missing query parameters' });
        }

        // Parse latitude and longitude
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        // Check for invalid latitude or longitude
        if (isNaN(lat) || isNaN(lon)) {
            return res.status(400).json({ message: 'Invalid latitude or longitude' });
        }

        // Debugging the parsed values
        console.log('Parsed latitude:', lat);
        console.log('Parsed longitude:', lon);
        console.log('Service:', service);

        // MongoDB query to find vendors based on location and service
        const vendors = await db.collection('Vendor').find({
            services: { $in: [service] },
            latitude: { $gte: lat - 0.1, $lte: lat + 0.1 },
            longitude: { $gte: lon - 0.1, $lte: lon + 0.1 },
        }).toArray();

        res.json(vendors);
    } catch (err) {
        console.error('Error searching vendors:', err); // Debugging line
        res.status(500).json({ message: err.message });
    }
});

// API to search vendors by preferred location and service
app.get('/vendors/searchbylocation', async (req, res) => {
    try {
        if (!db) throw new Error('Database not connected');
        console.log('Search by location query parameters:', req.query); // Debugging line
        
        const { location, service } = req.query;

        // Check for missing query parameters
        if (!location || !service) {
            return res.status(400).json({ message: 'Missing query parameters' });
        }

        // Log the values to verify
        console.log('Location:', location);
        console.log('Service:', service);

        // MongoDB query to search vendors by location and service
        const vendors = await db.collection('Vendor').find({
            services: service,
            location: location
        }).toArray();

        res.json(vendors);
    } catch (err) {
        console.error('Error searching by location:', err); // Debugging line
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
