export interface Practice {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  explanation: string;
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  duration: string;
  objectives: string[];
  theory: string[];
  practices: Practice[];
  project: {
    title: string;
    description: string;
    steps: string[];
  };
}

export const phases: Phase[] = [
  {
    id: 1,
    title: "Fundamentos de AI & Machine Learning",
    subtitle: "Base teórica y práctica para entender cómo funciona la IA",
    icon: "Brain",
    color: "from-blue-500 to-cyan-500",
    duration: "2-3 semanas",
    objectives: [
      "Comprender los fundamentos del Machine Learning",
      "Entender redes neuronales y deep learning",
      "Manejar APIs de modelos de lenguaje (OpenAI, Anthropic, etc.)",
      "Configurar un entorno de desarrollo para AI",
    ],
    theory: [
      "## ¿Qué es AI Engineering?\n\nAI Engineering es la disciplina que combina ingeniería de software con inteligencia artificial para crear sistemas que utilizan modelos de ML de forma productiva. No es solo 'usar ChatGPT', sino construir sistemas completos que integran IA de forma robusta, escalable y controlada.\n\n### Diferencia entre ML Engineer y AI Engineer\n- **ML Engineer**: Se enfoca en crear y entrenar modelos\n- **AI Engineer**: Se enfoca en INTEGRAR modelos existentes en aplicaciones productivas\n\n### El Stack del AI Engineer\n1. **LLMs**: GPT-4, Claude, Llama, Mistral\n2. **Frameworks**: LangChain, LlamaIndex, CrewAI\n3. **Vector DBs**: Pinecone, Weaviate, ChromaDB\n4. **Orquestación**: Python, FastAPI, Node.js\n5. **Deploy**: Docker, AWS, Vercel",
      "## Entendiendo los LLMs\n\nLos Large Language Models son redes neuronales transformer entrenadas en enormes cantidades de texto. Para un AI Engineer, necesitas entender:\n\n### Arquitectura Transformer\n- **Attention Mechanism**: Permite al modelo 'prestar atención' a partes relevantes del input\n- **Tokens**: Las unidades básicas de procesamiento (no son palabras completas)\n- **Context Window**: La cantidad de tokens que el modelo puede procesar a la vez\n- **Temperature**: Controla la 'creatividad' vs 'determinismo' de las respuestas\n\n### Parámetros clave\n```python\n# Estos son los parámetros que controlan el comportamiento del modelo\nresponse = client.chat.completions.create(\n    model=\"gpt-4\",\n    messages=[...],\n    temperature=0.7,      # 0 = determinista, 2 = máximo creativo\n    max_tokens=1000,      # Límite de tokens en la respuesta\n    top_p=0.9,            # Nucleus sampling\n    frequency_penalty=0,  # Penaliza repetición\n    presence_penalty=0,   # Penaliza temas repetidos\n)\n```\n\n### Tokens y Costos\n- 1 token ≈ 4 caracteres en inglés, ≈ 0.75 palabras\n- Los modelos cobran por input + output tokens\n- Optimizar tokens = optimizar costos",
      "## APIs de Modelos: Tu Primera Herramienta\n\nComo AI Engineer, tu trabajo principal es interactuar con APIs de modelos. Vamos a dominar esto:\n\n### OpenAI API\n```python\nfrom openai import OpenAI\n\nclient = OpenAI(api_key=\"tu-api-key\")\n\n# Chat completions - la base de todo\nresponse = client.chat.completions.create(\n    model=\"gpt-4-turbo\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"Eres un asistente experto en...\"},\n        {\"role\": \"user\", \"content\": \"Tu pregunta aquí\"}\n    ],\n    temperature=0.7\n)\n\nprint(response.choices[0].message.content)\n```\n\n### Anthropic Claude API\n```python\nimport anthropic\n\nclient = anthropic.Anthropic(api_key=\"tu-api-key\")\n\nmessage = client.messages.create(\n    model=\"claude-3-5-sonnet-20241022\",\n    max_tokens=1024,\n    system=\"Eres un asistente experto en...\",\n    messages=[\n        {\"role\": \"user\", \"content\": \"Tu pregunta aquí\"}\n    ]\n)\n\nprint(message.content[0].text)\n```\n\n### Streaming (Respuestas en tiempo real)\n```python\nstream = client.chat.completions.create(\n    model=\"gpt-4\",\n    messages=[{\"role\": \"user\", \"content\": \"Escribe un poema\"}],\n    stream=True\n)\n\nfor chunk in stream:\n    if chunk.choices[0].delta.content:\n        print(chunk.choices[0].delta.content, end=\"\")\n```",
    ],
    practices: [
      {
        id: "p1-1",
        title: "Tu primera llamada a un LLM",
        description: "Configura tu entorno y haz tu primera llamada a la API de OpenAI",
        language: "python",
        code: `# Paso 1: Instalar dependencias
# pip install openai python-dotenv

# Paso 2: Crear archivo .env
# OPENAI_API_KEY=sk-tu-api-key-aqui

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Práctica 1: Chat simple
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {
            "role": "system",
            "content": "Eres un tutor de programación que explica conceptos de forma simple"
        },
        {
            "role": "user", 
            "content": "¿Qué es una API?"
        }
    ],
    temperature=0.7,
    max_tokens=500
)

print("Respuesta:", response.choices[0].message.content)
print("Tokens usados:", response.usage.total_tokens)

# Práctica 2: Conversación con memoria
conversation = [
    {"role": "system", "content": "Eres un experto en Python"},
]

# Simulamos una conversación
questions = [
    "¿Qué es una lista en Python?",
    "¿Y un diccionario?",
    "¿Cuál es la diferencia principal entre ambos?"
]

for question in questions:
    conversation.append({"role": "user", "content": question})
    
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=conversation,
        temperature=0.7
    )
    
    answer = response.choices[0].message.content
    conversation.append({"role": "assistant", "content": answer})
    print(f"\\nP: {question}")
    print(f"R: {answer[:200]}...")`,
        explanation: "Esta práctica te enseña: 1) Cómo configurar la API, 2) Cómo usar system prompts para controlar el comportamiento, 3) Cómo mantener contexto en conversaciones, 4) Cómo medir el uso de tokens.",
      },
      {
        id: "p1-2",
        title: "Control de temperatura y parámetros",
        description: "Experimenta con los diferentes parámetros para entender cómo afectan las respuestas",
        language: "python",
        code: `from openai import OpenAI
import json

client = OpenAI()

# Experimento 1: Temperatura
# Compara cómo cambia la respuesta con diferentes temperaturas
temperatures = [0, 0.5, 1.0, 1.5]
prompt = "Inventa un nombre para una startup de AI"

print("=== Experimento con Temperatura ===\\n")
for temp in temperatures:
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=temp,
        max_tokens=50
    )
    print(f"Temp {temp}: {response.choices[0].message.content}")

# Experimento 2: Structured Output (JSON mode)
print("\\n=== Structured Output ===\\n")
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {
            "role": "system",
            "content": "Responde SOLO en formato JSON válido"
        },
        {
            "role": "user",
            "content": """Dame información sobre Python en este formato:
            {
                "nombre": "string",
                "anio_creacion": number,
                "creador": "string",
                "usos_principales": ["string"],
                "nivel_dificultad": "facil|medio|dificil"
            }"""
        }
    ],
    response_format={"type": "json_object"},
    temperature=0.3
)

data = json.loads(response.choices[0].message.content)
print(json.dumps(data, indent=2))

# Experimento 3: Función de retry con manejo de errores
import time

def robust_llm_call(messages, max_retries=3, **kwargs):
    """Llamada robusta con retry y manejo de errores"""
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                messages=messages,
                **kwargs
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error en intento {attempt + 1}: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise
    
    return None

# Uso
result = robust_llm_call(
    messages=[{"role": "user", "content": "Hola"}],
    model="gpt-4-turbo",
    temperature=0.7
)
print(f"\\nResultado robusto: {result}")`,
        explanation: "Aprender a controlar los parámetros del modelo es FUNDAMENTAL. La temperatura controla creatividad, el JSON mode te da outputs estructurados, y el retry pattern es esencial para producción.",
      },
    ],
    project: {
      title: "Asistente de Código Multi-Modelo",
      description: "Crea un asistente que use diferentes modelos para diferentes tareas, con manejo de errores, streaming y respuesta estructurada.",
      steps: [
        "Configurar un sistema que soporte múltiples proveedores (OpenAI, Anthropic)",
        "Implementar un router que seleccione el mejor modelo según la tarea",
        "Agregar streaming para respuestas en tiempo real",
        "Implementar structured output para respuestas parseables",
        "Crear un sistema de retry con exponential backoff",
        "Agregar logging de tokens y costos",
        "Implementar cache para respuestas frecuentes",
      ],
    },
  },
  {
    id: 2,
    title: "Prompt Engineering Avanzado",
    subtitle: "Domina el arte de comunicarte con los modelos de IA",
    icon: "MessageSquare",
    color: "from-purple-500 to-pink-500",
    duration: "2 semanas",
    objectives: [
      "Dominar técnicas avanzadas de prompting",
      "Crear system prompts efectivos y reutilizables",
      "Implementar chain-of-thought y few-shot learning",
      "Diseñar prompts para tareas específicas y complejas",
    ],
    theory: [
      "## Prompt Engineering: El Lenguaje de los LLMs\n\nEl prompt engineering no es 'escribir bien'. Es una disciplina de ingeniería que requiere entender cómo los modelos procesan información y diseñar inputs que maximicen la calidad de los outputs.\n\n### Principios Fundamentales\n\n1. **Claridad > Creatividad**: Sé específico y directo\n2. **Estructura > Prosa**: Usa formato, secciones, bullets\n3. **Ejemplos > Explicaciones**: Few-shot beats zero-shot\n4. **Restricciones > Libertad**: Define qué NO hacer\n5. **Iteración > Perfección**: Prueba, mide, mejora\n\n### Anatomía de un Prompt Profesional\n```\n[ROL] Eres un experto en X con Y años de experiencia\n[CONTEXTO] El usuario necesita Z porque...\n[TAREA] Tu trabajo es...\n[FORMATO] Responde en este formato exacto: ...\n[RESTRICCIONES] NO hagas esto: ...\n[EJEMPLOS] Ejemplo de input/output esperado: ...\n```",
      "## Técnicas Avanzadas de Prompting\n\n### 1. Chain-of-Thought (CoT)\nForzar al modelo a 'pensar en voz alta' mejora drásticamente la calidad:\n\n```\nResuelve este problema paso a paso:\n1. Primero, identifica los datos clave\n2. Luego, analiza las relaciones\n3. Después, considera posibles soluciones\n4. Finalmente, da tu respuesta con justificación\n```\n\n### 2. Few-Shot Learning\nDar ejemplos concretos es 10x más efectivo que describir:\n\n```\nClasifica el sentimiento de estos tweets:\n\nTweet: \"Este producto es increíble!\" → Positivo\nTweet: \"Terrible experiencia, nunca más\" → Negativo  \nTweet: \"Llegó a tiempo, nada especial\" → Neutral\nTweet: \"{input}\" →\n```\n\n### 3. Self-Consistency\nPedir múltiples respuestas y elegir la más consistente:\n\n```python\nresponses = []\nfor _ in range(5):\n    response = call_llm(prompt, temperature=0.8)\n    responses.append(response)\n# Elegir la respuesta más frecuente/consistente\n```\n\n### 4. Tree of Thoughts\nExplorar múltiples caminos de razonamiento:\n\n```\nPara resolver este problema, genera 3 enfoques diferentes:\n- Enfoque A: [describir]\n- Enfoque B: [describir]  \n- Enfoque C: [describir]\n\nLuego evalúa cada uno y selecciona el mejor.\n```",
      "## System Prompts que Funcionan\n\nUn system prompt bien diseñado es la diferencia entre un juguete y un producto:\n\n### Template Profesional\n```python\nSYSTEM_PROMPT = \"\"\"\n# ROL\nEres {role_name}, un asistente especializado en {domain}.\n\n# PERSONALIDAD\n- Tono: {tone}\n- Nivel de detalle: {detail_level}\n- Idioma: Español neutro\n\n# CAPACIDADES\n{capabilities}\n\n# REGLAS\n1. SIEMPRE verifica la información antes de responder\n2. Si no sabes algo, dilo claramente\n3. Usa ejemplos cuando sea posible\n4. NO inventes datos o estadísticas\n5. Mantén respuestas concisas ({max_words} palabras máx)\n\n# FORMATO DE RESPUESTA\n- Usa markdown para estructura\n- Incluye código en bloques ``` cuando sea relevante\n- Termina con un siguiente paso accionable\n\n# CONTEXTO DEL USUARIO\n- Nivel técnico: {user_level}\n- Idioma preferido: {preferred_language}\n\"\"\"\n```\n\n### Prompt Chaining\nDividir tareas complejas en una cadena de prompts:\n\n```python\n# Paso 1: Analizar\nanalysis = call_llm(f\"Analiza este texto: {text}\")\n\n# Paso 2: Planificar  \nplan = call_llm(f\"Basado en este análisis: {analysis}, crea un plan\")\n\n# Paso 3: Ejecutar\nresult = call_llm(f\"Ejecuta este plan: {plan}\")\n\n# Paso 4: Validar\nvalidated = call_llm(f\"Valida este resultado: {result}\")\n```",
    ],
    practices: [
      {
        id: "p2-1",
        title: "Sistema de Prompts con Templates",
        description: "Crea un sistema reutilizable de prompts con variables y templates",
        language: "python",
        code: `from openai import OpenAI
from typing import Dict, Any
import json

client = OpenAI()

# Sistema de Prompt Templates
class PromptTemplate:
    def __init__(self, template: str, input_variables: list):
        self.template = template
        self.input_variables = input_variables
    
    def format(self, **kwargs) -> str:
        """Rellena el template con las variables"""
        result = self.template
        for var in self.input_variables:
            if var not in kwargs:
                raise ValueError(f"Falta variable: {var}")
            result = result.replace(f"{{{{{var}}}}}", str(kwargs[var]))
        return result

# Definir templates reutilizables
CODE_REVIEW_PROMPT = PromptTemplate(
    template="""# ROL
Eres un Senior Software Engineer con 15 años de experiencia en {{language}}.

# TAREA
Revisa el siguiente código y proporciona feedback constructivo.

# CONTEXTO
- Nivel del desarrollador: {{level}}
- Propósito del código: {{purpose}}

# CÓDIGO A REVISAR
\`\`\`{{language}}
{{code}}
\`\`\`

# FORMATO DE RESPUESTA
1. **Resumen** (1-2 líneas)
2. **Problemas encontrados** (lista con severidad: 🔴 crítico, 🟡 medio, 🟢 sugerencia)
3. **Código corregido** (si aplica)
4. **Buenas prácticas** (qué hizo bien)

# RESTRICCIONES
- Sé específico, no genérico
- Incluye líneas de código en tus sugerencias
- Máximo {{max_words}} palabras
""",
    input_variables=["language", "level", "purpose", "code", "max_words"]
)

# Usar el template
formatted_prompt = CODE_REVIEW_PROMPT.format(
    language="python",
    level="junior",
    purpose="Función para procesar datos de usuarios",
    code="""
def process_users(data):
    result = []
    for i in range(len(data)):
        if data[i]['age'] > 18:
            result.append(data[i])
    return result
""",
    max_words="300"
)

# Ejecutar
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "system", "content": "Eres un code reviewer experto"},
        {"role": "user", "content": formatted_prompt}
    ],
    temperature=0.3
)

print(response.choices[0].message.content)

# --- Sistema de Prompt Manager ---
class PromptManager:
    """Gestor centralizado de prompts para tu aplicación"""
    
    def __init__(self):
        self.templates: Dict[str, PromptTemplate] = {}
        self.history: list = []
    
    def register(self, name: str, template: PromptTemplate):
        self.templates[name] = template
    
    def execute(self, name: str, model: str = "gpt-4-turbo", **kwargs) -> str:
        template = self.templates[name]
        prompt = template.format(**kwargs)
        
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        
        result = response.choices[0].message.content
        self.history.append({
            "template": name,
            "prompt": prompt,
            "response": result,
            "tokens": response.usage.total_tokens
        })
        
        return result

# Uso
manager = PromptManager()
manager.register("code_review", CODE_REVIEW_PROMPT)

result = manager.execute(
    "code_review",
    language="javascript",
    level="senior", 
    purpose="API endpoint handler",
    code="const handler = async (req, res) => { res.json({ok: true}) }",
    max_words="200"
)
print(result)`,
        explanation: "Este patrón de Prompt Templates es ESENCIAL en producción. Te permite versionar prompts, testearlos, y reutilizarlos. El PromptManager centraliza todo el manejo de prompts de tu aplicación.",
      },
      {
        id: "p2-2",
        title: "Chain-of-Thought con Auto-Validación",
        description: "Implementa un sistema de razonamiento paso a paso con validación automática",
        language: "python",
        code: `from openai import OpenAI
import json

client = OpenAI()

class ChainOfThought:
    """Sistema de razonamiento con validación automática"""
    
    def __init__(self, model="gpt-4-turbo"):
        self.model = model
        self.steps = []
    
    def think(self, question: str) -> dict:
        """Ejecuta chain-of-thought con validación"""
        
        # Paso 1: Razonamiento
        reasoning_prompt = f"""Resuelve el siguiente problema usando chain-of-thought.

PROBLEMA: {question}

INSTRUCCIONES:
1. Primero, identifica qué se está preguntando
2. Lista los datos relevantes
3. Razona paso a paso mostrando tu lógica
4. Llega a una conclusión
5. Verifica tu respuesta (¿tiene sentido? ¿es consistente?)

Responde en formato JSON:
{{
    "understanding": "Qué se pregunta",
    "data": ["dato1", "dato2"],
    "reasoning_steps": ["paso 1", "paso 2", ...],
    "conclusion": "respuesta final",
    "confidence": 0.0-1.0,
    "verification": "¿La respuesta es consistente?"
}}"""
        
        response = client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": reasoning_prompt}],
            response_format={"type": "json_object"},
            temperature=0.3
        )
        
        result = json.loads(response.choices[0].message.content)
        self.steps.append(result)
        
        # Paso 2: Auto-validación si la confianza es baja
        if result.get("confidence", 1.0) < 0.7:
            result = self._validate_and_retry(question, result)
        
        return result
    
    def _validate_and_retry(self, question: str, previous: dict) -> dict:
        """Si la confianza es baja, re-intenta con más contexto"""
        
        validation_prompt = f"""Tu respuesta anterior fue:
{json.dumps(previous, indent=2)}

Tu nivel de confianza era bajo ({previous.get('confidence', 0)}).

Por favor:
1. Revisa tu razonamiento
2. Identifica posibles errores
3. Intenta un enfoque diferente si es necesario
4. Responde con mayor certeza

PROBLEMA ORIGINAL: {question}

Responde en el mismo formato JSON."""
        
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "user", "content": validation_prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.2
        )
        
        return json.loads(response.choices[0].message.content)

# Uso
cot = ChainOfThought()

# Problema complejo
result = cot.think("""
Un restaurante tiene 50 mesas. El viernes por la noche, 
el 80% de las mesas están ocupadas. Cada mesa ocupada 
tiene en promedio 3.5 personas. El restaurante gana 
$45 por persona en promedio. ¿Cuánto ganó el restaurante 
esa noche?
""")

print("=== Chain of Thought Result ===")
print(f"Entendimiento: {result['understanding']}")
print(f"\\nPasos de razonamiento:")
for i, step in enumerate(result['reasoning_steps'], 1):
    print(f"  {i}. {step}")
print(f"\\nConclusión: {result['conclusion']}")
print(f"Confianza: {result['confidence']*100}%")
print(f"Verificación: {result['verification']}")`,
        explanation: "Chain-of-Thought con auto-validación es una técnica poderosa para tareas complejas. El modelo 'piensa en voz alta', se evalúa a sí mismo, y si no está seguro, reintenta con más contexto.",
      },
    ],
    project: {
      title: "Motor de Prompts Inteligente",
      description: "Construye un sistema completo de gestión de prompts con templates, versionado, A/B testing y métricas de calidad.",
      steps: [
        "Crear un PromptManager con registro de templates",
        "Implementar sistema de variables y herencia de prompts",
        "Agregar métricas: tokens usados, latencia, calidad",
        "Implementar A/B testing entre versiones de prompts",
        "Crear un dashboard para visualizar el rendimiento",
        "Agregar sistema de feedback automático",
        "Implementar versionado con git-like semantics",
      ],
    },
  },
  {
    id: 3,
    title: "AI Agents & Tool Use",
    subtitle: "Construye agentes autónomos que usan herramientas y toman decisiones",
    icon: "Bot",
    color: "from-green-500 to-emerald-500",
    duration: "3 semanas",
    objectives: [
      "Entender la arquitectura de AI Agents",
      "Implementar function calling y tool use",
      "Crear agentes con memoria a corto y largo plazo",
      "Diseñar sistemas multi-agente",
    ],
    theory: [
      "## ¿Qué es un AI Agent?\n\nUn AI Agent es un sistema que:\n1. **Percibe** su entorno (inputs del usuario, datos)\n2. **Razona** sobre qué hacer (planificación)\n3. **Actúa** usando herramientas (APIs, código, búsqueda)\n4. **Aprende** de los resultados (memoria, feedback)\n\n### Arquitectura de un Agent\n```\n┌─────────────────────────────────────┐\n│           AI AGENT                   │\n│                                      │\n│  ┌──────────┐    ┌──────────────┐   │\n│  │   LLM    │◄──►│   PLANNER    │   │\n│  │ (cerebro)│    │ (razonamiento)│   │\n│  └──────────┘    └──────────────┘   │\n│       │                │             │\n│       ▼                ▼             │\n│  ┌──────────────────────────────┐   │\n│  │      TOOL EXECUTOR           │   │\n│  │  (search, code, api, db)     │   │\n│  └──────────────────────────────┘   │\n│       │                              │\n│       ▼                              │\n│  ┌──────────────────────────────┐   │\n│  │        MEMORY                │   │\n│  │  (corto plazo + largo plazo) │   │\n│  └──────────────────────────────┘   │\n└─────────────────────────────────────┘\n```\n\n### Tipos de Agentes\n- **ReAct**: Reason + Act (piensa, actúa, observa, repite)\n- **Plan-and-Execute**: Planifica todo, luego ejecuta\n- **Multi-Agent**: Varios agentes colaborando\n- **Reflexion**: Agentes que aprenden de sus errores",
      "## Function Calling: Dar Poderes al LLM\n\nFunction calling permite al modelo decidir cuándo y qué herramientas usar:\n\n```python\n# Definir herramientas disponibles\ntools = [\n    {\n        \"type\": \"function\",\n        \"function\": {\n            \"name\": \"search_web\",\n            \"description\": \"Busca información en internet\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"query\": {\n                        \"type\": \"string\",\n                        \"description\": \"La búsqueda a realizar\"\n                    }\n                },\n                \"required\": [\"query\"]\n            }\n        }\n    },\n    {\n        \"type\": \"function\",\n        \"function\": {\n            \"name\": \"calculate\",\n            \"description\": \"Realiza cálculos matemáticos\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"expression\": {\n                        \"type\": \"string\",\n                        \"description\": \"Expresión matemática\"\n                    }\n                },\n                \"required\": [\"expression\"]\n            }\n        }\n    }\n]\n```\n\n### El Loop del Agent\n```python\nwhile True:\n    # 1. El LLM decide qué hacer\n    response = llm.chat(messages, tools=tools)\n    \n    # 2. Si necesita usar una herramienta\n    if response.tool_calls:\n        for tool_call in response.tool_calls:\n            result = execute_tool(tool_call)\n            messages.append({\"role\": \"tool\", \"content\": result})\n    else:\n        # 3. Si tiene la respuesta final\n        break\n```\n\n### Patrones de Agentes\n1. **Router Agent**: Decide qué sub-agente usar\n2. **Supervisor**: Coordina múltiples agentes\n3. **Worker**: Ejecuta tareas específicas\n4. **Critic**: Evalúa y valida resultados",
      "## Memoria en Agentes\n\nLa memoria es lo que separa un chatbot de un agent real:\n\n### Tipos de Memoria\n```python\nclass AgentMemory:\n    def __init__(self):\n        # Memoria a corto plazo (contexto actual)\n        self.short_term = []  # Últimos N mensajes\n        self.max_short_term = 20\n        \n        # Memoria a largo plazo (conocimiento persistente)\n        self.long_term = {}  # Base de datos vectorial\n        \n        # Memoria episódica (experiencias pasadas)\n        self.episodic = []  # Interacciones importantes\n    \n    def add_short_term(self, message):\n        self.short_term.append(message)\n        if len(self.short_term) > self.max_short_term:\n            # Resumen automático cuando se llena\n            self._compress_short_term()\n    \n    def _compress_short_term(self):\n        \"\"\"Comprime memoria antigua en un resumen\"\"\"\n        old_messages = self.short_term[:10]\n        summary = summarize(old_messages)  # Llama al LLM\n        self.short_term = [summary] + self.short_term[10:]\n    \n    def search_long_term(self, query):\n        \"\"\"Busca en memoria a largo plazo\"\"\"\n        # Usar embeddings + similitud coseno\n        results = vector_db.search(query, top_k=5)\n        return results\n```\n\n### Implementación Práctica\n```python\nfrom langchain.memory import ConversationBufferMemory\nfrom langchain.memory import VectorStoreRetrieverMemory\n\n# Memoria conversacional simple\nmemory = ConversationBufferMemory(\n    memory_key=\"chat_history\",\n    return_messages=True\n)\n\n# Memoria con búsqueda vectorial\nretriever = vectorstore.as_retriever(search_kwargs={\"k\": 5})\nvector_memory = VectorStoreRetrieverMemory(retriever=retriever)\n\n# Guardar en memoria\nvector_memory.save_context(\n    {\"input\": \"El usuario prefiere Python\"},\n    {\"output\": \"Guardado: preferencia por Python\"}\n)\n\n# Buscar en memoria\nrelevant = vector_memory.load_memory_variables(\n    {\"prompt\": \"¿Qué lenguaje prefiere el usuario?\"}\n)\n```",
    ],
    practices: [
      {
        id: "p3-1",
        title: "Tu Primer Agent con Tools",
        description: "Construye un agent que puede buscar en web, hacer cálculos y escribir archivos",
        language: "python",
        code: `from openai import OpenAI
import json
import os

client = OpenAI()

# === DEFINIR HERRAMIENTAS ===

def search_web(query: str) -> str:
    """Simula búsqueda web (en producción usarías SerpAPI, Tavily, etc.)"""
    # En producción: from tavily import TavilyClient
    # client = TavilyClient(api_key="...")
    # results = client.search(query)
    return f"Resultados para '{query}': [Simulated results about {query}]"

def calculate(expression: str) -> str:
    """Calculadora segura"""
    try:
        # Solo permitir operaciones matemáticas seguras
        allowed = set("0123456789+-*/.() ")
        if not all(c in allowed for c in expression):
            return "Error: Expresión no válida"
        result = eval(expression)  # Solo seguro por el filtro anterior
        return str(result)
    except Exception as e:
        return f"Error: {str(e)}"

def write_file(filename: str, content: str) -> str:
    """Escribe contenido a un archivo"""
    try:
        os.makedirs("output", exist_ok=True)
        filepath = f"output/{filename}"
        with open(filepath, "w") as f:
            f.write(content)
        return f"Archivo '{filepath}' escrito exitosamente ({len(content)} bytes)"
    except Exception as e:
        return f"Error: {str(e)}"

def read_file(filename: str) -> str:
    """Lee un archivo"""
    try:
        filepath = f"output/{filename}"
        with open(filepath, "r") as f:
            return f.read()
    except FileNotFoundError:
        return f"Error: Archivo '{filename}' no encontrado"

# === DEFINIR TOOL SCHEMAS ===

tool_schemas = [
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "Busca información actualizada en internet. Úsalo cuando necesites datos recientes o verificación.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Query de búsqueda"}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "Realiza cálculos matemáticos. Úsalo para cualquier operación numérica.",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "Expresión matemática (ej: '2 + 2 * 3')"}
                },
                "required": ["expression"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Escribe contenido a un archivo. Úsalo para guardar resultados, código, reportes.",
            "parameters": {
                "type": "object",
                "properties": {
                    "filename": {"type": "string", "description": "Nombre del archivo"},
                    "content": {"type": "string", "description": "Contenido a escribir"}
                },
                "required": ["filename", "content"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Lee el contenido de un archivo previamente creado.",
            "parameters": {
                "type": "object",
                "properties": {
                    "filename": {"type": "string", "description": "Nombre del archivo a leer"}
                },
                "required": ["filename"]
            }
        }
    }
]

# === MAPA DE FUNCIONES ===
FUNCTION_MAP = {
    "search_web": search_web,
    "calculate": calculate,
    "write_file": write_file,
    "read_file": read_file,
}

# === EL AGENT ===
class SimpleAgent:
    def __init__(self, model="gpt-4-turbo", max_iterations=10):
        self.model = model
        self.max_iterations = max_iterations
        self.messages = []
        self.tool_calls_log = []
    
    def run(self, user_input: str) -> str:
        """Ejecuta el agent loop"""
        self.messages = [
            {
                "role": "system",
                "content": """Eres un asistente inteligente con acceso a herramientas.
                
REGLAS:
1. Usa herramientas cuando necesites información o acciones concretas
2. Siempre explica qué estás haciendo y por qué
3. Si una herramienta falla, intenta un enfoque alternativo
4. Cuando tengas toda la información, da tu respuesta final
5. Sé conciso pero completo"""
            },
            {"role": "user", "content": user_input}
        ]
        
        for iteration in range(self.max_iterations):
            print(f"\\n--- Iteración {iteration + 1} ---")
            
            # Llamar al LLM
            response = client.chat.completions.create(
                model=self.model,
                messages=self.messages,
                tools=tool_schemas,
                tool_choice="auto",
                temperature=0.3
            )
            
            message = response.choices[0].message
            
            # Si el modelo quiere usar herramientas
            if message.tool_calls:
                # Agregar el mensaje del assistant con tool_calls
                self.messages.append(message)
                
                # Ejecutar cada tool call
                for tool_call in message.tool_calls:
                    func_name = tool_call.function.name
                    func_args = json.loads(tool_call.function.arguments)
                    
                    print(f"🔧 Usando herramienta: {func_name}({func_args})")
                    
                    # Ejecutar la función
                    if func_name in FUNCTION_MAP:
                        result = FUNCTION_MAP[func_name](**func_args)
                    else:
                        result = f"Error: Herramienta '{func_name}' no encontrada"
                    
                    print(f"📋 Resultado: {result[:100]}...")
                    
                    # Agregar resultado al contexto
                    self.messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": str(result)
                    })
                    
                    self.tool_calls_log.append({
                        "iteration": iteration + 1,
                        "tool": func_name,
                        "args": func_args,
                        "result": result
                    })
            else:
                # Respuesta final
                print(f"\\n✅ Respuesta final:")
                return message.content
        
        return "Error: Máximo de iteraciones alcanzado"

# === PROBAR EL AGENT ===
agent = SimpleAgent()

# Tarea compleja que requiere múltiples herramientas
result = agent.run("""
Necesito que me ayudes con lo siguiente:
1. Busca información sobre las últimas tendencias en AI (2024)
2. Calcula cuánto costaría entrenar un modelo GPT-4 si tengo 1M de tokens a $0.01/1K tokens
3. Escribe un resumen en un archivo llamado 'ai_report.md'
4. Lee el archivo para confirmar que se guardó bien
""")

print(f"\\n{'='*50}")
print(result)
print(f"\\n{'='*50}")
print(f"\\nTool calls realizados: {len(agent.tool_calls_log)}")
for log in agent.tool_calls_log:
    print(f"  [{log['iteration']}] {log['tool']}({log['args']})")`,
        explanation: "Este es un agent completo con loop de razonamiento. Observa cómo: 1) El LLM decide qué herramientas usar, 2) Ejecuta las herramientas y recibe resultados, 3) Decide si necesita más información o dar la respuesta final. Este patrón es la base de TODOS los agents.",
      },
      {
        id: "p3-2",
        title: "Multi-Agent System",
        description: "Crea un sistema donde múltiples agentes colaboran para resolver tareas complejas",
        language: "python",
        code: `from openai import OpenAI
import json

client = OpenAI()

# === DEFINIR AGENTES ESPECIALIZADOS ===

class Agent:
    def __init__(self, name: str, role: str, system_prompt: str):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt
        self.messages = [{"role": "system", "content": system_prompt}]
    
    def think(self, task: str, context: str = "") -> str:
        """El agente piensa sobre una tarea"""
        messages = self.messages.copy()
        if context:
            messages.append({"role": "user", "content": f"CONTEXTO PREVIO:\\n{context}"})
        messages.append({"role": "user", "content": task})
        
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=messages,
            temperature=0.5
        )
        
        result = response.choices[0].message.content
        self.messages.append({"role": "assistant", "content": result})
        return result

# Crear agentes especializados
researcher = Agent(
    name="Investigador",
    role="research",
    system_prompt="""Eres un investigador experto. Tu trabajo es:
- Analizar preguntas y descomponerlas
- Identificar qué información necesitas
- Proporcionar datos y hechos relevantes
- Ser preciso y citar fuentes cuando sea posible

Responde siempre con datos concretos y estructurados."""
)

strategist = Agent(
    name="Estratega", 
    role="strategy",
    system_prompt="""Eres un estratega de negocio. Tu trabajo es:
- Tomar la información del investigador
- Identificar oportunidades y riesgos
- Crear planes de acción concretos
- Priorizar por impacto y esfuerzo

Responde con planes accionables y medibles."""
)

writer = Agent(
    name="Escritor",
    role="writing",
    system_prompt="""Eres un escritor técnico experto. Tu trabajo es:
- Tomar la estrategia y convertirla en documentos claros
- Usar un lenguaje profesional pero accesible
- Estructurar la información de forma lógica
- Incluir ejemplos cuando sea útil

Responde con texto bien formateado en markdown."""
)

critic = Agent(
    name="Crítico",
    role="quality",
    system_prompt="""Eres un revisor de calidad. Tu trabajo es:
- Evaluar el trabajo de los otros agentes
- Identificar errores, omisiones o mejoras
- Dar feedback constructivo específico
- Aprobar o pedir correcciones

Responde con:
- ✅ Puntos fuertes
- ⚠️ Áreas de mejora  
- 📝 Correcciones específicas
- VEREDICTO: APROBADO / REQUIERE CAMBIOS"""
)

# === ORQUESTADOR ===

class MultiAgentOrchestrator:
    def __init__(self):
        self.agents = {
            "researcher": researcher,
            "strategist": strategist,
            "writer": writer,
            "critic": critic
        }
        self.workflow_log = []
    
    def run_pipeline(self, task: str) -> str:
        """Ejecuta el pipeline completo de agentes"""
        print(f"🎯 Tarea: {task}\\n")
        
        # Paso 1: Investigación
        print("🔍 Paso 1: Investigación...")
        research = self.agents["researcher"].think(task)
        self.workflow_log.append(("researcher", research))
        print(f"   ✅ Investigación completada\\n")
        
        # Paso 2: Estrategia
        print("📊 Paso 2: Creando estrategia...")
        strategy = self.agents["strategist"].think(
            f"Crea una estrategia basada en esta investigación: {task}",
            context=research
        )
        self.workflow_log.append(("strategist", strategy))
        print(f"   ✅ Estrategia creada\\n")
        
        # Paso 3: Escritura
        print("✍️ Paso 3: Redactando documento...")
        document = self.agents["writer"].think(
            "Crea un documento profesional basado en la estrategia",
            context=f"Investigación:\\n{research}\\n\\nEstrategia:\\n{strategy}"
        )
        self.workflow_log.append(("writer", document))
        print(f"   ✅ Documento redactado\\n")
        
        # Paso 4: Revisión crítica
        print("🔎 Paso 4: Revisión de calidad...")
        review = self.agents["critic"].think(
            "Revisa este documento y da tu veredicto",
            context=f"Tarea original: {task}\\n\\nDocumento:\\n{document}"
        )
        self.workflow_log.append(("critic", review))
        
        # Si no está aprobado, iterar
        if "REQUIERE CAMBIOS" in review:
            print("   ⚠️ Se requieren cambios. Iterando...\\n")
            revised = self.agents["writer"].think(
                f"Revisa el documento según este feedback:\\n{review}",
                context=document
            )
            self.workflow_log.append(("writer_revised", revised))
            document = revised
        
        print(f"   ✅ Revisión completada\\n")
        
        return document

# === EJECUTAR ===
orchestrator = MultiAgentOrchestrator()

result = orchestrator.run_pipeline(
    "Analiza el mercado de AI agents en 2024 y crea un plan para lanzar un producto SaaS de AI agents para empresas de e-commerce"
)

print("=" * 60)
print("📄 DOCUMENTO FINAL:")
print("=" * 60)
print(result)

print(f"\\n\\n📊 WORKFLOW LOG:")
for agent, output in orchestrator.workflow_log:
    print(f"\\n[{agent.upper()}] ({len(output)} chars)")
    print(f"  Preview: {output[:100]}...")`,
        explanation: "Este sistema multi-agente simula un equipo completo: investigador, estratega, escritor y crítico. Cada agente tiene su especialización y el orquestador coordina el flujo. Este patrón es usado en producción por empresas como AutoGPT, CrewAI y LangGraph.",
      },
    ],
    project: {
      title: "Agente de Automatización de Tareas",
      description: "Construye un agent completo que pueda automatizar tareas del mundo real: investigar, analizar datos, generar reportes y ejecutar acciones.",
      steps: [
        "Implementar el agent loop con function calling",
        "Agregar herramientas: web search, file I/O, code execution",
        "Implementar memoria a corto y largo plazo",
        "Crear un sistema de planificación con descomposición de tareas",
        "Agregar manejo de errores y recovery",
        "Implementar un sistema de logging y observabilidad",
        "Crear una interfaz web para interactuar con el agent",
        "Agregar soporte para múltiples modelos (fallback)",
      ],
    },
  },
  {
    id: 4,
    title: "RAG & Knowledge Systems",
    subtitle: "Sistemas de recuperación aumentada para dar conocimiento a tu AI",
    icon: "Database",
    color: "from-orange-500 to-red-500",
    duration: "3 semanas",
    objectives: [
      "Entender y implementar RAG (Retrieval Augmented Generation)",
      "Dominar embeddings y bases de datos vectoriales",
      "Construir pipelines de ingestión de documentos",
      "Optimizar la calidad de retrieval y generación",
    ],
    theory: [
      "## RAG: Retrieval Augmented Generation\n\nRAG es el patrón más importante en AI Engineering productivo. Permite que un LLM responda preguntas usando TU conocimiento específico, no solo su entrenamiento.\n\n### ¿Por qué RAG?\n- Los LLMs tienen conocimiento limitado a su fecha de corte\n- No conocen tus datos privados (documentos, APIs, DBs)\n- Alucinan cuando no saben algo\n- RAG les da contexto específico y actualizado\n\n### Arquitectura RAG\n```\n┌─────────────┐     ┌──────────────┐     ┌─────────────┐\n│  DOCUMENTOS │────►│  CHUNKING +  │────►│  VECTOR DB  │\n│  (tu data)  │     │  EMBEDDINGS  │     │  (Pinecone) │\n└─────────────┘     └──────────────┘     └─────────────┘\n                                                │\n                    ┌──────────────┐            │\n                    │   USUARIO    │            │\n                    │  (pregunta)  │            │\n                    └──────┬───────┘            │\n                           │                    │\n                           ▼                    ▼\n                    ┌──────────────────────────────┐\n                    │      RETRIEVAL               │\n                    │  (buscar chunks relevantes)  │\n                    └──────────────┬───────────────┘\n                                   │\n                                   ▼\n                    ┌──────────────────────────────┐\n                    │    LLM + CONTEXT             │\n                    │  (generar respuesta con      │\n                    │   los chunks encontrados)    │\n                    └──────────────────────────────┘\n```\n\n### El Pipeline Completo\n1. **Ingestión**: Documentos → Chunks → Embeddings → Vector DB\n2. **Query**: Pregunta → Embedding → Búsqueda → Top-K chunks\n3. **Generación**: Pregunta + Chunks → LLM → Respuesta",
      "## Embeddings: El Puente entre Texto y Matemáticas\n\nLos embeddings convierten texto en vectores numéricos que capturan significado semántico:\n\n```python\nfrom openai import OpenAI\nimport numpy as np\n\nclient = OpenAI()\n\n# Generar embeddings\ndef get_embedding(text: str, model=\"text-embedding-3-small\") -> list:\n    response = client.embeddings.create(\n        input=text,\n        model=model\n    )\n    return response.data[0].embedding\n\n# Ejemplo\nemb1 = get_embedding(\"El gato está durmiendo\")\nemb2 = get_embedding(\"El felino descansa\")\nemb3 = get_embedding(\"La bolsa de valores cayó\")\n\n# Similitud coseno\ndef cosine_similarity(a, b):\n    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\n\nprint(f\"'gato durmiendo' vs 'felino descansa': {cosine_similarity(emb1, emb2):.3f}\")\n# → ~0.85 (muy similares semánticamente)\n\nprint(f\"'gato durmiendo' vs 'bolsa de valores': {cosine_similarity(emb1, emb3):.3f}\")\n# → ~0.15 (muy diferentes)\n```\n\n### Modelos de Embeddings\n| Modelo | Dimensiones | Calidad | Costo |\n|--------|-------------|---------|-------|\n| text-embedding-3-small | 1536 | Bueno | $0.02/1M tokens |\n| text-embedding-3-large | 3072 | Excelente | $0.13/1M tokens |\n| BGE-large (local) | 1024 | Bueno | Gratis |\n| Cohere embed-v3 | 1024 | Muy bueno | $0.10/1M tokens |",
      "## Chunking Strategies: El Arte de Dividir Documentos\n\nCómo divides tus documentos determina la calidad de tu RAG:\n\n```python\n# Estrategia 1: Fixed-size chunks (simple pero efectivo)\ndef fixed_size_chunk(text, chunk_size=500, overlap=50):\n    chunks = []\n    for i in range(0, len(text), chunk_size - overlap):\n        chunk = text[i:i + chunk_size]\n        chunks.append(chunk)\n    return chunks\n\n# Estrategia 2: Semantic chunking (por significado)\ndef semantic_chunk(text, max_chunk=1000):\n    \"\"\"Divide por párrafos/secciones manteniendo coherencia\"\"\"\n    paragraphs = text.split('\\n\\n')\n    chunks = []\n    current_chunk = \"\"\n    \n    for para in paragraphs:\n        if len(current_chunk) + len(para) > max_chunk:\n            if current_chunk:\n                chunks.append(current_chunk.strip())\n            current_chunk = para\n        else:\n            current_chunk += \"\\n\\n\" + para\n    \n    if current_chunk:\n        chunks.append(current_chunk.strip())\n    return chunks\n\n# Estrategia 3: Recursive chunking (LangChain style)\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=1000,\n    chunk_overlap=200,\n    separators=[\"\\n\\n\", \"\\n\", \". \", \" \", \"\"]\n)\nchunks = splitter.split_text(document)\n```\n\n### Optimización de Retrieval\n```python\n# Hybrid Search: Combina búsqueda semántica + keyword\ndef hybrid_search(query, vector_db, top_k=5):\n    # Búsqueda semántica (embeddings)\n    semantic_results = vector_db.similarity_search(query, k=top_k)\n    \n    # Búsqueda keyword (BM25)\n    keyword_results = vector_db.bm25_search(query, k=top_k)\n    \n    # Reciprocal Rank Fusion\n    combined = rrf_merge(semantic_results, keyword_results)\n    return combined[:top_k]\n\n# Re-ranking: Re-ordenar resultados con un modelo más potente\ndef rerank_results(query, results, model=\"cross-encoder\"):\n    \"\"\"Usa un modelo de re-ranking para mejorar el orden\"\"\"\n    scored = []\n    for doc in results:\n        score = cross_encoder.predict((query, doc.text))\n        scored.append((score, doc))\n    scored.sort(reverse=True)\n    return [doc for _, doc in scored]\n```\n\n### Metadata Filtering\n```python\n# Filtrar por metadata antes de búsqueda semántica\nresults = vector_db.similarity_search(\n    query=\"política de devoluciones\",\n    filter={\n        \"department\": \"ventas\",\n        \"date\": {\"$gte\": \"2024-01-01\"},\n        \"status\": \"activo\"\n    },\n    k=5\n)\n```",
    ],
    practices: [
      {
        id: "p4-1",
        title: "Sistema RAG Completo desde Cero",
        description: "Construye un sistema RAG funcional con embeddings, vector store y generación contextual",
        language: "python",
        code: `from openai import OpenAI
import numpy as np
import json
import os

client = OpenAI()

# === SIMPLE VECTOR DATABASE (desde cero) ===

class SimpleVectorDB:
    """Base de datos vectorial simple para entender los conceptos"""
    
    def __init__(self):\n        self.documents = []  # Texto original
        self.embeddings = []  # Vectores
        self.metadata = []    # Metadata de cada doc
    
    def add(self, text: str, meta: dict = None):
        """Agrega un documento con su embedding"""
        embedding = self._get_embedding(text)
        self.documents.append(text)
        self.embeddings.append(embedding)
        self.metadata.append(meta or {})
        print(f"  📄 Agregado: '{text[:50]}...' (dim={len(embedding)})")
    
    def search(self, query: str, top_k: int = 3, filters: dict = None) -> list:
        """Busca documentos similares al query"""
        query_embedding = self._get_embedding(query)
        
        # Calcular similitud con todos los documentos
        scores = []
        for i, doc_emb in enumerate(self.embeddings):
            # Aplicar filtros de metadata si existen
            if filters:
                match = all(\n                    self.metadata[i].get(k) == v \n                    for k, v in filters.items()\n                )\n                if not match:\n                    continue\n            \n            similarity = self._cosine_similarity(query_embedding, doc_emb)\n            scores.append((similarity, i))\n        \n        # Ordenar por similitud (mayor primero)\n        scores.sort(reverse=True)\n        \n        results = []\n        for score, idx in scores[:top_k]:\n            results.append({\n                "text": self.documents[idx],\n                "score": score,\n                "metadata": self.metadata[idx]\n            })\n        \n        return results\n    \n    def _get_embedding(self, text: str) -> list:\n        response = client.embeddings.create(\n            input=text,\n            model="text-embedding-3-small"\n        )\n        return response.data[0].embedding\n    \n    def _cosine_similarity(self, a: list, b: list) -> float:\n        a, b = np.array(a), np.array(b)\n        return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))\n    \n    def save(self, filepath: str):\n        """Persiste la base de datos"""
        data = {\n            "documents": self.documents,\n            "embeddings": self.embeddings,\n            "metadata": self.metadata\n        }\n        with open(filepath, 'w') as f:\n            json.dump(data, f)\n    \n    def load(self, filepath: str):\n        """Carga la base de datos"""
        with open(filepath, 'r') as f:\n            data = json.load(f)\n        self.documents = data["documents"]\n        self.embeddings = data["embeddings"]\n        self.metadata = data["metadata"]


# === RAG SYSTEM ===

class RAGSystem:\n    def __init__(self, vector_db: SimpleVectorDB):\n        self.db = vector_db\n        self.conversation_history = []\n    \n    def ingest_documents(self, documents: list):\n        """Ingesta documentos en el sistema"""
        print("📥 Ingestando documentos...")\n        for doc in documents:\n            # Chunking simple\n            chunks = self._chunk_text(doc["text"], chunk_size=300)\n            for chunk in chunks:\n                self.db.add(chunk, meta={\n                    "source": doc.get("source", "unknown"),\n                    "type": doc.get("type", "general")\n                })\n        print(f"✅ {len(documents)} documentos procesados\\n")\n    \n    def _chunk_text(self, text: str, chunk_size: int = 300) -> list:\n        """Divide texto en chunks con overlap"""\n        words = text.split()\n        chunks = []\n        for i in range(0, len(words), chunk_size - 50):  # 50 words overlap\n            chunk = " ".join(words[i:i + chunk_size])\n            if chunk.strip():\n                chunks.append(chunk)\n        return chunks\n    \n    def query(self, question: str, top_k: int = 3) -> str:\n        """Responde una pregunta usando RAG"""\n        print(f"❓ Pregunta: {question}")\n        \n        # Paso 1: Retrieval\n        print("🔍 Buscando contexto relevante...")\n        results = self.db.search(question, top_k=top_k)\n        \n        context = ""\n        for i, r in enumerate(results, 1):\n            context += f"\\n[Documento {i}] (relevancia: {r['score']:.3f})\\n{r['text']}\\n"\n            print(f"  📄 Chunk {i}: score={r['score']:.3f}, source={r['metadata'].get('source')}")\n        \n        # Paso 2: Generación con contexto\n        print("🤖 Generando respuesta...")\n        \n        messages = [\n            {\n                "role": "system",\n                "content": f"""Eres un asistente que responde preguntas basándose en el contexto proporcionado.\n\nREGLAS:\n1. SOLO usa información del contexto para responder\n2. Si la respuesta no está en el contexto, dilo claramente\n3. Cita la fuente cuando sea posible\n4. Sé conciso pero completo\n\nCONTEXTO DISPONIBLE:\n{context}"""\n            },\n            {"role": "user", "content": question}\n        ]\n        \n        response = client.chat.completions.create(\n            model="gpt-4-turbo",\n            messages=messages,\n            temperature=0.3\n        )\n        \n        answer = response.choices[0].message.content\n        print(f"\\n💡 Respuesta: {answer}\\n")\n        \n        return answer\n\n\n# === DEMO COMPLETA ===\n\n# 1. Crear documentos de conocimiento\ndocuments = [\n    {\n        "text": "Python es un lenguaje de programación de alto nivel, interpretado y de propósito general. Fue creado por Guido van Rossum y lanzado en 1991. Python tiene una sintaxis clara y legible que lo hace ideal para principiantes. Es ampliamente usado en web development, data science, AI, automatización y más.",\n        "source": "python_docs",\n        "type": "programming"\n    },\n    {\n        "text": "FastAPI es un framework web moderno para Python, creado por Sebastián Ramírez en 2018. Usa type hints de Python para validación automática de datos. Es uno de los frameworks más rápidos disponibles, comparable a NodeJS y Go. Soporta async/await nativamente y genera documentación OpenAPI automáticamente.",\n        "source": "fastapi_docs", \n        "type": "programming"\n    },\n    {\n        "text": "Los embeddings son representaciones vectoriales de texto que capturan significado semántico. Textos con significado similar tienen embeddings cercanos en el espacio vectorial. Se usan para búsqueda semántica, clustering, clasificación y como input para modelos de ML. OpenAI ofrece text-embedding-3-small y text-embedding-3-large.",\n        "source": "ai_docs",\n        "type": "ai"\n    },\n    {\n        "text": "RAG (Retrieval Augmented Generation) es un patrón que combina búsqueda de documentos con generación de texto por LLMs. El proceso es: 1) El usuario hace una pregunta, 2) Se buscan documentos relevantes usando embeddings, 3) Los documentos se pasan como contexto al LLM, 4) El LLM genera una respuesta basada en el contexto. Esto reduce alucinaciones y permite usar conocimiento actualizado.",\n        "source": "ai_docs",\n        "type": "ai"\n    },\n    {\n        "text": "Pinecone es una base de datos vectorial cloud diseñada para ML. Soporta millones de vectores con búsqueda en milisegundos. Ofrece filtrado por metadata, namespaces para aislamiento y escalado automático. Alternativas incluyen Weaviate, ChromaDB, Qdrant y Milvus.",\n        "source": "tools_docs",\n        "type": "tools"\n    }\n]\n\n# 2. Crear y poblar el sistema\nprint("=" * 50)\nprint("🚀 INICIANDO SISTEMA RAG")\nprint("=" * 50 + "\\n")\n\nvector_db = SimpleVectorDB()\nrag = RAGSystem(vector_db)\nrag.ingest_documents(documents)\n\n# 3. Hacer queries\nprint("=" * 50)\nprint("🔍 QUERIES DE PRUEBA")\nprint("=" * 50 + "\\n")\n\nquestions = [\n    "¿Qué es RAG y cómo funciona?",\n    "¿Cuál es el framework web más rápido para Python?",\n    "¿Qué bases de datos vectoriales existen?",\n    "¿Quién creó Python y cuándo?"\n]\n\nfor q in questions:\n    rag.query(q)\n    print("-" * 40)`,
        explanation: "Este es un sistema RAG completo construido desde cero. Implementa: 1) Embeddings con OpenAI, 2) Base de datos vectorial con cosine similarity, 3) Chunking de documentos, 4) Retrieval + Generation. En producción usarías Pinecone/Weaviate, pero entender los fundamentos es crucial.",
      },
    ],
    project: {
      title: "Chatbot Empresarial con RAG",
      description: "Construye un chatbot que responda preguntas usando documentos de una empresa, con múltiples fuentes, filtrado y respuesta citada.",
      steps: [
        "Implementar pipeline de ingestión de documentos (PDF, DOCX, Web)",
        "Configurar vector database (Pinecone o ChromaDB)",
        "Implementar chunking inteligente por secciones",
        "Agregar metadata filtering por departamento/fecha",
        "Implementar hybrid search (semántico + keyword)",
        "Agregar re-ranking de resultados",
        "Crear interfaz web con chat en tiempo real",
        "Implementar citación de fuentes en las respuestas",
        "Agregar evaluación automática de calidad (RAGAS)",
      ],
    },
  },
  {
    id: 5,
    title: "Control Total del Modelo",
    subtitle: "Fine-tuning, guardrails, evaluación y optimización avanzada",
    icon: "Settings",
    color: "from-indigo-500 to-violet-500",
    duration: "3 semanas",
    objectives: [
      "Implementar fine-tuning de modelos",
      "Crear guardrails y sistemas de seguridad",
      "Evaluar y medir la calidad de outputs",
      "Optimizar costos y latencia",
    ],
    theory: [
      "## Control Total: De Usuario a Ingeniero\n\nHasta ahora has usado modelos como 'caja negra'. Ahora aprenderás a tener control TOTAL:\n\n### Niveles de Control\n```\nNivel 1: Prompt Engineering (control del input)\nNivel 2: Parameter Tuning (temperature, top_p, etc.)\nNivel 3: Fine-tuning (entrenar el modelo con tus datos)\nNivel 4: Guardrails (controlar el output)\nNivel 5: Evaluation (medir y mejorar continuamente)\n```\n\n### ¿Cuándo hacer Fine-tuning?\n✅ SÍ cuando:\n- Necesitas un estilo/tone muy específico y consistente\n- El modelo no sigue instrucciones complejas bien\n- Necesitas reducir latencia (prompt más corto)\n- Tienes datos de entrenamiento de calidad (100+ ejemplos)\n\n❌ NO cuando:\n- RAG resuelve tu problema\n- Solo necesitas unos pocos ejemplos (few-shot)\n- No tienes datos de calidad\n- El modelo base ya es suficientemente bueno",
      "## Fine-tuning: Entrenando tu Propio Modelo\n\n```python\nfrom openai import OpenAI\nimport json\n\nclient = OpenAI()\n\n# Paso 1: Preparar datos de entrenamiento\n# Formato: conversaciones de ejemplo\nt training_data = [\n    {\n        \"messages\": [\n            {\"role\": \"system\", \"content\": \"Eres un asistente de soporte técnico para la empresa X.\"},\n            {\"role\": \"user\", \"content\": \"Mi internet no funciona\"},\n            {\"role\": \"assistant\", \"content\": \"Entiendo tu frustración. Vamos a resolver esto paso a paso. Primero, ¿podrías verificar si el router tiene las luces encendidas? Si la luz de internet está roja, necesito reiniciar tu conexión desde nuestro sistema.\"}\n        ]\n    },\n    # ... más ejemplos (mínimo 10, idealmente 50-100+)\n]\n\n# Paso 2: Subir el archivo de entrenamiento\nwith open(\"training_data.jsonl\", \"w\") as f:\n    for entry in training_data:\n        f.write(json.dumps(entry) + \"\\n\")\n\nfile = client.files.create(\n    file=open(\"training_data.jsonl\", \"rb\"),\n    purpose=\"fine-tune\"\n)\n\n# Paso 3: Crear el fine-tuning job\nfine_tune = client.fine_tuning.jobs.create(\n    training_file=file.id,\n    model=\"gpt-4-turbo\",  # o \"gpt-3.5-turbo\"\n    hyperparameters={\n        \"n_epochs\": 3,  # Número de pasadas sobre los datos\n    }\n)\n\n# Paso 4: Esperar y usar el modelo\n# Una vez completado, usar como:\nresponse = client.chat.completions.create(\n    model=\"ft:gpt-4-turbo:tu-org:nombre:id\",  # Tu modelo fine-tuneado\n    messages=[{\"role\": \"user\", \"content\": \"Mi internet no funciona\"}]\n)\n```\n\n### Costos de Fine-tuning\n- GPT-4: $25/1M tokens de entrenamiento + $75/1M tokens de uso\n- GPT-3.5: $0.80/1M tokens entrenamiento + $2.40/1M uso\n- Con 1000 ejemplos de ~200 tokens = ~$0.16 para entrenar (3.5-turbo)",
      "## Guardrails: Controlando el Output\n\nLos guardrails son filtros que aseguran que las respuestas del modelo sean seguras, relevantes y cumplan tus reglas:\n\n```python\nimport re\nfrom typing import Optional\n\nclass GuardrailSystem:\n    \"\"\"Sistema de guardrails para controlar outputs del LLM\"\"\"\n    \n    def __init__(self):\n        self.rules = []\n    \n    def add_rule(self, name: str, check_fn, action: str = \"block\"):\n        \"\"\"Agrega una regla de guardrail\"\"\"\n        self.rules.append({\n            \"name\": name,\n            \"check\": check_fn,\n            \"action\": action  # \"block\", \"modify\", \"warn\"\n        })\n    \n    def validate(self, text: str) -> dict:\n        \"\"\"Valida un texto contra todas las reglas\"\"\"\n        results = {\"passed\": True, \"violations\": [], \"modified_text\": text}\n        \n        for rule in self.rules:\n            violation = rule[\"check\"](text)\n            if violation:\n                results[\"passed\"] = False\n                results[\"violations\"].append({\n                    \"rule\": rule[\"name\"],\n                    \"action\": rule[\"action\"],\n                    \"detail\": violation\n                })\n                \n                if rule[\"action\"] == \"block\":\n                    results[\"modified_text\"] = \"[Contenido bloqueado por política de seguridad]\"\n                    break\n        \n        return results\n\n# Crear guardrails\nguardrails = GuardrailSystem()\n\n# Regla 1: No PII (información personal)\ndef check_pii(text: str) -> Optional[str]:\n    patterns = [\n        r'\\b\\d{3}-\\d{2}-\\d{4}\\b',  # SSN\n        r'\\b\\d{16}\\b',              # Credit card\n        r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',  # Email\n    ]\n    for pattern in patterns:\n        if re.search(pattern, text):\n            return f\"PII detectado: patrón {pattern}\"\n    return None\n\nguardrails.add_rule(\"no_pii\", check_pii, action=\"block\")\n\n# Regla 2: No toxicidad\ndef check_toxicity(text: str) -> Optional[str]:\n    toxic_words = [\"odio\", \"estúpido\", \"basura\", \"inútil\"]\n    for word in toxic_words:\n        if word.lower() in text.lower():\n            return f\"Lenguaje tóxico detectado: '{word}'\"\n    return None\n\nguardrails.add_rule(\"no_toxicity\", check_toxicity, action=\"warn\")\n\n# Regla 3: Longitud máxima\ndef check_length(text: str) -> Optional[str]:\n    if len(text) > 5000:\n        return f\"Texto muy largo: {len(text)} caracteres\"\n    return None\n\nguardrails.add_rule(\"max_length\", check_length, action=\"modify\")\n\n# Regla 4: Formato requerido\ndef check_format(text: str) -> Optional[str]:\n    if not text.strip().startswith(\"#\") and \"##\" not in text:\n        return \"No usa formato markdown\"\n    return None\n\nguardrails.add_rule(\"markdown_format\", check_format, action=\"warn\")\n\n# Uso\nresult = guardrails.validate(\"Mi email es test@example.com y odio este sistema\")\nprint(f\"Pasó: {result['passed']}\")\nprint(f\"Violaciones: {result['violations']}\")\n```\n\n### Guardrails con LLM (NeMo Guardrails)\n```python\n# Usar un LLM como guardrail (más robusto pero más lento)\ndef llm_guardrail_check(text: str, policy: str) -> bool:\n    response = client.chat.completions.create(\n        model=\"gpt-4-turbo\",\n        messages=[{\n            \"role\": \"system\",\n            \"content\": f\"\"\"Verifica si el siguiente texto cumple esta política:\n{policy}\n\nResponde SOLO 'PASS' o 'FAIL' y la razón.\"\"\"\n        }, {\n            \"role\": \"user\", \n            \"content\": text\n        }],\n        temperature=0\n    )\n    return \"PASS\" in response.choices[0].message.content\n```",
    ],
    practices: [
      {
        id: "p5-1",
        title: "Sistema de Evaluación Automatizada",
        description: "Construye un sistema que evalúe automáticamente la calidad de las respuestas de tu AI",
        language: "python",
        code: `from openai import OpenAI\nimport json\nfrom typing import Dict, List\nfrom dataclasses import dataclass\n\nclient = OpenAI()\n\n@dataclass\nclass EvalResult:\n    metric: str\n    score: float  # 0-1\n    explanation: str\n\nclass AIEvaluator:\n    \"\"\"Sistema de evaluación automatizada para respuestas de AI\"\"\"\n    \n    def __init__(self, model=\"gpt-4-turbo\"):\n        self.model = model\n        self.metrics = {}\n        self.results_history = []\n    \n    def evaluate(self, question: str, response: str, \n                 context: str = \"\", reference: str = \"\") -> List[EvalResult]:\n        \"\"\"Evalúa una respuesta en múltiples dimensiones\"\"\"\n        results = []\n        \n        # Métrica 1: Relevancia\n        results.append(self._evaluate_relevance(question, response))\n        \n        # Métrica 2: Veracidad (si hay contexto)\n        if context:\n            results.append(self._evaluate_faithfulness(response, context))\n        \n        # Métrica 3: Completitud\n        results.append(self._evaluate_completeness(question, response))\n        \n        # Métrica 4: Calidad de formato\n        results.append(self._evaluate_format(response))\n        \n        # Métrica 5: Seguridad\n        results.append(self._evaluate_safety(response))\n        \n        # Si hay referencia, evaluar similitud\n        if reference:\n            results.append(self._evaluate_against_reference(response, reference))\n        \n        # Calcular score overall\n        avg_score = sum(r.score for r in results) / len(results)\n        \n        # Guardar en historial\n        self.results_history.append({\n            \"question\": question,\n            \"response\": response[:200],\n            \"results\": [{\"metric\": r.metric, \"score\": r.score} for r in results],\n            \"overall\": avg_score\n        })\n        \n        return results\n    \n    def _llm_judge(self, prompt: str) -> Dict:\n        \"\"\"Usa el LLM como juez\"\"\"\n        response = client.chat.completions.create(\n            model=self.model,\n            messages=[{\n                \"role\": \"system\",\n                \"content\": \"Eres un evaluador experto. Responde SOLO en JSON válido.\"\n            }, {\n                \"role\": \"user\",\n                \"content\": prompt\n            }],\n            response_format={\"type\": \"json_object\"},\n            temperature=0.1\n        )\n        return json.loads(response.choices[0].message.content)\n    \n    def _evaluate_relevance(self, question: str, response: str) -> EvalResult:\n        result = self._llm_judge(f\"\"\"\nEvalúa qué tan relevante es la respuesta para la pregunta.\n\nPregunta: {question}\nRespuesta: {response}\n\nResponde en JSON:\n{{\"score\": 0.0-1.0, \"explanation\": \"por qué este score\"}}\n\nCriterios:\n- 1.0: Responde directamente y completamente\n- 0.7: Responde parcialmente o con algo de ruido\n- 0.4: Tangencialmente relevante\n- 0.0: No relevante\n\"\"\")\n        return EvalResult(\"relevance\", result[\"score\"], result[\"explanation\"])\n    \n    def _evaluate_faithfulness(self, response: str, context: str) -> EvalResult:\n        result = self._llm_judge(f\"\"\"\nEvalúa si la respuesta es fiel al contexto (no inventa información).\n\nContexto: {context}\nRespuesta: {response}\n\nResponde en JSON:\n{{\"score\": 0.0-1.0, \"explanation\": \"por qué este score\"}}\n\nCriterios:\n- 1.0: Toda la información viene del contexto\n- 0.5: Mayoría del contexto pero agrega algo\n- 0.0: Inventa información no presente\n\"\"\")\n        return EvalResult(\"faithfulness\", result[\"score\"], result[\"explanation\"])\n    \n    def _evaluate_completeness(self, question: str, response: str) -> EvalResult:\n        result = self._llm_judge(f\"\"\"\nEvalúa qué tan completa es la respuesta.\n\nPregunta: {question}\nRespuesta: {response}\n\nResponde en JSON:\n{{\"score\": 0.0-1.0, \"explanation\": \"por qué este score\"}}\n\nCriterios:\n- 1.0: Cubre todos los aspectos de la pregunta\n- 0.5: Cubre lo principal pero falta algo\n- 0.0: Respuesta muy incompleta\n\"\"\")\n        return EvalResult(\"completeness\", result[\"score\"], result[\"explanation\"])\n    \n    def _evaluate_format(self, response: str) -> EvalResult:\n        score = 1.0\n        explanation = \"Formato correcto\"\n        \n        # Verificar estructura\n        if len(response) < 20:\n            score -= 0.3\n            explanation = \"Respuesta muy corta\"\n        if response.count('\\n') == 0 and len(response) > 200:\n            score -= 0.2\n            explanation = \"Falta estructura (sin saltos de línea)\"\n        if response.isupper():\n            score -= 0.3\n            explanation = \"TODO EN MAYÚSCULAS\"\n        \n        return EvalResult(\"format\", max(0, score), explanation)\n    \n    def _evaluate_safety(self, response: str) -> EvalResult:\n        result = self._llm_judge(f\"\"\"\nEvalúa si la respuesta es segura y apropiada.\n\nRespuesta: {response}\n\nResponde en JSON:\n{{\"score\": 0.0-1.0, \"explanation\": \"por qué este score\"}}\n\nCriterios:\n- 1.0: Completamente segura\n- 0.5: Contiene algo cuestionable\n- 0.0: Contiene contenido dañino, PII, o instrucciones peligrosas\n\"\"\")\n        return EvalResult(\"safety\", result[\"score\"], result[\"explanation\"])\n    \n    def _evaluate_against_reference(self, response: str, reference: str) -> EvalResult:\n        result = self._llm_judge(f\"\"\"\nCompara la respuesta con la respuesta de referencia.\n\nRespuesta: {response}\nReferencia: {reference}\n\nResponde en JSON:\n{{\"score\": 0.0-1.0, \"explanation\": \"por qué este score\"}}\n\nCriterios:\n- 1.0: Equivalente o mejor que la referencia\n- 0.5: Similar pero con diferencias menores\n- 0.0: Muy diferente o peor\n\"\"\")\n        return EvalResult(\"reference_match\", result[\"score\"], result[\"explanation\"])\n    \n    def get_report(self) -> str:\n        \"\"\"Genera un reporte de todas las evaluaciones\"\"\"\n        if not self.results_history:\n            return \"No hay evaluaciones registradas\"\n        \n        # Calcular promedios por métrica\n        metrics_avg = {}\n        for entry in self.results_history:\n            for r in entry[\"results\"]:\n                if r[\"metric\"] not in metrics_avg:\n                    metrics_avg[r[\"metric\"]] = []\n                metrics_avg[r[\"metric\"]].append(r[\"score\"])\n        \n        report = \"📊 REPORTE DE EVALUACIÓN\\n\" + \"=\" * 40\n        report += f\"\\nTotal evaluaciones: {len(self.results_history)}\\n\\n\"\n        report += \"Promedios por métrica:\\n\"\n        \n        for metric, scores in metrics_avg.items():\n            avg = sum(scores) / len(scores)\n            bar = \"█\" * int(avg * 20) + \"░\" * (20 - int(avg * 20))\n            report += f\"  {metric:20s} [{bar}] {avg:.2f}\\n\"\n        \n        overall_avg = sum(e[\"overall\"] for e in self.results_history) / len(self.results_history)\n        report += f\"\\nScore Overall: {overall_avg:.2f}/1.00\"\n        \n        return report\n\n\n# === DEMO ===\nevaluator = AIEvaluator()\n\n# Evaluar varias respuestas\ntest_cases = [\n    {\n        \"question\": \"¿Qué es machine learning?\",\n        \"response\": \"Machine learning es una rama de la inteligencia artificial que permite a las computadoras aprender patrones a partir de datos sin ser programadas explícitamente. Incluye técnicas como supervised learning, unsupervised learning y reinforcement learning.\",\n        \"context\": \"Machine learning es un subcampo de AI que se enfoca en algoritmos que mejoran automáticamente a través de experiencia. Los tres tipos principales son: supervised (datos etiquetados), unsupervised (sin etiquetas) y reinforcement (recompensas).\",\n    },\n    {\n        \"question\": \"¿Cómo hago backup de mi base de datos?\",\n        \"response\": \"No sé, pregúntale a otro.\",\n        \"context\": \"Para hacer backup en PostgreSQL usa pg_dump. En MySQL usa mysqldump. En MongoDB usa mongodump.\",\n    }\n]\n\nfor case in test_cases:\n    print(f\"\\n{'='*50}\")\n    print(f\"❓ {case['question']}\")\n    print(f\"💬 {case['response'][:100]}...\")\n    \n    results = evaluator.evaluate(\n        question=case[\"question\"],\n        response=case[\"response\"],\n        context=case.get(\"context\", \"\")\n    )\n    \n    for r in results:\n        emoji = \"✅\" if r.score >= 0.7 else \"⚠️\" if r.score >= 0.4 else \"❌\"\n        print(f\"  {emoji} {r.metric}: {r.score:.2f} - {r.explanation}\")\n\n# Reporte final\nprint(f\"\\n\\n{evaluator.get_report()}\")`,
        explanation: "La evaluación automatizada es CRÍTICA en producción. Este sistema usa 'LLM-as-judge' para evaluar múltiples dimensiones: relevancia, veracidad, completitud, formato y seguridad. En producción, esto se ejecuta en cada respuesta o en batches para monitorear calidad.",
      },
    ],
    project: {
      title: "Pipeline de ML Ops para AI",
      description: "Construye un pipeline completo de MLOps: evaluación continua, guardrails, A/B testing de prompts, y monitoreo de calidad.",
      steps: [
        "Implementar sistema de evaluación automatizada",
        "Crear guardrails de seguridad (input y output)",
        "Implementar A/B testing de prompts",
        "Configurar fine-tuning con datos propios",
        "Crear dashboard de métricas en tiempo real",
        "Implementar alertas de degradación de calidad",
        "Configurar caching inteligente para reducir costos",
        "Implementar rate limiting y quota management",
      ],
    },
  },
  {
    id: 6,
    title: "Proyecto Final: AI App Completa",
    subtitle: "Integra todo lo aprendido en una aplicación de producción",
    icon: "Rocket",
    color: "from-yellow-500 to-orange-500",
    duration: "4 semanas",
    objectives: [
      "Integrar todos los conceptos en un proyecto real",
      "Desplegar una aplicación AI completa",
      "Implementar buenas prácticas de producción",
      "Crear un portfolio piece profesional",
    ],
    theory: [
      "## Arquitectura de Producción para AI Apps\n\n```mermaid\ngraph TD\n    A[Frontend] --> B[API Gateway]\n    B --> C[Orchestrator]\n    C --> D[Agent Engine]\n    C --> E[RAG Pipeline]\n    C --> F[Tool Executor]\n    D --> G[LLM Router]\n    E --> H[Vector DB]\n    E --> I[Document Store]\n    G --> J[OpenAI]\n    G --> K[Anthropic]\n    G --> L[Local Model]\n    C --> M[Guardrails]\n    C --> N[Cache Layer]\n    C --> O[Monitoring]\n```\n\n### Componentes Clave\n\n1. **API Gateway**: Maneja auth, rate limiting, routing\n2. **Orchestrator**: Coordina el flujo de la aplicación\n3. **Agent Engine**: Ejecuta la lógica de agentes\n4. **RAG Pipeline**: Retrieval + Generation\n5. **LLM Router**: Selecciona el mejor modelo por tarea\n6. **Cache Layer**: Redis para respuestas frecuentes\n7. **Monitoring**: Logs, métricas, alertas\n\n### Stack Recomendado\n```yaml\nBackend:\n  - FastAPI (API)\n  - Celery + Redis (tareas async)\n  - PostgreSQL (datos estructurados)\n  - Pinecone/Weaviate (vectores)\n  - Redis (cache + cola)\n\nAI:\n  - OpenAI API (primary)\n  - Anthropic API (secondary)\n  - Ollama (local, para testing)\n  - LangChain/LlamaIndex (framework)\n\nInfra:\n  - Docker + Docker Compose\n  - AWS/GCP (deploy)\n  - GitHub Actions (CI/CD)\n  - Prometheus + Grafana (monitoreo)\n\nFrontend:\n  - Next.js / React\n  - Tailwind CSS\n  - Vercel (deploy)\n```",
      "## Patrones de Diseño para AI Apps\n\n### 1. Circuit Breaker Pattern\n```python\nimport time\nfrom functools import wraps\n\nclass CircuitBreaker:\n    \"\"\"Previene llamadas a servicios fallidos\"\"\"\n    \n    def __init__(self, failure_threshold=5, recovery_timeout=60):\n        self.failure_count = 0\n        self.failure_threshold = failure_threshold\n        self.recovery_timeout = recovery_timeout\n        self.state = \"CLOSED\"  # CLOSED, OPEN, HALF_OPEN\n        self.last_failure_time = None\n    \n    def call(self, func, *args, **kwargs):\n        if self.state == \"OPEN\":\n            if time.time() - self.last_failure_time > self.recovery_timeout:\n                self.state = \"HALF_OPEN\"\n            else:\n                raise Exception(\"Circuit is OPEN - service unavailable\")\n        \n        try:\n            result = func(*args, **kwargs)\n            self.failure_count = 0\n            self.state = \"CLOSED\"\n            return result\n        except Exception as e:\n            self.failure_count += 1\n            self.last_failure_time = time.time()\n            if self.failure_count >= self.failure_threshold:\n                self.state = \"OPEN\"\n            raise\n\n# Uso\nbreaker = CircuitBreaker(failure_threshold=3, recovery_timeout=30)\n\ndef call_llm(prompt):\n    return client.chat.completions.create(\n        model=\"gpt-4\",\n        messages=[{\"role\": \"user\", \"content\": prompt}]\n    )\n\ntry:\n    result = breaker.call(call_llm, \"Hola\")\nexcept Exception:\n    # Fallback a otro modelo\n    result = call_fallback_model(\"Hola\")\n```\n\n### 2. LLM Router Pattern\n```python\nclass LLMRouter:\n    \"\"\"Selecciona el mejor modelo según la tarea\"\"\"\n    \n    def __init__(self):\n        self.routes = {\n            \"simple\": {\"model\": \"gpt-3.5-turbo\", \"temp\": 0.3},\n            \"complex\": {\"model\": \"gpt-4-turbo\", \"temp\": 0.5},\n            \"creative\": {\"model\": \"claude-3-opus\", \"temp\": 0.9},\n            \"code\": {\"model\": \"gpt-4-turbo\", \"temp\": 0.2},\n            \"fast\": {\"model\": \"gpt-3.5-turbo\", \"temp\": 0.1},\n        }\n    \n    def route(self, task_type: str, complexity: str = \"simple\") -> dict:\n        \"\"\"Determina qué modelo usar\"\"\"\n        key = task_type if task_type in self.routes else complexity\n        return self.routes.get(key, self.routes[\"simple\"])\n    \n    def execute(self, messages: list, task_type: str = \"simple\") -> str:\n        config = self.route(task_type)\n        \n        if config[\"model\"].startswith(\"gpt\"):\n            response = openai_client.chat.completions.create(\n                model=config[\"model\"],\n                messages=messages,\n                temperature=config[\"temp\"]\n            )\n            return response.choices[0].message.content\n        elif config[\"model\"].startswith(\"claude\"):\n            response = anthropic_client.messages.create(\n                model=config[\"model\"],\n                messages=messages[1:],  # Claude no usa system en messages\n                system=messages[0][\"content\"] if messages[0][\"role\"] == \"system\" else \"\",\n                max_tokens=1024,\n                temperature=config[\"temp\"]\n            )\n            return response.content[0].text\n```\n\n### 3. Streaming + Caching\n```python\nimport hashlib\nimport redis\nimport json\n\nclass CachedStreamLLM:\n    \"\"\"LLM con cache y streaming\"\"\"\n    \n    def __init__(self, redis_url=\"redis://localhost:6379\"):\n        self.cache = redis.from_url(redis_url)\n        self.ttl = 3600  # 1 hora\n    \n    def _cache_key(self, messages: list, model: str) -> str:\n        content = json.dumps({\"messages\": messages, \"model\": model}, sort_keys=True)\n        return f\"llm:{hashlib.md5(content.encode()).hexdigest()}\"\n    \n    def generate(self, messages: list, model: str = \"gpt-4\"):\n        key = self._cache_key(messages, model)\n        \n        # Intentar cache\n        cached = self.cache.get(key)\n        if cached:\n            yield json.loads(cached)\n            return\n        \n        # Streaming\n        full_response = \"\"\n        stream = client.chat.completions.create(\n            model=model,\n            messages=messages,\n            stream=True\n        )\n        \n        for chunk in stream:\n            if chunk.choices[0].delta.content:\n                content = chunk.choices[0].delta.content\n                full_response += content\n                yield {\"type\": \"chunk\", \"content\": content}\n        \n        # Guardar en cache\n        self.cache.setex(key, self.ttl, json.dumps(full_response))\n        yield {\"type\": \"complete\", \"content\": full_response}\n```",
      "## Deploy y Producción\n\n### Docker Compose para AI App\n```yaml\nversion: '3.8'\n\nservices:\n  api:\n    build: ./backend\n    ports:\n      - \"8000:8000\"\n    environment:\n      - OPENAI_API_KEY=${OPENAI_API_KEY}\n      - REDIS_URL=redis://redis:6379\n      - DATABASE_URL=postgresql://user:pass@db:5432/aidb\n    depends_on:\n      - redis\n      - db\n  \n  redis:\n    image: redis:7-alpine\n    ports:\n      - \"6379:6379\"\n  \n  db:\n    image: postgres:15\n    environment:\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=pass\n      - POSTGRES_DB=aidb\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n  \n  frontend:\n    build: ./frontend\n    ports:\n      - \"3000:3000\"\n\nvolumes:\n  pgdata:\n```\n\n### Checklist de Producción\n- [ ] Rate limiting configurado\n- [ ] API keys en variables de entorno\n- [ ] Logging estructurado (JSON)\n- [ ] Health checks implementados\n- [ ] Circuit breakers en place\n- [ ] Fallback models configurados\n- [ ] Cache layer activo\n- [ ] Monitoring y alertas\n- [ ] Backup de datos\n- [ ] Documentación de API\n- [ ] Tests de integración\n- [ ] Load testing completado\n- [ ] Guardrails de seguridad\n- [ ] Privacy policy y terms",
    ],
    practices: [
      {
        id: "p6-1",
        title: "API Backend Completa con FastAPI",
        description: "Crea el backend completo de una AI app con todos los patrones de producción",
        language: "python",
        code: `# === main.py - FastAPI Backend Completo ===\n\nfrom fastapi import FastAPI, HTTPException, Depends\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom pydantic import BaseModel\nfrom typing import Optional, List\nimport asyncio\nimport json\nimport time\nimport hashlib\nfrom openai import OpenAI\nimport redis\n\n# === MODELOS ===\n\nclass ChatRequest(BaseModel):\n    message: str\n    conversation_id: Optional[str] = None\n    model: Optional[str] = \"gpt-4-turbo\"\n    stream: Optional[bool] = True\n\nclass ChatResponse(BaseModel):\n    response: str\n    conversation_id: str\n    tokens_used: int\n    model: str\n    latency_ms: float\n\nclass AgentRequest(BaseModel):\n    task: str\n    tools: Optional[List[str]] = [\"search\", \"calculate\", \"code\"]\n    max_iterations: Optional[int] = 5\n\n# === SERVICIOS ===\n\nclass LLMService:\n    \"\"\"Servicio principal de LLM con cache, fallback y métricas\"\"\"\n    \n    def __init__(self):\n        self.client = OpenAI()\n        self.cache = redis.from_url(\"redis://localhost:6379\", decode_responses=True)\n        self.fallback_models = [\"gpt-4-turbo\", \"gpt-3.5-turbo\"]\n        self.metrics = {\"total_calls\": 0, \"cache_hits\": 0, \"errors\": 0}\n    \n    def _cache_key(self, messages: list, model: str) -> str:\n        content = json.dumps({\"m\": messages, \"model\": model}, sort_keys=True)\n        return f\"llm:{hashlib.md5(content.encode()).hexdigest()}\"\n    \n    async def generate(self, messages: list, model: str = \"gpt-4-turbo\", \n                       temperature: float = 0.7) -> dict:\n        \"\"\"Genera respuesta con cache y fallback\"\"\"\n        start_time = time.time()\n        self.metrics[\"total_calls\"] += 1\n        \n        # Check cache\n        cache_key = self._cache_key(messages, model)\n        cached = self.cache.get(cache_key)\n        if cached:\n            self.metrics[\"cache_hits\"] += 1\n            return json.loads(cached)\n        \n        # Try models in order (fallback)\n        models_to_try = [model] + [m for m in self.fallback_models if m != model]\n        \n        for try_model in models_to_try:\n            try:\n                response = self.client.chat.completions.create(\n                    model=try_model,\n                    messages=messages,\n                    temperature=temperature,\n                    max_tokens=2000\n                )\n                \n                result = {\n                    \"content\": response.choices[0].message.content,\n                    \"model\": try_model,\n                    \"tokens\": response.usage.total_tokens,\n                    \"latency_ms\": (time.time() - start_time) * 1000\n                }\n                \n                # Cache result\n                self.cache.setex(cache_key, 3600, json.dumps(result))\n                return result\n                \n            except Exception as e:\n                print(f\"Model {try_model} failed: {e}\")\n                self.metrics[\"errors\"] += 1\n                continue\n        \n        raise HTTPException(status_code=503, detail=\"All models unavailable\")\n    \n    async def stream(self, messages: list, model: str = \"gpt-4-turbo\"):\n        \"\"\"Streaming response\"\"\"\n        stream = self.client.chat.completions.create(\n            model=model,\n            messages=messages,\n            stream=True,\n            temperature=0.7\n        )\n        \n        for chunk in stream:\n            if chunk.choices[0].delta.content:\n                yield chunk.choices[0].delta.content\n\n# === CONVERSATION MANAGER ===\n\nclass ConversationManager:\n    \"\"\"Maneja el historial de conversaciones\"\"\"\n    \n    def __init__(self):\n        self.conversations = {}  # En producción: usar DB\n    \n    def get_or_create(self, conv_id: Optional[str]) -> tuple:\n        if conv_id and conv_id in self.conversations:\n            return conv_id, self.conversations[conv_id]\n        \n        new_id = hashlib.md5(str(time.time()).encode()).hexdigest()[:12]\n        self.conversations[new_id] = [\n            {\"role\": \"system\", \"content\": \"Eres un asistente útil y amigable.\"}\n        ]\n        return new_id, self.conversations[new_id]\n    \n    def add_message(self, conv_id: str, role: str, content: str):\n        if conv_id in self.conversations:\n            self.conversations[conv_id].append({\"role\": role, \"content\": content})\n            # Trim si es muy larga\n            if len(self.conversations[conv_id]) > 50:\n                system = self.conversations[conv_id][0]\n                self.conversations[conv_id] = [system] + self.conversations[conv_id][-30:]\n\n# === APP ===\n\napp = FastAPI(\n    title=\"AI Engineering API\",\n    description=\"API completa para AI applications\",\n    version=\"1.0.0\"\n)\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\"*\"],\n    allow_methods=[\"*\"],\n    allow_headers=[\"*\"],\n)\n\nllm_service = LLMService()\nconv_manager = ConversationManager()\n\n# === ENDPOINTS ===\n\n@app.post(\"/chat\", response_model=ChatResponse)\nasync def chat(request: ChatRequest):\n    \"\"\"Endpoint principal de chat\"\"\"\n    conv_id, messages = conv_manager.get_or_create(request.conversation_id)\n    \n    # Agregar mensaje del usuario\n    conv_manager.add_message(conv_id, \"user\", request.message)\n    \n    # Generar respuesta\n    result = await llm_service.generate(\n        messages=conv_manager.get_or_create(conv_id)[1],\n        model=request.model\n    )\n    \n    # Guardar respuesta\n    conv_manager.add_message(conv_id, \"assistant\", result[\"content\"])\n    \n    return ChatResponse(\n        response=result[\"content\"],\n        conversation_id=conv_id,\n        tokens_used=result[\"tokens\"],\n        model=result[\"model\"],\n        latency_ms=result[\"latency_ms\"]\n    )\n\n@app.get(\"/chat/{conv_id}/stream\")\nasync def chat_stream(conv_id: str, message: str):\n    \"\"\"Streaming endpoint\"\"\"\n    from fastapi.responses import StreamingResponse\n    \n    _, messages = conv_manager.get_or_create(conv_id)\n    conv_manager.add_message(conv_id, \"user\", message)\n    \n    async def generate():\n        full_response = \"\"\n        async for chunk in llm_service.stream(messages):\n            full_response += chunk\n            yield f\"data: {json.dumps({'content': chunk})}\\n\\n\"\n        \n        conv_manager.add_message(conv_id, \"assistant\", full_response)\n        yield f\"data: {json.dumps({'done': True})}\\n\\n\"\n    \n    return StreamingResponse(generate(), media_type=\"text/event-stream\")\n\n@app.get(\"/health\")\nasync def health():\n    \"\"\"Health check\"\"\"\n    return {\n        \"status\": \"healthy\",\n        \"metrics\": llm_service.metrics,\n        \"conversations\": len(conv_manager.conversations)\n    }\n\n@app.get(\"/metrics\")\nasync def metrics():\n    \"\"\"Métricas del sistema\"\"\"\n    return {\n        \"total_calls\": llm_service.metrics[\"total_calls\"],\n        \"cache_hits\": llm_service.metrics[\"cache_hits\"],\n        \"cache_hit_rate\": llm_service.metrics[\"cache_hits\"] / max(1, llm_service.metrics[\"total_calls\"]),\n        \"errors\": llm_service.metrics[\"errors\"],\n        \"active_conversations\": len(conv_manager.conversations)\n    }\n\n# Run: uvicorn main:app --reload --port 8000`,
        explanation: "Este es un backend de producción completo que incluye: 1) Cache con Redis, 2) Fallback entre modelos, 3) Streaming, 4) Gestión de conversaciones, 5) Métricas y health checks, 6) CORS configurado. Es la base de cualquier AI app real.",
      },
    ],
    project: {
      title: "SaaS de AI para Empresas",
      description: "Construye y despliega una aplicación SaaS completa que ofrece servicios de AI a empresas: chatbot, RAG sobre sus documentos, agents automatizados y dashboard de analytics.",
      steps: [
        "Diseñar la arquitectura completa (diagrama)",
        "Implementar el backend con FastAPI",
        "Crear el frontend con React/Next.js",
        "Implementar autenticación (Auth0/NextAuth)",
        "Configurar base de datos y vector store",
        "Implementar el pipeline RAG con upload de documentos",
        "Crear el sistema de agents con tools",
        "Implementar billing con Stripe",
        "Configurar CI/CD con GitHub Actions",
        "Deploy a producción (AWS/Vercel)",
        "Implementar monitoring (Sentry, Datadog)",
        "Escribir documentación y API docs",
      ],
    },
  },
];
