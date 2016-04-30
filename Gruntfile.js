module.exports=function(grunt){
    var sassStyle='expanded';
    grunt.initConfig({
       pkg:grunt.file.readJSON('package.json'),
        sass: {
            output: {
                options: {
                    style: sassStyle
                },
                files: {
                    './css/style.css': './css/style.scss'
                }
            }
        },
        watch:{
            sass:{
                files:['./css/style.scss'],
                tasks:['sass']
            },
            livereload:{
                options:{
                    livereload:'<%=connect.options.livereload%>'
                },
                files:[
                    'index.html',
                    './css/style.css'
                ]
            }
        },
        connect:{
            options:{
                port:9000,
                open:true,
                livereload:35729,
                hostname:'localhost'
            },
            server:{
                options:{
                    port:9001,
                    base:'./'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('outputcss',['sass']);
    grunt.registerTask('watchit',['sass','connect','watch']);
};