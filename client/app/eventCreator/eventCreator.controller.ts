'use strict';

(function() {

class EventCreatorController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeCalendars = [];

    $http.get('/api/calendars').then(response => {
            console.log(" i  am in calEditor.controller");
      this.awesomeCalendars = response.data;
      socket.syncUpdates('calendar', this.awesomeCalendars);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('calendar');
    });
  }

  addEvent() {
    if (this.newEvent) {
      this.$http.post('/api/events', { name: this.newEvent });
      this.newEvent = '';
    }
  }

  deleteCalendar(calendar) {
    this.$http.delete('/api/calendars/' + calendar._id);
  }
}

angular.module('takeTurnsApp')
  .controller('EventCreatorController', EventCreatorController);

})();