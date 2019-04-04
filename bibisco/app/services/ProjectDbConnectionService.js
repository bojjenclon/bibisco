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

angular.module('bibiscoApp').service('ProjectDbConnectionService', function(
  BibiscoPropertiesService, ContextService, FileSystemService,
  LoggerService) {
  'use strict';
  let fs = require('fs-extra');
  let loki = require('lokijs');
  let LokiFsSyncAdapter = require('./adapters/lokijs/loki-fs-sync-adapter.js');

  let projectdbconnection;
  let projectdb;

  return {
    calculateProjectPath: function(id) {
      return FileSystemService.concatPath(BibiscoPropertiesService.getProperty(
        'projectsDirectory'), id);
    },
    close: function(callback) {
      return projectdb.close(callback);
    },
    create: function(id) {
      var projectPath = this.calculateProjectPath(id);
      projectdb = this.getProjectDbConnection().create(id, projectPath);
      LoggerService.debug('Created ' + projectdb);
    },
    getProjectDbConnection: function() {
      if (!projectdbconnection) {
        projectdbconnection = this.initProjectDbConnection();
      }
      return projectdbconnection;
    },
    load: function(id) {
      var projectPath = this.calculateProjectPath(id);
      projectdb = this.getProjectDbConnection().load(id, projectPath);
      LoggerService.debug('Loaded ' + projectdb);
      
      if (BibiscoPropertiesService.getProperty('version') !== projectdb.getCollection('project').bibiscoVersion) {
        this.checkCollections();
      }
    },
    checkCollections: function () {
      LoggerService.debug('Checking collections of ' + projectdb);

      const collections = [
        'strands',
        'chapters',
        'scenes',
        'maincharacters',
        'secondarycharacters',
        'locations',
        'objects',
        'lore'
      ];
      collections.forEach((name) => {
        if (!projectdb.getCollection(name)) {
          projectdb.addCollection(name);
        }
      });

      LoggerService.debug('Collection check passed for ' + projectdb);
    },
    open: function(dbName, dbPath) {
      return this.getProjectDbConnection().load(dbName, dbPath);
    },
    saveDatabase: function(callback) {
      return projectdb.saveDatabase(callback);
    },
    getProjectDb: function() {
      return projectdb;
    },
    initProjectDbConnection: function () {
      LoggerService.info('initProjectDbConnection()');

      return {
      // add function to create project db
        create: function (dbName, dbPath) {
          fs.mkdirSync(dbPath);
          fs.mkdirSync(dbPath + '/images');
          var projectdbfilepath = dbPath + '/' + dbName + '.json';
          var projectdb = new loki(projectdbfilepath, {
            adapter: new LokiFsSyncAdapter()
          });
          projectdb.saveDatabase(function () {
            LoggerService.info('Database ' + projectdbfilepath + ' created!');
          });

          return projectdb;
        },

        // add function to load project db
        load: function (dbName, dbPath) {
          var projectdbfilepath = dbPath + '/' + dbName + '.json';
          var projectdb = new loki(projectdbfilepath, {
            adapter: new LokiFsSyncAdapter()
          });
          projectdb.loadDatabase({}, function () {
            LoggerService.info('Database ' + projectdbfilepath + ' loaded!');
          });
          return projectdb;
        }
      };
    }
  };
});
