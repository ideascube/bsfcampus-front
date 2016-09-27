define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'view',

        'pods/skill/views/detail/backToTrack',
        'pods/skill/views/detail/skillOutline',

        'pods/attempts/skill-validation-attempt/model',
        'pods/attempts/skill-validation-attempt/views/modal',

        'text!pods/skill/templates/detail/index.html',
        'text!pods/skill/templates/detail/skill-progress.html',
        'text!pods/skill/templates/validation-badge.html',

        'less!pods/skill/styles/detail'
    ],
    function ($, _, Backbone, VM, Config,
              AbstractView,
              BackToTrackView, SkillOutlineView,
              SkillValidationAttemptModel, SkillValidationAttemptModalView,
              detailTemplate, progressTemplate, badgeTemplate) {

        return AbstractView.extend({

            className: 'skill-detail row gutter-sm',

            template: _.template(detailTemplate),
            progressTemplate: _.template(progressTemplate),

            events: {
                'click .btn-validate-skill': 'startSkillValidation'
            },

            renderMinimum: function () {
                var html = this.template({
                    skill: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);
                this.$trackTitle = this.$('#track-title');
                this.$skillTitle = this.$('#skill-title');
                this.$progress = this.$('#skill-progress');
                this.$btnValidate = this.$('.btn-validate-skill');
                this.$skillOutline = this.$('#skill-outline');

                this.renderOutline();

                return this;
            },

            renderOutline: function () {
                var skillOutlineView = new SkillOutlineView({
                    collection: this.model.get('lessons')
                });
                this.$skillOutline.html(skillOutlineView.render().$el);

                return this;
            },

            renderFetched: function(){
                this.renderBackToTrack();
                this.renderProgress();

                return this;
            },

            renderBackToTrack: function () {
                var backToTrackView = new BackToTrackView({model: this.model.get('track')});
                this.$trackTitle.html(backToTrackView.render().$el);

                return this;
            },

            renderProgress: function () {
                if (!this.model.fetched) return false;

                var progress = this.model.get('progress');
                var progressPercents = Math.round(100 * progress.current / progress.max);
                var testUnlocked = (progress.current == progress.max); 

                var html = this.progressTemplate({
                    skill: this.model.toJSON(true),
                    progress_percents: progressPercents,
                    config: Config
                });
                this.$progress.html(html);
                this.$progressBar = this.$progress.find('.progress-bar');

                if (this.model.isValidated()) {
                    this.$el.addClass('skill-validated');
                    this.$skillTitle.append(badgeTemplate); // FIXME multiple badges may appear that way
                    this.$progressBar.removeClass('progress-bar-success').addClass('progress-bar-info golden-effect');
                    this.$btnValidate.removeClass('btn-success').addClass('btn-info golden-effect');
                    this.$btnValidate.find('.validate-text').html(Config.stringsDict.SKILL_TEST_VALIDATED);
                    this.$btnValidate.prop('disabled', false);
                }
                else if (testUnlocked) {
                    this.$btnValidate.find('.validate-text').html(Config.stringsDict.SKILL_TEST_VALIDATION_ALLOWED);
                    this.$btnValidate.prop('disabled', false);
                }
            },

            startSkillValidation: function (e) {
                e.preventDefault();

                var self = this;

                var attempt = new SkillValidationAttemptModel();
                attempt.set('skill', this.model.id);
                attempt.save().done(function (result) {
                    var skillValidationAttemptView = VM.createView(Config.constants.VIEWS_ID.SKILL_VALIDATION_ATTEMPT, function () {
                        return new SkillValidationAttemptModalView({model: attempt});
                    });
                    skillValidationAttemptView.resource = self.model;
                    $("body").append(skillValidationAttemptView.render().$el);

                    skillValidationAttemptView.$el.on('hidden.bs.modal', function () {
                        VM.closeView(Config.constants.VIEWS_ID.TRACK_VALIDATION_ATTEMPT);
                    }).on('shown.bs.modal', function () {
                        skillValidationAttemptView.continueExercise();
                    }).modal('show');
                }).fail(function (error) {

                });
            }

        });

    }
);
