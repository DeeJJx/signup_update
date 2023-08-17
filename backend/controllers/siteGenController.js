const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");


const createNextApp = (appName) => {
  try {
    // Step 1: Create the app using create-next-app
    console.log('Creating a new next app...');
    const appPath = path.join(process.cwd(), appName);
    execSync(`npx create-next-app ${appName}`, { stdio: 'inherit', cwd: process.cwd() });

    // Step 2: Move the generated app folder to the correct path
    const appFolderName = `${appName}-next-app`;
    const newPath = path.join(process.cwd(), appFolderName);
    fs.renameSync(appPath, newPath);

    // Step 3: Move into the app's folder
    process.chdir(newPath);

    // Step 4: Update the package.json scripts to include a custom start command
    const packageJsonPath = path.join(newPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts.start = 'next-scripts start';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log('Next app setup completed.');
    console.log(`To start the app, run "cd ${appFolderName}" and then "npm run dev".`);

    return { success: true, message: 'Next app created successfully' };
  } catch (error) {
    console.error('Error creating Next app:', error.message);
    return { success: false, message: 'Error creating Next app' };
  }
};


module.exports = { createNextApp };