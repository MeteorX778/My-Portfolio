// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Add animation classes to elements
  const animateElements = [
    { selector: ".section-header", class: "fade-in" },
    { selector: ".about-image", class: "slide-in-left" },
    { selector: ".about-text", class: "slide-in-right" },
    { selector: ".project-card", class: "scale-in" },
    { selector: ".skill-card", class: "rotate-in" },
    { selector: ".blog-card", class: "fade-in" },
    { selector: ".contact-card", class: "slide-in-left" },
    { selector: ".contact-form-container", class: "slide-in-right" },
    { selector: ".certificate-card", class: "fade-in" },
  ]

  animateElements.forEach(({ selector, class: className }) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((el, index) => {
      el.classList.add(className)
      el.style.transitionDelay = `${index * 0.1}s`
      observer.observe(el)
    })
  })

  // Preloader
  setTimeout(() => {
    document.querySelector(".preloader").classList.add("hidden")
  }, 2000)

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Hover effects for links and buttons
  const links = document.querySelectorAll("a, button")
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
      cursor.style.opacity = "0.5"
    })

    link.addEventListener("mouseleave", () => {
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
      cursor.style.opacity = "1"
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navList = document.querySelector(".nav-list")

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    navList.classList.toggle("show")
  })

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      navList.classList.remove("show")
    })
  })

  // Typing effect
  const typingElement = document.querySelector(".typing")
  const phrases = ["Frontend Pirate", "Python Hunter", "Godot Explorer", "FastAPI Captain"]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeText() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 1000 // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before typing next phrase
    }

    setTimeout(typeText, typingSpeed)
  }

  setTimeout(typeText, 1000)

  // Animate skill power levels
  const powerLevels = document.querySelectorAll(".power-level")

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level")
          setTimeout(() => {
            entry.target.style.width = `${level}%`
          }, 300)
        }
      })
    },
    { threshold: 0.5 },
  )

  powerLevels.forEach((level) => {
    skillsObserver.observe(level)
  })

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Certificate Carousel
  const certificates = document.querySelectorAll(".certificate-card")
  const indicators = document.querySelectorAll(".indicator")
  const prevBtn = document.getElementById("prevCert")
  const nextBtn = document.getElementById("nextCert")
  let currentCert = 0

  function showCertificate(index) {
    // Remove all classes
    certificates.forEach((cert, i) => {
      cert.classList.remove("active", "prev", "next")
      indicators[i].classList.remove("active")

      if (i === index) {
        cert.classList.add("active")
        indicators[i].classList.add("active")
      } else if (i === index - 1 || (index === 0 && i === certificates.length - 1)) {
        cert.classList.add("prev")
      } else if (i === index + 1 || (index === certificates.length - 1 && i === 0)) {
        cert.classList.add("next")
      }
    })
  }

  function nextCertificate() {
    currentCert = (currentCert + 1) % certificates.length
    showCertificate(currentCert)
  }

  function prevCertificate() {
    currentCert = (currentCert - 1 + certificates.length) % certificates.length
    showCertificate(currentCert)
  }

  // Event listeners for certificate navigation
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextCertificate)
    prevBtn.addEventListener("click", prevCertificate)

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentCert = index
        showCertificate(currentCert)
      })
    })

    // Auto-advance certificates every 5 seconds
    setInterval(nextCertificate, 5000)

    // Initialize first certificate
    showCertificate(0)
  }

  // Add smooth scrolling for certificate navigation
  document.querySelectorAll('a[href="#certificates"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      document.getElementById("certificates").scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Form submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const message = formData.get("message")

      // Here you would typically send the data to a server
      // For now, we'll just show a One Piece themed success message
      alert(
        `Thanks ${name}! Your message has been received and added to our log pose. We'll navigate to your inbox at ${email} soon! Yohohoho!`,
      )

      // Reset the form
      contactForm.reset()
    })
  }

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Handle touch events for mobile
  document.querySelector(".header").addEventListener("touchstart", () => {
    const glitch = document.querySelector(".glitch")
    glitch.style.opacity = "0.2"
  })

  document.querySelector(".header").addEventListener("touchend", () => {
    const glitch = document.querySelector(".glitch")
    glitch.style.opacity = "1"
  })
})
