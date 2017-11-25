
const nodeFunction = `
module.exports = {
  <<HANDLER>>: function(req, res) {
     res.end("Hello World");
  }
};
`

const pythonFunction = `
def <<HANDLER>>():
    return "Hello World"
`

const rubyFunction = `
class Kubelessfunction
    def self.run(request)
        puts "Hello World"
    end
end
`

export default [
  { value: 'nodejs6',
    label: 'NodeJS (6)',
    language: 'javascript',
    depsFilename: 'package.json',
    defaultFunction: nodeFunction
  }, {
    value: 'nodejs8',
    label: 'NodeJS (8)',
    language: 'javascript',
    depsFilename: 'package.json',
    defaultFunction: nodeFunction
  },
  { value: 'ruby2.4',
    label: 'Ruby (2.4)',
    language: 'ruby',
    depsFilename: 'Gemfile',
    defaultFunction: rubyFunction
  },
  { value: 'python2.7',
    label: 'Python (2.7)',
    language: 'python',
    depsFilename: 'requirements.txt',
    defaultFunction: pythonFunction
  },
  { value: 'python3.4',
    label: 'Python (3.4)',
    language: 'python',
    depsFilename: 'requirements.txt',
    defaultFunction: pythonFunction
  }
]
