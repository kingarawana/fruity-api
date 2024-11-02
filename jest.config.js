module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    },
    testMatch: ['**/__tests__/**/*.test.ts'], // Match your test file structure
};
