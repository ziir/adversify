
// Déclaration du model
app.Models.element = Backbone.Model.extend();

// Déclaration de la collection
app.Collections.elements = Backbone.Collection.extend({
    model: app.Models.element
});
