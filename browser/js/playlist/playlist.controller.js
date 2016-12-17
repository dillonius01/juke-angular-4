/* global juke */
'use strict';

juke.controller('PlaylistCtrl', function ($scope, $log) {
	$scope.handleSubmit = () => {
		$log.log('got a new playlist with name', $scope.newPlaylist)
	}
})