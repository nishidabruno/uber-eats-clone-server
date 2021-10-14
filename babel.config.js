module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current"} }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@entities": "./src/core/entities",
          "@dtos": "./src/core/dtos",
          "@useCases": "./src/core/useCases",
          "@repositories": "./src/core/repositories",
          "@controllers":  "./src/controllers",
          "@middlewares":"./src/middlewares" ,
          "@providers": "./src/core/providers",
          "@utils":  "./src/utils",
          "@errors":"./src/shared/errors",
          "@config": "./src/config",
          "@shared": "./src/shared",
          "@infra":"./src/infra"
        }
      }
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "@babel/plugin-proposal-class-properties",
    "babel-plugin-transform-typescript-metadata",
  ]
}