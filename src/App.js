import './App.css';
import {useState, useEffect} from 'react'
import Navigation from './components/Navigation';
import HomePage from './components/pages/HomePage';
import BrowsePage from './components/pages/BrowsePage';
import LikedSongsPage from './components/pages/LikedSongsPage';
import SongList from './components/SongList';
import SongListPage from './components/pages/SongListPage';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';
import Player from './components/Player';
import ReactSound from 'react-sound';
import axios from 'axios';
import Song from './components/Song';
import GenrePlaylistsPage from './components/pages/GenrePlaylistsPage';


let TOKEN = '4d173c59-f266-4748-b57e-783b6413b6c7'

function App() {

  const axiosOptions = {
    headers: {'user-access-token': TOKEN}
  };
  
  // const baseUrl = "http://3.140.142.196/spotify"
  const baseUrl = "http://api.sprintt.co/spotify"
  // const baseUrl = "https://localhost:5000/spotify"
  const [selectedNavItem, setSelectedNavItem] = useState("home")
  const [currentPage, setCurrentPage] = useState("home")
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const [featuredPlaylistsCurrentPage, setFeaturedPlaylistsCurrentPage] = useState(1)
  const [recentlyPlayedPlaylists, setRecentlyPlayedPlaylists] = useState([])
  const [recentlyPlayedPlaylistsCurrentPage, setRecentlyPlayedPlaylistsCurrentPage] = useState(1)
  const [moodPlaylists, setMoodPlaylists] = useState([])
  const [moodPlaylistsCurrentPage, setMoodPlaylistsCurrentPage] = useState(1)
  const [songList, setSongList] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(undefined)
  const [selectedPlaylistDuration, setSelectedPlaylistDuration] = useState("")
  const [currentlyPlayingDetails, setCurrentlyPlayingDetails] = useState({
    "songId": "",
    "song": "",
    "artist": "",
    "playlistImageSrc": "",
    "playlist": undefined,
    "playlistSongs": []
  })
  const [likedSongs, setLikedSongs] = useState([])
  
  const [selectedGenre, setSelectedGenre] = useState(undefined)
  const [genrePlaylists, setGenrePlaylists] = useState([])

  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying,setIsPlaying] = useState(false)
  const [encryptedToken,setEncryptedToken] = useState("")
  const [songSecondsPassed, setSongSecondsPassed] = useState(0)
  const [songTotalSeconds, setSongTotalSeconds] = useState(105)

  const [volume, setVolume] = useState(0.7)

  const [genres, setGenres] = useState([])
  

  const togglePlay = () => setIsPlaying(!isPlaying)


  let playlist_id = "";
  let track_id = "";
  

  // const pickSong = () => {
  //     playlist_id = $('input[name="playlist_id"]').val();
  //     track_id = $('input[name="track_id"]').val();
  //     audio = new Audio(`http://localhost:5000/play/${playlist_id}/${track_id}`)
  // }



  const setAudioVolume = (volumeLevel) => {
  //   audio.volume = volumeLevel
    setVolume(volumeLevel)
  }

  const onSongPlay = (playlist, song, playlistSongs) => {
    setCurrentlyPlayingDetails({
      "songId": song.id,
      "song": song.title,
      "artist": song.artist,
      "playlistImageSrc": playlist.imgSrc,
      "totalTime": "0:00",
      "timePassed": "0:00",
      "percentage": 0,
      "playlist": playlist,
      "playlistSongs": playlistSongs
    })
    if(currentlyPlayingDetails.song != song.title){
      setPlayingSong(playlist,song)
      updateRecentlyPlayed(playlist,song)
    }else{
      togglePlay()
    }
  }

  const updateRecentlyPlayed = (playlist, song) => {
    axios.post(`${baseUrl}/notify_played/${playlist.id}/${song.id}`,{}, axiosOptions)
    .then(function (response) {
      console.log("updated played song and playlist")
    })
    .catch(function (error) {
      console.log(error);
    })  
  }

  const handleSongPlaying = (e) => {
    let position = e.position
    setSongSecondsPassed(position / 1000)
  }

  const setPlayingSong = (playlist,song) => {
    setEncryptedToken(getEncryptedToken(TOKEN))
    setSongSecondsPassed(0)
    const url = `${baseUrl}/play/${song.id}`
    setAudioUrl(url)
    if(!isPlaying){
      togglePlay()
    }
  }

  const onNavItemClick = (navItemName) => {
    setSelectedNavItem(navItemName)
    setCurrentPage(navItemName)
  }

  const getSongList = (playlist) => {
    axios.get(`${baseUrl}/playlist_tracks/${playlist.id}`, axiosOptions)
    .then(function (response) {
      const formattedData = response.data['tracks'].map((track) => (formatTrack(track)))
      setSongList(formattedData)
      setSelectedPlaylistDuration(response.data.playlist_duration)
    })
    .catch(function (error) {
      console.log(error);
    })  

  }

  const moveSong = (direction) => {
    let i;
    for (i = 0; i < songList.length; i++) {
      if(songList[i].id === currentlyPlayingDetails.songId){
        if(direction == "next"){
          if(i+1 < songList.length){
            let song = songList.filter((song) => song.id === currentlyPlayingDetails.songId)
            onSongPlay(currentlyPlayingDetails.playlist, song)
          }
      
        }else{
    
        }
      }
    }
  }

  const formatTrack = (track) => {
    return {
      "id": track.track_id,
      "title": track.name,
      "artist": track.artists_names,
      "album": track.album_name,
      "releaseDate": track.release_date,
      "liked": track.is_liked == 1
    }
  }

  const onPlaylistDiveIn = (playlist) => {
    setSelectedPlaylist(playlist)
    getSongList(playlist)
    setCurrentPage("song-list")
  }
  

  const onPlayerBarClick = (e) => {
    // var rect = e.target.getBoundingClientRect();
    // let x = e.clientX - rect.left;
    // let barLength = rect.right - rect.left
    // let percentage = Math.floor(x / barLength)
    // setCurrentTime(Math.floor(percentage * songTotalSeconds))  
  }

  const onVolumeBarClick = (e) => {
    var rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let barLength = rect.right - rect.left
    let volumeLevel = x / barLength
    setAudioVolume(volumeLevel)
  }

  const movePlaylistsPage = (listOfPlaylistName, newPageNum) => {
    if(listOfPlaylistName == "featured-playlists"){
      setFeaturedPlaylistsCurrentPage(newPageNum)
    }
    if(listOfPlaylistName == "recently-played"){
      setRecentlyPlayedPlaylistsCurrentPage(newPageNum)
    }
    if(listOfPlaylistName == "mood-playlists"){
      setMoodPlaylistsCurrentPage(newPageNum)
    }
  }

  const getGenres = () => {
    axios.get(baseUrl+'/categories', axiosOptions)
    .then(function (response) {
      const formattedResponse = response.data.categories.map((category) => (
        {
          "id": category.category_id,
          "title": category.category_name,
          "imgSrc": category.image_url
        }
      ))
      setGenres(formattedResponse)
    })
    .catch(function (error) {
      console.log(error);
    })  
  }

  useEffect(() => {
    getRecentlyPlayedPlaylists()
    getFeaturedPlaylists()
    getMoodPlaylists()
    getGenres()
    getLikedSongs()
  }, [])

  
  const getLikedSongs = () => {
    axios.get(`${baseUrl}/liked_tracks`, axiosOptions)
    .then(function (response) {
      const formattedData = response.data.liked_tracks.map((track) => (formatTrack(track)))
      setLikedSongs(formattedData)
    })
    .catch(function (error) {
      console.log(error);
    })  
  }

  const getMoodPlaylists = () => {
    axios.get(`${baseUrl}/mood_playlists?limit=10`, axiosOptions)
    .then(function (response) {
      const formattedResponse = response.data['playlists'].map((playlist) => (formatPlaylistResponse(playlist)))
      setMoodPlaylists(formattedResponse)
    })
    .catch(function (error) {
      console.log(error);
    })  
  }

  const getFeaturedPlaylists = () => {
    axios.get(`${baseUrl}/featured_playlists?limit=10`, axiosOptions)
    .then(function (response) {
      const formattedResponse = response.data['playlists'].map((playlist) => (formatPlaylistResponse(playlist)))
      setFeaturedPlaylists(formattedResponse)
    })
    .catch(function (error) {
      console.log(error);
    })  
  }

  const getRecentlyPlayedPlaylists = () => {
    axios.get(`${baseUrl}/recently_played_playlists?limit=10`, axiosOptions)
    .then(function (response) {
      const formattedResponse = response.data['playlists'].map((playlist) => (formatPlaylistResponse(playlist)))
      setRecentlyPlayedPlaylists(formattedResponse)
    })
    .catch(function (error) {
      console.log(error);
    })  
  }

  const formatPlaylistResponse = (playlist) => {
    return {
      "id": playlist.playlist_id,
      "name": playlist.name,
      "imgSrc": playlist.image_url,
      "description": playlist.description
    }
  }

  const onLikeClicked = (song) => {
    axios.post(`${baseUrl}/liked_tracks/${song.id}?status=${!song.liked}`,{}, axiosOptions)
    .then(function (response) {
      getSongList(selectedPlaylist)
      getLikedSongs()
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const onGenreClicked = (genre) => {
    setSelectedGenre(genre)
    axios.get(`${baseUrl}/category_playlists/${genre.id}`, axiosOptions)
    .then(function (response) {
      const formattedResponse = response.data['playlists'].map((playlist) => (formatPlaylistResponse(playlist)))
      setGenrePlaylists(formattedResponse)
      setCurrentPage('genre')
    })
    .catch(function (error) {
      console.log(error);
    })      
  }

  const getEncryptedToken = (token) => {
    let date = new Date();
    let utcTime = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
    let stringToEncrypt = `${token}===${utcTime}`
    return btoa(stringToEncrypt)
  }

  return (
    <div className="App">
      <div className="app-content">
        <Navigation selectedNavItem={selectedNavItem} onClick={(navItemName) => onNavItemClick(navItemName)}/>
        {currentPage == "home" ? 
        
        <HomePage recentlyPlayedPlaylistsCurrentPage={recentlyPlayedPlaylistsCurrentPage} featuredPlaylistsCurrentPage={featuredPlaylistsCurrentPage} recentlyPlayedPlaylists={recentlyPlayedPlaylists}
        featuredPlaylists={featuredPlaylists} moodPlaylists={moodPlaylists} moodPlaylistsCurrentPage={moodPlaylistsCurrentPage} onPlaylistPageChange={movePlaylistsPage} onPlaylistDiveIn={onPlaylistDiveIn}/> 
        : ""}
        
        {currentPage == "browse" ? <BrowsePage genres={genres} onGenreClicked={onGenreClicked} /> : ""}
        {currentPage == "genre" ? <GenrePlaylistsPage genre={selectedGenre} playlists={genrePlaylists} onPlaylistDiveIn={onPlaylistDiveIn} /> : ""}
        {currentPage == "liked-songs" ? <LikedSongsPage songs={likedSongs} onSongPlay={onSongPlay} onLikeClicked={onLikeClicked} isPlaying={isPlaying} currentlyPlayingSong={currentlyPlayingDetails.song}/> : ""}
        
        {currentPage == "song-list" ? 
        <SongListPage playlist={selectedPlaylist} songs={songList} onSongPlay={onSongPlay} onLikeClicked={onLikeClicked} isPlaying={isPlaying} currentlyPlayingSong={currentlyPlayingDetails.song} duration={selectedPlaylistDuration}/>
        : ""}
      </div>
      <Player currentlyPlayingDetails={currentlyPlayingDetails} songSecondsPassed={songSecondsPassed} songTotalSeconds={songTotalSeconds} isPlaying={isPlaying} togglePlay={togglePlay} onPlayerBarClick={onPlayerBarClick} volume={volume} onVolumeBarClick={onVolumeBarClick}/>
      
      <ReactSound
      url={`${audioUrl}?access=${encryptedToken}`}
      playStatus={isPlaying ? ReactSound.status.PLAYING : ReactSound.status.PAUSED}
      position={songSecondsPassed*1000 /* in milliseconds */}
      volume={volume*100}
      // onLoading={this.handleSongLoading}
      onPlaying={handleSongPlaying}
      // onFinishedPlaying={this.handleSongFinishedPlaying}
    />
    </div>
  );
}

export default App;
