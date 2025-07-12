import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.get("/api/donations", async (req, res) => {
  try {
    // например, достаём access_token из cookie или header
   const {token} = req.headers;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await axios.get("https://www.donationalerts.com/api/v1/alerts/donations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Donation API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});
app.get("/api/user-info", async (req, res) => {
  try {
    const {token} = req.headers;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const response = await axios.get("https://www.donationalerts.com/api/v1/user/oauth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});
app.post("/api/exchange-token", async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse  = await axios.post(
      "https://www.donationalerts.com/oauth/token",
      new URLSearchParams({
        client_id: "15514",
        client_secret: "6RRNq95PSKwJJcubvKThtlO9wFrorXeTvGquzRzb",
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:5173/login",
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

 
  const { access_token, refresh_token } = tokenResponse.data;

  res
    .cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    .json({ access_token });

  } catch (error) {
  console.error("Error response:", error.response?.data);
  console.error("Status:", error.response?.status);
  console.error("Headers:", error.response?.headers);
  res.status(500).json({ error: "Token exchange failed" });
}
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});