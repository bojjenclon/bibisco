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
  component('detailfooter', {
    templateUrl: 'components/common/uielements/detail-footer/detail-footer.html',
    controller: DetailFooterController,
    bindings: {
      actionitems: '<',
      autosaveenabled: '<',
      backpath: '<',
      characters: '<',
      hideprojectexplorerbutton: '<',
      imagesenabled: '<',
      editmode: '<',
      editfunction: '&',
      lastsave: '<',
      savefunction: '&',
      showimagesfunction: '&',
      showimageslabel: '@',
      showprojectexplorer: '=',
      words: '<',
      wordscharactersenabled: '<'
    }
  });


function DetailFooterController() {}
