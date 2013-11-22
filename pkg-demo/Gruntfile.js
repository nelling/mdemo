
module.exports = function(grunt) {
'use strict';
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	//合js
	concat:{
		page1:{
			'src':['src/a.js','src/b.js'],
			'dest':'build/a-b.js'
		},
		page2:{
			'src':['src/c.js','src/d.js'],
			'dest':'build/c-d.js'
		}
	},
	//压缩css
	cssmin:{
		//minify 全部css压缩
		minify: {
				    expand: true,
				    cwd: 'src/',
				    src: ['*.css', '!*.min.css'],
				    dest: 'build/',
				    ext: '.min.css'
				  },
		page1:{
			files:{
				'build/a-min.css':'src/a.css'
			}
		}
	},
	//压缩js
	uglify:{
		build: {
		      files: {
		        'build/a-b.min.js': ['build/a-b.js']
		      }
		}
	},

	//less > css 
	less:{
		page1:{
			options:{
				ieCompat:false,
			},
			files:{
				'src/a.css':'src/a.less'
			}
		}
		
	},
	//kissy 打包
	kmc: {
	    page2:{
	    	options: {
	            packages: [
	                {
	                    name: 'test',
	                    path: 'assets/src',
	                    charset: 'utf-8'//gbk
	                }
	            ]
	        },
	        files: [{
	            src: 'assets/src/test/index.js',
	            dest: 'assets/dist/test/index.combo.js'
	        }]
	    },
	    page1:{
	    	options:{},
	    	files:[{
	    		
	    	}]
	    }
	        
	  }
});
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');//npm install grunt-contrib-less --save-dev
  grunt.loadNpmTasks('grunt-contrib-cssmin');//npm install grunt-contrib-cssmin --save-dev

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', [ 'cssmin','concat', 'uglify']);

  //发布执行：js，css压缩
  grunt.registerTask('publish', [ 'cssmin','uglify']);
};