/**
 * Motor de Prompts para Decision Pilot IA
 * Genera prompts robustos para estructurar decisiones complejas con IA
 */

const DecisionPrompts = {
    // Maestro común a todos los casos
    maestro: `Actúa como Consultor Experto en Diseño de Sistemas de Información.
Te voy a proporcionar el contexto, los datos y las restricciones de un escenario empresarial complejo.
Tu objetivo NO es dar una respuesta superficial, sino estructurar la decisión.

Quiero que analices el caso y devuelvas exactamente la siguiente estructura:

1. **Resumen del Problema**: En 2 líneas, qué se intenta resolver.
2. **Decisión Real a Tomar**: Reformula la decisión planteada para que sea accionable.
3. **Datos Faltantes**: ¿Qué información crítica no se ha proporcionado y sería necesaria?
4. **Tres Alternativas**: Plantea 3 opciones posibles (ej. hacer nada, solución parcial, solución total).
5. **Comparación de Alternativas**: Pros y contras de cada una considerando las restricciones.
6. **Recomendación Razonada**: ¿Cuál es tu propuesta y por qué?
7. **Control Humano**: Especifica claramente qué parte automatizarías y cuál dejarías bajo control humano obligatorio.
8. **KPIs**: 2 métricas para medir si la decisión fue correcta.
9. **Decisión Final**: Concluye explícitamente con GO, NO-GO o GO CON CONDICIONES.

---
`,

    // Variaciones específicas por caso
    variaciones: {
        'caso1': `\n[ATENCIÓN ESPECIAL AL CASO: Admisión y Becas]\nAñade al final de tu respuesta un apartado extra titulado "Riesgo de sesgo y medidas de equidad". Diferencia claramente entre automatizar comprobaciones documentales y automatizar decisiones sensibles que afecten al futuro de un estudiante.`,
        
        'caso2': `\n[ATENCIÓN ESPECIAL AL CASO: Tickets TI]\nEn la sección de "Control Humano", haz una revisión explícita sobre cómo tratar la prioridad, SLA, tickets repetidos y escalado crítico. Resume en 5 líneas cuál sería el primer subproceso a rediseñar.`,
        
        'caso3': `\n[ATENCIÓN ESPECIAL AL CASO: Fraude E-commerce]\nAñade un bloque llamado "Separación entre casos estándar y excepcionales". Explica qué se automatiza, qué se revisa manualmente, qué regla de negocio implementar primero y qué indicador mostraría mejoras reales en el control de fraude.`,
        
        'caso4': `\n[ATENCIÓN ESPECIAL AL CASO: Asistente Documental]\nEn la sección de "Tres Alternativas", debes obligatoriamente comparar: 1) SaaS/API externa, 2) Despliegue privado, 3) Opción híbrida. Detalla cuándo elegir cada una, el riesgo de privacidad y el coste relativo.`
    },

    /**
     * Combina todos los elementos en un prompt estructurado
     */
    generarPromptFinal: function(casoId, contexto, decision, datos, restricciones) {
        let promptFinal = this.maestro;
        
        promptFinal += `\n**[DATOS DEL ESCENARIO]**\n`;
        promptFinal += `- Contexto: ${contexto || 'No especificado'}\n`;
        promptFinal += `- Decisión a tomar: ${decision || 'No especificada'}\n`;
        promptFinal += `- Datos/Métricas disponibles: ${datos || 'No especificados'}\n`;
        promptFinal += `- Restricciones/Riesgos: ${restricciones || 'No especificadas'}\n`;

        if (this.variaciones[casoId]) {
            promptFinal += this.variaciones[casoId] + `\n`;
        }

        return promptFinal;
    }
};
