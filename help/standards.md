# All the Rules to be Followed and Implemented During This Project

## **Code Rules**

1. Maintain code readability and modularity.
1. Clear comments throughout the code.
1. No needless comments (example: `x++ // increments x by 1`).
1. All functions written by us must be documented with a docstring.
1. Consistent Naming Conventions:
   - `camelCase`: for variables and functions.
   - `UPPER_SNAKE_CASE`: for constants.
   - `PascalCase`: for class names.
1. Test all changes (a protocol for testing will be made later).
1. Avoid hard coding, we will use config files.
1. Maintain security, all sensitive data like API keys or passwords will be saved in a password file.
1. Maintain OCP (Open/Closed Principle) that we have learned.
1. Error handling: any external functions that return errors must be encapsulated with a handle.
1. Detailed error messages.

## **GitHub Rules**

- No changes on main, all code will be done on a branch then pulled.
- No push to main, always make a pull request and don't merge.
- When making a pull request, set the project leader as the assignee.
- A change or addition must pass all tests before going on to main.
- Follow repo structure: `src/`, `tests/`, `docs/`, `assets/`.
- Use `.gitignore` to exclude unnecessary files.
- Branch naming:
  - `feature-featureName-branch`
  - `bugfix-bugName-branch`
- Commit messages must be detailed and explain changes that have been made: `<type>(<scope>): <description>`.
- Use issues to track bugs and features.
- Whenever implementing a new feature or fix, pull from main to have the latest version.
- Nested branching is allowed, pull request the final version.
- When commiting add version number.

## **Workflow**

1. Start an issue.
2. Create a feature or bugfix branch.
3. Implement and test.
4. Push and create a PR.
5. Code review.
6. Merge to main.
