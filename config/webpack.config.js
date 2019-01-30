
const fs        = require('fs');
const path = require('path');
const webpack = require('webpack');
let _jsFile   = path.join(__dirname, '..','build', 'ai_object_core.js' ); 


module.exports = () => {

  return new Promise((resolve, reject) => {
      var res = {
        entry: {
          ai_object_core: [ _jsFile ] //, _indexFile 
        },
        output: {
          filename: '[name].js',
          path: path.resolve(__dirname, '../dist')
        },
        optimization: {
          // We no not want to minimize our code.
          minimize: false,
          runtimeChunk: true

        //   runtimeChunk: "single", // enable "runtime" chunk
        //   splitChunks: {
        //     minChunks: Infinity,
        //     cacheGroups: {
        //       vendor: {
        //         test: /\.js$/,
        //         name: "ai_object_core",
        //         chunks: "all"
        //       }
        //     }
        //   }

        },
        plugins: [
        ],
        module: {
          rules: [
            {
             test: content => {
                console.log('testing... ' + content );
                return /\.js$/.test( content );
             },
             use: 'imports-loader?this=>self'
          },
          {
              test: content => {
                  console.log('testing2... ' + content );
                  return /\.js$/.test( content );
              },
              use: 'exports-loader?com=com'
          }

          ],

          noParse: content => /\.js$/.test( content )
        }
      };
      resolve( res  );
  });

};