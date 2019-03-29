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

angular.module('bibiscoApp').service('LoreService', function(
    CollectionUtilService, LoggerService, ProjectDbConnectionService
  ) {
    'use strict';
  
    return {
      getLoreItem: function(id) {
        return this.getCollection().get(id);
      },
      getCollection: function() {
        return ProjectDbConnectionService.getProjectDb().getCollection('lore');
      },
      getCollectionCount: function() {
        return this.getCollection().count();
      },
      getLore: function() {
        return this.getDynamicView().data();
      },
      getDynamicView: function() {
        return CollectionUtilService.getDynamicViewSortedByPosition(
          this.getCollection(), 'all_lore');
      },
      insert: function(lore) {
        CollectionUtilService.insert(this.getCollection(), lore);
      },
      update: function(loreItem) {
        CollectionUtilService.update(this.getCollection(), loreItem);
      }
    };
  });
  