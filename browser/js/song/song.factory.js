/* global juke */
'use strict';

juke.factory('SongFactory', function ($http, $log) {

	let songFactory = {};

	songFactory.convert = song => {
    song.audioUrl = '/api/songs/' + song.id + '/audio';
    return song;
  };

  songFactory.fetchAll = () => {
		return $http.get('api/songs')
			.then(songs => songs.data)
			.catch($log.error);

  };

  return songFactory;

});
