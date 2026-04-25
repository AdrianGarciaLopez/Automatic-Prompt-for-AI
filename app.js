document.addEventListener("DOMContentLoaded", () => {
    // Referencias al DOM
    const caseSelector = document.getElementById('case-selector');
    const caseDescription = document.getElementById('case-description');
    const inputContext = document.getElementById('context');
    const inputDecision = document.getElementById('decision');
    const inputData = document.getElementById('data');
    const inputRestrictions = document.getElementById('restrictions');
    const btnGenerate = document.getElementById('generate-btn');
    const btnCopy = document.getElementById('copy-btn');
    const promptOutput = document.getElementById('prompt-output');
    const statusMessage = document.getElementById('status-message');

    let loadedCases = [];

    // Fallback data in case fetch fails due to CORS on file:// protocol
    const fallbackCases = [
        {
            "id": "caso1",
            "nombre": "Admisión y Becas Universitarias",
            "descripcion": "Decidir si conviene desplegar un asistente con IA para prevalidar solicitudes y resumir expedientes sin perder equidad.",
            "contexto": "La universidad recibe miles de solicitudes anuales. El equipo de admisiones está desbordado y los tiempos de respuesta se alargan, afectando la competitividad.",
            "decision": "¿Debemos implementar un sistema de IA para automatizar la pre-evaluación de las solicitudes y la asignación preliminar de becas?",
            "datos": "Volumen: 15,000 solicitudes/año. Expedientes incompletos: 30%. Sensibilidad del dato: Alta (datos socioeconómicos).",
            "restricciones": "Plazo máximo de resolución: 4 semanas. Obligatoriedad de revisión humana en decisiones finales de becas.",
            "metricas": "Tiempo medio actual por expediente: 45 min. Tasa de error manual actual: 5%.",
            "riesgo": "Riesgo alto de sesgo algorítmico contra minorías o rentas bajas si no se audita el modelo."
        },
        {
            "id": "caso2",
            "nombre": "Tickets Internos de Soporte TI",
            "descripcion": "Decidir si conviene automatizar la clasificación y el escalado inicial de tickets internos.",
            "contexto": "El Helpdesk recibe una gran cantidad de incidencias diarias. Muchas son consultas rutinarias (restablecer contraseñas), pero se mezclan con caídas de servidores.",
            "decision": "¿Es viable y seguro usar un agente IA para clasificar, responder tickets estándar y derivar incidentes críticos automáticamente?",
            "datos": "Tickets al mes: 8,500. Tickets repetidos: 60%. Incidentes críticos reales: 2%.",
            "restricciones": "SLA objetivo: Primera respuesta en < 15 min. Resolución de críticos en < 1 hora.",
            "metricas": "Tiempo de primera respuesta actual: 4 horas. Coste por ticket nivel 1: 15€.",
            "riesgo": "Peligro de clasificar erróneamente un incidente de ciberseguridad o caída crítica como ticket estándar de baja prioridad."
        },
        {
            "id": "caso3",
            "nombre": "Devoluciones y Fraude en E-commerce",
            "descripcion": "Decidir si el negocio debe automatizar devoluciones estándar y reservar revisión humana para fraude.",
            "contexto": "La tienda online ha crecido exponencialmente, al igual que las devoluciones. Se sospecha de un aumento en 'fraude amistoso' y abusos de la política de devoluciones.",
            "decision": "¿Deberíamos aprobar automáticamente devoluciones de bajo importe y usar IA para flaggear casos sospechosos para revisión manual?",
            "datos": "Devoluciones mensuales: 12,000. Porcentaje estimado de fraude: 8%. Valor medio del pedido: 65€.",
            "restricciones": "Aprobación de pedidos > 200€ requiere revisión humana obligatoria. No penalizar a clientes VIP.",
            "metricas": "Tiempo medio de resolución de devolución: 7 días. Coste operativo de revisión: 8€ por caso.",
            "riesgo": "Aumentar la fricción en clientes honestos o, por el contrario, ser demasiado permisivos y sufrir pérdidas millonarias por fraude sistémico."
        },
        {
            "id": "caso4",
            "nombre": "Asistente Interno de Documentación Corporativa",
            "descripcion": "Decidir qué arquitectura conviene para un asistente que consulta documentación interna sin disparar riesgos.",
            "contexto": "Los empleados pierden mucho tiempo buscando información en manuales de producto, políticas de RRHH y documentación técnica dispersa.",
            "decision": "¿Conviene adoptar una solución SaaS externa (tipo ChatGPT Enterprise) o desarrollar un RAG (Retrieval-Augmented Generation) privado con LLM open-source?",
            "datos": "Usuarios activos: 3,500. Consultas/usuario: 10 al día. Sensibilidad documental: Extrema (secretos industriales).",
            "restricciones": "Presupuesto mensual máximo: 15,000€. Latencia máxima tolerable: 3 segundos por respuesta.",
            "metricas": "Horas perdidas en búsqueda de info: 4h/semana por empleado.",
            "riesgo": "Fuga de información confidencial hacia modelos de terceros (data leakage) y riesgo de 'alucinaciones' en procedimientos operativos críticos."
        }
    ];

    // 1. Cargar datos de casos
    fetch('data/ejemplos.json')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            loadedCases = data;
            populateSelector(data);
        })
        .catch(error => {
            console.warn('Error al cargar casos vía fetch (probablemente CORS por file://). Usando fallback local:', error);
            loadedCases = fallbackCases;
            populateSelector(fallbackCases);
        });

    // 2. Poblar el selector
    function populateSelector(cases) {
        cases.forEach(c => {
            const option = document.createElement('option');
            option.value = c.id;
            option.textContent = c.nombre;
            caseSelector.appendChild(option);
        });
    }

    // 3. Manejar cambio de caso
    caseSelector.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        const caseData = loadedCases.find(c => c.id === selectedId);
        
        if (caseData) {
            caseDescription.textContent = caseData.descripcion + " (Lee tu guía del laboratorio e introduce manualmente los datos abajo).";
            caseDescription.style.display = 'inline-block';
            
            // Vaciar los campos para que el usuario sea quien los escriba
            inputContext.value = '';
            inputDecision.value = '';
            inputData.value = '';
            inputRestrictions.value = '';

            // Mostrar sugerencias en los placeholders para guiar al estudiante
            inputContext.placeholder = "Escribe el contexto. Ej: " + caseData.contexto.substring(0, 50) + "...";
            inputDecision.placeholder = "Escribe tu decisión. Ej: " + caseData.decision.substring(0, 50) + "...";
            inputData.placeholder = "Escribe los datos. Ej: " + caseData.datos.substring(0, 50) + "...";
            inputRestrictions.placeholder = "Escribe las restricciones. Ej: " + caseData.restricciones.substring(0, 50) + "...";
            
            promptOutput.value = '';
            btnCopy.disabled = true;
        }
    });

    // 4. Generar Prompt Final
    btnGenerate.addEventListener('click', () => {
        const selectedId = caseSelector.value;
        
        if (!selectedId) {
            showStatus("¡Selecciona un caso primero!", true);
            return;
        }
        
        if (!inputContext.value || !inputDecision.value) {
            showStatus("¡Faltan datos obligatorios!", true);
            return;
        }

        const promptFinal = DecisionPrompts.generarPromptFinal(
            selectedId,
            inputContext.value,
            inputDecision.value,
            inputData.value,
            inputRestrictions.value
        );

        promptOutput.value = promptFinal;
        btnCopy.disabled = false;
        showStatus("¡PROMPT GENERADO!");
    });

    // 5. Copiar al portapapeles
    btnCopy.addEventListener('click', () => {
        if (!promptOutput.value) return;
        
        navigator.clipboard.writeText(promptOutput.value)
            .then(() => {
                showStatus("¡COPIADO!");
            })
            .catch(err => {
                console.error('Error al copiar:', err);
                showStatus("Error al copiar.", true);
            });
    });

    // 6. Mostrar mensajes de estado
    function showStatus(msg, isError = false) {
        statusMessage.textContent = msg;
        statusMessage.style.backgroundColor = isError ? "var(--accent)" : "var(--primary)";
        statusMessage.style.color = isError ? "#ffffff" : "#000000";
        statusMessage.classList.add('show');
        
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 3000);
    }
});
