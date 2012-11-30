/*app.Router = Backbone.Router.extend({
  initialize: function (personnages) {
    // On créé un raccourci pour accéder plus rapidement à la collection par la suite
    this.persos = app.collections.personnages;
    // On instancie la vue principale
    app.views.main = new app.Views.main();
  },
  routes: {
    '': 'root',
    ':routePerso': 'displayPerso',
  },
  // cette route sera appelé à chaque fois qu'une route est inexistante ainsi qu'au lancement de l'application
  root: function () {
    var firstElement = this.persos.toJSON()[0];
    if (firstElement) {
        this.displayPerso(firstElement.route);
    }
  },
  // cette route est appelé à chaque fois qu'une route pour un personnage est appelé
  displayPerso: function (route) {
    // On cherche dans la collection si la route existe dans un de nos personnages
    var perso = _.find(this.persos.toJSON(), function (el) {
        return el.route === route;
    });
    // Si le personnage existe, on appelle la fonction de notre vue afin d'afficher la fiche du personnage
    if (perso) {
        this.selectMenu(perso.route);
        app.views.main.displayPerso(perso);
    }
    // Sinon on appelle la route "root" afin d'afficher le premier personnage de la liste
    else if (this.persos.length) {
        this.root();
    }
  },
  // cette fonction est appelé quand on clic sur un onglet du menu afin de changer sa classe
  selectMenu: function (route) {
    $('a.linkTab').removeClass('active');
    $('a.linkTab[href="#'+route+'"]').addClass('active');
  }
});*/
