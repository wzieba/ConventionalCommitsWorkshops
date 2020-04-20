import {danger, fail} from 'danger'


/*
When using "Squash and merge" strategy on Github there can be 2 scenarios of evaluating squashed commit message:
A) 1 commit in PR
B) More than 1 commit in PR

A) In case of 1 commit we should validate if commit comply with Conventional Commits (as commit message will be used
as a squashed commit message)
B) In case of more than 1 commit we should validate if PR title comply with Conventional Commits (as PR title will be used
as a squashed commit message)
 */

if (danger.github.commits.length == 1) {
    // Validate commit message
    let commitMessage = danger.github.commits[0].commit.message
    if (!validateForConventionalCommitMessage(commitMessage)) {
        fail('Commit message does not follow Conventional Commits rules')
    }
} else {
    // Validate PR title
    let prTitle = danger.github.pr.title

    if (!validateForConventionalCommitMessage(prTitle)) {
        fail('PR title does not follow Conventional Commits rules')
    }
}


function validateForConventionalCommitMessage(message) {
    const regex = /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z ]+\))?: [\w ]+$/;
    return regex.test(String(message).toLowerCase());
}
