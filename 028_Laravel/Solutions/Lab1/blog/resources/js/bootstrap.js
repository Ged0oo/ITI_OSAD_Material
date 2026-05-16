const csrfToken = document.head.querySelector('meta[name="csrf-token"]');

if (csrfToken) {
    window.csrfToken = csrfToken.content;
}