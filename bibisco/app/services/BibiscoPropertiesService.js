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

angular.module('bibiscoApp').service('BibiscoPropertiesService', function(
  BibiscoDbConnectionService) {
  'use strict';

  return {
    getProperty: function(name) {
      var properties = BibiscoDbConnectionService.getBibiscoDb().getCollection('properties');
      return properties.findOne({
        'name': name
      }).value;
    },
    setProperty: function(name, value) {
      var properties = BibiscoDbConnectionService.getBibiscoDb().getCollection('properties');
      var property = properties.findOne({
        'name': name
      });
      property.value = value;
      return properties.update(property);
    }
  };
});
