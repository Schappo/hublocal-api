#!/usr/bin/env zx

console.log(`
  correct format: <type>[<scope>]: <subject>
  example: feat[home]: add new home page

  type:
    feat: A new feature
    fix: A bug fix
    docs: Documentation only changes 
    style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    refactor: A code change that neither fixes a bug nor adds a feature
    perf: A code change that improves performance
    test: Adding missing tests or correcting existing tests
    build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
    ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
    chore: Other changes that don't modify src or test files
    temp: Temporary commit 
  
  scope:
    Optional, can be anything the scope of the commit change.
    For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...
    In App Development, the scope can be a page name, a module or a component.
  
  subject:
    Briefly describe the change in less than 50 characters. Use the imperative, present tense: "change" not "changed" nor "changes". The first letter should not be capitalized. No dot (.) at the end.
`)
