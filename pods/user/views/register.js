define(
    [
        'jquery',
        'underscore',
        'backbone',
        'jqueryserialize',
        'app/config',

        'text!pods/user/templates/register.html',
        'text!pods/user/templates/error-register.html',

        'less!pods/user/style'
    ],
    function($, _, Backbone, $serialize, Config,
             registerTemplate, errorRegisterTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(registerTemplate),

            errorTemplate: _.template(errorRegisterTemplate),

            events: {
                'click .btn-submit': 'submit',
                'click #got-account-btn': 'redirect_to_login'
            },

            render: function () {
                var self = this;
                $.ajax({
                    type: 'GET',
                    url: Config.constants.serverGateway + "/register"
                }).done(function(result){
                    console.log("get register done", result);
                    var $result = $(result);
                    var csrf_token = $result.attr('value');
                    var html = self.template({ config: Config, csrf_token: csrf_token });
                    self.$el.html(html);
                }).fail(function(error){
                    console.log("Could not get register token", error);
                    var html = self.errorTemplate({ config: Config });
                    self.$el.html(html);
                });

                return this;
            },

            submit: function () {
                console.log("submit");
                var self = this;
                var formData = this.$el.find('form').serializeJSON();
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: Config.constants.serverGateway + "/register",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    console.log(JSON.stringify(result));
                    currentUser.fetch().done(function (userResponse) {
                        console.log(JSON.stringify(userResponse));
                    });
                    self.trigger('close');
                }).fail(function(error){
                    console.log("Could not submit register data", error);
                    // TODO: implement case where register is wrong
                });
            },

            redirect_to_login: function() {
                Backbone.history.loadUrl("/login/redirect");
            }
        });
    }
);
