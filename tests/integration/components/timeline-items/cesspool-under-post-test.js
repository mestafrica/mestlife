import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('timeline-items/cesspool-under-post', 'Integration | Component | timeline items/cesspool under post', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{timeline-items/cesspool-under-post}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#timeline-items/cesspool-under-post}}
      template block text
    {{/timeline-items/cesspool-under-post}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
