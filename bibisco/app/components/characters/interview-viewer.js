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
  component('interviewviewer', {
    templateUrl: 'components/characters/interview-viewer.html',
    controller: InterviewViewerController,
    bindings: {
      characters: '=',
      maincharacter: '<',
      type: '<',
      words: '='
    }
  });


function InterviewViewerController(MainCharacterService, RichTextEditorPreferencesService) {

  var self = this;

  self.$onInit = function() {
    self.fontclass = RichTextEditorPreferencesService.getFontClass();
    self.indentclass = RichTextEditorPreferencesService.getIndentClass();

    let questions = self.maincharacter[self.type].questions;
    let characters = 0;
    let words = 0;
    for (let i = 0; i < questions.length; i++) {
      characters = characters + questions[i].characters;
      words = words + questions[i].words;
    }

    self.characters = characters;
    self.words = words;
  };
}
