# VS Code Resume Website

A personal resume website that perfectly mimics the Visual Studio Code interface, built with HTML, CSS, and JavaScript for easy deployment to GitHub Pages.

## Features

- **Authentic VS Code Interface**: Exact replica of VS Code's Dark+ theme with proper colors, fonts, and layout
- **Interactive Navigation**: Click through different resume sections presented as code files
- **Syntax Highlighting**: Each section displays with appropriate programming language formatting:
  - About.md (Markdown)
  - Experience.js (JavaScript)
  - Education.json (JSON)
  - Skills.py (Python)
  - Contact.yml (YAML)
- **Responsive Design**: Works on both desktop and mobile devices
- **Resume Download**: Built-in button to download PDF version
- **GitHub Pages Ready**: No build process required

## Resume Content

The site displays resume information for **Sreehari S**, a Software Engineer with 3+ years of experience:

- **Current Role**: Software Engineer at Itron Inc, Bangalore
- **Previous Role**: Programmer at Cognizant Technology Solutions
- **Education**: Masters in Computer Science from St Joseph's University
- **Skills**: C++, Python, MongoDB, Git, Azure, Docker, and more

## Deployment to GitHub Pages

### Quick Setup

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository named: your-username.github.io
   # Or any name for a project site
   ```

2. **Upload Files**
   - Download the HTML, CSS, and JS files from this project
   - Upload them to your repository root
   - Ensure the main file is named `index.html`

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

4. **Access Your Site**
   - Your site will be live at: `https://your-username.github.io/repository-name`
   - GitHub will provide the exact URL in the Pages settings

### Customization

To customize with your own resume:

1. **Edit Resume Data**: Update the `resumeData` object in `app.js` with your information
2. **Replace PDF**: Update the download link in the download button functionality
3. **Modify Colors**: Adjust CSS variables in `:root` for custom theming
4. **Add Sections**: Extend the file structure by adding new entries to the sidebar

### File Structure

```
├── index.html          # Main HTML file with VS Code layout
├── style.css           # VS Code themed styling (embedded in HTML)
├── app.js             # Resume data and interactivity (embedded in HTML)
└── README.md          # This documentation
```

### Technical Details

- **Framework**: Pure HTML/CSS/JavaScript (no dependencies)
- **Fonts**: Uses Fira Code, Consolas, Menlo, Monaco (monospace fallbacks)
- **Colors**: Exact VS Code Dark+ theme color palette
- **Icons**: Inline SVG icons matching VS Code's iconography
- **Performance**: Optimized for fast loading with embedded assets

### Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

### Local Development

1. Download all files to a local directory
2. Open `index.html` in your browser
3. No server required for basic functionality

### GitHub Pages Limitations

- Static files only (no server-side processing)
- File size limits (100MB per file, 1GB per repository)
- Bandwidth limits (100GB per month)
- Custom domains supported with proper DNS configuration

### Troubleshooting

**Site not loading after deployment:**
- Ensure `index.html` is in the repository root
- Check that GitHub Pages is enabled in repository settings
- Wait 5-10 minutes for deployment to complete

**Styling not appearing:**
- Verify CSS is embedded in HTML or properly linked
- Check browser console for loading errors

**Mobile responsiveness issues:**
- Test on various screen sizes
- Ensure viewport meta tag is present

### Contributing

Feel free to fork this project and submit pull requests for improvements:
- Enhanced mobile responsiveness
- Additional file type support
- New VS Code themes
- Performance optimizations

### License

This project is open source and available under the MIT License.

---

