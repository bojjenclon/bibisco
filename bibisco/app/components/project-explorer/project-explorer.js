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
  component('projectexplorer', {
    templateUrl: 'components/project-explorer/project-explorer.html',
    controller: ProjectExplorerController
  });

function ProjectExplorerController($injector, $rootScope, $scope, $timeout, $translate, 
  ArchitectureService, ChapterService, LocationService, MainCharacterService, 
  SecondaryCharacterService, SupporterEditionChecker, StrandService, LoreService) {
  
  var self = this;
  var ObjectService = null;

  self.$onInit = function () {

    // load translations
    self.translations = $translate.instant([
      'common_architecture',
      'common_chapter_notes',
      'common_chapter_reason',
      'common_chapters',
      'common_characters',
      'common_characters_behaviors',
      'common_characters_conflict',
      'common_characters_evolutionduringthestory',
      'common_characters_ideas',
      'common_characters_lifebeforestorybeginning',
      'common_characters_personaldata',
      'common_characters_physionomy',
      'common_characters_psychology',
      'common_characters_sociology',
      'common_empty_section',
      'common_fabula',
      'common_notes_title',
      'common_locations',
      'common_premise',
      'common_setting',
      'common_strands',
      'objects'
    ]);

    self.type;
    self.text;
    self.images;
    self.selectedItem;
    self.items = [];
    self.emptytext = '<i>' + self.translations.common_empty_section + '</i>'; 

    // Architecture
    self.items.push.apply(self.items, self.getArchitectureFamily());

    // Characters
    self.items.push.apply(self.items, self.getCharactersFamily());

    // Locations
    self.items.push.apply(self.items, self.getLocationsFamily());

    // Objects
    self.items.push.apply(self.items, self.getObjectsFamily());

    // Chapters
    self.items.push.apply(self.items, self.getChaptersFamily());

    // Lore
    self.items.push.apply(self.items, self.getLoreFamily());
    
    let cacheElement = $rootScope.projectExplorerCache.get($rootScope.actualPath);
    if (cacheElement) {
      for (let i = 0; i < self.items.length; i++) {
        if (self.items[i].itemid === cacheElement) {
          self.selectedItem = self.items[i];
          self.selectItem();
          break;
        }
      }
    }
  };

  self.getArchitectureFamily = function() {
    let architecturefamily = [];
    let family = self.translations.common_architecture;

    architecturefamily.push({
      itemid: 'architecture_premise',
      id: 'premise', 
      name: self.translations.common_premise, 
      family: family,
      selectfunction: self.showPremise
    });
    architecturefamily.push({
      itemid: 'architecture_fabula',
      id: 'fabula',
      name: self.translations.common_fabula,
      family: family,
      selectfunction: self.showFabula
    });
    architecturefamily.push({
      itemid: 'architecture_setting',
      id: 'setting',
      name: self.translations.common_setting,
      family: family,
      selectfunction: self.showSetting
    }); 
    if (SupporterEditionChecker.check()) {
      $injector.get('IntegrityService').ok();
      architecturefamily.push({
        itemid: 'architecture_globalnotes',
        id: 'globalnotes',
        name: self.translations.common_notes_title,
        family: family,
        selectfunction: self.showGlobalNotes
      });
    }
    architecturefamily.push({
      itemid: 'architecture_strands',
      id: 'strands',
      name: self.translations.common_strands,
      family: family,
      selectfunction: self.showStrands
    });

    return architecturefamily;
  };

  self.getCharactersFamily = function() {
    
    let charactersfamily = [];
    let family = self.translations.common_characters;

    // main characters
    let mainCharacters = MainCharacterService.getMainCharacters();
    for (let i = 0; i < mainCharacters.length; i++) {
      charactersfamily.push({
        itemid: 'maincharacter_' + mainCharacters[i].$loki,
        id: mainCharacters[i].$loki,
        name: mainCharacters[i].name,
        family: family,
        selectfunction: self.showMainCharacter
      });
    }

    // secondary characters
    let secondaryCharacters = SecondaryCharacterService.getSecondaryCharacters();
    for (let i = 0; i < secondaryCharacters.length; i++) {
      charactersfamily.push({
        itemid: 'secondarycharacter_' + secondaryCharacters[i].$loki,
        id: secondaryCharacters[i].$loki,
        name: secondaryCharacters[i].name,
        family: family,
        selectfunction: self.showSecondaryCharacter
      });
    }

    // sort by name
    charactersfamily.sort(function (a, b) {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });

    return charactersfamily;
  };

  self.getLocationsFamily = function () {
   
    let locationsfamily = [];
    let family = self.translations.common_locations;

    let locations = LocationService.getLocations();
    for (let i = 0; i < locations.length; i++) {
      let name = LocationService.calculateLocationName(locations[i]);
      locationsfamily.push({
        itemid: 'location_' + locations[i].$loki,
        id: locations[i].$loki,
        name: name,
        family: family,
        selectfunction: self.showLocation
      });
    }

    return locationsfamily;
  };

  self.getObjectsFamily = function () {

    let objectsfamily = [];
    if (SupporterEditionChecker.check()) {
      let family = self.translations.objects;
      let objects = self.getObjectService().getObjects();
      for (let i = 0; i < objects.length; i++) {
        objectsfamily.push({
          itemid: 'object_' + objects[i].$loki,
          id: objects[i].$loki,
          name: objects[i].name,
          family: family,
          selectfunction: self.showObject
        });
      }
    }

    return objectsfamily;
  };

  self.getChaptersFamily = function () {
  
    let chaptersfamily = [];
    let family = self.translations.common_chapters;

    let chapters = ChapterService.getChapters();
    for (let i = 0; i < chapters.length; i++) {
      chaptersfamily.push({
        itemid: 'chapter_' + chapters[i].$loki,
        id: chapters[i].$loki,
        name: '#' + chapters[i].position + ' ' + chapters[i].title,
        family: family,
        selectfunction: self.showChapter
      });
    }

    return chaptersfamily;
  };

  self.getLoreFamily = function () {

    let lorefamily = [];
    let family = self.translations.common_lore;

    let lore = LoreService.getCollection();
    for (let i = 0; i < lore.length; i++) {
      lorefamily.push({
        id: lore[i].$loki,
        name: '#' + lore[i].position + ' ' + lore[i].title,
        family: family,
        selectfunction: self.showLore
      });
    }

    return lorefamily;

  }

  self.selectItem = function() {
    self.selectedItem.selectfunction(self.selectedItem.id);
    $rootScope.$emit('PROJECT_EXPLORER_SELECTED_ITEM');
    $rootScope.projectExplorerCache.set($rootScope.actualPath, self.selectedItem.itemid);
  };

  self.showPremise = function() {
    self.sectiontitle = 'jsp.architecture.thumbnail.premise.title';
    self.text = ArchitectureService.getPremise().text;
    self.images = null;
    self.type = 'simpletext';
    self.path = '/architectureitems/premise/edit';
  };

  self.showFabula = function () {
    self.sectiontitle = 'jsp.architecture.thumbnail.fabula.title';   
    self.text = ArchitectureService.getFabula().text;
    self.images = null;
    self.type = 'simpletext';
    self.path = '/architectureitems/fabula/edit';
  };

  self.showSetting = function () {
    self.sectiontitle = 'jsp.architecture.thumbnail.setting.title';
    self.text = ArchitectureService.getSetting().text;
    self.images = null;
    self.type = 'simpletext';
    self.path = '/architectureitems/setting/edit';
  };

  self.showGlobalNotes = function () {
    if (SupporterEditionChecker.check()) {
      self.sectiontitle = 'common_notes_title';
      self.text = ArchitectureService.getGlobalNotes().text;
      self.images = null;
      self.type = 'simpletext';
      self.path = '/architectureitems/globalnotes/edit';
    }
  };

  self.showStrands = function () {
    self.strands = StrandService.getStrands();
    self.type = 'strands';
  };

  self.showMainCharacter = function (id) {
    self.maincharacter = MainCharacterService.getMainCharacter(id);
    self.type = 'maincharacter';
  };

  self.showSecondaryCharacter = function(id) {
    let secondarycharacter = SecondaryCharacterService.getSecondaryCharacter(id);
    self.sectiontitle = secondarycharacter.name;
    self.text = secondarycharacter.description;
    self.images = secondarycharacter.images;
    self.type = 'simpletext';
    self.path = '/secondarycharacters/'+id+'/edit';
  };

  self.showLocation = function(id) {
    let location = LocationService.getLocation(id);
    self.sectiontitle = LocationService.calculateLocationName(location);
    self.text = location.description;
    self.images = location.images;
    self.type = 'simpletext';
    self.path = '/locations/' + id + '/edit';
  };

  self.showObject = function (id) {
    if (SupporterEditionChecker.check()) {
      let object = self.getObjectService().getObject(id);
      self.sectiontitle = object.name;
      self.text = object.description;
      self.images = object.images;
      self.type = 'simpletext';
      self.path = '/objects/' + id + '/edit';
    }
  };

  self.showChapter = function(id) {
    self.chapter = ChapterService.getChapter(id);
    self.scenes = ChapterService.getScenes(id);
    self.type = 'chapter';
  };

  self.showLore = function (id) {
    let lore = LoreService.getLoreItem(id);
    self.text = lore.description;
    self.images = null;
    self.type = 'simpletext';
  }
  
  self.getObjectService = function () {
    if (!ObjectService) {
      $injector.get('IntegrityService').ok();
      ObjectService = $injector.get('ObjectService');
    }

    return ObjectService;
  };
}
