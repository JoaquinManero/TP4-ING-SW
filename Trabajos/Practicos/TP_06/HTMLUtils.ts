export module HTMLUtils {

    // Función para ocultar un elemento div.
    export function ocultarSeccion(div: HTMLDivElement): void {
      div.style.display = 'none';
    }
  
    // Función para mostrar un elemento div.
    export function mostrarSeccion(div: HTMLDivElement): void {
      div.style.display = 'block';
    }
};
