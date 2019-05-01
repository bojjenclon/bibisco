/*
 * Copyright (C) 2014-2019 Andrea Feccomandi
 *
 * Licensed under the terms of GNU GPL License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY.
 * See the GNU General Public License for more details.
 *
 */
angular.
  module('bibiscoApp').
  component('locationdetail', {
    templateUrl: 'components/locations/location-detail.html',
    controller: LocationDetailController
  });

function LocationDetailController($location, $rootScope, $routeParams, 
  ChapterService, LocationService) {

  var self = this;

  self.$onInit = function() {

    self.location = self.getLocation($routeParams.id);
    self.mode = $routeParams.mode;
    self.name = LocationService.calculateLocationName(self.location);
    let backpath = '/locations/params/focus=locations_' + self.location.$loki;

    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'common_locations',
      href: backpath
    });
    self.breadcrumbitems.push({
      label: self.name
    });
  
    self.deleteforbidden = self.isDeleteForbidden();

    if (self.mode === 'view') {
      self.backpath = backpath;
    }
  };

  self.changeStatus = function(status) {
    self.location.status = status;
    LocationService.update(self.location);
  };

  self.changeTitle = function() {
    $location.path('/locations/' + self.location.$loki + '/title');
  };

  self.delete = function() {
    LocationService.remove(self.location
      .$loki);
    $location.path('/locations');
  };

  self.edit = function () {
    $location.path('/locations/ ' + self.location.$loki + '/edit');
  };

  self.getLocation = function(id) {
    return LocationService.getLocation(id);
  };

  self.savefunction = function() {
    LocationService.update(self.location);
  };

  self.showimagesfunction = function() {
    $location.path('/locations/' + self.location.$loki + '/images');
  };

  self.isDeleteForbidden = function () {

    let deleteForbidden = false;
    let id = self.location.$loki;
    let chapters = ChapterService.getChapters();
    for (let i = 0; i < chapters.length && !deleteForbidden; i++) {
      let scenes = ChapterService.getScenes(chapters[i].$loki);
      for (let j = 0; j < scenes.length && !deleteForbidden; j++) {
        let revisions = scenes[j].revisions;
        for (let h = 0; h < revisions.length && !deleteForbidden; h++) {
          if (revisions[h].locationid === id) {
            deleteForbidden = true;
          }
        }
      }
    }

    return deleteForbidden;
  };
}
