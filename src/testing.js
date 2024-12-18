fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&client_secret=${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`
})
.then(response => response.json())
.then(data => {
    const accessToken = data.access_token;
    console.log(data);
})
.catch(error => console.error('Error:', error));