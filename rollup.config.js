import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

const extensions = ['.js', '.mjs'];
export default {
    // 1. Point d'entrée : où Rollup commence à lire votre code
    input: 'js/script.js',
    // 2. Sortie : le fichier final (bundle)
    output: {
        file: 'dist/bundle.js',
        format: 'iife', // Format enveloppé (IIFE) pour la compatibilité avec IE10
        name: 'app', // Nom de la variable globale si nécessaire
        sourcemap: true,
    },
    // 3. Plugins : l'ordre est important !
    plugins: [
        postcss({
        extract: 'bundle.css', 
        plugins: [
            autoprefixer()
        ],
        sourceMap: true, 
        modules: false 
    }),
    // Cherche les modules dans node_modules (Résout l'erreur core-js)
        resolve({ extensions }),
        // Convertit les modules CommonJS (require) en ES Modules
        commonjs(),
        // Transpilation Babel
        babel({
            extensions,
            babelHelpers: 'bundled',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        // Rollup gère les imports, donc Babel doit le savoir
                        modules: false, 
                        // Polyfills automatiques
                        useBuiltIns: 'usage',
                        corejs: 3,
                    }
                ]
            ],
            // Exclut node_modules pour ne pas transpilier les librairies déjà prêtes
            exclude: 'node_modules/**',
        }),
    ],
};