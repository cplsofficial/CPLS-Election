# CPLS Election 2026 — Website

Official election portal for the **Capacity Building Professional Development and Leadership Society**, Department of Pharmacy.

---

## Files in this folder

| File | Purpose |
|------|---------|
| `index.html` | Main website page |
| `style.css`  | All styles (navy & gold theme) |
| `app.js`     | Countdown, candidates, voting logic |
| `logo.jpeg`  | CPLS logo (used in header, footer, about) |

---

## How to deploy on GitHub Pages (step-by-step)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### Step 2 — Create a new repository
1. Click the **+** icon → **New repository**
2. Name it: `cpls-election`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload files
1. On your new repository page, click **uploading an existing file**
2. Drag and drop ALL four files:
   - `index.html`
   - `style.css`
   - `app.js`
   - `logo.jpeg`
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repository **Settings** tab
2. Click **Pages** in the left sidebar
3. Under **Branch**, select `main` → `/ (root)`
4. Click **Save**

### Step 5 — Your website is live!
After 1–2 minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/cpls-election/
```

---

## Customizing the website

### Change candidate names & bios
Open `app.js` and edit the `candidates` array at the top:
```js
{ name: 'Ahmed Raza Khan', pos: 'President', bio: 'Your bio here...', initials: 'AR' },
```

### Change election date
In `app.js`, find this line and update the date:
```js
const electionDate = new Date('2026-05-10T09:00:00');
```

### Change timeline dates
Open `index.html` and find the `<!-- TIMELINE -->` section. Edit the `.tl-date` text for each step.

---

## Need help?
Contact the CPLS technical team or your university IT support.
