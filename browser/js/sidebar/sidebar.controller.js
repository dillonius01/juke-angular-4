/* global juke */
'use strict';

juke.controller('SidebarCtrl', function ($scope, $log, PlaylistFactory) {

  PlaylistFactory.fetchAllPlaylists()
		.then(playlists => $scope.playlists = playlists)
		.catch($log.error);

});
