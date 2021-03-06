import Ember from "ember";

export default function(){
  if (Ember.testing) {
    this.setDefault({duration: 10 });
  }
  // BEGIN-SNIPPET transition-demo
  this.transition(
    this.fromRoute('helpers-documentation.liquid-outlet.index'),
    this.toRoute('helpers-documentation.liquid-outlet.other'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  // END-SNIPPET

  // BEGIN-SNIPPET bind-demo-transition
  this.transition(
    this.childOf('#liquid-bind-demo'),
    this.use('toUp')
  );
  // END-SNIPPET

  var duration = Ember.testing ? 0: 1000;
  // BEGIN-SNIPPET liquid-box-demo-transition
  this.transition(
    this.hasClass('vehicles'),

    // this makes our rule apply when the liquid-if transitions to the
    // true state.
    this.toValue(true),
    this.use('crossFade', {duration}),

    // which means we can also apply a reverse rule for transitions to
    // the false state.
    this.reverse('toLeft', {duration})
  );
  // END-SNIPPET

  this.transition(
    this.childOf("#interrupted-fade-demo"),
    this.use('fade', { duration: Ember.testing ? 100 : 1500 })
  );

  this.transition(
    this.childOf("#inline-serial-scenario"),
    this.use('fade', {duration: 1000})
  );

  this.transition(
    this.childOf("#inline-scenario"),
    this.toValue(true),
    this.use('toLeft', {duration: 1000}),
    this.reverse('toRight', {duration: 1000})
  );

  this.transition(
    this.fromRoute('scenarios.nested-outlets.middle'),
    this.toRoute('scenarios.nested-outlets.middle2'),
    this.use('fade', {duration: Ember.testing ? 100 : 1000}),
    this.reverse('fade', {duration: Ember.testing ? 10 : 1000})
  );

  this.transition(
    this.fromRoute('scenarios.nested-outlets.middle.index'),
    this.toRoute('scenarios.nested-outlets.middle.inner'),
    this.use('fade', {duration: Ember.testing ? 10: 1000 }),
    this.reverse('fade', {duration: Ember.testing ? 10 : 1000})
  );

  this.transition(
    this.childOf('#versions-test'),
    this.use('fade', { duration: 500 })
  );

  this.transition(
    this.hasClass('hero-scenario'),
    this.fromValue(true),
    this.use('explode', {
      pickOld: '.bluebox',
      pickNew: '.redbox',
      use: ['flyTo', { duration: 1500 } ]
    }, {
      pickOld: '.blue-abs-box',
      pickNew: '.red-abs-box',
      use: ['flyTo', {duration: 1500 } ]
    }, {
      use: [ 'toLeft', { duration: 1500 } ]
    }),
    this.reverse('explode', {
      pickOld: '.redbox',
      pickNew: '.bluebox',
      use: ['flyTo', { duration: 1500 } ]
    }, {
      pickOld: '.red-abs-box',
      pickNew: '.blue-abs-box',
      use: ['flyTo', {duration: 1500 } ]
    }, {
      use: [ 'toRight', { duration: 1500 } ]
    })
  );

  this.transition(
    this.hasClass('hero-sort'),
    this.use('explode', {
      matchBy: 'data-model-id',
      use: ['flyTo', { duration: 500, easing: [250, 15] } ]
    })
  );

  this.transition(
    this.withinRoute('scenarios.model-dependent-rule.page'),
    this.fromModel(function(fromModel, toModel) {
      return fromModel && toModel && parseInt(fromModel.id) < parseInt(toModel.id);
    }),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('scenarios.interrupted-move.index'),
    this.toRoute('scenarios.interrupted-move.two'),
    this.use('toLeft', { duration: 1500 }),
    this.reverse('toRight', { duration: 1500 })
  );
  this.transition(
    this.fromRoute('scenarios.interrupted-move.two'),
    this.toRoute('scenarios.interrupted-move.three'),
    this.use('toLeft', { duration: 1500 }),
    this.reverse('toRight', { duration: 1500 })
  );
  this.transition(
    this.fromRoute('scenarios.interrupted-move.index'),
    this.toRoute('scenarios.interrupted-move.three'),
    this.use('toLeft', { duration: 1500 }),
    this.reverse('toRight', { duration: 1500 })
  );
}
