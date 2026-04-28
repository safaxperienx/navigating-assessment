export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

  try {
    const data = req.body;
    const params = Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
    
    const url = GOOGLE_SHEET_URL + "?" + params;
    
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    const text = await response.text();
    return res.status(200).json({ success: true, message: text });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
