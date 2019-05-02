const
	gulp = require('gulp'),
	gconcat = require('gulp-concat'),
	gplumber = require('gulp-plumber'),
	gsass = require('gulp-sass'),
	gprefix = require('gulp-autoprefixer'),
	guglify = require('gulp-uglify'),
	gorder = require('gulp-order'),
	gimagemin = require('gulp-imagemin'),
	gbabel = require('gulp-babel'),
	gdeploy = require('gulp-gh-pages-will'),
	cp = require('child_process')

let
	bundleCommand = 'bundle',
	jekyllOption = ['exec', 'jekyll', 'build']

const app = {
	sass: {
		main: 'src/sass/main.scss',
    src: 'src/sass/**/*.scss',
    dest: 'assets/css/'
	},
  script: {
    src: 'src/js/**/*.js',
    dest: 'assets/js/',
    order: [
			"src/js/vendor/jquery.js",
			"src/js/vendor/**/*.js",
			"src/js/**/*.js"
    ]
  },
	imagemin: {
		src: 'src/img/**/*.{jpg,jpeg,png,gif}',
		dest: 'assets/img/'
	},
	jekyll: {
		src: ['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*', '_config.yml']
	}
}

const jekyll = done => {
	return cp.spawn(bundleCommand, jekyllOption, {stdio: 'inherit'}).on('close', done)
}

const jekyllRebuild = () => {
	jekyllOption = ['exec', 'jekyll', 'build']
	return jekyll
}

const sass = () => {
  return gulp.src(app.sass.main)
  .pipe(gplumber())
  .pipe(gsass({outputStyle: 'compressed'}))
	.pipe(gprefix())
  .pipe(gulp.dest(app.sass.dest))
}

const script = () => {
	return gulp.src(app.script.src, { sourcemaps: true })
		.pipe(gplumber())
		.pipe(gorder(app.script.order, { base: './' }))
		.pipe(gbabel({
			presets: ['@babel/preset-env'],
			ignore: ['src/js/vendor/**/*.js']
		}))
		.pipe(guglify()) // {mangle: true}
  	.pipe(gconcat('main.js'))
  	.pipe(gulp.dest(app.script.dest))
}

const imagemin = () => {
	return gulp.src(app.imagemin.src)
		.pipe(gplumber())
		.pipe(gimagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(app.imagemin.dest))
}

const build = gulp.series(gulp.parallel(sass, script, imagemin), jekyll)

const deploy = () => gulp.src('_site/**/*').pipe(gdeploy({
	branch: 'gh-pages',
	force: true
}))

const watch = () => {
	jekyllOption = ['exec', 'jekyll', 'server']
	build()
	gulp.watch(app.sass.src, sass)
	gulp.watch(app.script.src, script)
	gulp.watch(app.imagemin.src, imagemin)
	gulp.watch(app.jekyll.src, jekyllRebuild)
}

gulp.task('build', build)
gulp.task('deploy', deploy)
gulp.task('default', watch)
