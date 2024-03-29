import Controlbar from "./components/Controlbar/Controlbar";
import './App.scss';
import AlbumCover from "./components/AlbumCover/AlbumCover";
import Searchbar from "./components/Searchbar/Searchbar";
import Playlists from "./components/Playlists/Playlists";
import SearchResults from "./components/SearchResults/SearchResults";
import { useState, useCallback, useEffect } from "react";
import Spotify from "./apis/Spotify";
import SelectedPlaylist from "./components/SelectedPlaylist/SelectedPlaylist";
import ThemeChanger from "./components/ThemeChanger/ThemeChanger";
import AudioVisualizer from "./components/AudioVisualizer/AudioVisualizer";


function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [current, setCurrent] = useState({});
  const [loading, setLoading] = useState(true);
  const [playbackState, setPlaybackState] = useState({});
  const [playlistUri, setPlaylistUri] = useState('');
  const [analysis, setAnalysis] = useState([]);
  const [prevCurrentId, setPrevCurrentId] = useState("");


  useEffect(() => {
    Spotify.getUserPlaylists().then(setPlaylists);
    console.log(Spotify.getTrackAudioAnalysis("5egqKwgK5r5rvGD1LrtR7J"));
  }, [])

  const getData = () =>{
    Spotify.getCurrentlyPlaying().then(setCurrent);
    
  }

  useEffect(() =>{
    if(current.id === prevCurrentId){
      return
    } else{
      Spotify.getTrackAudioAnalysis(current.id).then(setAnalysis);
      setPrevCurrentId(current.id);
    }
    
  },[current.id, prevCurrentId])

  useEffect(()=>{
    Spotify.getPlaybackState().then(setPlaybackState);
    if(loading){
      setInterval(getData, 500);
      setLoading(false)
    } 
  },[]);
 

  const search = useCallback((term) =>{
    Spotify.search(term).then(setSearchResults);
    setSearchOpen(true);
  },[]);

  const getSelectedPlaylist = (id, uri) =>{
    setPlaylistOpen(true);
    setPlaylistUri(uri);
    Spotify.getPlaylist(id).then(setSelectedPlaylist);
  };

  const closePlaylist = () =>{
    setPlaylistOpen(false);
  };

  const closeSearch = () =>{
    setSearchOpen(false);
  };



  return (
    <div className="App">
      <ThemeChanger></ThemeChanger>
      <Searchbar onSearch={search}></Searchbar>
      <AudioVisualizer progress={current.progress} analysis={analysis}></AudioVisualizer>
      <Controlbar current={current} playbackState={playbackState}></Controlbar>
      <AlbumCover current={current}></AlbumCover>
      <Playlists playlists={playlists} getPlaylist={getSelectedPlaylist}></Playlists>
      <SearchResults searchResults={searchResults} open={searchOpen} close={closeSearch}></SearchResults>
      <SelectedPlaylist playlist={selectedPlaylist} open={playlistOpen} close={closePlaylist} playlistUri={playlistUri}></SelectedPlaylist>
    </div>
  );
}

export default App;