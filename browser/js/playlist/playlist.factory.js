/* global juke */
'use strict';

juke.factory('PlaylistFactory', ($http, $log, SongFactory) => {

	let cachedPlaylists = [];

	let playlistFactory = {};

	playlistFactory.persistNewPlaylist = playlist => {
		return $http.post('api/playlists', playlist)
			.then(persisted => {
				let newPlaylist = persisted.data;
				cachedPlaylists.push(newPlaylist);
				return newPlaylist;
			})
			.catch($log.error);
	};

	playlistFactory.fetchAllPlaylists = () => {
		return $http.get('api/playlists')
			.then(playlists => {
				angular.copy(playlists.data, cachedPlaylists);
				return cachedPlaylists;
			})
			.catch($log.error);
	};

	playlistFactory.fetchById = id => {
		return $http.get(`api/playlists/${id}`)
			.then(playlist => {
				let converted = playlist.data;
				converted.songs = converted.songs.map(SongFactory.convert);
				return converted;
			})
			.catch($log.error);
	};

	playlistFactory.addSongToPlaylist = (song, playlistId) => {
		return $http.post(`/api/playlists/${playlistId}/songs`, song)
			.then(playlist => playlist.data)
			.catch($log.error);
	};

	return playlistFactory;
});
