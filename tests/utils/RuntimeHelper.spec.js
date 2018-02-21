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
import RuntimeHelper from 'utils/RuntimeHelper'

describe('(Utils) RuntimeHelper', () => {
  const apiCallF = RuntimeHelper._getRuntimesApiCall
  beforeEach(() => {
    // Mock API call
    RuntimeHelper._getRuntimesApiCall = () => ({ data: {
      'runtime-images': JSON.stringify([{ ID: 'test1', language: 'test', versions: [{ version: '1.0' }] }]) }
    })
  })
  afterEach(() => {
    RuntimeHelper._getRuntimesApiCall = apiCallF
  })
  it('should return a list of all available runtimes', async () => {
    expect(RuntimeHelper.getAllRuntimes).toBeInstanceOf(Function)
    const runtimes = await RuntimeHelper.getAllRuntimes()
    expect(runtimes).toBeInstanceOf(Array)
    expect(runtimes.length).toBeGreaterThan(0)
  })

  it('should return language from runtime value', async () => {
    expect(RuntimeHelper.runtimeToLanguage).toBeInstanceOf(Function)

    const langs = await RuntimeHelper.getAllRuntimes()
    const defaultLanguage = langs[0].language
    const nullRuntime = await RuntimeHelper.runtimeToLanguage()
    expect(nullRuntime).toEqual(defaultLanguage)

    const unmatchedRuntime = await RuntimeHelper.runtimeToLanguage('fakeruntime')
    expect(unmatchedRuntime).toEqual(defaultLanguage)

    const existingRuntime = await RuntimeHelper.runtimeToLanguage()
    expect(typeof existingRuntime).toBe('string')
  })

})
