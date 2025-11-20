# Speek With World

### Ver Demo aqui =>[Demo](https://sakuwar.github.io/Speek_With_World/)

## 📋 Descripción

Este proyecto permite capturar video de tu cámara web mientras escucha tu voz, reconoce el texto hablado en español y lo traduce en tiempo real a diferentes idiomas mostrando subtítulos superpuestos en la pantalla.

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura y video streaming
- **CSS3** - Estilos y diseño responsive
- **JavaScript (Vanilla)** - Lógica de la aplicación
- **Azure Cognitive Services Speech SDK** - Reconocimiento de voz
- **Azure Translator API** - Traducción de texto
- **WebRTC** - Captura de cámara y micrófono

## ✨ Características

- ✅ Reconocimiento de voz en tiempo real (español)
- ✅ Traducción automática a 6 idiomas (Inglés, Alemán, Francés, Japonés, Italiano, Portugués)
- ✅ Subtítulos superpuestos en video
- ✅ Control de micrófono (mutear/activar)
- ✅ Configuración segura de credenciales
- ✅ Interfaz intuitiva y moderna

## 📦 Requisitos Previos

- Navegador web (Chrome, Firefox, Edge)
- Cámara web y micrófono
- Cuenta de Microsoft Azure (con créditos gratuitos disponibles)

## 🔑 Cómo Obtener las Keys de Microsoft Azure

### Paso 1: Crear una cuenta de Azure

1. Ve a [portal.azure.com](https://portal.azure.com)
2. Haz clic en **"Start free"** o **"Comenzar gratis"**
3. Inicia sesión con tu cuenta de Microsoft (o crea una)
4. Completa el registro (requiere tarjeta de crédito, pero obtienes **$200 USD en créditos gratuitos**)

### Paso 2: Crear el recurso de Speech Service

1. En el portal de Azure, haz clic en **"Create a resource"** (Crear un recurso)
2. Busca **"Speech"** o **"Voz"**
3. Selecciona **"Speech"** de Microsoft
4. Haz clic en **"Create"** (Crear)
5. Completa el formulario:
   - **Subscription**: Tu suscripción
   - **Resource group**: Crea uno nuevo o selecciona existente
   - **Region**: Elige la más cercana (ej: West Europe, East US)
   - **Name**: Un nombre único (ej: my-speech-service)
   - **Pricing tier**: Selecciona **F0 (Free)** para empezar gratis
6. Haz clic en **"Review + create"** y luego **"Create"**
7. Una vez creado, ve al recurso y selecciona **"Keys and Endpoint"**
8. Copia:
   - **KEY 1** (esta será tu `Speech Key`)
   - **Location/Region** (esta será tu `Speech Region`, ej: westeurope)

### Paso 3: Crear el recurso de Translator

1. En el portal de Azure, haz clic en **"Create a resource"**
2. Busca **"Translator"**
3. Selecciona **"Translator"** de Microsoft
4. Haz clic en **"Create"**
5. Completa el formulario:
   - **Subscription**: Tu suscripción
   - **Resource group**: Usa el mismo del paso anterior
   - **Region**: Elige la misma región que Speech Service
   - **Name**: Un nombre único (ej: my-translator-service)
   - **Pricing tier**: Selecciona **F0 (Free)** - hasta 2M caracteres gratis al mes
6. Haz clic en **"Review + create"** y luego **"Create"**
7. Ve al recurso creado y selecciona **"Keys and Endpoint"**
8. Copia:
   - **KEY 1** (esta será tu `Translator Key`)
   - **Location/Region** (esta será tu `Translator Region`)

### 📝 Resumen de Credenciales Necesarias

Al final deberás tener estas 4 credenciales:

```
Speech Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Speech Region: eastus (o tu región)
Translator Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Translator Region: eastus (o tu región)
```

## 🎮 Cómo Correr el Proyecto

### Opción 1: Abrir directamente en el navegador

1. **Descarga el proyecto**
   ```bash
   git clone https://github.com/tu-usuario/live-cam-translator.git
   cd live-cam-translator
   ```

2. **Abre el archivo HTML**
   - Haz doble clic en `index.html`
   - O arrastra el archivo a tu navegador

3. **Configura tus credenciales**
   - Aparecerá un formulario al cargar la página
   - Ingresa tus 4 credenciales de Azure
   - Haz clic en **"Guardar y Continuar"**

4. **Inicia la aplicación**
   - Selecciona el idioma de destino
   - Haz clic en **"Iniciar todo"**
   - Acepta los permisos de cámara y micrófono
   - ¡Empieza a hablar!

### Opción 2: Usar un servidor local (recomendado)

Si tienes problemas con permisos de cámara/micrófono, usa un servidor local:

**Con Python:**
```bash
# Python 3
python -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

**Con Node.js:**
```bash
npx http-server -p 8000

# Abre: http://localhost:8000
```

**Con Live Server (VS Code):**
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 🎯 Uso

1. **Configurar credenciales** - Ingresa tus keys de Azure
2. **Seleccionar idioma** - Elige el idioma al que quieres traducir
3. **Iniciar** - Click en "Iniciar todo"
4. **Hablar** - Habla en español y verás la traducción en tiempo real
5. **Controlar micrófono** - Usa el botón 🎤 para mutear/activar

### Controles disponibles:

- **🎤 Mutear/Activar** - Controla el micrófono
- **⚙️ Cambiar Keys** - Modifica tus credenciales en cualquier momento
- **Selector de idioma** - Cambia el idioma de traducción sobre la marcha

## 🌍 Idiomas Soportados

- 🇪🇸 **Origen**: Español (es-ES)
- 🇬🇧 **Destino**: Inglés (en)
- 🇩🇪 **Destino**: Alemán (de)
- 🇫🇷 **Destino**: Francés (fr)
- 🇯🇵 **Destino**: Japonés (ja)
- 🇮🇹 **Destino**: Italiano (it)
- 🇵🇹 **Destino**: Portugués (pt)
