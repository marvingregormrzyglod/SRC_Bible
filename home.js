(() => {
  function highlightHomeCode() {
    if (typeof hljs === 'undefined') return;

    document.querySelectorAll('.code-style pre code').forEach((block) => {
      block.classList.add('language-pseudo');
      hljs.highlightElement(block);
    });
  }

  function initDynamicFontScaling() {
    const codeElement = document.querySelector('.dynamic-code');
    if (!codeElement) return;

    const container = codeElement.closest('.version-content');
    if (!container) return;

    function scaleFontSize() {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      codeElement.style.fontSize = '1rem';

      const isOverflowing =
        codeElement.scrollWidth > containerWidth ||
        codeElement.scrollHeight > containerHeight;

      if (isOverflowing) {
        let fontSize = 0.95;
        codeElement.style.fontSize = `${fontSize}rem`;

        while ((codeElement.scrollWidth > containerWidth ||
                codeElement.scrollHeight > containerHeight) &&
                fontSize > 0.5) {
          fontSize -= 0.05;
          codeElement.style.fontSize = `${fontSize}rem`;
        }
      }
    }

    scaleFontSize();
    window.addEventListener('resize', scaleFontSize);
    setTimeout(scaleFontSize, 100);
  }

  function initSignupForm() {
    const form = document.getElementById('signup-form');
    const signupContainer = document.getElementById('signup-container');
    const thankYouMessage = document.getElementById('thank-you-message');
    const errorMessage = document.getElementById('signup-error');

    if (!form || !signupContainer || !thankYouMessage) return;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzWwP-kjM_0JAd_kSCXfqoAAgU8lbrMY3T1LWxmW424iS99zZXhMlMdFR5xNobcomlM/exec';

    function setFormState(isSubmitting) {
      const submitBtn = document.getElementById('submit-btn');
      if (!submitBtn) return;
      submitBtn.disabled = isSubmitting;
      submitBtn.textContent = isSubmitting ? 'Submitting...' : 'Notify Me';
    }

    function showError(message) {
      if (!errorMessage) return;
      errorMessage.textContent = message;
      errorMessage.classList.remove('hidden');
    }

    function clearError() {
      if (!errorMessage) return;
      errorMessage.textContent = '';
      errorMessage.classList.add('hidden');
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearError();

      const emailInput = document.getElementById('email-input');
      if (!emailInput || !emailInput.value) {
        showError('Please enter a valid email address.');
        return;
      }

      setFormState(true);

      try {
        const formData = new FormData();
        formData.append('email', emailInput.value);

        const response = await fetch(scriptURL, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        if (data && data.success) {
          signupContainer.classList.add('hidden');
          thankYouMessage.classList.remove('hidden');
          try {
            localStorage.setItem('biblePreauthEmail', emailInput.value);
            localStorage.setItem('biblePreauthSubmitted', 'true');
          } catch (error) {
            // Ignore storage errors
          }
        } else {
          throw new Error('Submission error');
        }
      } catch (error) {
        showError('There was an error submitting your email. Please try again.');
        setFormState(false);
      }
    });

    try {
      if (localStorage.getItem('biblePreauthSubmitted') === 'true') {
        signupContainer.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
      }
    } catch (error) {
      // Ignore storage errors
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.body.classList.contains('home-page')) return;

    if (window.SrcBible && typeof window.SrcBible.registerPseudoLanguage === 'function') {
      window.SrcBible.registerPseudoLanguage();
    }

    highlightHomeCode();
    initDynamicFontScaling();
    initSignupForm();
  });
})();
