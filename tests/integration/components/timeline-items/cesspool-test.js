import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('timeline-items/cesspool', 'Integration | Component | timeline items/cesspool', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{timeline-items/cesspool}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#timeline-items/cesspool}}
      template block text
    {{/timeline-items/cesspool}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
