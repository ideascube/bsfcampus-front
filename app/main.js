define(
    [
        'jquery',
        'underscore',
        'backbone',

        'app/router',

        'pods/user/models/current'

    ],
    function ($, _, Backbone,
              AppRouter,
              currentUser) {

        var App = function () {

            currentUser.findSession();

            $(document).ajaxSend(function (event, jqxhr, settings) {
                if (currentUser.jwt) {
                    jqxhr.setRequestHeader('Authorization', 'Bearer ' + currentUser.jwt);
                }
            });

            // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
            $.ajaxSetup({
                statusCode: {
                    401: function () {
                        // Redirect the to the login page.
                        console.log("error 401 detected");
                        //currentUser.logOut();
                        if (Backbone.history.getFragment() != '') {
                            Backbone.history.loadUrl("/login");
                        }
                        else {
                            Backbone.history.loadUrl('', {trigger: true, replace: true});
                        }
                    }
                }
            });


            if (currentUser.isLoggedIn()) {
                currentUser.fetch().then(
                    function (result) {
                        console.log('current user has been fetched');
                    }, function (err) {
                        currentUser.clear();
                        console.log("current user doesn't exist");
                    }
                );
            } else {
                currentUser.clear({silent: true});
            }

            this.router = new AppRouter();

            Backbone.history.start();

        };

        return new App();

    }
);
