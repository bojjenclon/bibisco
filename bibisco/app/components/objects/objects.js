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
  component('objects', {
    templateUrl: 'components/objects/objects.html',
    controller: ObjectsController,
    bindings: {

    }
  });

function ObjectsController($injector, $location, $rootScope, $routeParams, $scope,
  CardUtilService, ObjectService, SupporterEditionChecker) {

  var self = this;
  
  self.$onInit = function() {

    // show menu item
    $rootScope.$emit('SHOW_PAGE', {
      item: 'objects'
    });
    
    self.cardgriditems = this.getCardGridItems();
    
    // focus element
    CardUtilService.focusElementInPath($routeParams.params);

    // hotkeys
    self.hotkeys = ['ctrl+n', 'command+n'];
  };

  self.itemsPresent = function() {
    return ObjectService.getObjectsCount() > 0;
  };

  self.create = function() {
    self.supporterEditionFilterAction(function () {
      $location.path('/objects/new');
    });
  };

  self.getCardGridItems = function () {
    let cardgriditems = null;
    if (ObjectService.getObjectsCount() > 0) {
      let objects = ObjectService.getObjects();
      cardgriditems = [];
      for (let i = 0; i < objects.length; i++) {
        cardgriditems.push({
          id: objects[i].$loki,
          position: objects[i].position,
          status: objects[i].status,
          title: objects[i].name
        });
      }
    }
    return cardgriditems;
  };

  self.move = function(draggedObjectId, destinationObjectId) {
    ObjectService.move(draggedObjectId, destinationObjectId);
    self.cardgriditems = this.getCardGridItems();
    $scope.$apply();
  };

  self.select = function(id) {
    self.supporterEditionFilterAction(function() {
      $location.path('/objects/' + id + '/view');
    });
  };

  self.supporterEditionFilterAction = function(action) {
    if (!SupporterEditionChecker.check()) {
      SupporterEditionChecker.showSupporterMessage();
    } else {
      $injector.get('IntegrityService').ok();
      action();
    }
  };
}
