var Generator = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  prompting() {

      let currentDirectory = path.parse(this.destinationRoot())
      let parentDirectory  = path.parse(path.join(this.destinationRoot(), '..'))

      return this.prompt([{
      type    : 'input',
      name    : 'app_name',
      message : 'Your project name',
      default : currentDirectory.name // Default to current folder name
    }, 
    {
       type    : 'input',
       name    : 'go_path_name',
       message : 'What is your go path name ?',
       default : path.join('github.com/', parentDirectory.name)
    },
    {
      type    : 'input',
      name    : 'method_name',
      message : 'What is your fist path/method name ?',
    }]).then((answers) => {
        this.props = {}
        this.props.app_name = answers.app_name.replace(' ', '-')
        this.props.go_path_name = answers.go_path_name
        this.props.method_name = answers.method_name.replace(' ', '_')
    });;
  };

  writing(){
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('./.gitignore'))
      this.fs.copyTpl(this.templatePath('main.go'), this.destinationPath('./main.go'), 
      { 
        gopath: this.props.go_path_name,
        projectname: this.props.app_name 
       })

      mkdirp('api/')
      mkdirp(path.join('/api/', this.props.method_name))

      this.fs.copyTpl(this.templatePath('./api/apiRouter.go'), this.destinationPath('./api/apiRouter.go'), 
      { 
        gopath: this.props.go_path_name,
        projectname: this.props.app_name,
        methodname: this.props.method_name
       })

      this.fs.copyTpl(this.templatePath('./api/method/router.go'), this.destinationPath(path.join('./api/', this.props.method_name, 'router.go')), 
      { 
        methodname: this.props.method_name
       })

       this.fs.copyTpl(this.templatePath('./api/method/model.go'), this.destinationPath(path.join('./api/', this.props.method_name, 'model.go')), 
        { 
          methodname: this.props.method_name
        })

       this.fs.copyTpl(this.templatePath('./api/method/controller.go'), this.destinationPath(path.join('./api/', this.props.method_name, 'controller.go')), 
        { 
          methodname: this.props.method_name
        })


  }

};