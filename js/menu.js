/* _______________________________________________________________________
   menu.js: Menú responsive (para darle la compatibilidad a todas las páginas)
   Abre y cierra el menú de navegación en pantallas chicas.
   Se usa en index.html, perfil-wilmer.html y bitacora.html.
   ____________________________________________________ */
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    var abierto = links.classList.toggle("abierto");
    toggle.classList.toggle("abierto", abierto);
    toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  // Al hacer clic en un enlace, cerramos el menú 
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("abierto");
      toggle.classList.remove("abierto");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
