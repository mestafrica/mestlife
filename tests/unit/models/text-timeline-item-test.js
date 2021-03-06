import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const { get } = Ember;

moduleForModel('text-timeline-item', 'Unit | Model | TextTimelineItem < Reactionable', {
  needs: ['model:text-timeline-item']
});

test('should have a `hasMany` relationship with comments', function(assert) {
  assert.expect(2);

  const TextTimelineItem = this.store().modelFor('text-timeline-item');
  const relationship = get(TextTimelineItem, 'relationshipsByName').get('comments');

  assert.equal(relationship.key, 'comments', 'has relationship with comment');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is `hasMany`');
})

test('should have a `hasMany` relationships with likes', function(assert) {
  assert.expect(2);

  const TextTimelineItem = this.store().modelFor('text-timeline-item');
  const relationship = get(TextTimelineItem, 'relationshipsByName').get('likes');

  assert.equal(relationship.key, 'likes', 'has a relationship with like');
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is `hasMany`');
});
