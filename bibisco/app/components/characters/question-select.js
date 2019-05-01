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
  component('questionselect', {
    templateUrl: 'components/characters/question-select.html',
    controller: QuestionSelectController,
    bindings: {
      questioncount: '<',
      questionselected: '=',
      questionselectedchanged: '<',
      type: '<'
    }
  });

function QuestionSelectController($translate) {

  var self = this;

  self.$onInit = function() {
    self.selectedItem;
    self.selectItems = [];
    for (let i = 0; i < self.questioncount; i++) {
      let questionItem = self.createQuestionItem(i);
      self.selectItems.push(questionItem);
      if (i === self.questionselected) {
        self.selectedItem = questionItem;
      }
    }
  };

  self.$onChanges = function () {
    if (self.selectItems && self.questionselected !== null) {
      self.selectedItem = self.selectItems[self.questionselected];
    }
  };

  self.selectQuestion = function() {
    self.questionselected = self.selectedItem.key;
  };

  self.createQuestionItem = function (item) {
    let description = $translate.instant('jsp.characterInfo.question') 
      + ' (' + (item+1)  + '/' + self.questioncount
      + '): ' + $translate.instant('characterInfo_question_' + self.type + '_' + item);
    return {
      key: item,
      description: description
    };
  };
}
