
'use strict';

(function() {

    class EmailSenderCtrl {

        constructor($http, $scope, socket, $rootScope) {
            this.$http = $http;
            //check if $rootScope.userIDglobal is defined else define it
            if (!$rootScope.userIDglobal) {
                $rootScope.userIDglobal;
            }
            this.to;
            this.subject;
            this.emailBody;
            this.result;
            this.message;
            //get calendar id from user ----------------------------
            paramSerializer: '$httpParamSerializerJQLike';
            if (!this.userIDtemp) {
                console.log("do nothing");
                window.location = window.location + "/" + $rootScope.userIDglobal;
            } else {
                $rootScope.userIDglobal = this.userIDtemp;
                console.log("$rootScope.userIDglobal 555 = " + $rootScope.userIDglobal);
            }
           
            //get calendar id from user ----------------------------
            // paramSerializer: '$httpParamSerializerJQLike';

            //autogenerated code --------------------------------------
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('calendar');
            });
        }

        //send request to BE to send email -------------------------------this is working
        sendEmail() {
            this.message = "Sending E-mail...Please wait";
            console.log("-------- in click send -----------");
            console.log("-------- this.to -----------" + this.to);
            console.log("-------- this.emailBody -----------" + this.emailBody);
            console.log("-------- this.subject -----------" + this.subject);
            this.$http.post('/api/emails', { to: this.to, emailBody: this.emailBody, subject: this.subject, paramSerializer: '$httpParamSerializerJQLike' }).then(response => {
                this.result = response.data;
                console.log("-------- request was sent and succeeded-----------");
                if (this.result == "sent") {
                    window.alert("Message Sent");
                }
            });
        }
    }

    angular.module('takeTurnsApp')
        .controller('EmailSenderCtrl', EmailSenderCtrl);

})();
