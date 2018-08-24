import express from 'express';
import webpack from "webpack";
import hot from 'webpack-hot-middleware';
import dev from 'webpack-dev-middleware';
import config from "../config/webpack.dev.js";
import renderer from './helpers/renderer';

const app = express();
const compiler = webpack(config);

app.use(dev(compiler,config.devServer));
app.use(hot(compiler));
app.use(express.static('public'));

app.get('/',(req, res) => {
    res.send(renderer());
})

app.listen(3000, () => {
    console.log('Listening on prot 3000')
})