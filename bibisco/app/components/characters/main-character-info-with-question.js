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
  component('maincharacterinfowithquestion', {
    templateUrl: 'components/characters/main-character-info-with-question.html',
    controller: MainCharacterInfoWithQuestion
  });

function MainCharacterInfoWithQuestion($location, $rootScope, $routeParams,
  MainCharacterService) {

  var self = this;

  self.$onInit = function() {

    $rootScope.$emit('SHOW_ELEMENT_DETAIL');

    self.maincharacter = MainCharacterService.getMainCharacter($routeParams.id);
    self.type = $routeParams.info;
    self.mode = $routeParams.mode;
    self.editmode = (self.mode === 'edit');

    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'common_characters',
      href: '/project/characters?focus=maincharacters_' + self.maincharacter.$loki
    });
    self.breadcrumbitems.push({
      label: self.maincharacter.name,
      href: '/maincharacters/' + $routeParams.id + '?focus=maincharactersdetails_' + $routeParams.info
    });
    self.breadcrumbitems.push({
      label: 'common_' + $routeParams.info
    });

    self.headertitle = 'common_' + $routeParams.info;
    self.headersubtitle = 'jsp.character.thumbnail.' + $routeParams.info + '.description';

    self.autosaveenabled;
    self.content;
    $rootScope.dirty = false;
    self.questionselected;
    self.showprojectexplorer = false;
    self.characters;
    self.words;
  };

  self.back = function () {
    if (self.mode === 'view') {
      $location.path('/maincharacters/' + $routeParams.id + '?focus=maincharactersdetails_' + $routeParams.info);
    } else if (self.mode === 'edit') {
      $location.path('/maincharacters/' + $routeParams.id + '/infowithquestion/' + $routeParams.info + '/view');
    }
  };

  self.edit = function () {
    $location.path('/maincharacters/' + $routeParams.id + '/infowithquestion/' + $routeParams.info + '/edit');
  };

  self.save = function () {

    if (self.maincharacter[self.type].freetextenabled === true) {
      self.maincharacter[self.type].freetext = self.content;
      self.maincharacter[self.type].freetextcharacters = self.characters;
      self.maincharacter[self.type].freetextwords = self.words;
    } else {
      let questions = self.maincharacter[self.type].questions;
      questions[self.questionselected].text = self.content;
      questions[self.questionselected].characters = self.characters;
      questions[self.questionselected].words = self.words;

      self.maincharacter[self.type].questions = questions;
    }
    MainCharacterService.update(self.maincharacter);
  };

  self.changestatus = function(status) {
    self.maincharacter[self.type].status = status;
    MainCharacterService.update(self.maincharacter);
  };
}