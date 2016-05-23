var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/firstview', {
    templateUrl: 'partials/firstview.html',
    controller: 'FirstController'
  }).
  when('/secondview', {
    templateUrl: 'partials/secondview.html',
    controller: 'SecondController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/llamalist', {
    templateUrl: 'partials/llamalist.html',
    controller: 'LlamaListController'
  }).
  when('/passwordcontent:password', {
    templateUrl: 'partials/protected.html',
    controller: 'passwordContentController'
  }).
  when('/projects', {
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsController'
  }).
  when('/art', {
    templateUrl: 'partials/art.html',
    controller: 'ArtController'
  }).
  when('/mymusic', {
    templateUrl: 'partials/mymusic.html',
    controller: 'MyMusicController'
  }).
  when('/birthdays', {
    templateUrl: 'partials/birthdays.html',
    controller: 'BirthdayController'
  }).
  when('/about', {
    templateUrl: 'partials/about.html',
    controller: 'AboutController'
  }).
  otherwise({
    redirectTo: '/about'
  });
}]);
