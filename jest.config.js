const config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    testPathIgnorePatterns: ["/node_modules/", "/dist/"],

    clearMocks: true,
};

export default config;
