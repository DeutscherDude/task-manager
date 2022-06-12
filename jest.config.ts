import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.ts"],
    coverageReporters: ["json", "lcov", "text", "clover"],
    setupFiles: [
        'dotenv/config'
    ]
}

export default config;
