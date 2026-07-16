require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const app = express();
const PORT = process.env.PORT || 6501;

// Frontend origins that may access the API.
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173",
  process.env.CLIENT_URL,
]
  .filter(Boolean)
  .flatMap((origin) => origin.split(","))
  .map((origin) => origin.trim().replace(/\/$/, ""));

// CORS supports localhost and one or more deployed frontend URLs.
app.use(
  cors({
    origin(origin, callback) {
      // Requests without Origin include Swagger, Postman and server-to-server calls.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.warn(`Blocked by CORS: ${origin}`);

      return callback(new Error("This origin is not allowed by CORS."));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/static", express.static(path.join(__dirname, "public")));

// Swagger documentation
const swaggerServerUrl = process.env.API_URL || `http://localhost:${PORT}`;

swaggerDocument.servers = [
  {
    url: swaggerServerUrl,
    description:
      process.env.NODE_ENV === "production"
        ? "Production server"
        : "Local server",
  },
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Existing API routes
app.use(require("./routes/dev"));
app.use("/auth", require("./routes/auth"));
app.use("/tour", require("./routes/tour"));
app.use("/basket", require("./routes/basket"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Tour and Travel Agency API!");
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (err.message === "This origin is not allowed by CORS.") {
    return res.status(403).json({
      status: 403,
      message: err.message,
    });
  }

  return res.status(err.status || 500).json({
    status: err.status || 500,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: ${swaggerServerUrl}`);
  console.log(`Swagger docs: ${swaggerServerUrl}/api-docs`);
  console.log("Allowed origins:", allowedOrigins);
});
