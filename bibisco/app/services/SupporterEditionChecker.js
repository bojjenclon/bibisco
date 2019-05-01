angular.module('bibiscoApp').service('SupporterEditionChecker', ['$injector', '$rootScope', '$translate', function (e, t, i) {
  'use strict';
  const {
    shell: o
  } = require('electron');
  let n = e.get('BibiscoPropertiesService'),
    r = e.get('$uibModal');
  return {
    check: function () {
      return n.getProperty('version').indexOf('SE') > -1 && e.get('IntegrityService').ok();
    },
    showSupporterMessage: function () {
      r.open({
        animation: !0,
        backdrop: 'static',
        component: 'supportereditionpopup',
        size: 'md'
      }).result.then(function () {
        let e = i.instant('supporter_edition_get_it_button_url');
        o.openExternal(e), t.$emit('CLOSE_POPUP_BOX');
      }, function () {
        t.$emit('CLOSE_POPUP_BOX');
      }), t.$emit('OPEN_POPUP_BOX');
    }
  };
}]);
