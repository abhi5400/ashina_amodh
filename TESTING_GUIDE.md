# Testing EmailJS Forms - Step by Step Guide

## ✅ Prerequisites Checklist

Before testing, make sure:

1. **Template ID Updated** - Check `script.js` and replace `template_ashiana_amodh` with your actual EmailJS Template ID (if different)
2. **EmailJS Script Loaded** - The EmailJS script should be loaded in your HTML
3. **Service Connected** - Your EmailJS service is connected to your email account

---

## 🧪 Testing Steps

### Step 1: Open Your Website
1. Open `index.html` in your browser (or deploy it to a server)
2. Open Browser Developer Tools:
   - **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I`
   - **Firefox**: Press `F12` or `Ctrl+Shift+K`
   - **Safari**: Press `Cmd+Option+I`
3. Go to the **Console** tab to see any errors

### Step 2: Test Main Contact Form

1. **Scroll to the Contact Section** (or click "Contact" in navigation)
2. **Fill out the form:**
   - Name: `Test User`
   - Email: `test@example.com` (use your own email to receive the test)
   - Phone: `9876543210`
   - Preferred Contact Time: Select any option
   - Property Type: Select any option
   - Message: `This is a test submission from the main contact form`
3. **Click "Submit"**
4. **Check the Console** for any errors
5. **Check your email inbox** (the email address connected to your EmailJS service)

### Step 3: Test Popup Enquiry Form

1. **Click the "Enquire" button** in the header (or any button that opens the popup)
2. **Fill out the popup form:**
   - Name: `Test User 2`
   - Email: `test2@example.com`
   - Phone: `9876543211`
   - Preferred Contact Time: Select any option
   - Property Type: Select any option
   - Message: `This is a test submission from the popup enquiry form`
   - Check the consent checkbox
3. **Click "Submit"**
4. **Check the Console** for any errors
5. **Check your email inbox**

### Step 4: Test Virtual Tour Form

1. **Click the "Virtual Tour" button** (usually in the hero section or home cards)
2. **Fill out the virtual tour form:**
   - Name: `Test User 3`
   - Email: `test3@example.com`
   - Phone: `9876543212`
   - Message: `I would like to schedule a virtual tour`
   - Check the consent checkbox
3. **Click "Submit"**
4. **Check the Console** for any errors
5. **Check your email inbox**

---

## 🔍 What to Check

### ✅ Success Indicators:

1. **Console Messages:**
   - Should see: `Email sent successfully!` or similar success message
   - No red error messages

2. **Form Behavior:**
   - Form should show a success message
   - Form should reset or close (depending on implementation)
   - No page reload

3. **Email Received:**
   - Check your inbox (the email connected to EmailJS service)
   - Email should arrive within 1-2 minutes
   - Email should contain all form fields
   - Email should be properly formatted

### ❌ Common Issues:

#### Issue 1: "EmailJS is not defined"
**Solution:** 
- Make sure EmailJS script is loaded in `index.html`
- Add this before closing `</body>` tag:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

#### Issue 2: "Template not found" or "Invalid template ID"
**Solution:**
- Check your Template ID in EmailJS dashboard
- Update `script.js` with the correct Template ID
- Make sure Template ID matches exactly (case-sensitive)

#### Issue 3: "Service not found" or "Invalid service ID"
**Solution:**
- Verify Service ID: `service_lhjovfi` is correct
- Check EmailJS dashboard → Email Services
- Make sure service is active

#### Issue 4: "Public Key error"
**Solution:**
- Verify Public Key: `-veGxRxhZnZ2ZlRwb` is correct
- Check EmailJS dashboard → Account → General
- Make sure Public Key is copied correctly (no extra spaces)

#### Issue 5: Email not received
**Solution:**
- Check spam/junk folder
- Wait 2-3 minutes (sometimes delayed)
- Check EmailJS dashboard → Logs for delivery status
- Verify email address in EmailJS service settings

#### Issue 6: Form fields missing in email
**Solution:**
- Check EmailJS template variables match exactly:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{phone}}`
  - `{{message}}`
  - `{{contact_time}}`
  - `{{property_type}}`
  - `{{submission_date}}`
  - `{{source}}`
- Verify template has all variables included

---

## 🐛 Debugging Tips

### Enable Detailed Logging

Add this to your browser console before testing:
```javascript
// Enable EmailJS debug mode
localStorage.setItem('emailjs_debug', 'true');
```

### Check EmailJS Status

Run this in browser console:
```javascript
// Check if EmailJS is loaded
console.log('EmailJS loaded:', typeof emailjs !== 'undefined');

// Check initialization
emailjs.init('-veGxRxhZnZ2ZlRwb');
console.log('EmailJS initialized');
```

### Test EmailJS Directly

Test EmailJS connection directly in console:
```javascript
emailjs.send('service_lhjovfi', 'YOUR_TEMPLATE_ID', {
  from_name: 'Test',
  from_email: 'test@example.com',
  phone: '1234567890',
  message: 'Test message',
  submission_date: new Date().toLocaleString(),
  source: 'Manual Test'
})
.then(function(response) {
  console.log('SUCCESS!', response.status, response.text);
}, function(error) {
  console.log('FAILED...', error);
});
```

---

## 📧 EmailJS Dashboard Check

1. **Go to EmailJS Dashboard:** https://dashboard.emailjs.com/
2. **Check Logs:**
   - Go to **Logs** section
   - You should see recent email attempts
   - Green = Success, Red = Failed
   - Click on failed attempts to see error details

3. **Check Template:**
   - Go to **Email Templates**
   - Verify your template exists
   - Check Template ID matches `script.js`

4. **Check Service:**
   - Go to **Email Services**
   - Verify `service_lhjovfi` is active
   - Check connected email address

---

## ✅ Final Checklist

- [ ] All 3 forms tested (Contact, Popup, Virtual Tour)
- [ ] No console errors
- [ ] Emails received successfully
- [ ] All form fields appear in email
- [ ] Email formatting looks correct
- [ ] EmailJS dashboard shows successful sends

---

## 🆘 Still Having Issues?

1. **Check Browser Console** - Look for specific error messages
2. **Check EmailJS Logs** - Dashboard → Logs section
3. **Verify Credentials** - Double-check Service ID, Template ID, Public Key
4. **Test with Simple Template** - Create a minimal template to isolate issues
5. **Check Network Tab** - See if EmailJS API calls are being made

---

## 📝 Notes

- **Free EmailJS Plan:** Limited to 200 emails/month
- **Rate Limiting:** If you hit the limit, wait until next month or upgrade
- **Email Delivery:** Usually instant, but can take up to 5 minutes
- **Template Variables:** Must match exactly (case-sensitive, no extra spaces)

---

Good luck with testing! 🚀
