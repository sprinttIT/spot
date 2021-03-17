import Playlist from '../Playlist';
import './HomePage.css';
import './Page.css';
import {useState, useEffect} from 'react'
import ListOfPlaylists from '../ListOfPlaylists';
import Song from '../Song';


const HomePage = ({recentlyPlayedPlaylistsCurrentPage, featuredPlaylistsCurrentPage, recentlyPlayedPlaylists, featuredPlaylists, moodPlaylists, moodPlaylistsCurrentPage, onPlaylistPageChange, onPlaylistDiveIn}) => {
    
    return (
        <div className="page home-page">
            <div className="home-page-content">
                <ListOfPlaylists onPlaylistDiveIn={onPlaylistDiveIn} name="recently-played" title="Recently Played" playlists={recentlyPlayedPlaylists} page={recentlyPlayedPlaylistsCurrentPage} onPlaylistPageChange={onPlaylistPageChange} />
                <ListOfPlaylists onPlaylistDiveIn={onPlaylistDiveIn} name="featured-playlists" title="Featured Playlists" playlists={featuredPlaylists} page={featuredPlaylistsCurrentPage} onPlaylistPageChange={onPlaylistPageChange} />
                <ListOfPlaylists onPlaylistDiveIn={onPlaylistDiveIn} name="mood-playlists" title="Mood" playlists={moodPlaylists} page={moodPlaylistsCurrentPage} onPlaylistPageChange={onPlaylistPageChange} />
            </div>
        </div>
    )
}

export default HomePage
