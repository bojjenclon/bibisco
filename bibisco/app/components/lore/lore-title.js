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
    self.breadcrumbItems.push({
      label: 'lore'
    });

    if ($routeParams.id !== undefined) {
      let lore = LoreService.getCollection(
        $routeParams.id);

      // edit breadcrumb objects
      self.breadcrumbItems.push({
        label: lore.name
      });
      self.breadcrumbItems.push({
        label: 'lore_change_name_title'
      });

      self.exitpath = '/objects/' + $routeParams.id;
      self.name = lore.name;
      self.pageheadertitle =
        'lore_change_name_title';
    } else {

      // create breadcrumb objects
      self.breadcrumbItems.push({
        label: 'lore_create_title'
      });
      self.exitpath = '/project/lore';
      self.name = null;
      self.pageheadertitle =
        'lore_create_title';
    }
  };

  self.save = function(title) {
    if ($routeParams.id !== undefined) {
      let lore = LoreService.getLoreItem(
        $routeParams.id);
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
