Laundry Website – Simple Node.js Web Server

This project is a basic Node.js web server created as part of Assignment 6.
The goal was to build a simple HTTP server using the native http module (without Express), handle multiple routes, and serve different HTML pages like Home, About, and Contact.

The website used here is a small Laundry Service site with a clean UI and separate HTML, CSS, and JS files.
🚀 Project Features

Built using pure Node.js (no frameworks)

Handles multiple routes:
/home, /about, /contact, /services

Serves static files like images, CSS, and JavaScript

Custom 404 Not Found page

Clean modular code with comments

Fully asynchronous using fs.promises

Deployed version available

📌 Routes Implemented
Route	Description
/ or /home	Loads the Home page
/about	Loads the About page
/contact	Loads the Contact form
/services	Loads the Services page (optional)
Any other route	Returns 404.html
📁 Project Folder Structure
project/
│── server.js
│── README.md
│── public/
│     ├── index.html
│     ├── about.html
│     ├── contact.html
│     ├── services.html
│     ├── 404.html
│     ├── style.css
│     ├── script.js
│     ├── contact.js
│     └── images/


All HTML, CSS, JS, and image files stay inside the public folder.
server.js handles routing and serves these files.

🖥️ How the Server Works (Simple Explanation)

The server listens on port 3000 (or environment port).

When a request comes in, the server:

Reads the URL

Matches it with a route

Selects the correct HTML file

If the file exists, it is sent with the proper Content-Type header.

If the route is invalid, the server returns the 404.html page.

Static assets like CSS, JS, images are also served correctly.

Everything is handled using the built-in http, fs, and path modules.

▶️ How to Run the Project Locally
1. Install Node.js

Make sure you have Node installed (v14+ recommended).

2. Clone the repository
git clone:- https://github.com/Sagnik1315/Assigmint_06_tutedude.git

cd laundry-website-server

3. Run the server
node server.js

4. Open the website
http://localhost:3000







