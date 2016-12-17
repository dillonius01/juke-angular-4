/* global juke */
'use strict';

juke.config($stateProvider => {
	$stateProvider

		.state('createPlaylist', {
			url: '/playlists/new',
			templateUrl: '/js/playlist/templates/playlist.create.html',
			controller: 'PlaylistCtrl'
		})
		
});
