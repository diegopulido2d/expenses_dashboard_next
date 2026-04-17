# Expenses Dashboard

Dashboard interactivo para la visualización y gestión de gastos personales, construido con **Next.js 14 (App Router)**, **React Bootstrap** y **TypeScript**.

---

## Descripción general

La aplicación permite visualizar y administrar gastos personales a través de una interfaz clara e intuitiva. Los datos se obtienen desde un archivo JSON local (`expenses.json`) y se distribuyen por la aplicación mediante un **Context Provider de React**, lo que permite que cualquier cambio (como agregar un nuevo gasto) se refleje en tiempo real en todos los componentes sin necesidad de recargar la página.

### Funcionalidades principales

- **Dashboard principal (`/`):** Muestra un resumen del mes actual, incluyendo el total gastado, el promedio diario, el número de transacciones del mes, un gráfico de barras con el gasto por categoría, las 3 categorías con mayor gasto y los 3 gastos más recientes.
- **Página de gastos (`/expenses`):** Tabla completa con todos los gastos registrados. Permite ordenar por columna (monto, fecha, categoría) y filtrar por descripción mediante una barra de búsqueda.
- **Agregar gastos:** Un botón abre un modal con un formulario para registrar nuevos gastos. Los datos se agregan al contexto global y se reflejan inmediatamente en el dashboard.

### Estructura de un gasto

Cada gasto contiene los siguientes campos:

| Campo         | Tipo     | Descripción                       |
| ------------- | -------- | --------------------------------- |
| `id`          | `number` | Identificador único del gasto     |
| `amount`      | `number` | Monto del gasto en COP            |
| `category`    | `string` | Categoría (Comida, Transporte...) |
| `description` | `string` | Descripción del gasto             |
| `date`        | `string` | Fecha en formato `YYYY-MM-DD`     |

---

## Configuración y ejecución

### Requisitos previos

- **Node.js** v18 o superior
- **npm** v9 o superior

### Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/diegopulido2d/expenses_dashboard_next.git
cd expenses_dashboard_next
```

2. Instalar dependencias:

```bash
npm install
```

3. Asegurarse de que el archivo de datos exista en la carpeta `public`:

```
public/
└── expenses.json
```

### Ejecución en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Build de producción

```bash
npm run build
npm start
```

## Potencial integración de AI

### Feature propuesta: _"Analizar mis gastos del mes y sugerir optimizaciones"_

Se propone integrar **Groq** como proveedor de LLM, utilizando el modelo **`llama-3.3-70b-versatile`**, que ofrece alta capacidad de razonamiento, contexto amplio y velocidad de inferencia superior — ideal para análisis financiero en tiempo real dentro de una aplicación web.

---

### 1. Diseño del workflow de AI y patrón agéntico

Se implementaría un patrón **ReAct (Reasoning + Acting)** con un agente de un solo ciclo de razonamiento, adecuado para tareas de análisis y recomendación que no requieren múltiples herramientas externas.

El flujo sería el siguiente:

```
Usuario solicita análisis
        ↓
[Tool: getMonthlyExpenses]
Recupera gastos del mes desde el contexto
        ↓
[Tool: computeStats]
Calcula totales por categoría, promedio diario,
transacciones, categoría más costosa
        ↓
[Prompt al LLM - Groq llama3-70b]
Envía estadísticas + historial de gastos
con instrucciones detalladas de análisis
        ↓
[LLM genera análisis]
- Identifica patrones de gasto
- Detecta categorías con sobregasto
- Sugiere redistribución del presupuesto
- Proporciona recomendaciones concretas
        ↓
Respuesta renderizada en la UI
```

---

### 2. Integración en la arquitectura existente

La funcionalidad se integraría de la siguiente manera:

**Nuevo componente cliente:** `components/AIAnalysis/index.tsx`
Se agregaría un botón _"Analizar mis gastos"_ en el dashboard. Al hacer clic, el componente tomaría los gastos del contexto existente (`useMyExpensesContext`), calcularía las estadísticas necesarias y realizaría la llamada a la API de Groq.

**Nueva API Route de Next.js:** `app/api/analyze/route.ts`
La llamada al LLM se haría desde el servidor (no desde el cliente) para proteger la API key. El componente cliente haría un `fetch` a esta ruta interna.

```
Cliente (componente React)
    → POST /api/analyze  (gastos del mes como body)
        → Groq API (llama3-70b)
        ← Análisis en texto
    ← Respuesta al componente
        → Renderizado en UI
```

---

### 3 Diagrama del flujo para integracion con Groq (IA)

```
┌─────────────────────────────────────────────────────────┐
│                     USUARIO                             │
│         Hace clic en "Analizar mis gastos"              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              COMPONENTE CLIENTE                         │
│  1. Lee expenses[] desde useMyExpensesContext()         │
│  2. Muestra estado: loading...                          │
│  3. POST /api/analyze  { expenses }                     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│               API ROUTE (Servidor)                      │
│                                                         │
│  TOOL 1: computeStats(expenses)                         │
│  ├── Total gastado                                      │
│  ├── Promedio diario                                    │
│  ├── Gasto por categoría                                │
│  └── Número de transacciones                            │
│                                                         │
│  TOOL 2: buildPrompt(expenses, stats)                   │
│  └── Construye prompt detallado en español              │
│                                                         │
│  TOOL 3: callGroq(prompt)                               │
│  └── POST https://api.groq.com/openai/v1/chat/...       │
│      model: llama-3.3-70b-versatile                     │
│      temperature: 0.5                                   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  GROQ LLM                               │
│         llama-3.3-70b-versatile                         │
│                                                         │
│  Razona sobre los datos y genera:                       │
│  ├── Resumen ejecutivo del mes                          │
│  ├── Categorías con sobregasto detectado                │
│  ├── Recomendaciones concretas de ahorro                │
│  └── Proyección para el próximo mes                     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              COMPONENTE CLIENTE                         │
│  Recibe análisis en texto                               │
│  Renderiza resultado en un Card del dashboard           │
│  Estado final: success                                  │
└─────────────────────────────────────────────────────────┘
```
