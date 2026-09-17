(() => {
  const lightbox = document.getElementById("doctorDocumentLightbox");
  if (!lightbox) return;

  const label = document.getElementById("doctorDocumentLightboxLabel");
  const content = document.getElementById("doctorDocumentLightboxContent");
  const original = document.getElementById("doctorDocumentOriginal");
  const close = () => {
    lightbox.hidden = true;
    content.replaceChildren();
    document.body.classList.remove("document-lightbox-open");
  };

  document.querySelectorAll("[data-document-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.dataset.documentSrc;
      const kind = button.dataset.documentKind;
      label.textContent = button.dataset.documentTitle || "Документ";
      original.href = src;
      const element = kind === "pdf" ? document.createElement("iframe") : document.createElement("img");
      element.src = src;
      element.title = label.textContent;
      if (kind !== "pdf") element.alt = label.textContent;
      content.replaceChildren(element);
      lightbox.hidden = false;
      document.body.classList.add("document-lightbox-open");
      lightbox.querySelector(".doctor-document-lightbox-close").focus();
    });
  });

  lightbox.querySelectorAll("[data-document-close]").forEach((button) => button.addEventListener("click", close));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !lightbox.hidden) close(); });
})();
