define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'view',

        'text!pods/skill/templates/browser/back-to-skill.html'
    ],
    function ($, _, Backbone, Config,
              AbstractView,
              backToSkillTemplate) {

        return AbstractView.extend({

            className: 'back-to-skill-link',
            tagName: 'a',

            template: _.template(backToSkillTemplate),

            renderMinimum: function () {
                var html = this.template({
                    skill: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);
                this.$el.attr('href', this.model.route());

                return this;
            }

        });

    }
);