# Decision Pilot IA

## Objetivo
"Decision Pilot IA" es una miniaplicación web educativa diseñada para estructurar decisiones empresariales complejas antes de consultar a un modelo de Inteligencia Artificial. Su propósito principal es ayudar a los estudiantes a formular correctamente el contexto, los datos, los riesgos y las restricciones, evitando consultas superficiales ("prompts vagos") a la IA.

## Qué problema resuelve
En lugar de delegar decisiones críticas a la IA a ciegas, esta aplicación guía a los usuarios a pensar en cómo dividir un problema entre **automatización** y **control humano**, y fomenta la comparación de alternativas mediante un motor de prompts estructurado.

## Casos Incluidos
La aplicación está preconfigurada para los siguientes 4 casos de diseño de sistemas de información:
1. **Admisión y Becas Universitarias**: Riesgo de sesgo en datos sociodemográficos.
2. **Tickets Internos de Soporte TI**: Automatización de Service Desk vs Incidentes críticos.
3. **Devoluciones y Fraude en E-commerce**: Equilibrio entre experiencia de usuario VIP y prevención de fraude sistémico.
4. **Asistente Interno de Documentación Corporativa**: Riesgo de fuga de información y arquitectura RAG vs SaaS.

## Estructura de Archivos
* `index.html`: Estructura visible de la app (interfaz de usuario).
* `style.css`: Estilos visuales con estética moderna (Glassmorphism, Dark Mode).
* `app.js`: Lógica de lectura de campos, validación y control de la interfaz.
* `prompts.js`: Motor de generación del prompt maestro y variaciones por caso.
* `data/ejemplos.json`: Casos de estudio precargados con contexto, decisión, datos y métricas.
* `README.md`: Documentación del proyecto.

## Instrucciones de Uso
1. Abre la aplicación desde tu navegador o vía GitHub Pages.
2. Utiliza el selector desplegable para elegir uno de los 4 escenarios predefinidos.
3. Al seleccionar un caso, los campos de contexto, decisión, métricas y restricciones se autocompletarán.
4. Ajusta la información si es necesario.
5. Haz clic en "Generar Prompt Estructurado".
6. Copia el resultado y pégalo en una IA de libre acceso (ej. ChatGPT, Claude) para analizar su recomendación y estructuración de la decisión.

## Cómo desplegar en GitHub Pages
1. Sube este repositorio a tu cuenta de GitHub de manera pública.
2. Ve a la pestaña **Settings** (Configuración) de tu repositorio.
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En la sección "Source", selecciona `Deploy from a branch` y elige la rama `main` o `master`.
5. Guarda los cambios. En un par de minutos, GitHub generará una URL pública donde podrás ver la app funcionando.

## Limitaciones del Proyecto
* Esta aplicación es un generador estático de texto ("prompt builder"); **no procesa ni consulta APIs de IA directamente** por sí sola.
* Los datos de ejemplo son didácticos y simplificados para ajustarse al entorno del laboratorio de la asignatura.
* No guarda historial de prompts ni tiene persistencia de datos (base de datos), ya que es un ejercicio de arquitectura frontal de interacción (frontend).

## Autores
* Proyecto desarrollado para la asignatura de Diseño de Sistemas de Información.
