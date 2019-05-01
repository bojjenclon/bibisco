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
  component('settings', {
    templateUrl: 'components/settings/settings.html',
    controller: SettingsController
  });

function SettingsController($injector, $location, $rootScope, $scope,
  $timeout, $window, BibiscoDbConnectionService, BibiscoPropertiesService,
  LocaleService, LoggerService, PopupBoxesService, 
  ProjectService, SupporterEditionChecker) {
  
  var self = this;

  self.$onInit = function () {

    // show menu item
    $rootScope.$emit('SHOW_SETTINGS', {
      item: 'settings'
    });
    self.backpath = '/start';

    self.theme = BibiscoPropertiesService.getProperty(
      'theme');
    self.selectedLanguage = LocaleService.getCurrentLocale();
    let currentProjectsDirectory = BibiscoPropertiesService.getProperty(
      'projectsDirectory');

    // show directory name without "/_internal_bibisco2_projects_db_"
    // that is 32 characters
    self.selectedProjectsDirectory = currentProjectsDirectory.substring(0,
      currentProjectsDirectory.length - 32);

    self.forbiddenDirectory = false;
    self.checkExit = {
      active: true
    };
  };

  self.selectDarkTheme = function() {
    if (!SupporterEditionChecker.check()) {
      SupporterEditionChecker.showSupporterMessage();
    } else {
      $rootScope.$emit('SWITCH_DARK_THEME');
      $timeout(function () {
        $injector.get('IntegrityService').ok();
        self.theme = 'dark';
        $scope.settingsForm.$setDirty();
      }, 0);
    }
  };

  self.selectClassicTheme = function() {
    $rootScope.$emit('SWITCH_CLASSIC_THEME');
    $timeout(function () {
      self.theme = 'classic';
      $scope.settingsForm.$setDirty();
    }, 0);
  };

  self.selectLanguage = function(selectedLanguage) {
    self.selectedLanguage = selectedLanguage;
  };

  self.selectProjectsDirectory = function(directory) {
    self.selectedProjectsDirectory = directory;
    self.forbiddenDirectory = false;
    $scope.settingsForm.$setDirty();
    $scope.$apply();
  };

  self.save = function(isValid, isDirty) {
    
    if (!isDirty) {
      $location.path(self.backpath);
    } else if (isValid) {
      self.checkExit = {
        active: false
      };
      var projectsDirectory = ProjectService.createProjectsDirectory(self.selectedProjectsDirectory);
      if (projectsDirectory) {
        LocaleService.setCurrentLocale(self.selectedLanguage);
        BibiscoPropertiesService.setProperty('theme', self.theme);
        BibiscoPropertiesService.setProperty('locale', LocaleService.getCurrentLocale());
        BibiscoPropertiesService.setProperty('projectsDirectory',
          projectsDirectory);
        BibiscoDbConnectionService.saveDatabase();

        // sync bibisco db with projects directory
        ProjectService.syncProjectDirectoryWithBibiscoDb();

        LoggerService.info('Saved preferences: ' 
          + ' theme=' + self.theme  
          + ' - language=' + LocaleService.getCurrentLocale() 
          + ' - projects directory=' + self.selectedProjectsDirectory
        );

        $location.path(self.backpath);
      } else {
        self.forbiddenDirectory = true;
      }
    }
  };

  self.back = function() {
    self.theme = BibiscoPropertiesService.getProperty('theme');
    if (self.theme === 'dark') {
      $rootScope.$emit('SWITCH_DARK_THEME');
    } else {
      $rootScope.$emit('SWITCH_CLASSIC_THEME');
    }
    $window.history.back();
  };

  $scope.$on('$locationChangeStart', function (event) {
    PopupBoxesService.locationChangeConfirm(event, $scope.settingsForm.$dirty, self.checkExit);
  });
}
