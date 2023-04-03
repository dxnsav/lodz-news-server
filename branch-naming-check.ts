import { execSync } from 'child_process';

const branchNamingPattern = /^(feature-dev|feature|bugfix|hotfix|release)\/[a-z0-9._-]+$/;

const getCurrentBranchName = (): string => {
  return execSync('git symbolic-ref --short HEAD').toString().trim();
};

const branchName = getCurrentBranchName();
if (!branchNamingPattern.test(branchName)) {
  console.error(
    `Error: Invalid branch name "${branchName}". Branch names should follow the pattern: ${branchNamingPattern.toString()}`,
  );
  process.exit(1);
}
