import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-registro',
  imports: [CommonModule],
  templateUrl: './login-registro.html',
  styleUrl: './login-registro.css',
})
export class LoginRegistro {
  showLogin: boolean = false;

  toggleAuth(): void {
    const overlay = document.getElementById("blackOverlay");
    if (!overlay) return;
    const goingToLogin = !this.showLogin;

    this.showLogin = !this.showLogin;
    // 1. Fase de Deslizamiento del Overlay (Entrada)
    if (goingToLogin) {

      // Registro → Login (Overlay se desliza de izquierda a derecha)
      overlay?.classList.add("slide-right");
      overlay?.classList.remove("slide-left", "exit-left", "exit-right"); // Aseguramos que solo haya una
    } else {
      // Login → Registro (Overlay se desliza de derecha a izquierda)
      overlay?.classList.add("slide-left");
      overlay?.classList.remove("slide-right", "exit-left", "exit-right"); // Aseguramos que solo haya una
    }

    // 2. Fase de Cambio de Vista (Dentro del Overlay)
    // Usaremos 600ms (la duración de la transición del overlay)
    setTimeout(() => {
      let exitClass: string;
      let slideClass: string;

      if (goingToLogin) {
        slideClass = "slide-right";
        exitClass = "exit-right"; // Se va a la derecha
      } else {
        slideClass = "slide-left";
        exitClass = "exit-left"; // Se va a la izquierda
      }

      // Aplicar la salida
      overlay!.classList.remove(slideClass);

      // 🚨 ¡NUEVA LÓGICA DE LIMPIEZA! 🚨
      // Creamos un listener que se ejecuta cuando la animación de salida (exit) termina.
      const listener = (event: Event) => {
        // Solo actuamos si la transición es la de transformación
        if ((event as TransitionEvent).propertyName === 'transform') {

          // Remover las clases de salida para que el overlay vuelva a su posición inicial
          overlay!.classList.remove(exitClass);
          // Opcional: remover también la clase de entrada
          overlay!.classList.remove(slideClass);

          // Desvincular el listener para evitar que se ejecute en futuras transiciones.
          overlay!.removeEventListener('transitionend', listener);
        }
      };

      // Adjuntar el listener
      overlay!.addEventListener('transitionend', listener);
    }, 600);
  }
}