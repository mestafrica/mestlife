import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('like', 'Unit | Model | like', {
  needs: ['model:like']
});

test('should belong to a reactionable', function(assert) {
  assert.expect(2);

  const Like = this.store().modelFor('like');
  const relationship = get(Like, 'relationshipsByName').get('reactionable');

  assert.equal(relationship.key, 'reactionable', 'has a relationship with reactionable');
  assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is `belongsTo`');
});
