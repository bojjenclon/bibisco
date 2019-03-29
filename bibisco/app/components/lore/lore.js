/*
 * Copyright (C) 2014-2018 Andrea Feccomandi
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
  component('lore', {
    templateUrl: 'components/lore/lore.html',
    controller: LoreController,
    bindings: {

    }
  });

function LoreController($injector, $location, $scope,
  LoreService, SupporterEditionChecker) {

  var self = this;

  self.itemsPresent = function() {
    return LoreService.getCollectionCount() > 0;
  };

  self.create = function() {
    self.supporterEditionFilterAction(function () {
      $location.path('/lore/new');
    });
  };

  self.$onInit = function() {
    self.cardgriditems = self.getCardGridItems();
  };

  self.getCardGridItems = function () {
    let cardgriditems = null;
    if (LoreService.getCollectionCount() > 0) {
      let lore = LoreService.getLore();
      cardgriditems = [];
      for (let i = 0; i < lore.length; i++) {
        cardgriditems.push({
          id: lore[i].$loki,
          position: lore[i].position,
          status: lore[i].status,
          title: lore[i].name
        });
      }
    }
    
    return cardgriditems;
  };

  self.move = function(draggedLoreId, destinationLoreId) {
    LoreService.move(draggedLoreId, destinationLoreId);
    self.cardgriditems = this.getCardGridItems();
    $scope.$apply();
  };

  self.select = function(id) {
    self.supporterEditionFilterAction(function() {
      $location.path('/lore/' + id);
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
