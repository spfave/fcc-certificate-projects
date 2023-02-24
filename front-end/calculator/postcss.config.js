import postcssPresetEnv from 'postcss-preset-env';
import colorFunction from 'postcss-color-function';

export default {
	plugins: [postcssPresetEnv({stage: 1}), colorFunction()],
};
