/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var allTodos = [];

function create(text) {
  var id = allTodos.length;
  allTodos[id] = {
    id: id,
    complete: false,
    text: text
  };

  console.log(allTodos);
}

var TodoStore = assign({}, EventEmitter.prototype, {

  areAllComplete: function () {
    for (var id in allTodos) {
      if (!allTodos[id].complete) {
        return false;
      }
    }
    return true;
  },

  getAll: function () {
    return allTodos;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  var text;

  switch (action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;
    default:
      break;
  }
});

module.exports = TodoStore;
