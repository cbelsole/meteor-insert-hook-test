Messages = new Meteor.Collection('messages')

if (Meteor.isClient) {
  var handle = Messages.find().observeChanges({
    added: function (id, fields) {
      $('ul').append('<li>' + id + ' - ' + fields.message + '</li>');
    },
    changed: function (id, fields) {
      $('ul').append('<li>' + id + ' - ' + fields.message + '</li>');
    }
  });

  Template.messages.events({
    'click button': function () {
      Messages.insert({message: 'test message'});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Messages.before.insert(function (userId, doc) {
      doc.message = doc.message + 'addition'
    });
  });
}
