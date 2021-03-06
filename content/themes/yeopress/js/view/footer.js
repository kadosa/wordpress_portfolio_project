// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    'controller/app',
    'model/app',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/footer.html',
    'handlebars',

], function(
    $,
    _,
    Backbone,
    AppController,
    AppModel,
    template,
    Handlebars) {
    'use strict';
    var FooterView = Backbone.View.extend({
        id: 'page-footer',
        section: 'footer',

        events: {

        },

        initialize: function() {
            console.log(this.model.toJSON());
            var compiledTemplate = Handlebars.compile(template)(this.model.toJSON());
            this.$el.append(compiledTemplate);

        }

    });
    // Our module now returns our view
    return FooterView;
});