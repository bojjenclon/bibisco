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
  component('scenetags', {
    templateUrl: 'components/chapters/scene-tags.html',
    controller: SceneTagsController
  });

function SceneTagsController($location, $routeParams, $scope, $translate,
  ChapterService, DatetimeService, ObjectService, LocaleService, LocationService,
  MainCharacterService, SecondaryCharacterService, StrandService, LoreService, UtilService) {

  var self = this;

  self.$onInit = function() {

    let chapter = ChapterService.getChapter($routeParams.chapterid);
    self.scene = ChapterService.getScene($routeParams.sceneid);
    self.scenerevision = self.scene.revisions[self.scene.revision];

    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'common_chapters'
    });
    
    self.breadcrumbitems.push({
      label: '#' + chapter.position + ' ' + chapter.title
    });
    self.breadcrumbitems.push({
      label: self.scene.title
    });
    self.breadcrumbitems.push({
      label: 'jsp.scene.title.tags'
    });

    // init point of views
    self.initPointOfViews();

    // init scene characters
    self.initSceneCharacters();

    // init lore
    self.initLore();

    // init locations
    self.initLocations();

    // init objects
    self.initObjects();

    // init date time
	if (ChapterService.getLastScenetime() !== '') {
	  self.lastscenetime = new Date(ChapterService.getLastScenetime());
	} else {
	   self.lastscenetime = new Date();
	}
	// check if is valid gregorian date
	if (self.scenerevision.timegregorian) {
	  let testDate = new Date(self.scenerevision.time);
	  if (isNaN(testDate.getTime())) {
		self.scenerevision.time = null;
	  }
	}
	self.scenetime = self.scenerevision.time;

    // init narrative strands
    self.initStrands();

    self.title = self.scene.title;
    self.pageheadertitle =
      'jsp.scene.dialog.title.updateTitle';

    self.dirty = false;

  };

  self.initPointOfViews = function() {

    // point of views
    self.povs = [];

    self.povs.push({
      id: '1stOnMajor',
      selected: (self.scenerevision.povid === '1stOnMajor')
    });
    self.povs.push({
      id: '1stOnMinor',
      selected: (self.scenerevision.povid === '1stOnMinor')
    });
    self.povs.push({
      id: '3rdLimited',
      selected: (self.scenerevision.povid === '3rdLimited')
    });
    self.povs.push({
      id: '3rdOmniscient',
      selected: (self.scenerevision.povid === '3rdOmniscient')
    });
    self.povs.push({
      id: '3rdObjective',
      selected: (self.scenerevision.povid === '3rdObjective')
    });
    self.povs.push({
      id: '2nd',
      selected: (self.scenerevision.povid === '2nd')
    });

    if (self.scenerevision.povid === '1stOnMajor' || self.scenerevision.povid ===
      '1stOnMinor' || self.scenerevision.povid === '3rdLimited') {
      self.showpovcharacter = true;
      self.initPovCharacters();
    } else {
      self.showpovcharacter = false;
      self.scenerevision.povcharacterid = null;
    }
  };

  self.togglePov = function(id) {
    self.scenerevision.povid = id;
    self.initPointOfViews();
    self.dirty = true;
  };

  self.togglePovCharacter = function(id) {
    self.scenerevision.povcharacterid = id;
    self.initPovCharacters();
    self.dirty = true;
  };

  self.toggleSceneCharacter = function(id) {
    let scenecharacters = self.scenerevision.scenecharacters;
    self.toggleTagElement(scenecharacters, id);
    self.scenerevision.scenecharacters = scenecharacters;
    self.initSceneCharacters();
  };

  self.toggleLore = function (id) {
    let lore = self.scenerevision.scenelore;
    self.toggleTagElement(lore, id);
    self.scenerevision.scenelore = lore;
    self.initLore();
  }

  self.toggleLocation = function(id) {
    self.scenerevision.locationid = id;
    self.initLocations();
    self.dirty = true;
  };

  self.toggleObject = function(id) {
    let objects = self.scenerevision.sceneobjects;
    self.toggleTagElement(objects, id);
    self.scenerevision.sceneobjects = objects;
    self.initObjects();
  };

  self.toggleStrand = function(id) {
    let scenestrands = self.scenerevision.scenestrands;
    self.toggleTagElement(scenestrands, id);
    self.scenerevision.scenestrands = scenestrands;
    self.initStrands();
  };

  self.toggleTagElement = function(arr, id) {

    let idx = UtilService.array.indexOf(arr, id);
    if (idx !== -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(id);
    }
    self.dirty = true;
  };

  self.initPovCharacters = function() {
    self.povcharacters = self.initCharacters(function(id) {
      return self.scenerevision.povcharacterid === id;
    });
  };

  self.initSceneCharacters = function() {
    self.scenecharacters = self.initCharacters(function(id) {
      return UtilService.array.contains(self.scenerevision.scenecharacters, id);
    });
  };

  self.initCharacters = function(selectfunction) {

    let characters = [];

    // main characters
    let mainCharacters = MainCharacterService.getMainCharacters();
    for (let i = 0; i < mainCharacters.length; i++) {
      let itemid = 'm_' + mainCharacters[i].$loki;
      let isselected = selectfunction(itemid);
      characters.push({
        id: itemid,
        name: mainCharacters[i].name,
        selected: isselected
      });
    }

    // secondary characters
    let secondaryCharacters = SecondaryCharacterService.getSecondaryCharacters();
    for (let i = 0; i < secondaryCharacters.length; i++) {
      let itemid = 's_' + secondaryCharacters[i].$loki;
      let isselected = selectfunction(itemid);
      characters.push({
        id: itemid,
        name: secondaryCharacters[i].name,
        selected: isselected
      });
    }

    // sort by name
    characters.sort(function(a, b) {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });

    return characters;
  };

  self.initLore = function () {

    // lore
    let lore = LoreService.getLore();
    self.lore = [];
    for (let i = 0; i < lore.length; i++) {
      let isselected = UtilService.array.contains(self.scenerevision.scenelore, lore[i].$loki);
      self.lore.push({
        id: lore[i].$loki,
        name: lore[i].name,
        selected: isselected
      });
    }

    // sort by name
    self.lore.sort(function (a, b) {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });
  };

  self.initLocations = function() {

    // locations
    let locations = LocationService.getLocations();
    self.locations = [];
    for (let i = 0; i < locations.length; i++) {
      let name = LocationService.calculateLocationName(locations[i]);
      self.locations.push({
        id: locations[i].$loki,
        name: name,
        selected: (self.scenerevision.locationid === locations[i].$loki)
      });
    }

    // sort by name
    self.locations.sort(function(a, b) {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });
  };

  self.initObjects = function () {

    // objects
    let objects = ObjectService.getObjects();
    self.objects = [];
    for (let i = 0; i < objects.length; i++) {
      let isselected = UtilService.array.contains(self.scenerevision.sceneobjects,
        objects[i].$loki);
      self.objects.push({
        id: objects[i].$loki,
        name: objects[i].name,
        selected: isselected
      });
    }

    // sort by name
    self.objects.sort(function (a, b) {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });
  };

  self.initStrands = function() {

    // strands
    let strands = StrandService.getStrands();
    self.strands = [];
    for (let i = 0; i < strands.length; i++) {
      let isselected = UtilService.array.contains(self.scenerevision.scenestrands,
        strands[i].$loki);
      self.strands.push({
        id: strands[i].$loki,
        name: strands[i].name,
        selected: isselected
      });
    }

    // sort by name
    self.strands.sort(function(a, b) {
      return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
    });
  };

  self.save = function() {
    self.scene.revisions[self.scene.revision] = self.scenerevision;
    ChapterService.updateScene(self.scene);
    self.dirty = false;
  };

  self.back = function() {
    $location.path('/chapters/' + $routeParams.chapterid + '/scenes/' +
      $routeParams.sceneid);
  };

  $scope.$on('SCENE_TIME_SELECTED', function (event, data) {
    self.scenerevision.time = data;
  });
}
