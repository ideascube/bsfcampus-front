define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'tracksCollection',
        'skillsCollection',
        'lessonsCollection',
        'resourcesCollection',

        'text!pods/search/templates/search.html',
        'text!pods/search/templates/search-result.html',

        'less!pods/search/style'
    ],
    function($, _, Backbone, Config,
             tracksCollection, skillsCollection, lessonsCollection, resourcesCollection,
             searchTemplate, searchResultTemplate
    ) {

        return Backbone.View.extend({

            tagName: 'div',

            id: 'search_page',

            template: _.template(searchTemplate),
            resultTemplate: _.template(searchResultTemplate),

            render: function() {
                $("body").removeAttr("style");
                this.$el.html(this.template({searchedString: this.searchedString, config: Config}));
                this.$('#search-results').empty();
                _.each(this.results, this.renderResult, this);

                return this;
            },

            renderResult: function(result) {
                var model;
                switch (result.type) {
                    case "resource":
                        model = resourcesCollection.getOrInstantiate(result.document);
                        break;
                    case "lesson":
                        model = lessonsCollection.getOrInstantiate(result.document);
                        break;
                    case "skill":
                        model = skillsCollection.getOrInstantiate(result.document);
                        break;
                    case "track":
                        model = tracksCollection.getOrInstantiate(result.document);
                        break;
                }
                var $result = $(this.resultTemplate({model: model.toJSON(true), config: Config}));
                var document = result['document'];
                var breadcrumbArray = document['hierarchy'];
                var $breadcrumb = $result.find('ol.breadcrumb');
                _.each(breadcrumbArray, function(item, index, list){
                    var $html = $('<li>' + item.title + '</li>');
                    if (index == list.length - 1) {
                        $html.addClass('active');
                    }
                    $breadcrumb.append($html);
                }, this);
                this.$('#search-results').append($result);
            }

        });

    }
);
