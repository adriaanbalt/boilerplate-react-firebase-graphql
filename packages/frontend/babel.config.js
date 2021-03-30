module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						assets: "./assets",
						components: "./src/components",
						lib: "./src/lib",
						constants: "./src/constants",
						configs: "./src/configs",
						contexts: "./src/contexts",
						enums: "./src/enums",
					},
				},
			],
		],
	};
};
