
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
        puts "Hello Wordl"
    end
end
`

export default [
  { value: 'nodejs6',
    label: 'NodeJS (6)',
    language: 'javascript',
    supportDeps: false,
    defaultFunction: nodeFunction
  },
  { value: 'ruby2.4',
    label: 'Ruby (2.4)',
    language: 'ruby',
    supportDeps: false,
    defaultFunction: rubyFunction
  },
  { value: 'python2.7',
    label: 'Python (2.7)',
    language: 'python',
    supportDeps: true,
    defaultFunction: pythonFunction
  }
]
