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

    pug: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "src/pages",
          src: ["**/*.pug","**/*.jade"],
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
        files: ['src/pages/**/*.pug', 'src/pages/**/*.jade'],
        tasks: [ 'pug' ]
      },
      copy: {
        files: 'src/images/**/*.*',
        tasks: [ 'copy' ]
      }
    },

  });

  grunt.loadTasks['tasks'];
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default',['build']);

  // define the tasks
  grunt.registerTask(
    'build', 
    'Compiles all of the assets and copies the files to the public directory.', 
    [ 'clean', 'pug', 'sass', 'copy' ]
  );

}
