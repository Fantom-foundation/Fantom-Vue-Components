const devPresets = ['@vue/babel-preset-app'];
const testPresets = [
    [
        '@babel/preset-env',
        {
            targets: {
                node: 'current',
            },
        },
    ],
];
const buildPresets = ['@babel/preset-env'];
const { NODE_ENV } = process.env;

module.exports = {
    presets: NODE_ENV === 'development' ? devPresets : NODE_ENV === 'test' ? testPresets : buildPresets,
};
