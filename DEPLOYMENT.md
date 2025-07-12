# Deployment Guide

## GitHub Pages Deployment

### Step 1: Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "portfolio-website")
5. Make sure it's set to "Public"
6. Do NOT initialize with README (we already have files)
7. Click "Create repository"

### Step 2: Upload Your Files
You have two options:

#### Option A: Using GitHub Web Interface (Easier)
1. On your new repository page, click "uploading an existing file"
2. Drag and drop all your project files OR click "choose your files"
3. Select all files in your project folder:
   - `index.html`
   - `css/style.css`
   - `js/script.js`
   - `assets/` folder (all SVG files)
   - `README.md`
   - `.gitignore`
4. Add a commit message like "Initial portfolio website upload"
5. Click "Commit changes"

#### Option B: Using Git Commands (Advanced)
```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial portfolio website upload"

# Add GitHub repository as remote
git remote add origin https://github.com/yourusername/portfolio-website.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch
6. Select "/ (root)" folder
7. Click "Save"

### Step 4: Access Your Website
- Your website will be available at: `https://yourusername.github.io/repository-name`
- It may take a few minutes for the site to be live
- GitHub will show you the URL in the Pages settings

## Alternative Deployment Options

### Netlify (Recommended for Advanced Features)
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Click "New site from Git"
4. Choose your repository
5. Click "Deploy site"
6. Your site will be live with a custom Netlify URL

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

### Surge.sh (Quick Deployment)
1. Install Surge globally: `npm install -g surge`
2. In your project folder, run: `surge`
3. Follow the prompts to deploy

## Custom Domain Setup (Optional)

### For GitHub Pages:
1. Purchase a domain from a registrar
2. In your repository, create a file named `CNAME`
3. Add your domain name to the file (e.g., `yourname.com`)
4. Configure DNS settings with your registrar:
   - Add CNAME record pointing to `yourusername.github.io`
5. Enable "Enforce HTTPS" in GitHub Pages settings

## Troubleshooting

### Common Issues:
1. **Site not loading**: Check if GitHub Pages is enabled and files are in the main branch
2. **CSS/JS not loading**: Ensure file paths are correct and case-sensitive
3. **404 errors**: Make sure `index.html` is in the root directory
4. **Images not showing**: Check that all image paths are correct

### Performance Tips:
- Images are already optimized as SVG files
- CSS and JS are minified for production
- Use CDN links for external libraries (already implemented)

## Updates and Maintenance

### To update your site:
1. Make changes to your files
2. Upload new files to GitHub (replace existing ones)
3. GitHub Pages will automatically update your site

### Version Control:
- Use meaningful commit messages
- Create branches for major changes
- Use pull requests for collaboration

## Security Considerations

- Never commit sensitive information (API keys, passwords)
- Use environment variables for secrets
- Regularly update dependencies
- Monitor for security vulnerabilities

## Analytics and Monitoring

### Add Google Analytics:
1. Create a Google Analytics account
2. Add the tracking code to your `index.html`
3. Monitor visitor statistics

### Performance Monitoring:
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Optimize images and code as needed

## SEO Optimization

Your portfolio already includes:
- Meta tags for social sharing
- Semantic HTML structure
- Responsive design
- Fast loading times

### Additional SEO tips:
- Add a sitemap.xml
- Submit to Google Search Console
- Use descriptive alt text for images
- Create quality content and keep it updated