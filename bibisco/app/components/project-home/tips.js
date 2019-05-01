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
  component('tips', {
    templateUrl: 'components/project-home/tips.html',
    controller: TipsController,
    bindings: {

    }
  });

function TipsController($location, $rootScope, $window) {
  
  var self = this;

  self.$onInit = function () {
    
    $rootScope.$emit('SHOW_TIPS');

    self.breadcrumbitems = [];
    self.breadcrumbitems.push({
      label: 'jsp.menu.project',
      href: '/projecthome'
    });
    self.breadcrumbitems.push({
      label: 'jsp.project.dialog.title.suggestions'
    });

    self.hotkeys = ['esc'];
  };

  self.back = function() {
    $location.path('/projecthome');
  };
}
