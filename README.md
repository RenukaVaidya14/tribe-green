# Tribe Green

A corporate gifting platform with a React web application,
Node.js/Express backend, MySQL database, and native Android application
built with Kotlin and Jetpack Compose.

## Project Overview

Tribe Green helps businesses explore corporate gifts, view product
details, and submit gifting enquiries. Administrators can sign in to the
web admin area and manage submitted enquiries.

## Technology Stack

  Module                    Technology                Folder
  ------------------------- ------------------------- ----------------
  Backend API               Node.js, Express.js       `backend/`
  Website and Admin Panel   React, Vite, JavaScript   `frontend/`
  Android Application       Kotlin, Jetpack Compose   `android-app/`
  Database                  MySQL                     `tribe_green`

## Features

### Website

-   Home page with corporate gifting information.
-   Product catalogue and product details.
-   Product enquiry form and submission confirmation.
-   About Us and Contact pages.
-   Light and dark theme support.
-   Admin login and protected admin enquiry area.

### Android Application

-   Home screen and app navigation.
-   Product catalogue connected to the backend API.
-   Product details.
-   Enquiry form and submission success screen.
-   About and Contact screens.
-   Material 3 UI with light and dark theme support.

### Backend

-   REST API built with Express.
-   MySQL database integration.
-   Product listing and product detail endpoints.
-   Enquiry submission endpoint.
-   Admin authentication and protected enquiry-management endpoints.
-   Static serving of product images from the uploads directory.

## Repository Structure

``` text
tribe-green/
├── android-app/       # Kotlin Android application
├── backend/           # Node.js and Express API
├── frontend/          # React and Vite website
├── .gitignore
└── README.md
```

## Requirements

Install the following before running the project:

-   Node.js and npm
-   MySQL Server
-   Android Studio
-   JDK compatible with the Android project's Gradle configuration
-   Git

## Getting Started

### 1. Clone the Repository

``` bash
git clone https://github.com/RenukaVaidya14/tribe-green.git
cd tribe-green
```

### 2. Backend Setup

Open a terminal in the `backend` directory:

``` bash
cd backend
npm install
```

Create a local `.env` file in the `backend` directory. Configure the
database connection and server settings using the environment-variable
names expected by `backend/src/config/db.js` and the backend server
configuration.

Create a MySQL database named:

``` sql
CREATE DATABASE tribe_green;
```

Import or run the project's database schema and ensure the required
tables are present:

-   `products`
-   `product_occasions`
-   `product_customisations`
-   `enquiries`
-   `enquiry_products`
-   `admins`

Start the backend using the start script defined in
`backend/package.json`. For example:

``` bash
npm start
```

If the project has a development script, you can use:

``` bash
npm run dev
```

The development backend is configured to run on port `5000`.

### 3. Frontend Setup

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

Vite will print the local website URL in the terminal. Open that URL in
your browser.

The frontend API configuration is in:

``` text
src/services/api.js
```

The current development configuration uses:

``` text
http://localhost:5000/api
```

Update the API and image base URLs when connecting the frontend to a
deployed backend.

### 4. Android Application Setup

1.  Open Android Studio.
2.  Select **Open** and choose the `android-app` directory.
3.  Wait for Gradle sync to finish.
4.  Check the backend base URL in
    `app/src/main/java/com/logcat/tribegreen/data/remote/RetrofitClient.kt`.
5.  For a physical Android device, use your development computer's
    reachable LAN IP address instead of `localhost`. The phone and
    computer should be on the same network.
6.  Ensure the backend is running and reachable from the device.
7.  Run the app on an emulator or connected Android device.

The Android development base URL should have this form:

``` text
http://YOUR_COMPUTER_LAN_IP:5000/api/
```

Use your current LAN IP address; do not copy an old development IP.

## API Endpoints

  Method   Endpoint              Purpose
  -------- --------------------- --------------------------------
  `GET`    `/api/products`       Retrieve the product catalogue
  `GET`    `/api/products/:id`   Retrieve product details
  `POST`   `/api/enquiries`      Submit a product enquiry

The backend also provides admin login and protected admin
enquiry-management routes. Refer to these files for the exact admin
endpoint paths:

-   `backend/src/routes/admin.routes.js`
-   `backend/src/controllers/admin.controller.js`
-   `backend/src/controllers/adminEnquiry.controller.js`

## Enquiry Integration

Enquiries submitted from the Android product enquiry flow are sent to
the backend and stored in MySQL. The request includes the selected
product ID and identifies the source as `Android App`.

## Product Images

Product images are served by the backend from:

``` text
backend/src/uploads/products/
```

The database stores image paths, and the frontend and Android
application use the backend image server to display them.

When adding or changing product images: 1. Add the image file to the
appropriate backend uploads location. 2. Update the corresponding
product image path in the database. 3. Confirm that the image URL is
reachable from the website and Android device.

## Security Notes

-   Do not commit `.env` files, database passwords, admin passwords, API
    keys, signing keys, or private tokens.
-   Keep real credentials in local environment files or a secure
    deployment secret store.
-   Use placeholder values in example configuration files.
-   Configure production CORS, HTTPS, database permissions, and
    authentication secrets before deployment.
-   Do not use development LAN IP addresses as production API URLs.

## Development Notes

-   The admin dashboard is part of the web application.
-   Product and enquiry data are shared through the backend API.
-   The Android app and website must point to a backend URL reachable
    from the device or browser running them.
-   Maintain database schema and seed data separately from application
    source code.

## Future Improvements

-   Connect the website and Android Contact forms to a shared backend
    endpoint if those submissions need to appear in the admin panel.
-   Add deployment configuration and production environment examples.
-   Add screenshots and API documentation.
-   Add automated tests for API endpoints and application flows.

## Author

**Renuka Vaidya**

GitHub: [RenukaVaidya14](https://github.com/RenukaVaidya14)

## License

No license has been specified for this repository yet. Add a license
file if you intend to define permissions for reuse and distribution.
