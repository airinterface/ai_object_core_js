const fs        = require('fs');
const path      = require('path');
let _path       = path.resolve(__dirname, 'require.json')
let _required   = require(_path);
let _requiredjs = _required.map( (f) => { return path.join(__dirname, 'src', f); });


var initializeTmpDir = ( dir )=>{
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}
initializeTmpDir( 'build' );



module.exports = function( grunt ) {
  const package = grunt.file.readJSON('package.json');
  console.log( "package name ===== " + package.name );

  if ( !grunt.option( "filename" ) ) {
    grunt.option( "filename", package.name + ".js" );
  }

  grunt.initConfig({
    pkg: package,
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - \r\n' +
          '<%= grunt.template.today("yyyy-mm-dd") %> \r\n\r\n*/'
      },
      dist: {
        src: _requiredjs,
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    shell: {
        webpack: {
          command: () => 'webpack --config config/webpack.config.js'
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.registerTask('build', ['concat', 'shell:webpack']);
  grunt.registerTask('default', []);


}

