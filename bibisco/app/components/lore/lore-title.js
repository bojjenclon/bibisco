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
  component('loretitle', {
    templateUrl: 'components/lore/lore-title.html',
    controller: LoreTitleController
  });

function LoreTitleController($location, $routeParams, LoreService) {

  var self = this;

  self.$onInit = function() {

    // common bradcrumb root
    self.breadcrumbItems = [];

    if ($routeParams.id !== undefined) {
      let lore = LoreService.getLoreItem($routeParams.id);

      self.breadcrumbItems.push({
        label: 'lore',
        href: '/lore/params/focus=lore_' + lore.$loki
      });

      // edit breadcrumb objects
      self.breadcrumbItems.push({
        label: lore.name,
        href: '/lore/' + lore.$loki + '/view'
      });
      self.breadcrumbItems.push({
        label: 'lore_change_name_title'
      });

      self.exitpath = '/lore/' + lore.$loki + '/view';
      self.name = lore.name;
      self.pageheadertitle = 'lore_change_name_title';
      
    } else {
      self.breadcrumbItems.push({
        label: 'lore',
        href: '/lore'
      });

      // create breadcrumb objects
      self.breadcrumbItems.push({
        label: 'lore_create_title'
      });
      self.exitpath = '/lore';
      self.name = null;
      self.pageheadertitle =
        'lore_create_title';
    }
  };

  self.save = function (title) {
    if ($routeParams.id !== undefined) {
      let lore = LoreService.getLoreItem($routeParams.id);
      lore.name = title;
      LoreService.update(lore);
    } else {
      LoreService.insert({
        description: '',
        name: title
      });
    }
  };
}
