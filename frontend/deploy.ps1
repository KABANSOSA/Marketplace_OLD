# Build the project
npm run build

# Create .nojekyll file to prevent GitHub Pages from processing the site
New-Item -Path "out/.nojekyll" -ItemType File -Force

# Initialize git repository if not already initialized
if (-not (Test-Path ".git")) {
    git init
}

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Add GitHub repository as remote if not already added
if (-not (git remote -v | Select-String "origin")) {
    git remote add origin https://github.com/KABANSOSA/Marketplace_OLD.git
}

# Push to gh-pages branch
git push origin gh-pages --force 