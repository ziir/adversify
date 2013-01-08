
app.Router = Backbone.Router.extend({
  initialize: function (elements) {
    // On créé un raccourci pour accéder plus rapidement à la collection par la suite
    this.elems = app.collections.elements;
    // On instancie la vue principale
    app.views.main = new app.Views.main();
  },
  routes: {
    '': 'root',
    ':routeElements': 'displayElements',
  },
  // cette route sera appelé à chaque fois qu'une route est inexistante ainsi qu'au lancement de l'application
  root: function () {
    var firstElement = this.elems.toJSON()[0];
    if (firstElement) {
        this.displayElements(firstElement.route);
    }
  },
  // cette route est appelé à chaque fois qu'une route pour un elemnnage est appelé
  displayElements: function (route) {
    // On cherche dans la collection si la route existe dans un de nos elements
    var elem = _.find(this.elems.toJSON(), function (el) {
        return el.route === route;
    });
    // Si le elemnnage existe, on appelle la fonction de notre vue afin d'afficher la fiche du elemnnage
    if (elem) {
        this.selectMenu(elem.route);
        app.views.main.displayElements(elem);
    }
    // Sinon on appelle la route "root" afin d'afficher le premier elemnnage de la liste
    else if (this.elems.length) {
        this.root();
    }
  },
  // cette fonction est appelé quand on clic sur un onglet du menu afin de changer sa classe
  selectMenu: function (route) {
    $('a.linkTab').removeClass('active');
    $('a.linkTab[href="#'+route+'"]').addClass('active');
  }
});
