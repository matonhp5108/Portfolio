module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(400).json({ error: data.error, description: data.error_description });
  }

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <body style="font-family: monospace; padding: 40px; background: #191414; color: #1DB954;">
        <h2>Spotify Authorization Successful</h2>
        <p>Copy this refresh token and set it as <code>SPOTIFY_REFRESH_TOKEN</code> in your Vercel environment variables:</p>
        <pre style="background: #282828; padding: 16px; border-radius: 8px; word-break: break-all; color: #fff;">${data.refresh_token}</pre>
        <p style="color: #888;">You can close this page after copying the token.</p>
      </body>
    </html>
  `);
};
