/*
Copyright 2019 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import * as reducerCreators from './reducerCreators';
import * as selectorCreators from './selectorCreators';
import createReducer, * as selectors from './eventListeners';

const name = 'event listener name';
const namespace = 'default';
const state = { fake: 'state' };

it('creates a namespaced reducer for the correct type', () => {
  const type = 'EventListener';
  jest.spyOn(reducerCreators, 'createNamespacedReducer');
  createReducer();
  expect(reducerCreators.createNamespacedReducer).toHaveBeenCalledWith({
    type
  });
});

it('getEventListeners', () => {
  const collection = { fake: 'collection' };
  jest
    .spyOn(selectorCreators, 'getCollection')
    .mockImplementation(() => collection);
  expect(selectors.getEventListeners(state, namespace)).toEqual(collection);
});

it('getEventListener', () => {
  const resource = { fake: 'resource' };
  jest
    .spyOn(selectorCreators, 'getResource')
    .mockImplementation(() => resource);
  expect(selectors.getEventListener(state, name, namespace)).toEqual(resource);
});

it('getEventListenersErrorMessage', () => {
  const errorMessage = 'errorMessage';
  expect(selectors.getEventListenersErrorMessage({ errorMessage })).toEqual(
    errorMessage
  );
});

it('isFetchingEventListeners', () => {
  const isFetching = 'isFetching';
  expect(selectors.isFetchingEventListeners({ isFetching })).toEqual(
    isFetching
  );
});
