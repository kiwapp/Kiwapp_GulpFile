var gulp = require('gulp'),
    concat = require('gulp-concat'),
    streamqueue = require('streamqueue'),
    config = require('../../GulpConfig'),
    wiredep = require('wiredep');

/**
 * Concat your dependencies (js or css)
 */
module.exports = function () {

    var wiredepElements = wiredep({
        bowerJson: require('../../bower.json'),
        directory: "../src/vendor",
        devDependencies: false,
        dependencies: true
    });


    var stream = streamqueue({objectMode: true});
    if (wiredepElements.css && wiredepElements.css.length) {
        stream.queue(
            // The css dependencies
            gulp.src(wiredepElements.css)
                .pipe(concat('vendor.css'))
                .pipe(gulp.dest(config.dist + 'styles'))
        );
    }
    if (wiredepElements.js && wiredepElements.js.length) {
        stream.queue(
            // The js dependencies
            gulp.src(wiredepElements.js)
                .pipe(concat('vendor.min.js', {newLine: ';\n'}))
                .pipe(gulp.dest(config.dist + 'js'))
        );
    }
    

    return stream.done();
};
