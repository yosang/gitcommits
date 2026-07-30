# Project
A node project that uses `openai` to generate a commit message based on the `git diff --stage` of the `pwd` (process working directory), which should be a `git` project.

# Prerequicites
- node v24
- some basic shell knowledge
- some basic git understanding

# Installation
1. Clone the repohttps://platform.openai.com/
2. Cd into it
3. install dependencies with `npm install`
4. copy `.env.example`, rename it to `.env` and add your open ai key in there (currently im just using openai, feel free to change the code if you want to use a different llm service)

## Adding the alias
If using bash, do `vi ~/.bashrc` or `vi ~/.bash_profile` then add `alias mycommit='node /c/Users/yosme/Downloads/gitcommits/index.js'` then do `source ~/.bashrc` - replace my path with your path

# Usage
1. do your typical `git add .` or `git add file` in a git project
2. then run your alias, I'm using `mycommit` as the alias ut you can change this to your liking.
3. what happens next is not magic, just a sequence of steps:
    - prompts AI with your `git diff --staged` report, which returns a beautiful nice little commit message which you dont have to type yourself (isnt that great?)
    - creates a commit with the message generated (just like git commit -m "message")
    - you can now do `git push` or `git log --oneline` to review it and `git commit --amend` to correct it.

Credit for the system prompts goes to [florian's blog](https://blog.florianschroedl.com/notes/aider-custom-prompt/) which is where I found it. I simply created the code around it.

# License
[MIT](https://opensource.org/license/mit)