import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    collectCoverageFrom: ["src/**/*.ts", "!src/**/*jest.config.ts"],
    coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
    setupFiles: [
        'dotenv/config'
    ]
}

export default config;
