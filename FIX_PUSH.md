# Fix GitHub Push - Large Files Issue

## Problem
The push failed because you're trying to upload 3.03 GiB of data. GitHub has limits on file sizes (100MB per file, and large pushes can timeout).

## Solution: Remove Large Files from Git

### Step 1: Remove large files from Git tracking (but keep them locally)

```powershell
# Navigate to project
cd D:\project\Ashiana-Amoth

# Remove large video files from git (keep local files)
git rm --cached "assets/Amodh CP Booklet/Concept video and Walkthrough/*.mp4"

# Remove large TIF files from git (keep local files)
git rm --cached "assets/Amodh CP Booklet/Amodh Elevations/*.tif"
git rm --cached "assets/Amodh CP Booklet/Amodh Elevations/*.TIF"

# Check what will be removed
git status
```

### Step 2: Commit the removal

```powershell
git add .gitignore
git commit -m "Remove large media files from git tracking"
```

### Step 3: Try pushing again

```powershell
git push origin main
```

## Alternative: If push still fails, use Git LFS for large files

If you need to keep large files in the repo, use Git Large File Storage:

```powershell
# Install Git LFS (if not installed)
# Download from: https://git-lfs.github.com/

# Initialize Git LFS
git lfs install

# Track large files with LFS
git lfs track "*.mp4"
git lfs track "*.tif"
git lfs track "*.TIF"

# Add the .gitattributes file
git add .gitattributes

# Commit
git commit -m "Add Git LFS for large files"
```

## Recommended: Host large files externally

For production websites, it's better to:
- Host videos on YouTube/Vimeo and embed them
- Host large images on a CDN or image hosting service
- Keep only essential, optimized files in the repository

