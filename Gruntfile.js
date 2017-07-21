module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            target: {
                files: {
                    "docs/scripts.js": [
                        "./node_modules/jquery/dist/jquery.js",
                        "./node_modules/jquery.runner/build/jquery.runner.js",
                        "./node_modules/js-cookie/src/js.cookie.js",
                        "src/scripts/app.js",
                        "src/scripts/control.js"
                    ]
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    "docs/styles.css": [
                        "./node_modules/bulma/css/bulma.css",
                        "src/styles/app.css"
                    ]
                }
            }
        },
        copy: {
            assets: {
                expand: true,
                cwd: "src/assets",
                src: "**",
                dest: "docs",
            },
        },
        watch: {
            scripts: {
                files: "src/scripts/*.js",
                tasks: ["uglify"],
                options: {
                    event: ["changed"],
                    reload: true
                },
            },
            styles: {
                files: "src/styles/*.css",
                tasks: ["cssmin"],
                options: {
                    event: ["changed"],
                    reload: true
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("build", ["uglify", "cssmin", "copy"]);

    grunt.registerTask("develop", ["watch"]);

};