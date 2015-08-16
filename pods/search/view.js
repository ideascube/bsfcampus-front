define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app/config',

        'model',

        'text!pods/search/templates/search.html',
        'text!pods/search/templates/search-result.html',

        'less!pods/search/style'
    ],
    function($, _, Backbone, Config,
             AbstractModel,
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
                var model = new AbstractModel({data: result.document}, {parse: true});
                var route = "#/" + result.type + "/" + model.id;
                var $result = $(this.resultTemplate({route: route, result: result, config: Config}));
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
