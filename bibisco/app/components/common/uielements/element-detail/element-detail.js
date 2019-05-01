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
  component('elementdetail', {
    templateUrl: 'components/common/uielements/element-detail/element-detail.html',
    controller: ElementDetailController,
    bindings: {
      backpath: '<',
      breadcrumbitems: '<',
      changetitleenabled: '<',
      changetitlefunction: '&',
      changetitlelabel: '@',
      characters: '=',
      content: '=',
      deleteconfirmmessage: '@',
      deleteenabled: '<',
      deleteforbidden: '<',
      deleteforbiddenmessage: '@',
      deletefunction: '&',
      disableemptymessage: '<',
      editmode: '<',
      editfunction: '&',
      eventname: '@',
      headertitle: '@',
      headersubtitle: '@',
      imagesenabled: '<',
      lastsave: '<',
      savefunction: '&',
      showimagesfunction: '&',
      showimageslabel: '@',
      taskstatus: '<',
      taskstatuschangefunction: '&',
      words: '=',
      wordscharactersenabled: '<'
    }
  });

function ElementDetailController($rootScope, PopupBoxesService) {
  var self = this;

  self.$onInit = function() {
    $rootScope.$emit(self.eventname);
    
    // common element detail flags
    self.autosaveenabled;
    $rootScope.dirty = false;
    
    // action items
    self.actionitems = [];
    if (self.changetitleenabled) {
      self.actionitems.push({
        label: self.changetitlelabel,
        itemfunction: self.changetitlefunction
      });
    }
    if (self.deleteenabled) {
      self.actionitems.push({
        label: 'jsp.common.button.delete',
        itemfunction: function () {
          if (self.deleteforbidden) {
            PopupBoxesService.alert(self.deleteforbiddenmessage);
          } else {
            PopupBoxesService.confirm(self.deletefunction, self.deleteconfirmmessage);
          }
        }
      });
    }
  };
}
