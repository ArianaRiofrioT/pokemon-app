# Práctica 02: Aplicación Web Interactiva con Angular y PokéAPI
**Universidad Politécnica Salesiana**
**Asignatura:** Programación y Plataformas Web  
**Estudiante:** Ariana Riofrío  
Universidad Politécnica Salesiana  

---

## 1. Propósito de la aplicación
Desarrollo de una aplicación web interactiva denominada **Explorador y Analizador Táctico PokéAPI**, construida con Angular. Su objetivo principal es consultar información en tiempo real desde la PokéAPI, transformando y vinculando los datos a una interfaz interactiva de combate y análisis táctico.

## 2. Principales Funcionalidades
* **Búsqueda Dinámica:** Permite consultar cualquier Pokémon por su nombre exacto o número de ID.
* **Gestión de Estados Explícitos:** Manejo visual de estados de carga (`cargando...`), errores de consulta (como 404 para Pokémon inexistentes) y resultados exitosos.
* **Análisis de Combate y Tácticas:** Visualización cruzada de estadísticas base (HP y Ataque), debilidades elementales del tipo principal y detalles técnicos de movimientos tácticos.
* **Caché en Memoria:** Optimización de peticiones repetidas mediante el almacenamiento local en servicios de Angular.

## 3. Endpoints de PokéAPI Utilizados
La aplicación integra tres endpoints diferentes de la PokéAPI para cumplir con los requisitos funcionales:
1. **`/pokemon/{idOrName}`**: Permite obtener los datos base del Pokémon, sprites oficiales y estadísticas de combate.
2. **`/type/{idOrName}`**: Consulta las relaciones de daño y debilidades elementales asociadas al tipo principal del Pokémon.
3. **`/move/{idOrName}`**: Consulta las características técnicas de movimientos tácticos (poder, precisión y categoría de tipo).

## 4. Instrucciones Detalladas de Instalación, Ejecución y Uso Paso a Paso

Seguir esta guía  para ejecutar y usar la aplicación:

### Fase A: Clonación y Arranque Local (En la terminal de VS Code)
1. **Clonar el repositorio:** Abre tu terminal de comandos y ejecuta:
   ```bash
   git clone <URL_DEL_REPOSITORIO_GITHUB>
   cd pokemon-app

### Fase B: Qué hacer y qué escribir  en la página web (Navegador)
Una vez que el navegador abra automáticamente la aplicación en `http://localhost:4200/explorador`, realiza lo siguiente en la interfaz gráfica:

1. **Localizar el campo de texto:** En la pantalla se vera el título *"Explorador y Analizador Táctico PokéAPI"* y un recuadro de entrada de texto al lado de la etiqueta *"Pokémon (Nombre o ID)"*.
2. **Hacer clic en el recuadro blanco** 
3. **Escribir el término de búsqueda:** 
   * Escribe **únicamente** un nombre de Pokémon en minúsculas y en inglés (por ejemplo: **`pikachu`**, **`charmander`**, **`bulbasaur`**, **`snorlax`**, **`mewtwo`**) o su número de ID exacto (por ejemplo: **`25`**, **`4`**, **`1`**, **`143`**).
   * *Importante:* No escribas comas, espacios múltiples ni varios nombres combinados (evita escribir cosas como `pikachu, 25`), ya que la PokéAPI requiere un único identificador exacto por cada consulta.
4. **Hacer clic en el botón de acción:** Haz clic sobre el botón gris con la etiqueta **"Consultar"** 
5. **Verificar la respuesta en pantalla (Los Tres Endpoints en acción):**
   * **Estado de carga:** Al hacer clic, el botón se bloqueará temporalmente y aparecerá en pantalla el mensaje: *"Consultando los tres endpoints de PokéAPI..."*.
   * **Resultado del Endpoint 1:** Aparecerá una tarjeta con el nombre oficial del Pokémon, su ID numérico, su imagen o sprite oficial, sus tipos (ej. `electric`) y sus estadísticas base (**HP** y **Ataque**).
   * **Resultado del Endpoint 2:** Dentro de la tarjeta se desplegará un recuadro gris titulado *"Endpoint 2: Relación de Tipos"* que indica contra qué elementos es débil (ej. *ground*).
   * **Resultado del Endpoint 3:** Abajo se mostrará un recuadro celeste titulado *"Endpoint 3: Movimiento Analizado"* con los datos técnicos del movimiento táctico predeterminado (Poder, Precisión y Tipo del movimiento).
6. **Prueba de manejo de errores (Caso 404):** Borra el texto anterior, escribe un nombre falso o inventado (por ejemplo: `pokemonfalso123`) y haz clic en **Consultar**. La aplicación capturará el error de red y mostrará en letras rojas la alerta: *"No existe ese Pokémon en PokéAPI."*