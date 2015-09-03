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
                this.$loginBtn = this.$("#login-btn");

                // forces listening to events
                this.delegateEvents();

                return this;
            },

            submit: function (e) {
                e.preventDefault();

                var username = this.$('form #username').val();
                var password = this.$('form #password').val();
                this.$loginError.empty();
                this.$loginBtn.html(Config.stringsDict.USER.LOGGING_IN);
                this.$loginBtn.addClass('disabled');
                this.$loginBtn.attr('disabled', true);

                var self = this;

                currentUser
                    .logIn(username, password)
                    .done(function(){
                        self.listenTo(currentUser, "fetch", function() {
                            self.$el.modal('hide');
                        });
                    })
                    .fail(function(error){
                        self.$loginError.html(Config.stringsDict.USER.LOG_IN_ERROR);
                        console.log("Could not submit login data", error);
                        self.$loginBtn.html(Config.stringsDict.USER.LOG_IN);
                        self.$loginBtn.removeClass('disabled');
                        self.$loginBtn.attr('disabled', false);
                    });
            }
        });
    }
);
