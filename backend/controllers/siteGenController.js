const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// SWAP ${APPNAME} FOR 'APPNAME' to preview order success from react
const createNextApp = (appName, uniqueId) => {  

  const product = appName.split("-")[0];

  
  console.log(uniqueId)

  try {
    // Step 0: Store the current working directory
    const originalCwd = process.cwd();

    // Step 1: Create the app using create-next-app
    console.log('Creating a new next app...');
    const appPath = path.join(process.cwd(), appName);
    // names ie "landscape" must match "product" to work - currently only got "landscape" starter and NO "landscape" product lmao
    execSync(`npx create-next-app --example https://github.com/DeeJJx/${product}-starter ${appName} --unique-id=${uniqueId}`, { stdio: 'inherit', cwd: process.cwd() });
    // execSync(`npx create-next-app --example https://github.com/DeeJJx/landscape-starter ${appName} --unique-id=${uniqueId}`, { stdio: 'inherit', cwd: process.cwd() });

    // Step 2: Move the generated app folder to the correct path
    const appFolderName = `${appName}-parent-folder`;
    const newPath = path.join(process.cwd(), appFolderName);
    fs.renameSync(appPath, newPath);

    // Step 3: Move into the app's folder
    process.chdir(newPath);

    // Step 5: Create an .env.local file with the MongoDB URI and userID
    const envFilePath = path.join(newPath, '.env.local');
    const mongoDBURI = process.env.DBURI; // Replace with your MongoDB URI

    const envContent = `${mongoDBURI}\nuniqueId=${uniqueId}`;


    fs.writeFileSync(envFilePath, `MONGODB_URI=${envContent}`);

    // Step 6: Update the package.json scripts to include a custom start command
    const packageJsonPath = path.join(newPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.scripts.start = 'next-scripts start';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Step 7: Move the app folder three parent directories higher - into twenny parent, maybe need 4 directories higher for server
    const grandparentPath = path.resolve(__dirname, '../../../');
    const newAppPath = path.join(grandparentPath, appFolderName);
    fs.renameSync(newPath, newAppPath);

    // Step X: Return to the original working directory
    process.chdir(originalCwd);

    console.log('Next app setup completed.');
    console.log(`To start the app, change directory to new site directory and then run in terminal "npm run dev".`);

    return { success: true, message: 'Next app created successfully' };
  } catch (error) {
    console.error('Error creating Next app:', error.message);
    return { success: false, message: 'Error creating Next app' };
  }
};



module.exports = { createNextApp };