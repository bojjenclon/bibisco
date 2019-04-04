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

// Used to ensure the db is updated properly between versions.
// For performance, checks are very specific between versions.
angular.module('bibiscoApp').service('CollectionIntegrityService', function(
  LoggerService) {
  'use strict';

  return {
    // List of collections that should exist in the db
    shouldHave: function (projectdb, curVersion, projectVersion) {
      /**
       * Format:
       * {
       *  <version>: [
       *    <collection name>
       *  ]
       * }
       */
      const changelist = {
          '2.0.4': [
            'lore'
          ]
        },
        curList = changelist[curVersion];
    
      if (!curList) {
        return;
      }

      curList.forEach((name) => {
        projectdb.addCollection(name);
      });
    },

    // List of collections that have been renamed between versions
    doRename: function (projectdb, curVersion, projectVersion) {
      /**
       * Format:
       * {
       *  <version>: [
       *    {
       *      oldName: <string>
       *      newName: <string>
       *    }
       *  ]
       * }
       */
      const changelist = {
      },
      curList = changelist[curVersion];

      if (!curList) {
        return;
      }

      curList.forEach((data) => {
        projectdb.renameCollection(data.oldName, data.newName);
      });
    },

    // List of collections that have been removed between versions
    shouldNotHave: function (projectdb, curVersion, projectVersion) {
      /**
       * Format:
       * {
       *  <version>: [
       *    <collection name>
       *  ]
       * }
       */

      const changelist = {
      },
      curList = changelist[curVersion];
  
      if (!curList) {
        return;
      }

      curList.forEach((name) => {
        projectdb.removeCollection(name);
      });
    },

    checkCollections: function (projectdb, curVersion, projectVersion) {
      // Strip out CE/SE from version string, we only want to compare the numbers
      curVersion = curVersion.match(/[0-9\.]*/)[0];
      projectVersion = projectVersion.match(/[0-9\.]*/)[0];

      LoggerService.debug('Checking collections of ' + projectdb);

      // Integrity check can only handle moving from an older version to a newer one
      if (curVersion > projectVersion) {
        this.shouldHave(projectdb, curVersion, projectVersion);
        this.doRename(projectdb, curVersion, projectVersion);
        this.shouldNotHave(projectdb, curVersion, projectVersion);
      }

      LoggerService.debug('Collection check finished for ' + projectdb);
    }
  };
});
