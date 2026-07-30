require('dotenv').config({ path: `${__dirname}/.env` });

const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })

const simpleGit = require("simple-git");
const projectPath = process.cwd();

const git = simpleGit(projectPath);

async function diff() {
    try {
        const diff = await git.diff(["--staged"]);
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "system",
                    content:`
                        You are an expert software engineer that generates concise, one-line Git commit messages based on the provided diffs.
                        Review carefully the provided context and diffs which are about to be committed to a git repo.
                        Generate a one-line commit message for those changes.
                        The commit message should be structured as follows: <type>: <description>
                        Use these for <type>: fix, feat, build, chore, ci, docs, style, refactor, test.

                        Ensure the commit message:
                        - Is in the imperative mood (e.g., "add feature" not "added feature" or "adding feature").
                        - Does not exceed 72 characters.

                        Reply only with the one-line commit message, without any additional text, explanations, or line breaks, dont be vague and reveal context and intention.
                    `
                },
                {
                    role: "user",
                    content: diff
                }
            ]
        })
        const commitMessage = response.choices[0].message.content;
        const commit = await git.commit(commitMessage);
        const log = await git.log();

        console.log(log.latest)
        console.log(`Commit created, push it, or change it with --amend`);
    } catch(err) {
        console.log("Operation failed", err.message)
    }
}

diff();