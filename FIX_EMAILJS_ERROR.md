# Fix EmailJS Error - Step by Step Guide

## 🔍 Current Issue
The form is showing: **"Something went wrong. Please try again or contact us directly."**

This usually means one of these issues:
1. **Template ID doesn't match** (most common)
2. Service ID is incorrect
3. EmailJS not initialized properly
4. Network/CORS issue

---

## ✅ Step 1: Check Your Template ID

**Important:** When you created the template in EmailJS, it gave you a Template ID. This is likely **NOT** `template_ashiana_amodh`.

### How to Find Your Template ID:

1. Go to **EmailJS Dashboard**: https://dashboard.emailjs.com/
2. Click **Email Templates** in the left sidebar
3. Find your template (the one you just created)
4. Click on it to open
5. Look at the URL or the template details - you'll see something like:
   - `template_abc123xyz` 
   - `template_xyz789abc`
   - Or similar format

### Update the Template ID:

Once you have your actual Template ID, I need to update it in `script.js`:

**Current Template ID in code:** `template_ashiana_amodh`

**You need to tell me:** What is your actual Template ID from EmailJS?

---

## ✅ Step 2: Check Browser Console for Detailed Errors

1. **Open your website** in browser
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. **Try submitting the form again**
5. **Look for error messages** - they will now show:
   - Error Status
   - Error Text (this tells you exactly what's wrong)
   - Service ID
   - Template ID

### Common Error Messages:

- **"Template not found"** → Template ID is wrong
- **"Service not found"** → Service ID is wrong  
- **"Invalid public key"** → Public key issue
- **"Rate limit exceeded"** → Too many emails sent (free plan: 200/month)

---

## ✅ Step 3: Verify EmailJS Configuration

### Current Configuration:
- **Public Key:** `-veGxRxhZnZ2ZlRwb` ✅
- **Service ID:** `service_lhjovfi` ✅
- **Template ID:** `template_ashiana_amodh` ❓ (Need to verify)

### Check in EmailJS Dashboard:

1. **Service ID:**
   - Go to **Email Services**
   - Find `service_lhjovfi`
   - Make sure it's **Active** (green status)

2. **Public Key:**
   - Go to **Account** → **General**
   - Verify Public Key matches: `-veGxRxhZnZ2ZlRwb`

3. **Template:**
   - Go to **Email Templates**
   - Verify template exists and is active
   - Copy the exact Template ID

---

## ✅ Step 4: Test Again with Better Error Messages

I've updated the code to show **detailed error messages** in the browser console.

**After you submit the form:**
1. Check the **Console** (F12)
2. Look for messages starting with `❌ EmailJS Error Details:`
3. The error will tell you exactly what's wrong

---

## 🔧 Quick Fix Checklist

- [ ] Found your actual Template ID from EmailJS dashboard
- [ ] Updated Template ID in `script.js` (I can do this if you tell me the ID)
- [ ] Verified Service ID `service_lhjovfi` is active
- [ ] Verified Public Key is correct
- [ ] Checked browser console for detailed errors
- [ ] Tested form submission again

---

## 📝 What I Need From You

**Please provide:**
1. **Your actual Template ID** from EmailJS dashboard
   - It should look like: `template_xxxxxxx`
   
2. **Any error messages** from the browser console
   - Press F12 → Console tab
   - Copy any red error messages

Once I have these, I can fix the issue immediately!

---

## 🆘 Still Not Working?

If you've checked everything above:

1. **Check EmailJS Logs:**
   - Go to EmailJS Dashboard → **Logs**
   - See if there are any failed attempts
   - Click on failed logs to see error details

2. **Test EmailJS Directly:**
   - Open browser console (F12)
   - Run this test command (replace `YOUR_TEMPLATE_ID` with your actual ID):
   ```javascript
   emailjs.send('service_lhjovfi', 'YOUR_TEMPLATE_ID', {
     from_name: 'Test',
     from_email: 'test@example.com',
     phone: '1234567890',
     message: 'Test',
     submission_date: new Date().toLocaleString(),
     source: 'Test'
   })
   .then(response => console.log('Success!', response))
   .catch(err => console.error('Error:', err));
   ```

3. **Check Network Tab:**
   - F12 → Network tab
   - Submit form
   - Look for requests to `api.emailjs.com`
   - Check if they're successful (200) or failed (400/500)

---

## 💡 Most Likely Solution

**99% of the time, the issue is the Template ID.**

The code currently uses: `template_ashiana_amodh`

But EmailJS generates a unique ID like: `template_abc123xyz`

**Just tell me your Template ID and I'll update it!** 🚀
