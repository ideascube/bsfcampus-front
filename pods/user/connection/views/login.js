define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',

        'text!pods/user/connection/templates/login.html',

        'less!pods/user/connection/styles/login'
    ],
    function ($, _, Backbone, $serialize, Config,
              currentUser,
              loginTemplate) {

        return Backbone.View.extend({

            className: 'modal fade',

            id: 'login-modal',

            template: _.template(loginTemplate),

            events: {
                'submit form': 'submit'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                this.$loginError = this.$("#login-error");

                return this;
            },

            fetchCurrentUser: function () {
                var self = this;
                currentUser.fetch().then(
                    function (result) {
                        console.log('current user has been fetched');
                        self.$el.modal('hide');
                    }, function (err) {
                        currentUser.clear();
                        self.$loginError.html(Config.stringsDict.USER.ERROR_FETCHING_USER);
                        console.log("current user doesn't exist");
                    }
                );
            },

            submit: function (e) {
                e.preventDefault();

                var username = this.$('form #username').val();
                var password = this.$('form #password').val();
                this.$loginError.empty();

                var self = this;

                currentUser
                    .logIn(username, password)
                    .done(function(){
                        self.fetchCurrentUser();
                    })
                    .fail(function(error){
                        self.$loginError.html(Config.stringsDict.USER.LOG_IN_ERROR);
                        console.log("Could not submit login data", error);
                    });
            }
        });
    }
);
