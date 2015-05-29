define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'text!pods/user/templates/register.html',
        'text!pods/user/templates/error-register.html'
    ],
    function($, _, Backbone, Config,
             registerTemplate, errorRegisterTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            template: _.template(registerTemplate),

            errorTemplate: _.template(errorRegisterTemplate),

            events: {
                'click .btn-submit': 'submit'
            },

            render: function () {
                var self = this;
                $.ajax({
                    type: 'GET',
                    url: Config.constants.serverGateway + "/register"
                }).done(function(result){
                    console.log("get register done", result);
                    var html = self.template({ config: Config, form: result });
                    self.$el.html(html);
                }).fail(function(error){
                    console.log("Could not get register token", error);
                    var html = this.errorTemplate({ config: Config });
                    self.$el.html(html);
                });

                return this;
            },

            submit: function () {
                console.log("submit");
                var self = this;
                var formData = this.$el.find('form').serialize();
                $.ajax({
                    type: 'POST',
                    url: Config.constants.serverGateway + "/register",
                    data: formData,
                    dataType: 'json'
                }).done(function(result){
                    self.trigger('close');
                }).fail(function(error){
                    console.log("Could not submit register data", error);
                });
            }
        });
    }
);
