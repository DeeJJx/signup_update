const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// SWAP ${APPNAME} FOR 'APPNAME' to preview order success from react
const createNextApp = (appName, uniqueId) => {  

  try {
    // Step 1: Create the app using create-next-app
    console.log('Creating a new next app...');
    const appPath = path.join(process.cwd(), appName);
    const uniqueId = '643e704577ba2c459fdd2a8b'; // Replace with your actual unique ID
    execSync(`npx create-next-app --example https://github.com/DeeJJx/landscape-starter ${appName} --unique-id=${uniqueId}`, { stdio: 'inherit', cwd: process.cwd() });

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

    // Step 5: Move the app folder three parent directories higher - into twenny parent, maybe need 4 directories higher for server
    const grandparentPath = path.resolve(__dirname, '../../../');
    const newAppPath = path.join(grandparentPath, appFolderName);
    fs.renameSync(newPath, newAppPath);

    console.log('Next app setup completed.');
    console.log(`To start the app, change directory to new site directory and then run in terminal "npm run dev".`);

    return { success: true, message: 'Next app created successfully' };
  } catch (error) {
    console.error('Error creating Next app:', error.message);
    return { success: false, message: 'Error creating Next app' };
  }
};



module.exports = { createNextApp };