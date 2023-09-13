// middleware/cors.js

import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
});

// Helper function to apply CORS to a specific route handler
function applyCors(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default applyCors;
