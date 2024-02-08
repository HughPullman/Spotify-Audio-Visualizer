const clientId = "db0941d02e1e4a13aa724691d12e6bd1";
const redirectUri = 'https://hughpullman.co.uk/spotifyvisual/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20playlist-read-private%20user-read-playback-state%20user-modify-playback-state&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        img: track.album.images[0].url,
        duration: track.duration_ms

      }));
    });
  },

  getUserId(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
      return response.json();
    }).then(jsonResponse =>{
      if(!jsonResponse.id){
        return
      }
      return jsonResponse.id;
    })
  },

  getUserPlaylists(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/playlists?limit=30&offset=0`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
      return response.json();
    }).then(jsonResponse =>{
      return jsonResponse.items.map(playlist =>({
        img: playlist.images[0].url,
        name: playlist.name,
        id: playlist.id,
        tracks: playlist.tracks.total,
        playlistUri: playlist.uri
      }));
    })
  },

  getPlaylist(playlistId){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
      return response.json();
    }).then(jsonResponse =>{
      return jsonResponse.items.map(item =>({
        img: item.track.album.images[0].url,
        album: item.track.album.name,
        title: item.track.name,
        duration: item.track.duration_ms,
        id: item.track.uri,
        artist: item.track.artists[0].name,

      }));
    })
  },

  getCurrentlyPlaying(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/currently-playing`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
      if(response.status === 204) return;
      return response.json();
    }).then(jsonResponse =>{
      if(jsonResponse){
        return{
          img: jsonResponse.item.album.images[0].url,
          album: jsonResponse.item.album.name,
          title: jsonResponse.item.name,
          duration: jsonResponse.item.duration_ms,
          id: jsonResponse.item.id,
          artist: jsonResponse.item.artists[0].name,
          progress: jsonResponse.progress_ms,
          repeat: jsonResponse.repeat_state,
          shuffle: jsonResponse.shuffle_state,
          isPlaying: jsonResponse.is_playing
        }
      } return {};
      
    })
  },

  setPlayVolume(volume){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,{
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  nextSong(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/next`,{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  previousSong(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/previous`,{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  setRepeatMode(mode){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/repeat?state=${mode}`,{
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  toggleShuffle(state){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`,{
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  pausePlayback(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/pause`,{
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  resumePlayback(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/play`,{
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  playSelectedSong(uri, offset){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/play`,{
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        uris: [`${uri}`],
        offset: {
          position: `${offset}`
        },
        position_ms: 0 
      })
    })
  },

  seekPosition(position){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`,{
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  },
  
  getPlaybackState(){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/me/player`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).then(response =>{
      if(response.status === 204) return;
      return response.json();
    }).then(jsonResponse =>{
      if(jsonResponse){
        return{
          repeat: jsonResponse.repeat_state,
          shuffle: jsonResponse.shuffle_state
        }
      }
      return {};
      
    })
  },

  getTrackAudioAnalysis(trackId){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>{
      return response.json();
    }).then(jsonResponse =>{
      return {
        meta: jsonResponse.meta,
        track: jsonResponse.track,
        bars: jsonResponse.bars,
        beats: jsonResponse.beats,
        sections: jsonResponse.sections,
        segments: jsonResponse.segments,
        tatums: jsonResponse.tatums
      }
    })
  },

};

export default Spotify;
