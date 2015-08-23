define(
    [
        'jquery',
        'underscore',
        'backbone',
        'viewmanager',
        'app/config',

        'view',

        'pods/skill/collections/track',
        'pods/attempts/track-validation-attempt/model',

        'pods/track/views/detail/trackOutline',
        'pods/attempts/track-validation-attempt/views/modal',

        'text!pods/track/templates/detail.html',

        'less!pods/track/styles/detail'
    ],
    function ($, _, Backbone, VM, Config,
              AbstractView,
              SkillTrackCollection, TrackValidationAttemptModel,
              TrackOutlineView, TrackValidationAttemptView,
              detailTemplate) {

        return AbstractView.extend({

            className: 'row gutter-sm track-detail',

            template: _.template(detailTemplate),

            events: {
                'click .btn-validate-track': 'startTrackValidation'
            },

            loadingBarOptions: {
                'containerClassName': 'col-sm-6 col-center'
            },

            renderMinimum: function () {
                var html = this.template({
                    track: this.model.toJSON(true),
                    config: Config
                });
                this.$el.html(html);

                this.$validateButton = this.$('.btn-validate-track');
                this.$trackOutline = this.$('#track-outline');

                this.renderOutline();

                return this;
            },

            renderFetched: function() {
                this.renderProgress();

                return this;
            },

            renderOutline: function () {
                var trackOutlineView = new TrackOutlineView({
                    collection: this.model.get('skills')
                });
                this.$trackOutline.html(trackOutlineView.render().$el);

                return this;
            },

            renderProgress: function () {
                if (!this.model.fetched) {
                    this.model.fetch();
                    return this;
                }

                if (this.model.isValidated()) {
                    this.$el.addClass('track-validated');
                    this.$validateButton.removeClass('btn-success').addClass('btn-info golden-effect');
                    this.$validateButton.find('.validate-text').html(Config.stringsDict.TRACK_TEST_VALIDATED);
                    this.$validateButton.prop('disabled', false);
                }
                else if (this.model.testIsUnlocked()) {
                    this.$validateButton.find('.validate-text').html(Config.stringsDict.TRACK_TEST_VALIDATION_ALLOWED);
                    this.$validateButton.prop('disabled', false);
                }

                if (this.model.get('validation_test') == null) {
                    this.$validateButton.hide();
                }

                return this;
            },

            startTrackValidation: function (e) {
                e.preventDefault();

                var self = this;

                var attempt = new TrackValidationAttemptModel();
                // FIXME Handle case where there is no validation test
                var validationTest = this.model.get('validation_test')._id;
                attempt.set('exercise', validationTest);
                attempt.save().done(function (result) {
                    var trackValidationAttemptView = VM.createView(Config.constants.VIEWS_ID.TRACK_VALIDATION_ATTEMPT, function () {
                        return new TrackValidationAttemptView({model: attempt});
                    });
                    trackValidationAttemptView.resource = self.model;
                    $("body").append(trackValidationAttemptView.render().$el);

                    trackValidationAttemptView.$el.on('shown.bs.modal', function () {
                        trackValidationAttemptView.continueExercise();
                        $("#main").hide();
                        $("body").css('background-color', '#36404A');
                    }).on('hidden.bs.modal', function () {
                        $("body").css('background-color', '');
                        $("#main").show();
                        VM.closeView(Config.constants.VIEWS_ID.TRACK_VALIDATION_ATTEMPT);
                    }).modal('show');
                }).fail(function (error) {

                });
            }

        });

    }
);
