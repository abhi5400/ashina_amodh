# Pre-Launch Testing Checklist - Ashiana Amodh Website

## 🎯 Critical Tests (Must Pass)

### ✅ 1. Forms & EmailJS Integration
- [ ] **Main Contact Form** (`#enquiryForm`)
  - [ ] Form fields accept input
  - [ ] Validation works (required fields)
  - [ ] Submit button visible and clickable
  - [ ] Success message displays after submission
  - [ ] Email received at configured address
  - [ ] No console errors

- [ ] **Popup Enquiry Form** (`#popupEnquiryForm`)
  - [ ] Popup opens when "Enquire" button clicked
  - [ ] All form fields visible and accessible
  - [ ] Submit button visible (not cut off)
  - [ ] Form scrolls if content is long
  - [ ] Success message displays
  - [ ] Email received
  - [ ] Popup closes properly
  - [ ] No console errors

- [ ] **Virtual Tour Form** (`#virtualTourForm`)
  - [ ] Modal opens when "Virtual Tour" clicked
  - [ ] All form fields visible
  - [ ] Submit button visible
  - [ ] Form scrolls properly
  - [ ] Success message displays
  - [ ] Email received
  - [ ] Modal closes properly
  - [ ] No console errors

### ✅ 2. Navigation & Links
- [ ] **Header Navigation**
  - [ ] All navigation links work
  - [ ] Smooth scroll to sections
  - [ ] Mobile menu toggles correctly
  - [ ] "Enquire" button opens popup

- [ ] **Footer Links** (if any)
  - [ ] All links work
  - [ ] External links open correctly

- [ ] **Phone & Email Links**
  - [ ] Phone: `tel:+918619505595` works
  - [ ] Email: `mailto:info@ashianaamodhtalegaon.com` works

### ✅ 3. Responsive Design
- [ ] **Desktop** (1920x1080, 1366x768)
  - [ ] Layout displays correctly
  - [ ] All sections visible
  - [ ] Forms work properly

- [ ] **Tablet** (768px - 1024px)
  - [ ] Layout adapts correctly
  - [ ] Navigation works
  - [ ] Forms are usable

- [ ] **Mobile** (320px - 767px)
  - [ ] Mobile menu works
  - [ ] Forms are touch-friendly
  - [ ] Text is readable
  - [ ] Buttons are clickable
  - [ ] No horizontal scroll

### ✅ 4. Modals & Popups
- [ ] **Enquiry Popup**
  - [ ] Opens smoothly
  - [ ] Closes with X button
  - [ ] Closes on overlay click
  - [ ] Closes with ESC key
  - [ ] No body scroll when open

- [ ] **Virtual Tour Modal**
  - [ ] Opens smoothly
  - [ ] Closes properly
  - [ ] Content scrolls if needed

### ✅ 5. Performance & Loading
- [ ] **Page Load**
  - [ ] Loads within 3 seconds
  - [ ] All images load
  - [ ] Fonts load correctly
  - [ ] No broken images

- [ ] **External Resources**
  - [ ] Font Awesome icons load
  - [ ] Google Fonts load
  - [ ] EmailJS script loads

### ✅ 6. Browser Compatibility
- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

### ✅ 7. Accessibility
- [ ] **Keyboard Navigation**
  - [ ] Tab through all interactive elements
  - [ ] Forms can be filled with keyboard
  - [ ] Modals can be closed with ESC

- [ ] **Screen Reader**
  - [ ] Alt text on images
  - [ ] ARIA labels present
  - [ ] Form labels associated

### ✅ 8. Console & Errors
- [ ] **Browser Console**
  - [ ] No JavaScript errors
  - [ ] No CSS errors
  - [ ] No 404 errors
  - [ ] No CORS errors

- [ ] **Network Tab**
  - [ ] All resources load (200 status)
  - [ ] No failed requests

### ✅ 9. EmailJS Configuration
- [ ] **Credentials**
  - [ ] Public Key: `-veGxRxhZnZ2ZlRwb` ✅
  - [ ] Service ID: `service_lhjovfi` ✅
  - [ ] Template ID: `template_skd98tq` ✅

- [ ] **Email Delivery**
  - [ ] Emails sent to correct address
  - [ ] All form data included
  - [ ] Email formatting correct

### ✅ 10. Content & Copy
- [ ] **Text Content**
  - [ ] No typos
  - [ ] Contact information correct
  - [ ] Email addresses correct: `info@ashianaamodhtalegaon.com`
  - [ ] Phone number correct: `+91 861 950 5595`

- [ ] **Images**
  - [ ] All images display
  - [ ] Logo displays correctly
  - [ ] No broken image links

## 🔍 Detailed Testing Steps

### Test 1: Main Contact Form
1. Scroll to Contact section
2. Fill all required fields
3. Submit form
4. Check console for success message
5. Verify email received
6. Check form resets

### Test 2: Popup Enquiry Form
1. Click "Enquire" button in header
2. Verify popup opens
3. Fill form fields
4. Scroll to verify submit button visible
5. Submit form
6. Verify success message
7. Close popup
8. Verify email received

### Test 3: Virtual Tour Form
1. Click "Virtual Tour" button
2. Verify modal opens
3. Fill form
4. Verify submit button visible
5. Submit form
6. Verify success message
7. Close modal
8. Verify email received

### Test 4: Mobile Responsiveness
1. Open DevTools → Toggle device toolbar
2. Test at 375px (iPhone)
3. Test at 768px (Tablet)
4. Test at 1920px (Desktop)
5. Verify all forms work at each size

### Test 5: Cross-Browser
1. Test in Chrome
2. Test in Firefox
3. Test in Safari (if available)
4. Test in Edge
5. Verify consistent behavior

## 🐛 Known Issues to Verify Fixed
- [ ] Submit buttons visible in all forms ✅
- [ ] Forms scroll properly ✅
- [ ] Email addresses updated ✅
- [ ] EmailJS configured correctly ✅
- [ ] No scrollbar issues ✅

## 📝 Notes
- Test with real email addresses
- Check spam folder for test emails
- Verify EmailJS dashboard shows successful sends
- Test on actual mobile device if possible

## ✅ Sign-Off
- [ ] All critical tests passed
- [ ] No blocking issues
- [ ] Ready for production

**Tested by:** _______________  
**Date:** _______________  
**Browser/Device:** _______________
