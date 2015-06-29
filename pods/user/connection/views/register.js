define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'pods/user/models/current',

        'text!pods/user/connection/templates/register.html',

        'less!pods/user/connection/styles/register'
    ],
    function ($, _, Backbone, $serialize, Config,
              currentUser,
              registerTemplate) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(registerTemplate),

            events: {
                'submit form': 'submit',
                'click #got-account-btn': 'redirect_to_login'
            },

            render: function () {
                var html = this.template({config: Config});
                this.$el.html(html);
                this.$('form input').focus();

                return this;
            },

            submit: function (e) {
                e.preventDefault();

                var formData = this.$('form').serializeJSON();
                var username = this.$('form #username').val();
                var password = this.$('form #password').val();

                var self = this;
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/users/register",
                    data: formData,
                    dataType: 'json'
                }).done(function () {
                    currentUser
                        .logIn(username, password)
                        .done(function(){
                            self.trigger('close');
                        });
                }).fail(function (error) {
                    console.log("Could not submit register data", error);
                    // TODO: implement case where register is wrong
                });
            },

            redirect_to_login: function () {
                Backbone.history.loadUrl("/login/redirect");
            }
        });
    }
);
