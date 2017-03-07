

module.exports = function(grunt) {
  grunt.initConfig({

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/styles/styles.css': 'src/styles/styles.scss'
        }
      }
    },

    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "src/pages",
          src: "**/*.jade",
          dest: "public",
          expand: true,
          ext: ".html"
        } ]
      }
    },

    // copy all non-processed files:
    copy: {
      build: {
        cwd: 'src',
        src: [ 'images/**', 'scripts/**' ],
        dest: 'public',
        expand: true
      },
    },

    clean: {
      build: {
        src: [ 'public' ]
      },
    },

    watch: {
      stylesheets: {
        files: 'src/**/*.scss',
        tasks: [ 'sass' ]
      },
      // scripts: {
      //   files: 'source/**/*.js',
      //   tasks: [ 'scripts' ]
      // },
      jade: {
        files: 'src/pages/**/*.jade',
        tasks: [ 'jade' ]
      },
      copy: {
        files: 'src/images/**/*.*',
        tasks: [ 'copy' ]
      }
    },

  });

  grunt.loadTasks['tasks'];
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default',['build']);

  // define the tasks
  grunt.registerTask(
    'build', 
    'Compiles all of the assets and copies the files to the public directory.', 
    [ 'clean', 'jade', 'sass', 'copy' ]
  );

}
