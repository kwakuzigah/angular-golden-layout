import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  entry: './dist/index.js',
  dest: './bundles/angular-golden-layout.umd.js',
  sourceMap: true,
  plugins: [
    sourcemaps()
  ],
  format: 'umd',
  // Global namespace.
  moduleName: 'ng.angular-golden-layout',
  // External libraries.
  external: [
    '@angular/core',
    '@angular/common',
    'rxjs/Observable',
    'rxjs/Observer',
    'jquery'
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'jquery': '$'
  },
  onwarn: () => { return }
}