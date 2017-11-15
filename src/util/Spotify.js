const clientId = 'e94c300fe0b54cf897364b3c5366f4db';
const apiUrl = `https://api.spotify.com`;
const redirectURI = "http://forthejams.surge.sh/";
const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=user-read-private%20playlist-modify-public&response_type=token&state=123`;
let accessToken;
let expiresIn;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
        }
        else {
            accessToken = window.location.href.match(/access_token=([^&]*)/);
            if (accessToken) {
                accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
                expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
                window.setTimeout(() => { accessToken = ""; }, expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
            }
            else {
                window.location = redirectUrl;
            }
        }
    },

    search(term) {
        if (!accessToken) Spotify.getAccessToken();
        const endpoint = `/v1/search?type=track&q=${term}`;
        const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
        return fetch(apiUrl + endpoint, headers).then(response => response.json()).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
            else {
                return [];
            }
        });
    },

    savePlaylist(name, uris) {
        if (!name && !uris) return;
        if (!accessToken) Spotify.getAccessToken();
        let userId, playlistId;
        const userEndpoint = `/v1/me`;
        const userHeaders = { Authorization: `Bearer ${accessToken}` };
        const playlistHeaders = { Authorization: `Bearer ${accessToken}`, "Content-type": "application/json" };

        return fetch(apiUrl + userEndpoint, { headers: userHeaders })
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                const playlistEndpoint = `/v1/users/${userId}/playlists`;
                return fetch(apiUrl + playlistEndpoint, {
                    headers: playlistHeaders,
                    method: 'POST',
                    body: JSON.stringify({ name: name })
                })
                    .then(response => response.json())
                    .then(jsonResponse => {
                        alert(JSON.stringify(jsonResponse));
                        playlistId = jsonResponse.id;
                        const addTrackEndpoint = `/v1/users/${userId}/playlists/${playlistId}/tracks`;
                        return fetch(apiUrl + addTrackEndpoint, {
                            headers: playlistHeaders,
                            method: 'POST',
                            body: JSON.stringify({ uris: uris })
                        }).then(response => { alert(response) });
                    })
            });
    }
};


export default Spotify;