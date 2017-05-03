/*
Copyright 2017 Bitnami.

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
import EntityHelper from 'utils/EntityHelper'

describe('(Utils) EntityHelper', () => {

  it('updateEntityInList - should update entity in List based on UID', () => {
    const list = [
      { metadata: { uid: 'uid1', name: 'A' } },
      { metadata: { uid: 'uid2', name: 'B' } }
    ]
    const updatedEntity = { metadata: { uid: 'uid2', name: 'B2' } }
    expect(EntityHelper.updateEntityInList(list, updatedEntity)).toMatchSnapshot()
  })

  it('deleteEntityInList - should delete entity in List based on UID', () => {
    const list = [
      { metadata: { uid: 'uid1', name: 'A' } },
      { metadata: { uid: 'uid2', name: 'B' } }
    ]
    const deleteEntity = { metadata: { uid: 'uid2', name: 'B' } }
    expect(EntityHelper.deleteEntityInList(list, deleteEntity)).toMatchSnapshot()
  })

  it('functionFromParams - should create Function entity from params', () => {
    const params = {
      name: 'funcName',
      namespace: 'kubeless',
      'function': '//code goes here',
      handler: 'funcName.foo',
      topic: 'kubeless',
      type: 'HTTP'
    }
    expect(EntityHelper.functionFromParams(params)).toMatchSnapshot()
  })

  it('entityStatus - should return status of Pod', () => {
    const podRunning = {
      metadata: {},
      status: { phase: 'Running' }
    }
    expect(EntityHelper.entityStatus(podRunning)).toEqual('Running')
    const podTerminating = {
      metadata: { deletionTimestamp: new Date() },
      status: { phase: 'Running' }
    }
    expect(EntityHelper.entityStatus(podTerminating)).toEqual('Terminating')
  })

})
