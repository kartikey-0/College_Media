# Vercel Deployment Guide - College Media

## Current Status

✅ **Frontend**: Deployed on `college-media.vercel.app`
❌ **Backend**: Not deployed (still in planning phase)
✅ **Mock Data**: Built-in and working

---

## How to Configure Vercel for Immediate Use

### Option 1: With Mock Data (RECOMMENDED - Works NOW) ✅

The app has built-in mock data for all features. No backend needed!

#### Step 1: Vercel Environment Variables

1. Go to **Vercel Dashboard** → college-media project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
VITE_ENABLE_MOCK_DATA = true
VITE_ENV = production
VITE_API_BASE_URL = https://college-media.vercel.app/api
```

4. Click **Save**
5. Deploy: Click the three dots on latest deployment → **Redeploy**

That's it! The app will now use mock data and work perfectly.

---

### Option 2: With a Real Backend (When Ready)

Once you have a backend deployed:

1. Replace `VITE_API_BASE_URL` with your actual backend URL:
   ```
   VITE_API_BASE_URL = https://your-backend-api.com/api
   ```

2. Set:
   ```
   VITE_ENABLE_MOCK_DATA = false
   ```

3. Redeploy

---

## Current Mock Data Features

All these features work with mock data:

- ✅ User registration & login
- ✅ Create, edit, delete posts
- ✅ Like & comment on posts
- ✅ User profiles & bios
- ✅ Follow/Unfollow users
- ✅ Search functionality
- ✅ Messaging/chat
- ✅ Notifications
- ✅ Dark/Light mode
- ✅ All pages and navigation

---

## Vercel Build Settings

The project is already configured correctly:

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Node.js Version:**
```
20.x (Alpine)
```

---

## Deployment Steps (Quick Start)

### 1. First-Time Setup

```bash
# 1. Push to GitHub
git add .
git commit -m "fix: Update environment variables for production"
git push

# 2. Go to Vercel: https://vercel.com
# 3. Click "New Project"
# 4. Select the College_Media GitHub repository
# 5. Import Project
```

### 2. Configure Environment Variables

In Vercel Dashboard:
- Go to Settings → Environment Variables
- Add the variables (see above)
- Select all environments: Production, Preview, Development

### 3. Deploy

```
Automatic: Push to main branch will trigger deployment
Manual: Vercel Dashboard → Deployments → Redeploy
```

---

## How to Debug on Vercel

### Check Build Logs
1. Vercel Dashboard → Deployments
2. Click the latest deployment
3. Click **"View Function Logs"** or **"View Build Logs"**

### Check Runtime Logs
1. Open your app: college-media.vercel.app
2. Open DevTools (F12)
3. Check Console tab for errors
4. Check Network tab to see API calls

### Check if Mock Data is Enabled

Open browser console and run:
```javascript
console.log(import.meta.env.VITE_ENABLE_MOCK_DATA)
```

Should return: `true`

---

## Troubleshooting

### "Module not found" error

**Cause**: Build failed because of import issues

**Fix**:
1. Run locally: `npm run build`
2. Check the error message
3. Fix the import
4. Commit and push to GitHub

### App loads but no data shows

**Cause**: Mock data is not enabled or API is unreachable

**Fix**:
1. Check Vercel environment variable: `VITE_ENABLE_MOCK_DATA=true`
2. Redeploy the project
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### CORS errors in console

**Cause**: App trying to reach backend that doesn't exist

**Fix**:
1. Set `VITE_ENABLE_MOCK_DATA=true` in Vercel
2. Verify `VITE_API_BASE_URL` is not trying to reach localhost
3. Redeploy

### Slow build time

**Cause**: Building 2680 modules takes time

**Solution**:
- First build: ~1-2 minutes (normal)
- Subsequent builds: ~30-60 seconds
- This is normal and expected

---

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_ENV` | `production` | Environment mode |
| `VITE_ENABLE_MOCK_DATA` | `true` | Use mock data instead of API |
| `VITE_API_BASE_URL` | `https://college-media.vercel.app/api` | API endpoint (optional if using mock) |
| `VITE_APP_NAME` | `College Media` | App display name |
| `VITE_DEBUG_MODE` | `false` | Debug logging (set to true for debugging) |

---

## Testing the Deployment

### After deployment, test these features:

1. **Homepage**
   - Load the feed
   - Should see mock posts

2. **Authentication**
   - Try login/signup
   - Check if data persists

3. **Create Post**
   - Create a new post
   - Verify it shows in feed

4. **Search**
   - Search for users/posts
   - Should return mock results

5. **Profile**
   - View user profiles
   - Edit profile
   - Follow/Unfollow

6. **Responsive**
   - Open on mobile
   - Check layouts

---

## Next Steps (When Backend is Ready)

1. Deploy your Node.js backend (Vercel, Railway, Render, etc.)
2. Get the backend API URL
3. Update `VITE_API_BASE_URL` in Vercel environment variables
4. Set `VITE_ENABLE_MOCK_DATA=false`
5. Redeploy
6. App will now use real backend API

---

## Vercel Project Links

- **Frontend**: https://college-media.vercel.app
- **Dashboard**: https://vercel.com/dashboard
- **Project Settings**: https://vercel.com/projects/college-media/settings

---

## Support

For issues or questions:
1. Check Vercel build logs
2. Check browser console errors
3. Verify environment variables are set
4. Try redeploy

---

**Status: ✅ App is ready for production with mock data!**
