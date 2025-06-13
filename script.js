document.addEventListener("DOMContentLoaded", () => {
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
    if (window.scrollY > 50) {
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

  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute("data-level")
        entry.target.style.width = `${level}%`
      }
    })
  }, observerOptions)

  powerLevels.forEach((level) => {
    observer.observe(level)
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

  // Form submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const message = formData.get("message")

      
      alert(
        `Thanks ${name}! Your message has been received and added to our log pose. We'll navigate to your inbox at ${email} soon! Yohohoho!`,
      )

      contactForm.reset()
    })
  }

  document.getElementById("current-year").textContent = new Date().getFullYear()
})
