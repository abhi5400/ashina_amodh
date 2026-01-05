document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.cp-nav nav');
  
  if (mobileMenuToggle && nav) {
    // Ensure initial state
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      if (!icon.classList.contains('fa-bars')) {
        icon.classList.add('fa-bars');
      }
    }
    
    // Toggle menu function
    const toggleMenu = function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      console.log('Burger button clicked!'); // Debug log
      
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      
      console.log('Current state:', isExpanded, 'New state:', newState); // Debug log
      
      // Toggle menu
      if (newState) {
        nav.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Menu opened - active class added');
        console.log('Nav classes:', nav.className);
        
        // Force visibility
        nav.style.display = 'block';
        nav.style.visibility = 'visible';
        nav.style.opacity = '1';
        nav.style.maxHeight = '600px';
        nav.style.padding = '1rem 0';
        
        // Check computed styles
        setTimeout(() => {
          const navStyles = window.getComputedStyle(nav);
          console.log('Nav display:', navStyles.display);
          console.log('Nav visibility:', navStyles.visibility);
          console.log('Nav opacity:', navStyles.opacity);
          console.log('Nav max-height:', navStyles.maxHeight);
          console.log('Nav position:', navStyles.position);
          console.log('Nav z-index:', navStyles.zIndex);
        }, 50);
      } else {
        nav.classList.remove('active');
        document.body.style.overflow = '';
        nav.style.display = '';
        nav.style.visibility = '';
        nav.style.opacity = '';
        nav.style.maxHeight = '';
        nav.style.padding = '';
        console.log('Menu closed - active class removed');
      }
      
      // Update aria attribute
      mobileMenuToggle.setAttribute('aria-expanded', newState);
      
      // Change icon
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (newState) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
          console.log('Icon changed to X'); // Debug log
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
          console.log('Icon changed to hamburger'); // Debug log
        }
      } else {
        console.error('Icon element not found!'); // Debug log
      }
    };
    
    // Add multiple event listeners to ensure it works
    mobileMenuToggle.addEventListener('click', toggleMenu, false);
    mobileMenuToggle.addEventListener('touchend', function(e) {
      e.preventDefault();
      toggleMenu(e);
    }, { passive: false });
    
    // Add visual feedback on button
    mobileMenuToggle.style.transition = 'all 0.3s ease';
    
    // Test if button is visible and clickable (only log on mobile)
    if (window.innerWidth <= 960) {
      console.log('Mobile menu toggle button found:', mobileMenuToggle);
      console.log('Nav element found:', nav);
      console.log('Button display style:', window.getComputedStyle(mobileMenuToggle).display);
      console.log('Button visibility:', window.getComputedStyle(mobileMenuToggle).visibility);
      console.log('Button is ready! Click it to toggle the menu.');
    }
    
    // Add a test click handler to verify it works
    mobileMenuToggle.addEventListener('mousedown', function() {
      console.log('Button mousedown event fired!');
    });
    
    mobileMenuToggle.addEventListener('touchstart', function() {
      console.log('Button touchstart event fired!');
    }, { passive: true });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
    
    // Close menu on window resize if it becomes desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960 && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        nav.style.display = '';
        nav.style.visibility = '';
        nav.style.opacity = '';
        nav.style.maxHeight = '';
        nav.style.padding = '';
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }


  // Featured Slideshow
  const slideshowSlides = document.querySelectorAll('.featured-slideshow .slide');
  const slideshowIndicators = document.querySelectorAll('.featured-slideshow .indicator');
  const prevBtn = document.querySelector('.featured-slideshow .slide-nav.prev');
  const nextBtn = document.querySelector('.featured-slideshow .slide-nav.next');
  let currentSlideIndex = 0;
  let slideshowInterval;

  const showSlide = (index) => {
    slideshowSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
    slideshowIndicators.forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === index);
    });
    currentSlideIndex = index;
  };

  const nextSlide = () => {
    const nextIndex = (currentSlideIndex + 1) % slideshowSlides.length;
    showSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlideIndex - 1 + slideshowSlides.length) % slideshowSlides.length;
    showSlide(prevIndex);
  };

  const startSlideshow = () => {
    slideshowInterval = setInterval(nextSlide, 5000);
  };

  const stopSlideshow = () => {
    clearInterval(slideshowInterval);
  };

  if (slideshowSlides.length > 0) {
    // Initialize first slide
    showSlide(0);
    startSlideshow();

    // Navigation buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
      });
    }

    // Indicator clicks
    slideshowIndicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        stopSlideshow();
        startSlideshow();
      });
    });

    // Pause on hover
    const slideshowContainer = document.querySelector('.featured-slideshow');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', stopSlideshow);
      slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (slideshowContainer && slideshowContainer.getBoundingClientRect().top < window.innerHeight && slideshowContainer.getBoundingClientRect().bottom > 0) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          stopSlideshow();
          startSlideshow();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          stopSlideshow();
          startSlideshow();
        }
      }
    });
  }

  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  smoothLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId !== '#') {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          
          // If link has data-tab-target, switch to that tab after scrolling
          const tabTarget = link.getAttribute('data-tab-target');
          if (tabTarget) {
            setTimeout(() => {
              const targetTabLink = document.querySelector(`[data-tab="${tabTarget}"]`);
              if (targetTabLink) {
                targetTabLink.click();
              }
            }, 500); // Wait for scroll to complete
          }
      }
    }
  });

  // Lightbox functionality for gallery images
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  let currentImageIndex = 0;
  const images = Array.from(galleryItems).map(item => ({
    src: item.dataset.image,
    alt: item.querySelector('img').alt
  }));

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImage.src = images[index].src;
    lightboxImage.alt = images[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImage.src = images[currentImageIndex].src;
    lightboxImage.alt = images[currentImageIndex].alt;
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentImageIndex].src;
    lightboxImage.alt = images[currentImageIndex].alt;
  }

  // Open lightbox when clicking on gallery images
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  // Close lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigation buttons
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });
});

  const toast = document.getElementById('toast');
  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  };

  const form = document.getElementById('enquiryForm');
  const alertBox = document.getElementById('formAlert');

  // Initialize EmailJS - Replace with your Public Key
  if (typeof emailjs !== 'undefined') {
    // Uncomment and add your EmailJS Public Key
    // emailjs.init('YOUR_PUBLIC_KEY');
  }

  const validate = data => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-()\s]{8,20}$/;
    if (!data.name || !data.email || !data.phone || !data.message) {
      return 'Please complete all required fields.';
    }
    if (!emailPattern.test(data.email)) return 'Enter a valid email address.';
    if (!phonePattern.test(data.phone)) return 'Enter a valid phone number.';
    return '';
  };

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    const error = validate(data);
    if (error) {
      alertBox.textContent = error;
      alertBox.style.color = '#c41f24';
      showToast(error);
      return;
    }

    if (typeof emailjs === 'undefined') {
      alertBox.textContent = 'Email service is currently unavailable.';
      alertBox.style.color = '#c41f24';
      showToast('Unable to submit right now.');
      return;
    }

    alertBox.textContent = 'Sending your enquiry...';
    alertBox.style.color = '#666';

    // EmailJS Configuration - Replace with your actual IDs
    const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
    const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID

    // Add timestamp and additional metadata
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    // Prepare template parameters with all form data
    const templateParams = {
      // Form fields
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      contact_time: data.contact_time || 'Not specified',
      property_type: data.property_type || 'Not specified',
      message: data.message,
      
      // Metadata
      submission_date: timestamp,
      project_name: 'Ashiana Amodh - Senior Living',
      source: 'Website Contact Form',
      
      // Formatted email body (for better readability in email)
      email_body: `
NEW ENQUIRY FROM ASHIANA AMODH WEBSITE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Preferred Contact Time: ${data.contact_time || 'Not specified'}

PROPERTY INTEREST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Property Type: ${data.property_type || 'Not specified'}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUBMISSION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted on: ${timestamp}
Source: Website Contact Form
Project: Ashiana Amodh - Senior Living

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim()
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams)
      .then(() => {
        form.reset();
        alertBox.textContent = 'Thank you! Our team will reach out to you shortly.';
        alertBox.style.color = '#2f855a';
        showToast('Enquiry submitted successfully!');
        
        // Log success (for debugging)
        console.log('Form submitted successfully:', data);
      })
      .catch(err => {
        console.error('EmailJS Error:', err);
        alertBox.textContent = 'Something went wrong. Please try again or contact us directly.';
        alertBox.style.color = '#c41f24';
        showToast('Submission failed. Please try again.');
      });
  });

  const newsletter = document.querySelector('.newsletter');
  newsletter?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Thanks for subscribing!');
    newsletter.reset();
  });

  // Popup Modal Functionality
  const enquiryPopup = document.getElementById('enquiryPopup');
  const popupCloseBtn = document.getElementById('popupCloseBtn');
  const popupOverlay = document.querySelector('.popup-overlay');
  const popupForm = document.getElementById('popupEnquiryForm');
  const popupFormAlert = document.getElementById('popupFormAlert');
  const popupSuccessMessage = document.getElementById('popupSuccessMessage');
  const closePopupAfterSuccess = document.getElementById('closePopupAfterSuccess');
  let isFormSubmitted = false;

  // Verify popup exists
  if (!enquiryPopup) {
    console.error('Enquiry popup element not found in DOM!');
  } else {
    console.log('Enquiry popup element found:', enquiryPopup);
  }

  // Open popup function
  const openPopup = () => {
    console.log('Opening popup...', enquiryPopup);
    if (enquiryPopup) {
      enquiryPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
      isFormSubmitted = false;
      // Reset form and show form, hide success message
      if (popupForm) {
        popupForm.reset();
        popupForm.style.display = 'block';
      }
      if (popupSuccessMessage) {
        popupSuccessMessage.style.display = 'none';
      }
      if (popupFormAlert) {
        popupFormAlert.textContent = '';
        popupFormAlert.classList.remove('show');
      }
      // Force display
      enquiryPopup.style.display = 'flex';
      enquiryPopup.style.opacity = '1';
      enquiryPopup.style.visibility = 'visible';
      
      // Focus on first input
      setTimeout(() => {
        const firstInput = popupForm?.querySelector('input[name="name"]');
        if (firstInput) {
          firstInput.focus();
        }
      }, 300);
      
      console.log('Popup opened!');
    } else {
      console.error('Popup element not found!');
    }
  };

  // Close popup function
  const closePopup = () => {
    if (enquiryPopup) {
      // Remove active class to trigger close animation
      enquiryPopup.classList.remove('active');
      
      // Remove all inline styles so CSS can take over
      enquiryPopup.style.display = '';
      enquiryPopup.style.opacity = '';
      enquiryPopup.style.visibility = '';
      
      // Restore body scroll
      document.body.style.overflow = '';
      isFormSubmitted = false;
      
      // Force hide after animation completes
      setTimeout(() => {
        if (!enquiryPopup.classList.contains('active')) {
          enquiryPopup.style.display = 'none';
        }
      }, 350);
    }
  };

  // Open popup on button clicks - using both event listeners and inline handlers for reliability
  const popupTriggers = document.querySelectorAll('[data-open-popup="enquiry"]');
  console.log('Found popup triggers:', popupTriggers.length);
  
  popupTriggers.forEach(trigger => {
    // Remove any existing inline onclick to avoid conflicts
    trigger.removeAttribute('onclick');
    
    trigger.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Popup trigger clicked!');
      openPopup();
    });
  });

  // Make openPopup globally available for inline handlers
  window.openEnquiryPopup = openPopup;

  // Test: Open popup after 500ms for immediate visibility (REMOVE IN PRODUCTION)
  setTimeout(() => {
    console.log('Auto-opening popup for testing...');
    openPopup();
  }, 500);

  // Close popup on close button click
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closePopup();
    });
  }

  // Close popup on overlay click
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closePopup();
    });
  }

  // Prevent clicks inside popup container from closing
  const popupContainer = document.querySelector('.popup-container');
  if (popupContainer) {
    popupContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Close popup on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && enquiryPopup?.classList.contains('active')) {
      e.preventDefault();
      closePopup();
    }
  });

  // Popup form validation
  const validatePopupForm = (data) => {
    if (!data.name || !data.phone) {
      return 'Please complete all required fields.';
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return 'Enter a valid email address.';
    }
    // Validate phone (just the number part, before combining with country code)
    const phoneNumber = data.phone.replace(/[^\d]/g, '');
    if (phoneNumber.length < 8 || phoneNumber.length > 15) {
      return 'Enter a valid phone number.';
    }
    const consentCheckbox = document.getElementById('popupConsent');
    if (!consentCheckbox || !consentCheckbox.checked) {
      return 'Please accept the terms and conditions to continue.';
    }
    return '';
  };

  // Popup form submission
  if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(popupForm);
      const data = Object.fromEntries(formData.entries());
      
      // Validate before combining country code
      const error = validatePopupForm(data);
      if (error) {
        popupFormAlert.textContent = error;
        popupFormAlert.style.color = '#c41f24';
        popupFormAlert.classList.add('show');
        popupFormAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Combine country code with phone number after validation
      const countryCode = data.country_code || '+91';
      const phoneNumber = data.phone || '';
      data.phone = countryCode + ' ' + phoneNumber;

      // Hide alert
      popupFormAlert.classList.remove('show');
      
      // Show success message
      isFormSubmitted = true;
      popupForm.style.display = 'none';
      popupSuccessMessage.style.display = 'block';
      
      // Log form data (for now, will be connected to EmailJS later)
      console.log('Form submitted:', {
        name: data.name,
        email: data.email || 'Not provided',
        phone: data.phone,
        consent: 'Accepted'
      });
      
      // Scroll to success message
      popupSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Close popup after success
  if (closePopupAfterSuccess) {
    closePopupAfterSuccess.addEventListener('click', () => {
      closePopup();
    });
  }

  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    const src = card.dataset.video;
    const isLocal = card.dataset.videoType === 'local';
    let iframe = null;
    let videoElement = null;

    if (isLocal) {
      // Handle local MP4 videos
      videoElement = card.querySelector('video');
      
      const playVideo = () => {
        if (!videoElement) return;
        videoElement.play().catch(err => {
          console.error('Video play failed:', err);
          showToast('Unable to play video. Please try downloading it instead.');
        });
        card.classList.add('playing');
      };

      const pauseVideo = () => {
        if (!videoElement) return;
        videoElement.pause();
        videoElement.currentTime = 0;
        card.classList.remove('playing');
      };

      // Click to play/pause for local videos
      card.addEventListener('click', (e) => {
        e.preventDefault();
        if (card.classList.contains('playing')) {
          pauseVideo();
        } else {
          playVideo();
        }
      });

      // Pause when video ends
      if (videoElement) {
        videoElement.addEventListener('ended', () => {
          card.classList.remove('playing');
        });
      }
    } else {
      // Handle YouTube embeds
      const startPreview = () => {
        if (!src || iframe) return;
        iframe = document.createElement('iframe');
        iframe.src = `${src}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1`;
        iframe.allow = 'autoplay; encrypted-media';
        iframe.setAttribute('title', 'Ashiana Amodh video preview');
        card.appendChild(iframe);
        card.classList.add('playing');
      };

      const stopPreview = () => {
        if (!iframe) return;
        iframe.remove();
        iframe = null;
        card.classList.remove('playing');
      };

      card.addEventListener('mouseenter', startPreview);
      card.addEventListener('mouseleave', stopPreview);
      card.addEventListener('focus', startPreview);
      card.addEventListener('blur', stopPreview);
    }
  });

  // Tab switching functionality
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const tabNavItems = document.querySelectorAll('.tab-nav li');

  tabLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetTab = link.getAttribute('data-tab');
      
      // Remove active class from all tabs and panes
      tabNavItems.forEach(item => item.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding pane
      link.closest('li').classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Parallax scroll effect for Project Details section
  const projectSection = document.querySelector('.cp-project-details');
  const projectContent = document.querySelector('.project-content');
  const projectBg = document.querySelector('.project-bg');

  if (projectSection && projectContent && projectBg) {
    let ticking = false;

    const updateParallax = () => {
      const rect = projectSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollY = window.scrollY || window.pageYOffset;
      
      // Only apply parallax when section is in viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        
        // Background moves slower (parallax effect) - creates depth
        const bgTranslateY = scrollProgress * -100; // Negative to move up as we scroll down
        projectBg.style.transform = `translateY(${bgTranslateY}px)`;
        
        // Content moves up/down at different speed
        const contentTranslateY = (scrollProgress - 0.5) * 40; // Moves content up/down
        projectContent.style.transform = `translateY(${contentTranslateY}px)`;
      } else {
        // Reset when out of viewport
        projectBg.style.transform = 'translateY(0)';
        projectContent.style.transform = 'translateY(0)';
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    updateParallax(); // Initial call
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const sections = document.querySelectorAll('main > section');
  const cards = document.querySelectorAll('.home-card, .amenity-card, .cp-info-panels .panel, .cp-callouts article, .cp-awards .award-grid article, .cp-legal article, .cp-testimonials blockquote, .cp-gallery .download-card');
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });
});
