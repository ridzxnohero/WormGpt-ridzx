
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY belum diatur di Vercel"
    });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    return res.status(response.ok ? 200 : 502).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Terjadi kesalahan saat menghubungi Gemini"
    });
  }
};
