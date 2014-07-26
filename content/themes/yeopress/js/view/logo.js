// Filename: views/project/list
define([
    'jquery',
    'underscore',
    'backbone',
    'controller/app',
    'model/app',
    // Using the Require.js text! plugin, we are loaded raw text
    // which will be used as our views primary template
    'text!templates/logo.html',
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
    var LogoView = Backbone.View.extend({
        id: 'logo',

        events: {

        },

        initialize: function() {
            var compiledTemplate = Handlebars.compile(template)();
            this.$el.append(compiledTemplate);

        }

    });
    // Our module now returns our view
    return LogoView;
});