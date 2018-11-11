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

// Define the 'bibisco' module
angular.module('bibiscoApp', ['ngRoute',
  'cfp.hotkeys',
  'chart.js',
  'focus-if',
  'mwl.confirm',
  'ngSanitize',
  'ngMessages',
  'pascalprecht.translate', // angular-translate
  'tmh.dynamicLocale', // angular-dynamic-locale
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ui.select'
]).controller('indexController', function ($injector, $rootScope, $scope) {

  let BibiscoPropertiesService = $injector.get('BibiscoPropertiesService');
  $scope.theme = BibiscoPropertiesService.getProperty('theme');

  $rootScope.$on('SWITCH_CLASSIC_THEME', function () {
    $scope.theme = 'classic';
  });

  $rootScope.$on('SWITCH_DARK_THEME', function () {
    $scope.theme = 'dark';
  });

  $rootScope.dirty = false;
  
}).config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
      when('/architectureitems/:id/:mode', {
        template: '<architecturedetail></architecturedetail>'
      }).
      when('/chapters/new', {
        template: '<chaptertitle></chaptertitle>'
      }).
      when('/chapters/:id', {
        template: '<chapterdetail></chapterdetail>'
      }).
      when('/chapters/:id/title', {
        template: '<chaptertitle></chaptertitle>'
      }).
      when('/chapters/:chapterid/chapterinfos/:type/:mode', {
        template: '<chapterinfodetail></chapterinfodetail>'
      }).
      when('/chapters/:chapterid/scenes/new', {
        template: '<scenetitle></scenetitle>'
      }).
      when('/chapters/:chapterid/scenes/:sceneid/move', {
        template: '<chapterselect></chapterselect>'
      }).
      when('/chapters/:chapterid/scenes/:sceneid/tags', {
        template: '<scenetags></scenetags>'
      }).
      when('/chapters/:chapterid/scenes/:sceneid/title', {
        template: '<scenetitle></scenetitle>'
      }).
      when('/chapters/:chapterid/scenes/:sceneid/:mode', {
        template: '<scenedetail></scenedetail>'
      }).
      when('/createproject', {
        template: '<createproject></createproject>'
      }).
      when('/error', {
        template: '<error></error>'
      }).
      when('/exporttoformat/:format', {
        template: '<exporttoformat></exporttoformat>'
      }).
      when('/importproject', {
        template: '<importproject></importproject>'
      }).
      when('/info', {
        template: '<info></info>'
      }).
      when('/objects/new', {
        template: '<itemtitle></itemtitle>'
      }).
      when('/objects/:id/images', {
        template: '<itemimages></itemimages>'
      }).
      when('/objects/:id/images/new', {
        template: '<itemaddimage></itemaddimage>'
      }).
      when('/objects/:id/title', {
        template: '<itemtitle></itemtitle>'
      }).
      when('/objects/:id/:mode', {
        template: '<itemdetail></itemdetail>'
      }).
      when('/loading', {
        template: '<loading></loading>'
      }).
      when('/locations/new', {
        template: '<locationtitle></locationtitle>'
      }).
      when('/locations/:id/images', {
        template: '<locationimages></locationimages>'
      }).
      when('/locations/:id/images/new', {
        template: '<locationaddimage></locationaddimage>'
      }).
      when('/locations/:id/title', {
        template: '<locationtitle></locationtitle>'
      }).
      when('/locations/:id/:mode', {
        template: '<locationdetail></locationdetail>'
      }).
      when('/main', {
        template: '<main></main>'
      }).
      when('/maincharacters/new', {
        template: '<maincharactertitle></maincharactertitle>'
      }).
      when('/maincharacters/:id', {
        template: '<maincharacterdetail></maincharacterdetail>'
      }).
      when('/maincharacters/:id/infowithoutquestion/:info/:mode', {
        template: '<maincharacterinfowithoutquestion></maincharacterinfowithoutquestion>'
      }).
      when('/maincharacters/:id/infowithquestion/:info/:mode', {
        template: '<maincharacterinfowithquestion></maincharacterinfowithquestion>'
      }).
      when('/maincharacters/:id/images', {
        template: '<maincharacterimages></maincharacterimages>'
      }).
      when('/maincharacters/:id/images/new', {
        template: '<maincharacteraddimage></maincharacteraddimage>'
      }).
      when('/maincharacters/:id/title', {
        template: '<maincharactertitle></maincharactertitle>'
      }).
      when('/openproject', {
        template: '<openproject></openproject>'
      }).
      when('/project/tips', {
        template: '<tips></tips>'
      }).
      when('/project/title', {
        template: '<projecttitle></projecttitle>'
      }).
      when('/project/:item', {
        template: '<project></project>'
      }).
      when('/secondarycharacters/new', {
        template: '<secondarycharactertitle></secondarycharactertitle>'
      }).
      when('/secondarycharacters/:id/images', {
        template: '<secondarycharacterimages></secondarycharacterimages>'
      }).
      when('/secondarycharacters/:id/images/new', {
        template: '<secondarycharacteraddimage></secondarycharacteraddimage>'
      }).
      when('/secondarycharacters/:id/title', {
        template: '<secondarycharactertitle></secondarycharactertitle>'
      }).
      when('/secondarycharacters/:id/:mode', {
        template: '<secondarycharacterdetail></secondarycharacterdetail>'
      }).
      when('/settings', {
        template: '<settings></settings>'
      }).
      when('/start', {
        template: '<start></start>'
      }).
      when('/strands/new', {
        template: '<strandtitle></strandtitle>'
      }).
      when('/strands/:id/title', {
        template: '<strandtitle></strandtitle>'
      }).
      when('/strands/:id/:mode', {
        template: '<stranddetail></stranddetail>'
      }).
      when('/welcome', {
        template: '<welcome></welcome>'
      }).
      otherwise('/main');
  }
])
  .config(function($translateProvider) {

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'resources/locale-', // path to translations files
        suffix: '.json' // suffix, currently- extension of the translations
      })
      .registerAvailableLanguageKeys(['cs', 'de', 'en', 'en-us',
        'es', 'fr', 'it', 'pl', 'pt-br', 'pt-pt', 'ru', 'sr', 'tr'
      ], {
        'cs': 'cs',
        'de': 'de',
        'en-ca': 'en-us',
        'en_CA': 'en-us',
        'en-gb': 'en',
        'en_GB': 'en',
        'en-us': 'en-us',
        'en_US': 'en-us',
        'es': 'es',
        'fr': 'fr',
        'it': 'it',
        'pl': 'pl',
        'pt-br': 'pt-br',
        'pt_BR': 'pt-br',
        'pt-pt': 'pt-pt',
        'pt_PT': 'pt-pt',
        'ru': 'ru',
        'sr': 'sr',
        'tr': 'tr',
        '*': 'en'
      }) // register available languages
      .determinePreferredLanguage() // is applied on first load
      .fallbackLanguage(['en']) // fallback language
      .useSanitizeValueStrategy(null) // sanitize strategy: null until 'sanitize' mode is fixed
    ;
  })
  .config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern(
      'lib/angular-i18n/angular-locale_{{locale}}.js');
  })
  .config(function($uibTooltipProvider) {
    $uibTooltipProvider.options({
      'appendToBody': true
    });
    $uibTooltipProvider.setTriggers({
      'mouseenter': 'mouseleave'
    });
  })
  .config(function (ChartJsProvider) {
 
    let colors = [];
    for (let i = 0; i < 100; i++) {
      colors.push.apply(colors, ['#0084D1', '#004586', '#FF420E', '#FFD320', '#579D1C', '#7E0021', '#83CAFF', '#314004', '#AECF00', '#4B1F6F', '#FF950E', '#C5000B']);
    }  

    ChartJsProvider.setOptions({
      global: {
        colors: colors
      }
    });
  })

// By default, AngularJS will catch errors and log them to
// the Console. I want to keep that behavior; however, I
// want to intercept it so that I can also log the errors
// to file for later analysis and I want to redirect to error page.
// So I have to override the $exceptionHandler
// provider and replace it with a custom one
  .factory('$exceptionHandler', ['$injector', function($injector) {

    var $location;
    var $log;
    var ContextService;
    var LoggerService;

    return function(exception, cause) {

    // Pass off the error to the default error handler
    // on the AngularJS logger. This will output the
    // error to the console (and let the application
    // keep running normally for the user).
      $log = $log || $injector.get('$log');
      $log.error.apply($log, arguments);

      // Now, we need to try and log the error using the file logger.
      LoggerService = LoggerService || $injector.get('LoggerService');
      LoggerService.error('***EXCEPTION CAUSE*** : ' + cause);
      LoggerService.error('***EXCEPTION STACKTRACE*** : ' + exception.stack);

      // Put cause and exception in application context
      ContextService = ContextService || $injector.get('ContextService');
      ContextService.setLastError({
        cause: cause,
        stacktrace: exception.stack
      });

      // Redirect to error page
      $location = $location || $injector.get('$location');
      $location.path('/error');
    };
  }])

  // trusted html filter
  .filter('trusted', function ($sce) { return $sce.trustAsHtml; })

// Set confirm dialog default
  .run(function(confirmationPopoverDefaults) {
    confirmationPopoverDefaults.cancelButtonType = 'default';
    confirmationPopoverDefaults.confirmButtonType = 'danger';
    confirmationPopoverDefaults.templateUrl =
    'adapters/angular-bootstrap-confirm/angular-bootstrap-confirm.html';
  });