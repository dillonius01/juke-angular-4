/* global juke */
'use strict';

juke.controller('MakePlaylistCtrl', function ($scope, $log, $state, PlaylistFactory) {

	$scope.handleSubmit = () => {
		PlaylistFactory.persistNewPlaylist($scope.playlist)
			.then(playlist => {
				$scope.playlist = null;
				$scope.playlistForm.$setPristine();
				$state.go('singlePlaylist', {id: playlist.id});
			})
			.catch($log.error);
	};
});


juke.controller('PlaylistCtrl', function ($scope, thePlaylist, PlayerFactory) {

	$scope.playlist = thePlaylist;

	$scope.getCurrentSong = function () {
	  return PlayerFactory.getCurrentSong();
	};

	$scope.isPlaying = function (song) {
	  return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
	};

	$scope.toggle = function (song) {
	  if (song !== PlayerFactory.getCurrentSong()) {
	    PlayerFactory.start(song, $scope.playlist.songs);
	  } else if ( PlayerFactory.isPlaying() ) {
	    PlayerFactory.pause();
	  } else {
	    PlayerFactory.resume();
	  }
	};

});

juke.controller('AddSongCtrl', function($scope, $log, SongFactory, $stateParams, PlaylistFactory) {

	SongFactory.fetchAll()
		.then(songs => $scope.songs = songs)
		.catch($log.error);


	$scope.handleAddSong = () => {

		PlaylistFactory.addSongToPlaylist($scope.songToAdd, $scope.$parent.playlist.id)
			.then(song => {
				if (!song.name) return;
				$scope.duplicate = false;
				$scope.$parent.playlist.songs.push(song);
				$scope.songToAdd = null;
			})
			.catch(err => {
				$log.error(err);
				$scope.duplicate = true;
				$scope.$evalAsync();
			});
	};

});
