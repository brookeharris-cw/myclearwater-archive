/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            'app': 'dist/app',
            'doc-viewer-app': 'dist/app/doc-viewer',
            'browse-app': 'dist/app/browse',
            'search-app': 'dist/app/search',

       // angular bundles
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'primeng': 'npm:primeng',
            'ng2-split-pane': 'npm:ng2-split-pane',
            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            'ng2-dnd': 'npm:ng2-dnd',
            'ngx-dropdown': 'npm:ngx-dropdown',
            'angular2-contextmenu': 'npm:angular2-contextmenu',
            'angular2-bootstrap-switch': 'npm:angular2-bootstrap-switch',

            

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
        'app': {
            defaultExtension: 'js'
        },

        'doc-viewer-app': {
            main: './doc-viewer-main.js',
            defaultExtension: 'js'
        },
        'browse-app': {
            main: './browse-main.js',
            defaultExtension: 'js'
        },
        'search-app':
        {
            main: './search-main.js',
            defaultExtension: 'js'
        },
      
        
           
        'primeng': {

            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'

        },
        'ng2-split-pane':
        {
            main: './lib/ng2-split-pane.js',
            defaultExtension: 'js'
        },
        'ng2-dnd':
        {
            main: './bundles/index.umd.js',
            defaultExtension: 'js'
        },
        'ngx-dropdown': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        'angular2-contextmenu': {
            main: './angular2-contextmenu.js',
            defaultExtension: 'js'
        },
        'angular2-bootstrap-switch': {
            main: './angular2-bootstrap-switch.umd.js',
            defaultExtension: 'js'
        }
        
    }
  });
})(this);
