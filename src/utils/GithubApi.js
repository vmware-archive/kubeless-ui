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
import YAML from 'js-yaml'
import type { Template } from 'utils/Types'

const gh = new GitHub()
const repo = gh.getRepo('kubeless', 'functions')

export default class GithubApi {

  static fetchTemplates() {
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
            path: t.path,
            description: '',
            runtime: '',
            readme: null,
            config: null,
            files: []
          }
        } else if (currentTemplate && t.type === 'blob') {
          let file = { id: t.sha, name: t.path, url: t.url }
          currentTemplate.files.push(file)
          const filename = t.path.split('/')[1].toLowerCase()
          switch (filename) {
            case 'readme.md':
              currentTemplate.readme = t.path
              break
            case 'function.yaml':
              currentTemplate.config = t.path
              break
          }
        }
      })
      currentTemplate && templates.push(currentTemplate)
      return templates
    }).then(templates => {
      const promises = templates.map(t => {
        if (!t.config) { return Promise.resolve(t) }
        return GithubApi.fetchContent(t.config).then(config => {
          if (config) {
            t.name = config.name
            t.description = config.description
            t.runtime = config.runtime
          }
          return t
        })
      })
      return Promise.all(promises)
    })
  }

  static fetchContent(path: string) {
    return repo.getContents(null, `incubator/${path}`).then(({ data }) => {
      const decoded = Buffer.from(data.content, 'base64').toString()
      try {
        return YAML.load(decoded)
      } catch (e) {
        return null
      }
    })
  }

}
