# Git Commands Cheat Sheet

```bash
git clone <repo>
```
Clones the repository to your local machine.

```bash
git add .
```
Adds all files in the directory to the staging area.

```bash
git add <file names>
```
Adds specific files to the staging area.

```bash
git commit -m "Message"
```
Commits the staged files with a message.

```bash
git push origin <branch name>
```
Pushes the committed changes to the remote branch.

```bash
git pull
```
Synchronizes all local branches with the remote repository.

```bash
git pull origin <branch name>
```
Synchronizes the local branch with the remote branch.

```bash
git log
```
Shows the log history of commits.

```bash
git checkout -b <new branch name>
```
Creates and switches to a new branch.

```bash
git checkout <branch name>
```
Switches to an existing branch.

```bash
git status
```
Shows the current branch, staged files, and changes from the main branch.

```bash
git stash
```
Reverts current changes to the most recent pull while saving your work.

```bash
git reset
```
Reverts to the remote state without saving your work.

```bash
git diff
```
Compares files between the remote and local repository.