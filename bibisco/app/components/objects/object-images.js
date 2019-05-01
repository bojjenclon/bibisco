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
  component('itemimages', {
    templateUrl: 'components/objects/object-images.html',
    controller: ItemImagesController
  });

function ItemImagesController($location, $routeParams, ObjectService) {

  var self = this;

  self.$onInit = function() {
    
    let object = ObjectService.getObject($routeParams.id);
    self.backpath = '/objects/' + object.$loki + '/view';

    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'objects',
      href: '/objects/params/focus=objects_' + object.$loki
    });
    self.breadcrumbitems.push({
      label: object.name,
      href: self.backpath
    });
    self.breadcrumbitems.push({
      label: 'jsp.projectFromScene.select.location.images'
    });

    self.images = object.images;
    self.lastsave = object.lastsave;
    self.pageheadertitle = object.name;
  };

  self.delete = function(filename) {
    let object = ObjectService.deleteImage($routeParams.id, filename);
    self.images = object.images;
  };

  self.insert = function() {
    $location.path('/objects/' + $routeParams.id + '/images/new');
  };
}
