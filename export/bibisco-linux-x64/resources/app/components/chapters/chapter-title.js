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
  component('chaptertitle', {
    templateUrl: 'components/chapters/chapter-title.html',
    controller: ChapterTitleController
  });

function ChapterTitleController($location, $routeParams, ChapterService) {
  var self = this;

  self.$onInit = function() {

    // common breadcrumb root
    self.breadcrumbItems = [];
    self.breadcrumbItems.push({
      label: 'common_chapters'
    });

    if ($routeParams.id !== undefined) {
      let chapter = ChapterService.getChapter(
        $routeParams.id);

      // edit breadcrumb items
      self.breadcrumbItems.push({
        label: '#' + chapter.position + ' ' + chapter.title
      });
      self.breadcrumbItems.push({
        label: 'jsp.chapter.dialog.title.updateTitle'
      });

      self.exitpath = '/chapters/' + $routeParams.id;
      self.title = chapter.title;
      self.pageheadertitle =
        'jsp.chapter.dialog.title.updateTitle';
    } else {

      // create breadcrumb items
      self.breadcrumbItems.push({
        label: 'jsp.chapters.dialog.title.createChapter'
      });

      self.exitpath = '/project/chapters';
      self.name = null;
      self.pageheadertitle =
        'jsp.chapters.dialog.title.createChapter';
    }
  };

  self.save = function(title) {
    if ($routeParams.id !== undefined) {
      let chapter = ChapterService.getChapter(
        $routeParams.id);
      chapter.title = title;
      ChapterService.update(chapter);
    } else {
      ChapterService.insert({
        title: title
      });
    }
  };

}
