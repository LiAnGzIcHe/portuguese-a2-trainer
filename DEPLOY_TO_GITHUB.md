# Deploy to GitHub Pages

This folder is a clean static build. Deploy it from the repository root.

## Option A: GitHub web upload

1. Create a new public repository on GitHub.
2. Upload all files in this folder.
3. Go to Settings -> Pages.
4. Select "Deploy from a branch".
5. Choose `master` or `main` and `/root`.
6. Open the generated Pages URL on your phone.

## Option B: Git remote

```powershell
git remote add origin https://github.com/<user>/<repo>.git
git branch -M main
git push -u origin main
```

Then enable Pages from Settings -> Pages -> Deploy from branch -> `main` -> `/root`.
