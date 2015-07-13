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

            tagName: 'div',

            template: _.template(loginTemplate),

            events: {
                'submit #login-modal form': 'submit'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);

                return this;
            },

            traceUser: function (currentUser) {
                console.log(currentUser.forTemplate());
            },

            submit: function (e) {
                e.preventDefault();

                var username = this.$('form input#username').val();
                var password = this.$('form input#password').val();
                this.$el.find(".login-error").addClass('hide');

                var self = this;

                currentUser
                    .logIn(username, password)
                    .done(function(){
                        self.trigger('close');
                    })
                    .fail(function(error){
                        console.log("Could not submit login data", error);
                        self.$el.find(".login-error").removeClass('hide');
                    });
            }
        });
    }
);
