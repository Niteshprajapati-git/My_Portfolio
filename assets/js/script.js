'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const profilePhotoOpen = document.querySelector("[data-profile-photo-open]");
  const profilePhotoModal = document.querySelector("[data-profile-photo-modal]");
  const profilePhotoCloseButtons = document.querySelectorAll("[data-profile-photo-close]");

  const closeProfilePhoto = () => {
    profilePhotoModal.classList.remove("active");
    profilePhotoOpen.focus();
  };

  profilePhotoOpen.addEventListener("click", () => {
    profilePhotoModal.classList.add("active");
    profilePhotoModal.querySelector(".profile-photo-close").focus();
  });

  profilePhotoCloseButtons.forEach((button) => {
    button.addEventListener("click", closeProfilePhoto);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && profilePhotoModal.classList.contains("active")) {
      closeProfilePhoto();
    }
  });

  const copyStatusTimers = new WeakMap();
  const copyStatusClearTimers = new WeakMap();

  document.querySelectorAll("[data-copy-value]").forEach((button) => {
    button.addEventListener("click", async () => {
      const status = button.closest(".contact-info").querySelector(".copy-contact-status");

      try {
        await navigator.clipboard.writeText(button.dataset.copyValue);
        status.textContent = `${button.dataset.copyLabel} copied`;
        window.clearTimeout(copyStatusTimers.get(status));
        window.clearTimeout(copyStatusClearTimers.get(status));
        status.classList.add("visible");
        copyStatusTimers.set(status, window.setTimeout(() => {
          status.classList.remove("visible");
          copyStatusClearTimers.set(status, window.setTimeout(() => {
            status.textContent = "";
          }, 250));
        }, 2000));
      } catch (error) {
        window.clearTimeout(copyStatusTimers.get(status));
        window.clearTimeout(copyStatusClearTimers.get(status));
        status.textContent = `Could not copy ${button.dataset.copyLabel.toLowerCase()}. Please copy it manually.`;
        status.classList.add("visible");
      }
    });
  });

  const modalContainer = document.querySelector("[data-portfolio-modal-container]");
  const modalCloseBtn = document.querySelector("[data-portfolio-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalTitle = document.querySelector("[data-portfolio-modal-title]");
  const modalDescription = document.querySelector("[data-portfolio-modal-description]");
  const modalLiveLink = document.querySelector("[data-portfolio-modal-link]");
  const modalSourceLink = document.querySelector("[data-portfolio-modal-source-link]");
  const modalDuration = document.querySelector("[data-portfolio-modal-duration]");
  const modalTools = document.querySelector("[data-portfolio-modal-tools]");
  const modalResponsibilities = document.querySelector("[data-portfolio-modal-responsibilities]");

  // Add event listeners to project items
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Get data attributes from the clicked project
      const title = item.getAttribute("data-title");
      const description = item.getAttribute("data-description");
      const liveLink = item.getAttribute("data-live-link");
      const sourceLink = item.getAttribute("data-source-link");
      const duration = item.getAttribute("data-duration");
      const tools = item.getAttribute("data-tools");
      const responsibilities = item.getAttribute("data-responsibilities");

      // Populate modal content
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalLiveLink.href = liveLink;
      modalSourceLink.href = sourceLink;
      modalDuration.innerHTML = `<strong>Duration:</strong> ${duration || "Not available"}`;
      modalTools.innerHTML = `<strong>Tools:</strong> ${tools || "Not available"}`;

      // Populate responsibilities
      modalResponsibilities.innerHTML = ""; // Clear previous responsibilities
      if (responsibilities) {
        responsibilities.split("|").forEach((responsibility) => {
          const li = document.createElement("li");
          li.textContent = responsibility.trim();
          modalResponsibilities.appendChild(li);
        });
      }

      // Show modal
      modalContainer.classList.add("active");
      
      
    });
  });

  // Close modal
  const closeModal = () => {
    modalContainer.classList.remove("active");
    
  };

  modalCloseBtn.addEventListener("click", closeModal);
  
});

document.addEventListener("DOMContentLoaded", () => {
  const blogModal = document.querySelector("[data-blog-modal-container]");
  const blogModalOverlay = document.querySelector("[data-blog-modal-overlay]");
  const blogModalClose = document.querySelector("[data-blog-modal-close]");
  const blogModalCategory = document.querySelector("[data-blog-modal-category]");
  const blogModalDate = document.querySelector("[data-blog-modal-date]");
  const blogModalTitle = document.querySelector("[data-blog-modal-title]");
  const blogModalContent = document.querySelector("[data-blog-modal-content]");

  const closeBlogModal = () => blogModal.classList.remove("active");

  document.querySelectorAll("[data-blog-item]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const post = link.closest(".blog-post-item");
      const title = post.querySelector(".blog-item-title").textContent.trim();
      const category = post.querySelector(".blog-category").textContent.trim();
      const date = post.querySelector("time");
      const summary = post.querySelector(".blog-text").textContent.trim();
      const details = post.querySelector("[data-blog-details]");

      blogModalTitle.textContent = title;
      blogModalCategory.textContent = category;
      blogModalDate.dateTime = date.dateTime;
      blogModalDate.textContent = date.textContent.trim();
      blogModalContent.replaceChildren();

      if (details) {
        blogModalContent.append(details.content.cloneNode(true));
      } else {
        const paragraph = document.createElement("p");
        paragraph.textContent = summary;
        blogModalContent.append(paragraph);
      }

      blogModal.classList.add("active");
      blogModalClose.focus();
    });
  });

  blogModalClose.addEventListener("click", closeBlogModal);
  blogModalOverlay.addEventListener("click", closeBlogModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && blogModal.classList.contains("active")) {
      closeBlogModal();
    }
  });
});

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("[data-modal-date]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    const testimonialDate = this.querySelector("[data-testimonials-date]");
    modalDate.dateTime = testimonialDate.dateTime;
    modalDate.textContent = testimonialDate.textContent;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");
const formBtnLabel = formBtn.querySelector("span");
const scriptURL = "https://script.google.com/macros/s/AKfycbx77N_pBV0lwBe1fLCE-nBSVfB8DbVhnZP_c-HQHX5gmhD5M8fKUuh70LOQY6x7x5a9Cw/exec";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formBtn.disabled = true;
  formBtnLabel.textContent = "Sending...";
  formStatus.textContent = "";
  formStatus.classList.remove("success", "error");

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: new FormData(form)
    });

    if (!response.ok) {
      throw new Error(`Form submission failed with status ${response.status}`);
    }

    formStatus.textContent = "Message submitted successfully.";
    formStatus.classList.add("success");
    form.reset();
  } catch (error) {
    console.error("Contact form submission failed:", error);
    formStatus.textContent = "Could not send your message. Please try again.";
    formStatus.classList.add("error");
  } finally {
    formBtnLabel.textContent = "Send Message";
    formBtn.disabled = !form.checkValidity();
  }
});

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
