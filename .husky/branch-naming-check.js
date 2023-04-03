const execSync = require("child_process").execSync;

// Modify the regular expression to match your desired branch naming pattern
const branchNamingPattern = /^(feature|feature-dev|bugfix|release|hotfix)\/[a-z0-9-_]+$/;

function getCurrentBranchName() {
  return execSync("git symbolic-ref --short HEAD", {
    encoding: "utf-8",
  }).trim();
}

function checkBranchName() {
  const branchName = getCurrentBranchName();

  if (!branchNamingPattern.test(branchName)) {
    console.error(`\nBranch name '${branchName}' doesn't follow the naming convention.`);
    console.error(`Please use a valid branch name (e.g., 'feature/my-feature', 'bugfix/my-bugfix').\n`);
    process.exit(1);
  }
}

checkBranchName();
