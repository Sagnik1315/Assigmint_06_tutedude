// Simple Node.js server for my Laundry Website assignment.
// This server handles routes like /home, /about, /contact and also serves
// css, images, js files from the public folder.

const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = process.env.PORT || 3000;

// Folder where all pages and static files are stored
const PUBLIC = path.join(__dirname, "public");

// Content types for different file extensions
const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".ico": "image/x-icon"
};

// This function chooses which file to show for each route
function getPage(route) {
  if (route === "/" || route === "/home") return "index.html";
  if (route === "/about") return "about.html";
  if (route === "/contact") return "contact.html";
  if (route === "/services") return "services.html";

  // For css, js or images
  return route.startsWith("/") ? route.slice(1) : route;
}

// Get correct content type
function getType(file) {
  const ext = path.extname(file);
  return TYPES[ext] || "text/plain";
}

// Reads and sends a file to the browser
async function send(res, file, status = 200) {
  const full = path.join(PUBLIC, file);
  const data = await fs.readFile(full);
  res.writeHead(status, { "Content-Type": getType(full) });
  res.end(data);
}

// Creating the actual server
const server = http.createServer(async (req, res) => {
  try {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    let route = urlObj.pathname;

    // Remove extra slashes like ///about/
    if (route !== "/") {
      route = route.replace(/\/+$/, "");
    }

    const file = getPage(route);

    // Basic protection from path hacks
    if (file.includes("..")) {
      res.writeHead(400);
      return res.end("Bad Request");
    }

    // Try to serve requested file
    try {
      await send(res, file);
      console.log("200 OK:", file);
      return;
    } catch (e) {
      // File not found
      if (e.code !== "ENOENT") {
        console.log("File error:", e);
        res.writeHead(500);
        return res.end("Internal Server Error");
      }
    }

    // If file doesn't exist, try custom 404 page
    try {
      await send(res, "404.html", 404);
      console.log("404:", route);
    } catch (e) {
      res.writeHead(404);
      res.end("Page Not Found");
    }

  } catch (err) {
    console.log("Unexpected error:", err);
    res.writeHead(500);
    res.end("Server Error");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
