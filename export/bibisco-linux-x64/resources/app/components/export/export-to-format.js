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
  component('exporttoformat', {
    templateUrl: 'components/export/export-to-format.html',
    controller: ExportToFormat
  });

function ExportToFormat($location, $routeParams, 
  $rootScope, $scope, $timeout, ExportService, FileSystemService) {

  var self = this;

  self.$onInit = function() {
    $rootScope.$emit('EXPORT_SELECT_DIRECTORY');

    if ($routeParams.format === 'pdf') {
      self.pageheadertitle = 'jsp.export.title.pdf';
    } else if ($routeParams.format === 'docx') {
      self.pageheadertitle = 'jsp.export.title.word';
    } else if ($routeParams.format === 'archive') {
      self.pageheadertitle = 'jsp.export.title.archive';
    }
  
    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'common_export',
      href: '/project/export'
    });
    self.breadcrumbitems.push({
      label: self.pageheadertitle
    });

    self.saving = false;
    self.exportpath;
  };

  self.export = function(isValid) {
    if (isValid && !self.forbiddenDirectory) {
      self.saving = true;
      $timeout(function () {
        if ($routeParams.format === 'pdf') {
          ExportService.exportPdf(self.exportpath, self.exportCallback);
        } else if ($routeParams.format === 'docx') {
          ExportService.exportWord(self.exportpath, self.exportCallback);
        } else if ($routeParams.format === 'archive') {
          ExportService.exportArchive(self.exportpath, self.exportCallback);
        }
      }, 250);
    }
  },

  self.exportCallback = function() {
    $timeout(function () {
      $location.path('/project/export');
    }, 0);
  },

  self.selectProjectsDirectory = function (directory) {
    self.exportpath = directory;
    if (FileSystemService.canWriteDirectory(directory)) {
      self.forbiddenDirectory = false;
    } else {
      self.forbiddenDirectory = true;
    }
    
    $scope.$apply();
  };

  self.back = function() {
    $location.path('/project/export');
  };
}
