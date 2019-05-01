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
  component('loredetail', {
    templateUrl: 'components/lore/lore-detail.html',
    controller: LoreDetailController
  });

function LoreDetailController($location, $rootScope, $routeParams, ChapterService, 
  LoreService, UtilService) {

  var self = this;

  self.$onInit = function() {
    self.lore = self.getLore($routeParams.id);
    self.mode = $routeParams.mode;
    let backpath = '/lore/params/focus=lore_' + self.lore.$loki;

    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'lore',
      href: backpath
    });
    self.breadcrumbitems.push({
      label: self.lore.name
    });

    self.deleteforbidden = self.isDeleteForbidden();
    
    if (self.mode === 'view') {
      self.backpath = backpath;
    }
  };

  self.changeStatus = function(status) {
    self.lore.status = status;
    LoreService.update(self.lore);
  };

  self.changeTitle = function() {
    $location.path('/lore/' + self.lore.$loki + '/title');
  };

  self.delete = function() {
    LoreService.remove(self.lore.$loki);
    $location.path('/lore');
  };

  self.edit = function () {
    $location.path('/lore/ ' + self.lore.$loki + '/edit');
  };

  self.getLore = function(id) {
    return LoreService.getLoreItem(id);
  };

  self.savefunction = function() {
    LoreService.update(self.lore);
  };

  self.isDeleteForbidden = function () {

    let deleteForbidden = false;
    let id = self.lore.$loki;
    let chapters = ChapterService.getChapters();
    for (let i = 0; i < chapters.length && !deleteForbidden; i++) {
      let scenes = ChapterService.getScenes(chapters[i].$loki);
      for (let j = 0; j < scenes.length && !deleteForbidden; j++) {
        let revisions = scenes[j].revisions;
        for (let h = 0; h < revisions.length && !deleteForbidden; h++) {
          if (UtilService.array.contains(revisions[h].scenelore, id)) {
            deleteForbidden = true;
          }
        }
      }
    }

    return deleteForbidden;
  };
}
