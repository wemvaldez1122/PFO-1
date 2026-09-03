/* ============================================================
   perfil.js  ·  Interacciones dinámicas del PERFIL (perfil-wilmer.html)

   1) Pestañas (tabs): muestra/oculta Habilidades, Películas y Discos.
   2) Barras de habilidades: se animan (rellenan) cuando la sección
      aparece en pantalla, usando IntersectionObserver.
   3) Formulario de contacto: valida los campos y arma un link "mailto:"
      con los datos cargados (el sitio es estático, no tiene backend).
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1) Sistema de pestañas ---------- */
  var botones = document.querySelectorAll(".panel-tabs__boton");
  var paneles = document.querySelectorAll(".panel-tabs__panel");

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

  /* ---------- 2) Barras de habilidades animadas ---------- */
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
  /* ---------- 3) Formulario de contacto ---------- */
  var formContacto = document.getElementById("formContacto");

  if (formContacto) {
    var estado = document.getElementById("contactoEstado");

    // TODO: reemplazar por tu email real antes de publicar
    var EMAIL_DESTINO = "wemvaldez1122@gmail.com";

    formContacto.addEventListener("submit", function (evento) {
      evento.preventDefault(); // no recargar la página

      var nombre = document.getElementById("contactoNombre").value.trim();
      var email = document.getElementById("contactoEmail").value.trim();
      var mensaje = document.getElementById("contactoMensaje").value.trim();

      // Validación básica
      if (!nombre || !email || !mensaje) {
        estado.textContent = "Completá todos los campos antes de enviar.";
        estado.classList.add("error");
        return;
      }

      estado.classList.remove("error");
      estado.textContent = "Abriendo tu programa de correo...";

      // Como el sitio es estático (sin backend), armamos un link "mailto:"
      // con los datos del formulario y dejamos que el propio correo del
      // usuario se encargue de enviarlo.
      var asunto = "Contacto desde el sitio - " + nombre;
      var cuerpo =
        "Nombre: " + nombre + "\n" +
        "Email: " + email + "\n\n" +
        mensaje;

      var link =
        "mailto:" +
        EMAIL_DESTINO +
        "?subject=" + encodeURIComponent(asunto) +
        "&body=" + encodeURIComponent(cuerpo);

      window.location.href = link;
      formContacto.reset();
    });
  }
})();
