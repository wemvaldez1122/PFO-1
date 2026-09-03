/* ___________________________________________________________________
   portada.js: Portada interactiva (index.html)

   1) Se le agrego efecto "máquina de escribir" que permite que escriba con efectos de bucle.
   2) Botón de "Aumentar contraste": Lo Agregue para que afectara directamente "body", y le da efecto de contraste.
   ___________________________________________________________________ */
(function () {
  "use strict";

  /* 1) Aca se agrego el efecto de escribir */
  var destino = document.getElementById("typed");

  if (destino) {
    var frases = [
      "Este proyecto lo diseñé con",
      "HTML + CSS + JavaScript.",
      "Diseño responsive real.",
      "Para poder hacer presentación del perfil de los integrantes",
    ];

    var iFrase = 0; //  frase actual
    var iLetra = 0; // letra actual
    var borrando = false;

    function tipear() {
      var actual = frases[iFrase];

      if (!borrando) {
        // Escribiendo letra por letra
        destino.textContent = actual.slice(0, iLetra + 1);
        iLetra++;
        if (iLetra === actual.length) {
          borrando = true;
          return setTimeout(tipear, 1400); // pausa al completar
        }
      } else {
        // Borrando letra por letraa
        destino.textContent = actual.slice(0, iLetra - 1);
        iLetra--;
        if (iLetra === 0) {
          borrando = false;
          iFrase = (iFrase + 1) % frases.length; // siguientes frase
        }
      }
      setTimeout(tipear, borrando ? 45 : 85);
    }

    tipear();
  }

  /* 2) Botón de contraste */
  var btn = document.getElementById("btnContraste");

  if (btn) {
    // Restaurar preferencia guardada
    if (localStorage.getItem("contraste") === "on") {
      document.body.classList.add("contraste");
      btn.textContent = "Contraste normal";
    }

    btn.addEventListener("click", function () {
      var activo = document.body.classList.toggle("contraste");
      btn.textContent = activo ? "Contraste normal" : "Alto contraste";
      localStorage.setItem("contraste", activo ? "on" : "off");
    });
  }

  /* 3) Aparición de las tarjetas de integrantes al hacer scroll */
  var tarjetas = document.querySelectorAll(".integrante");

  if (tarjetas.length) {
    if ("IntersectionObserver" in window) {
      var obsIntegrantes = new IntersectionObserver(
        function (entradas) {
          entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
              var indice = Array.prototype.indexOf.call(tarjetas, entrada.target);
              // pequeño retraso entre una tarjeta y la siguiente
              setTimeout(function () {
                entrada.target.classList.add("visible");
              }, indice * 120);
              obsIntegrantes.unobserve(entrada.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      tarjetas.forEach(function (tarjeta) {
        obsIntegrantes.observe(tarjeta);
      });
    } else {
      // Fallback si no hay soporte
      tarjetas.forEach(function (tarjeta) {
        tarjeta.classList.add("visible");
      });
    }
  }
})();
