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
  component('maincharacterdetail', {
    templateUrl: 'components/characters/main-character-detail.html',
    controller: MainCharacterDetailController
  });

function MainCharacterDetailController($location, $rootScope, $routeParams,
  ChapterService, MainCharacterService, PopupBoxesService, UtilService) {

  var self = this;

  self.$onInit = function() {

    $rootScope.$emit('SHOW_ELEMENT_DETAIL');

    self.maincharacter = self.getMainCharacter($routeParams.id);
    self.deleteforbidden = self.isDeleteForbidden();

    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'common_characters',
      href: '/project/characters'
    });
    self.breadcrumbitems.push({
      label: self.maincharacter.name
    });

    // action items
    self.actionitems = [];
    self.actionitems.push({
      label: 'jsp.character.button.updateTitle',
      itemfunction: self.changeTitle
    });
    self.actionitems.push({
      label: 'jsp.common.button.delete',
      itemfunction: function () {
        PopupBoxesService.confirm(self.delete, 'jsp.characters.delete.confirm');
      },
      itemfunction: function () {
        if (self.deleteforbidden) {
          PopupBoxesService.alert('jsp.characters.delete.ko');
        } else {
          PopupBoxesService.confirm(self.delete, 'jsp.characters.delete.confirm');
        }
      }
    });

    self.editmode = false;
    self.showprojectexplorer = true;
  };

  self.back = function() {
    $location.path('/project/characters');
  };

  self.changeStatus = function(status) {
    self.maincharacter.status = status;
    MainCharacterService.update(self.maincharacter);
  };

  self.changeTitle = function() {
    $location.path('/maincharacters/' + self.maincharacter.$loki + '/title');
  };

  self.delete = function() {
    MainCharacterService.remove(self.maincharacter.$loki);
    $location.path('/project/characters');
  };

  self.getMainCharacter = function(id) {
    return MainCharacterService.getMainCharacter(id);
  };

  self.showimagesfunction = function() {
    $location.path('/maincharacters/' + self.maincharacter.$loki + '/images');
  };

  self.showInfoWithQuestion = function(id) {
    $location.path('/maincharacters/' + self.maincharacter.$loki +
      '/infowithquestion/' + id);
  };

  self.showInfoWithoutQuestion = function (id) {
    $location.path('/maincharacters/' + self.maincharacter.$loki +
      '/infowithoutquestion/' + id);
  };

  self.isDeleteForbidden = function () {

    let deleteForbidden = false;
    let id = 'm_' + self.maincharacter.$loki;
    let chapters = ChapterService.getChapters();
    for (let i = 0; i < chapters.length && !deleteForbidden; i++) {
      let scenes = ChapterService.getScenes(chapters[i].$loki);
      for (let j = 0; j < scenes.length && !deleteForbidden; j++) {
        let revisions = scenes[j].revisions;
        for (let h = 0; h < revisions.length && !deleteForbidden; h++) {
          if (UtilService.array.contains(revisions[h].scenecharacters, id) ||
            revisions[h].povcharacterid === id) {
            deleteForbidden = true;
          }
        }
      }
    }

    return deleteForbidden;
  };
}
