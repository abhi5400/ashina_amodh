# Update Email Recipient Address in EmailJS

## Current Issue
Emails are being sent to your personal email address, but you want them sent to: **sales@ashianaamodhtalegaon.com**

## Solution
The recipient email address is configured in **EmailJS Service Settings**, not in the code. You need to update it in the EmailJS dashboard.

---

## Step-by-Step Instructions

### Step 1: Go to EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/
2. Log in to your account

### Step 2: Navigate to Email Services
1. Click on **"Email Services"** in the left sidebar
2. Find your service: **`service_lhjovfi`**
3. Click on it to open/edit

### Step 3: Update Recipient Email
1. Look for **"To Email"** or **"Recipient Email"** field
2. Change it from your personal email to: **`sales@ashianaamodhtalegaon.com`**
3. **Save** the changes

### Step 4: Verify Settings
Make sure these settings are correct:
- **Service ID:** `service_lhjovfi` ✅
- **To Email:** `sales@ashianaamodhtalegaon.com` ✅
- **From Email:** Your verified email (this can stay as your personal email)
- **Service Status:** Active ✅

---

## Alternative: Add Multiple Recipients

If you want emails sent to **both** addresses:

### Option 1: Add CC/BCC Recipients
1. In EmailJS Service settings, look for **"CC"** or **"BCC"** fields
2. Add `sales@ashianaamodhtalegaon.com` to BCC
3. This way, both emails receive the lead

### Option 2: Use EmailJS Template Variables
You can also set the recipient in the template itself, but the service-level setting is easier.

---

## Test After Updating

1. **Update the recipient email** in EmailJS dashboard
2. **Submit a test form** on your website
3. **Check** `sales@ashianaamodhtalegaon.com` inbox
4. **Verify** the email was received

---

## Important Notes

- **From Email:** This should remain as your verified email address (the one you used to sign up for EmailJS)
- **To Email:** This is where the lead emails will be sent (change this to `sales@ashianaamodhtalegaon.com`)
- **Email Verification:** Make sure `sales@ashianaamodhtalegaon.com` can receive emails (check spam folder if needed)

---

## If You Can't Find the Setting

1. **Check Service Type:**
   - Gmail: Settings → Forwarding and POP/IMAP
   - Outlook: May have different settings
   - Custom SMTP: Check SMTP settings

2. **Contact EmailJS Support:**
   - If you can't find the recipient email setting
   - They can help configure it correctly

---

## Quick Checklist

- [ ] Logged into EmailJS dashboard
- [ ] Opened Email Service `service_lhjovfi`
- [ ] Updated "To Email" to `sales@ashianaamodhtalegaon.com`
- [ ] Saved changes
- [ ] Tested form submission
- [ ] Verified email received at `sales@ashianaamodhtalegaon.com`

---

Once you update this setting, all future form submissions will be sent to the sales email address! 🎯
