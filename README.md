## ﻿﻿LaundryApp

**Overview**

Vendor Search App is a React Native application that allows users to search for service providers (vendors) based on their location or a preferred location. The app uses a Node.js backend with Express and MongoDB to fetch vendor data and return results based on user queries.

**Features**
* Search vendors by current GPS location
* Search vendors by manually entered location
* Filter vendors based on services offered
* Interactive UI built with React Native
* Backend API using Node.js and Express
* MongoDB database to store vendor information

#Tech Stack

**Frontend:**
React Native
Axios (for API calls)

**Backend:**
Node.js
Express.js
MongoDB (with Mongoose ORM)
Cors (for handling cross-origin requests)

**Step 1: Install Expo CLI**
If you haven't already, install the Expo CLI globally:

```
npm install -g expo-cli
```

**Step 2: Create a New Expo Project**
Create a new Expo project:
```
expo init LaundryApp //Choose the blank template (JavaScript) when prompted.
```

**Step 3: Folder Structure**
Here’s the folder structure for the project:
```
LaundryApp/
├── assets/
├── node_modules/
├── src/
│   ├── components/
│   │   └── VendorCard.js
│   ├── screens/
│   │   └── HomeScreen.js
│   └── App.js
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

# Installation

**Prerequisites**
Node.js (v16 or later)
MongoDB installed locally or a cloud instance (e.g., MongoDB Atlas)
React Native development environment setup (Android/iOS emulator or a physical device)

**Backend Setup**

Clone the repository:
```
git clone https://github.com/JanumalaAkhilendra/LaundryApp.git
```

Install dependencies:
```
npm install
```

Create a .env file and add the following:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:
```
node server.js
```

Frontend Setup

Navigate to the frontend directory:
```
cd LaundryApp
```

Install dependencies:
```
npm install
```

Update the API base URL in constants.js:
```
export const BASE_URL = 'http://10.0.2.2:5000'; // For Android Emulator
// or use 'http://localhost:5000' for web
```

Run the React Native app:
```
npx expo start
```

# API Endpoints

1. Search Vendors by GPS Location

Endpoint: GET /vendors/search

Query Params:

latitude: User's latitude

longitude: User's longitude

service: Service type (optional)

Example Request:
```
curl "http://localhost:5000/vendors/search?latitude=17.385&longitude=78.4867&service=Wash"
```

Response:
```
[
  {
    "name": "Laundry Express",
    "location": "Hyderabad",
    "services": ["Wash", "Iron"],
    "latitude": 17.38,
    "longitude": 78.48
  }
]
```

2. Search Vendors by Preferred Location

Endpoint: GET /vendors/search-by-location

Query Params:

location: City name (e.g., "Hyderabad")

service: Service type (optional)

Example Request:
```
curl "http://localhost:5000/vendors/search-by-location?location=Hyderabad&service=Iron"
```
Troubleshooting

If using an Android Emulator, use 10.0.2.2 instead of localhost.

Ensure MongoDB is running.

Check .env file for correct MongoDB connection string.

Use Postman or curl to manually test API responses.


# Images

<div >

<img src="https://github.com/user-attachments/assets/8ee76fff-cccd-4d06-bb04-5686ea881fbb" style="width:400px; height:500px;" />
<img src="https://github.com/user-attachments/assets/3030bcc7-4599-48be-a7bc-b20dacbbcafa" style="width:400px; height:500px;" />


</div>



# Contributing

Fork the repository.

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Added new feature"

Push to the branch: git push origin feature-name

Open a pull request.

License

This project is open-source and available under the MIT License.

The backend can be integrated using Axios.
# LaundryApp
# LaundryApp
