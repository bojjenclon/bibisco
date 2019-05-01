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
  component('languageselect', {
    templateUrl: 'components/common/forms/language-select/language-select.html',
    controller: LanguageSelectController,
    bindings: {
      applyonchange: '<',
      onselectlanguage: '&'
    }
  });

function LanguageSelectController(LocaleService) {

  var self = this;

  // set locales
  self.locales = LocaleService.getLocales();

  // set initial value
  self.currentLocale = LocaleService.getCurrentLocale();

  // change language function
  self.changeLanguage = function() {

    if (self.applyonchange) {
      LocaleService.setCurrentLocale(this.currentLocale);
    }

    if (self.onselectlanguage) {
      self.onselectlanguage({
        selectedLanguage: this.currentLocale
      });
    }
  };

}
