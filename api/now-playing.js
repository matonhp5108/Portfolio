const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
  const data = await response.json();
  return data.access_token;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  try {
    const accessToken = await getAccessToken();

    const spotifyRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    if (spotifyRes.status === 204 || spotifyRes.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const data = await spotifyRes.json();

    if (!data.item) {
      return res.status(200).json({ isPlaying: false });
    }

    return res.status(200).json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map(a => a.name).join(', '),
      albumArt: data.item.album.images[1]?.url || data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
      progressMs: data.progress_ms,
      durationMs: data.item.duration_ms,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return res.status(200).json({ isPlaying: false });
  }
};
