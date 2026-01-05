document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.cp-nav nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      nav.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Change icon
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (isExpanded) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        } else {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        }
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
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

  if (typeof emailjs !== 'undefined') {
    // emailjs.init('YOUR_PUBLIC_KEY'); // replace before production
  }

  const validate = data => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-()\s]{8,20}$/;
    if (!data.name || !data.email || !data.phone || !data.message) {
      return 'Please complete all fields.';
    }
    if (!emailPattern.test(data.email)) return 'Enter a valid email.';
    if (!phonePattern.test(data.phone)) return 'Enter a valid phone number.';
    return '';
  };

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
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

    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';

    emailjs.sendForm(serviceId, templateId, form)
      .then(() => {
        form.reset();
        alertBox.textContent = 'Thanks! Our team will reach out shortly.';
        alertBox.style.color = '#2f855a';
        showToast('Enquiry submitted.');
      })
      .catch(err => {
        console.error(err);
        alertBox.textContent = 'Something went wrong. Please try again.';
        alertBox.style.color = '#c41f24';
        showToast('Submission failed.');
      });
  });

  const newsletter = document.querySelector('.newsletter');
  newsletter?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Thanks for subscribing!');
    newsletter.reset();
  });

  // Modal functionality for "Book a Site Visit" button
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      // Redirect to contact form since no modal is defined
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Focus on the form after scrolling
        setTimeout(() => {
          const nameInput = document.querySelector('#enquiryForm input[name="name"]');
          if (nameInput) {
            nameInput.focus();
          }
        }, 500);
      }
    });
  });

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
