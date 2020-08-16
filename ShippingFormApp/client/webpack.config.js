const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports ={
    entry: "./js/shippingFormHandler.js",
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath: ''
    },
    mode:'none',
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader','css-loader'
                ]
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/env'],
                    }
                }
            }
            
        ]
    },
    plugins:[
        new HTMLWebpackPlugin(),
    ]
}