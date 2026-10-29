# Auditoría UX/UI — Tarea individual del Laboratorio 11

**Aplicación evaluada:** «Mi lista de tareas», desarrollada en el Laboratorio 08.  
**Versión original:** https://tonoarias-stack.github.io/lab08-dom/tarea/  
**Versión rediseñada:** https://tonoarias-stack.github.io/taller-ux/tarea-ux/  
**Método:** revisión del HTML y JavaScript originales y comparación con el rediseño. Los resultados de Lighthouse se incorporan tras realizar las mediciones reales.

## 1. Auditoría de las cinco heurísticas

| Heurística de Nielsen | Problema de la versión original | Solución aplicada en el rediseño |
|---|---|---|
| Visibilidad del estado del sistema | Tras agregar, marcar o borrar una tarea, no aparecía un mensaje de confirmación visible; solo el estado en la lista cambiaba. | Se añadió un área con `role="status"` y `aria-live="polite"` para confirmar altas, cambios de estado, filtros, eliminaciones y restauraciones. |
| Coincidencia con el mundo real | El botón «Marcar» no indicaba claramente qué acción ejecutaría ni existía una explicación sobre el estado de las tareas. | Se usan textos explícitos como «Completar», «Marcar pendiente», «Eliminar» y estados «Pendiente» o «Completada». |
| Control y libertad del usuario | El botón «Borrar» eliminaba inmediatamente la tarea, sin preguntar ni permitir recuperarla. | Se solicita confirmación antes de eliminar y se ofrece «Deshacer eliminación» tras borrarla. |
| Prevención de errores | Al intentar agregar un texto vacío se mostraba un error, pero el botón permitía hacer clic igualmente. | El botón «Agregar tarea» permanece desactivado hasta escribir un nombre válido; se vuelve a validar en JavaScript. |
| Reconocer en lugar de recordar | Las acciones y la búsqueda estaban dispersas y la pantalla no ofrecía una organización clara de estados. | Las funciones se separaron en dos bloques numerados; se incorporó un selector «Todas / Pendientes / Completadas» y etiquetas explicativas. |

## 2. Leyes de usabilidad

| Ley | Cambio aplicado | Justificación |
|---|---|---|
| Fitts | Botones de al menos 48 px de altura, con espacio entre «Completar» y «Eliminar». | Los objetivos más grandes y separados se seleccionan con mayor facilidad y disminuyen los clics accidentales. |
| Hick | La búsqueda y un selector de tres estados («Todas», «Pendientes», «Completadas») organizan las decisiones. | Agrupar las alternativas permite elegir el tipo de tareas sin enfrentar demasiadas opciones al mismo tiempo. |
| Miller | La pantalla se divide en «1. Agregar tarea» y «2. Mis tareas». | Presentar la información en bloques pequeños reduce la información que el usuario debe mantener en la memoria. |

## 3. Principios visuales y accesibilidad

- **Jerarquía visual:** un solo `h1`, títulos `h2` y un botón azul principal.
- **Color y espaciado:** variables CSS en `:root` y distancias consistentes de 8, 12, 16, 20 y 28 px.
- **Etiquetas:** los campos usan `label` con `for` e `id` correspondientes; no dependen de los placeholders.
- **Teclado:** los elementos interactivos muestran un foco naranja con `:focus-visible`.
- **Tamaño:** campos y botones de al menos 48 px (el botón Deshacer tiene al menos 44 px).
- **Contraste:** se eligieron texto oscuro sobre blanco y botones con texto de alto contraste; verificar el resultado final en Lighthouse.
- **Imágenes:** esta pantalla no utiliza imágenes, por tanto no requiere atributos `alt`.
- **Acciones destructivas:** la eliminación requiere confirmación y ofrece una posibilidad de deshacer.

## 4. Evidencias del antes y después

### Interfaz original — evidencia por completar

Toma una captura real con la aplicación original abierta desde `tarea-ux/antes/index.html` o desde GitHub Pages, y guárdala como `docs/capturas/antes.png`. Después reemplaza esta instrucción por:

`![Interfaz original del Laboratorio 08](capturas/antes.png)`

### Interfaz rediseñada — evidencia por completar

Toma una captura real de la aplicación rediseñada funcionando en `tarea-ux/index.html` o en GitHub Pages, guárdala como `docs/capturas/despues.png` y reemplaza esta instrucción por:

`![Interfaz rediseñada aplicando UX/UI](capturas/despues.png)`

### Comparación de Lighthouse — completar con resultados reales

| Versión | Accesibilidad medida | Evidencia |
|---|---|---|
| Antes | **Pendiente de medir** | Ejecutar Lighthouse sobre `tarea-ux/antes/index.html` y guardar captura en `docs/capturas/lighthouse-antes.png`. |
| Después | **Pendiente de medir** | Ejecutar Lighthouse sobre `tarea-ux/index.html` y guardar captura en `docs/capturas/lighthouse-despues.png`. Meta: **90 o más**. |

Cuando tengas ambas capturas, reemplaza esta sección por las imágenes reales:

`![Lighthouse antes](capturas/lighthouse-antes.png)`  
`![Lighthouse después](capturas/lighthouse-despues.png)`

## 5. Verificaciones manuales pendientes en tu navegador

1. Comprobar que una tarea vacía no se puede agregar.
2. Agregar una tarea y observar el mensaje de confirmación.
3. Marcar y desmarcar una tarea; comprobar los mensajes.
4. Pulsar Eliminar y luego Cancelar: la tarea permanece.
5. Pulsar Eliminar y Aceptar: aparece Deshacer eliminación y al usarlo se recupera.
6. Recorrer todos los controles con Tab y verificar el borde de foco.
7. Ejecutar Lighthouse en ambas páginas y registrar los puntajes reales.
8. Verificar en GitHub Pages la página publicada y hacer la captura de la entrega.

**Nota:** Las capturas de ejecución local no sustituyen la captura solicitada desde GitHub Pages ni el resultado real de Lighthouse. No se incluyen capturas falsas ni puntuaciones inventadas.
