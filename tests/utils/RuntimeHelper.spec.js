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

  it('should return a default runtime', () => {
    expect(RuntimeHelper.defaultRuntime).toBeInstanceOf(Function)
    expect(RuntimeHelper.defaultRuntime()).toBeDefined()
  })

  it('should return a list of all available runtimes', () => {
    expect(RuntimeHelper.getAllRuntimes).toBeInstanceOf(Function)

    const runtimes = RuntimeHelper.getAllRuntimes()
    expect(runtimes).toBeInstanceOf(Array)
    expect(runtimes.length).toBeGreaterThan(0)
  })

  it('should return language from runtime value', () => {
    expect(RuntimeHelper.runtimeToLanguage).toBeInstanceOf(Function)

    const defaultLanguage = RuntimeHelper.defaultRuntime().language
    const nullRuntime = RuntimeHelper.runtimeToLanguage()
    expect(nullRuntime).toEqual(defaultLanguage)

    const unmatchedRuntime = RuntimeHelper.runtimeToLanguage('fakeruntime')
    expect(unmatchedRuntime).toEqual(defaultLanguage)

    const existingRuntime = RuntimeHelper.runtimeToLanguage()
    expect(typeof existingRuntime).toBe('string')
  })

})
