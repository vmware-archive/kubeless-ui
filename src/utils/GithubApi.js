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

// @flow
import GitHub from 'github-api'
import type { Template } from 'utils/Types'

const gh = new GitHub()

export default class GithubApi {

  static fetchTemplates() {
    const repo = gh.getRepo('bitnami', 'functions')
    return repo.getTree('master:incubator?recursive=1').then(response => {

      const tree = response.data.tree
      const templates:Array<Template> = []
      let currentTemplate = null
      tree.forEach(t => {
        if (t.type === 'tree' && t.path.indexOf('/') === -1) {
          currentTemplate && templates.push(currentTemplate)
          currentTemplate = {
            id: t.sha,
            name: t.path,
            description: t.url,
            files: []
          }
        } else if (currentTemplate && t.type === 'blob') {
          let file = { id: t.sha, name: t.path, url: t.url }
          currentTemplate.files.push(file)
          if (t.path.split('/')[1].toLowerCase() === 'readme.md') {
            currentTemplate.readme = t.url
          }
        }
      })
      currentTemplate && templates.push(currentTemplate)
      return templates
    })
  }

}
