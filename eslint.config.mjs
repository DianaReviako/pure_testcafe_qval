import globals from "globals";
import pluginTestcafe from "eslint-plugin-testcafe";
import pluginMocha from "eslint-plugin-mocha";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.mocha,
                fixture: "readonly",
                test: "readonly",
                Selector: "readonly",
                t: "readonly"
            },
        },
        plugins: {
            testcafe: pluginTestcafe,
            mocha: pluginMocha,
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "mocha/no-exclusive-tests": "error",
        },
    },
    {
        files: ["tests/**/*.js"], 
        languageOptions: {
            sourceType: "module",
        }
    },
    {
        files: ["run.js"],
        languageOptions: {
            sourceType: "commonjs",
        }
    }
];