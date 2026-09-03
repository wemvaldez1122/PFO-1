/* __________________________________________________________
   perfil.js: Interacciones dinámicas del PERFIL (perfil-wilmer.html)

   1) Pestañas (tabs): muestra/oculta Habilidades, Películas y Discos.
   2) Barras de habilidades: se animan cuando la sección
      aparece en pantalla, usando IntersectionObserver.
   _________________________________________________ */
(function () {
  "use strict";

  /* 1) Sistema de pestañas */
  var botones = document.querySelectorAll(".tab-btn");
  var paneles = document.querySelectorAll(".tab-panel");

  function activarTab(nombre) {
    botones.forEach(function (b) {
      var activo = b.getAttribute("data-tab") === nombre;
      b.classList.toggle("activo", activo);
      b.setAttribute("aria-selected", activo ? "true" : "false");
    });
    paneles.forEach(function (p) {
      p.classList.toggle("activo", p.id === nombre);
    });

    // Si se abre la pestaña de habilidades, animamos las barras
    if (nombre === "habilidades") animarSkills();
  }

  botones.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activarTab(btn.getAttribute("data-tab"));
    });
  });

  /*  2) Barras de habilidades animadas  */
  function animarSkills() {
    document.querySelectorAll(".skill").forEach(function (skill) {
      var nivel = skill.getAttribute("data-nivel") || 0;
      var relleno = skill.querySelector(".skill__relleno");
      if (relleno) {
        // pequeño retardo para que se vea la transición
        requestAnimationFrame(function () {
          relleno.style.width = nivel + "%";
        });
      }
    });
  }

  // Animar cuando el bloque entra en el viewport (una sola vez)
  var contenedorSkills = document.getElementById("habilidades");
  if (contenedorSkills && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            animarSkills();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(contenedorSkills);
  } else {
    // Fallback si no hay soporte
    animarSkills();
  }
})();
