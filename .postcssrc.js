// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'postcss-pxtorem': {
      rootValue: 100, //结果为：比如元素宽1920px,最终页面会换算成 19.2rem
      propList: ['*']
    }
  }
}
