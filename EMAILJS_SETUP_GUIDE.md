# EmailJS Setup Guide for Form Submissions

## Overview
The contact form is configured to send all submission details via email using EmailJS. All form fields and metadata will be included in the email.

## Form Fields Included in Email

The following information will be sent in each email:

### Required Fields:
- **Full Name** - Customer's full name
- **Email** - Customer's email address
- **Phone** - Customer's phone number
- **Message** - Customer's message/requirements

### Optional Fields:
- **Preferred Contact Time** - When customer prefers to be contacted
- **Property Type Interest** - 1 BHK, 2 BHK, 3 BHK, or Not sure

### Automatic Metadata:
- **Submission Date & Time** - Timestamp of form submission
- **Project Name** - "Ashiana Amodh - Senior Living"
- **Source** - "Website Contact Form"

## EmailJS Setup Steps

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Enquiry from Ashiana Amodh Website - {{from_name}}
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #c41f24; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .section { margin: 20px 0; padding: 15px; background: white; border-left: 4px solid #c41f24; }
    .label { font-weight: bold; color: #c41f24; }
    .footer { padding: 15px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Enquiry from Ashiana Amodh Website</h2>
  </div>
  
  <div class="content">
    <div class="section">
      <h3>Contact Details</h3>
      <p><span class="label">Name:</span> {{from_name}}</p>
      <p><span class="label">Email:</span> {{from_email}}</p>
      <p><span class="label">Phone:</span> {{phone}}</p>
      <p><span class="label">Preferred Contact Time:</span> {{contact_time}}</p>
    </div>
    
    <div class="section">
      <h3>Property Interest</h3>
      <p><span class="label">Property Type:</span> {{property_type}}</p>
    </div>
    
    <div class="section">
      <h3>Message</h3>
      <p>{{message}}</p>
    </div>
    
    <div class="section">
      <h3>Submission Details</h3>
      <p><span class="label">Submitted on:</span> {{submission_date}}</p>
      <p><span class="label">Source:</span> {{source}}</p>
      <p><span class="label">Project:</span> {{project_name}}</p>
    </div>
  </div>
  
  <div class="footer">
    <p>This is an automated email from Ashiana Amodh website contact form.</p>
  </div>
</body>
</html>
```

**Or use Plain Text version:**
```
NEW ENQUIRY FROM ASHIANA AMODH WEBSITE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Preferred Contact Time: {{contact_time}}

PROPERTY INTEREST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Property Type: {{property_type}}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUBMISSION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted on: {{submission_date}}
Source: {{source}}
Project: {{project_name}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

4. **Copy the Template ID** (you'll need this)

### Step 4: Get Public Key
1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key**
3. Copy it

### Step 5: Update Code
Open `script.js` and update these values:

```javascript
// Line 372: Uncomment and add your Public Key
emailjs.init('YOUR_PUBLIC_KEY_HERE');

// Line 407: Add your Service ID
const serviceId = 'YOUR_SERVICE_ID_HERE';

// Line 408: Add your Template ID
const templateId = 'YOUR_TEMPLATE_ID_HERE';
```

## Email Template Variables

The following variables are available in your EmailJS template:

- `{{from_name}}` - Customer's full name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone number
- `{{contact_time}}` - Preferred contact time
- `{{property_type}}` - Property type interest
- `{{message}}` - Customer's message
- `{{submission_date}}` - Submission timestamp
- `{{project_name}}` - "Ashiana Amodh - Senior Living"
- `{{source}}` - "Website Contact Form"
- `{{email_body}}` - Complete formatted email body (plain text)

## Testing

1. Fill out the form on your website
2. Submit the form
3. Check your email inbox
4. Verify all fields are included correctly

## Troubleshooting

### Form not sending emails?
- Check browser console for errors
- Verify EmailJS Public Key is initialized
- Verify Service ID and Template ID are correct
- Check EmailJS dashboard for error logs

### Missing fields in email?
- Ensure all template variables match the variable names in script.js
- Check EmailJS template has all variables included

### Rate limiting?
- Free EmailJS accounts allow 200 emails/month
- Upgrade to paid plan for more emails

## Support

For EmailJS support: https://www.emailjs.com/docs/
For code issues: Check browser console for JavaScript errors

