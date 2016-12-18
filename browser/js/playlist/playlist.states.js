/* global juke */
'use strict';

juke.config($stateProvider => {
	$stateProvider

		.state('createPlaylist', {
			url: '/playlists/new',
			templateUrl: '/js/playlist/templates/playlist.create.html',
			controller: 'MakePlaylistCtrl'
		})

		.state('singlePlaylist', {
			url: '/playlists/:id',
			templateUrl: '/js/playlist/templates/playlist.single.html',
			controller: 'PlaylistCtrl',
			resolve: {
				thePlaylist: ($stateParams, PlaylistFactory) => {
					return PlaylistFactory.fetchById($stateParams.id);
				}
			}
		})
});
