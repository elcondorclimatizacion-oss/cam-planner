/* ==========================================================
   CAMERA FOV PLANNER - CORE LOGIC (app.js)
   ========================================================== */

// 1. BASE DE DATOS DE MODELOS DE CÁMARAS PRECONFIGURADOS
const CAMERA_PRESETS = [
    // --- UNIVIEW ---
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC3614SR3-DPF28 (Domo Fijo Easy 4MP)',
        fov: 102.7,
        range: 30,
        lens: '2.8mm',
        color: '#00d2ff'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC3614SR3-ADPF28M (Domo Fijo StarView 4MP)',
        fov: 104.4,
        range: 30,
        lens: '2.8mm',
        color: '#06b6d4'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC2124SB-ADF28KM-I0 (Bala Fija Prime 4MP)',
        fov: 101.1,
        range: 40,
        lens: '2.8mm',
        color: '#3b82f6'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC3614SB-ADF28KM-I0 (Domo Turret Prime 4MP)',
        fov: 101.1,
        range: 30,
        lens: '2.8mm',
        color: '#1e3a8a'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC322LR3-VSPF28-C (Domo Fijo Easy 2MP)',
        fov: 112.7,
        range: 30,
        lens: '2.8mm',
        color: '#a855f7'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC2224SE-DF40K-WL-I0 (Bala ColorHunter 4MP)',
        fov: 97.7,
        range: 30,
        lens: '4.0mm',
        color: '#fbbf24'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC2324EBR-DPZ28 (Bala Varifocal Easy 4MP)',
        fov: 105.0,
        range: 50,
        lens: '2.8mm - 12mm',
        color: '#3b82f6'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC2324SB-DZK-I0 (Bala Varifocal Prime 4MP)',
        fov: 98.3,
        range: 50,
        lens: '2.7mm - 13.5mm',
        color: '#2563eb'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC6622SR-X33-VF (Domo PTZ Easy 2MP)',
        fov: 60.6,
        range: 150,
        lens: '4.5mm - 148.5mm',
        color: '#8b5cf6'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC6858SR-X22UP-VF (Domo PTZ Pro 4K 8MP)',
        fov: 56.7,
        range: 250,
        lens: '6.5mm - 143mm',
        color: '#d946ef'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'IPC8542ER5-DUG (Bala Pro Láser 2MP)',
        fov: 30.0,
        range: 500,
        lens: 'Láser',
        color: '#10b981'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC2621SR-F3-4F4AC-VD (Bala Térmica 3.2mm)',
        fov: 57.0,
        range: 120,
        lens: 'Térmica 3.2mm / Óptica 4mm',
        color: '#f43f5e'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC3612SA-F3-4F4AC-I1 (Domo Térmico 3.2mm)',
        fov: 57.0,
        range: 120,
        lens: 'Térmica 3.2mm / Óptica 4mm',
        color: '#fb7185'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC3612SA-F7-4F6AC-I1 (Domo Térmico 6.9mm)',
        fov: 25.0,
        range: 250,
        lens: 'Térmica 6.9mm / Óptica 6mm',
        color: '#dc2626'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC2A32SA-F3-4F4AC-I1 (Bala Térmica SIP 3.2mm)',
        fov: 57.0,
        range: 120,
        lens: 'Térmica 3.2mm / Óptica 4mm',
        color: '#f43f5e'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC2A32SA-F7-4F6AC-I1 (Bala Térmica SIP 6.9mm)',
        fov: 25.0,
        range: 250,
        lens: 'Térmica 6.9mm / Óptica 6mm',
        color: '#b91c1c'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC2A32SA-F10-4F8AC-I1 (Bala Térmica SIP 9.7mm)',
        fov: 18.0,
        range: 350,
        lens: 'Térmica 9.7mm / Óptica 8mm',
        color: '#991b1b'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC2624S-F10-4F6AC-I3 (Bala Térmica SIP 10mm)',
        fov: 24.0,
        range: 350,
        lens: 'Térmica 10mm / Óptica 6mm',
        color: '#ea580c'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC2624S-F25-4F12AC-I3 (Bala Térmica SIP 25mm)',
        fov: 9.6,
        range: 800,
        lens: 'Térmica 25mm / Óptica 12mm',
        color: '#d97706'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC2624S-F35-4F12AC-I3 (Bala Térmica SIP 35mm)',
        fov: 6.9,
        range: 1200,
        lens: 'Térmica 35mm / Óptica 12mm',
        color: '#ca8a04'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC6424S-F25-I3 (Domo PTZ Térmico 25mm)',
        fov: 9.6,
        range: 800,
        lens: 'Térmica 25mm',
        color: '#e11d48'
    },
    {
        brand: 'uniview',
        brandName: 'Uniview',
        model: 'TIC6424S-F50-I3 (Domo PTZ Térmico 50mm)',
        fov: 4.8,
        range: 1600,
        lens: 'Térmica 50mm',
        color: '#be123c'
    },
    // --- DAHUA ---
    {
        brand: 'dahua',
        brandName: 'Dahua',
        model: 'IPC-HFW2431S (Bala Básica 4MP)',
        fov: 102,
        range: 30,
        lens: '2.8mm',
        color: '#3b82f6'
    },
    {
        brand: 'dahua',
        brandName: 'Dahua',
        model: 'IPC-HFW5842H-ASE (Bala Varifocal 4K)',
        fov: 114,
        range: 50,
        lens: '2.7mm - 12mm',
        color: '#00d2ff'
    },
    {
        brand: 'dahua',
        brandName: 'Dahua',
        model: 'SD6AL445XA-HNR-IR (PTZ Láser 45x)',
        fov: 60,
        range: 550,
        lens: '3.95mm - 177.7mm',
        color: '#10b981'
    },
    // --- EZVIZ ---
    {
        brand: 'ezviz',
        brandName: 'Ezviz',
        model: 'C3W Pro (Bala Residencial)',
        fov: 103,
        range: 30,
        lens: '2.8mm',
        color: '#f59e0b'
    },
    {
        brand: 'ezviz',
        brandName: 'Ezviz',
        model: 'H8 Pro 3K (PTZ Doméstica)',
        fov: 89,
        range: 30,
        lens: '4mm',
        color: '#8b5cf6'
    },
    // --- IMOU ---
    {
        brand: 'imou',
        brandName: 'Imou',
        model: 'Bullet 2C (Bala Básica)',
        fov: 89,
        range: 30,
        lens: '3.6mm',
        color: '#f59e0b'
    },
    {
        brand: 'imou',
        brandName: 'Imou',
        model: 'Cruiser 2 5MP (PTZ Exterior)',
        fov: 85,
        range: 30,
        lens: '3.6mm',
        color: '#8b5cf6'
    },
    // --- REDES MESH WI-FI ---
    {
        brand: 'mesh',
        brandName: 'Red Mesh Wi-Fi',
        model: 'Ubiquiti UniFi AC-Mesh (UAP-AC-M)',
        fov: 360,
        range: 120,
        lens: 'Omnidireccional Exterior',
        color: '#06b6d4'
    },
    {
        brand: 'mesh',
        brandName: 'Red Mesh Wi-Fi',
        model: 'Ubiquiti UniFi U6-Mesh (Wi-Fi 6)',
        fov: 360,
        range: 100,
        lens: 'MIMO 2x2 Ext/Int',
        color: '#22d3ee'
    },
    {
        brand: 'mesh',
        brandName: 'Red Mesh Wi-Fi',
        model: 'TP-Link Omada EAP610-Outdoor',
        fov: 360,
        range: 150,
        lens: 'Wi-Fi 6 IP67',
        color: '#0891b2'
    },
    {
        brand: 'mesh',
        brandName: 'Red Mesh Wi-Fi',
        model: 'TP-Link Omada EAP225-Outdoor',
        fov: 360,
        range: 90,
        lens: 'Wi-Fi 5 IP65',
        color: '#0e7490'
    }
];

// 2. ESTADO GLOBAL DE LA APLICACIÓN
let appState = {
    cameras: [],                // Cámaras colocadas en el plano
    customModels: [],           // Modelos de cámara creados por el usuario
    backgroundImage: null,      // Objeto Image cargado de fondo
    imageName: '',              // Nombre del archivo de fondo
    
    // Zoom & Pan
    zoomScale: 1.0,
    panOffsetX: 0,
    panOffsetY: 0,
    
    // Calibración de Escala
    isCalibrating: false,       // ¿Estamos en modo calibración?
    calibPoints: [],            // Puntos de calibración [{x, y}, {x, y}]
    pixelsPerMeter: 10.0,       // Escala por defecto (10px = 1 metro)
    calibrated: false,          // ¿Ya se calibró?
    totalWidth: 100,            // Ancho total del terreno en metros
    totalLength: 75,            // Largo total del terreno en metros
    totalHeight: 6,             // Altura de techo/máxima en metros
    
    // Cotas y Anotaciones
    measurements: [],           // Cotas de medidas en plano [{ id, p1, p2, label }]
    isDrawingDimension: false,  // ¿Estamos en modo dibujo de cota?
    dimensionPoints: [],        // Puntos de la cota actual [{x, y}]
    currentMouseWorldCoords: null, // Coordenadas del mouse en el mundo
    
    // Interacciones
    selectedCameraId: null,     // Cámara seleccionada actualmente
    isDraggingCamera: false,    // ¿Arrastrando cámara?
    draggedCameraId: null,
    dragOffset: { x: 0, y: 0 }, // Offset del cursor respecto al centro de la cámara
    isRotatingCamera: false,    // ¿Rotando con gizmo?
    rotatingCameraId: null,
    isPanning: false,           // ¿Moviendo el lienzo?
    panStart: { x: 0, y: 0 },
    
    // Rack y Tendido de Cables
    rack: { x: 500, y: 350, name: 'Rack Central' },
    showCables: true,
    isDraggingRack: false,
    rackHeight: 1.6,
    conduitHeight: 6.0,
    
    // Cañerías
    conduits: [],
    isDrawingConduit: false,
    conduitPoints: []
};

// 3. ELEMENTOS DEL DOM
const canvas = document.getElementById('editorCanvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');

// Botones y Controles
const btnCalibrate = document.getElementById('btnCalibrate');
const btnStartCalibrate = document.getElementById('btnStartCalibrate');
const btnZoomIn = document.getElementById('btnZoomIn');
const btnZoomOut = document.getElementById('btnZoomOut');
const btnZoomReset = document.getElementById('btnZoomReset');
const btnClear = document.getElementById('btnClear');
const btnExport = document.getElementById('btnExport');
const scaleIndicator = document.getElementById('scaleIndicator');
const calibrationStatusDot = document.getElementById('calibrationStatusDot');

const imageUpload = document.getElementById('imageUpload');
const samplePlan1 = document.getElementById('samplePlan1');
const samplePlan2 = document.getElementById('samplePlan2');

const brandFilter = document.getElementById('brandFilter');
const cameraModelSelect = document.getElementById('cameraModelSelect');
const modelSpecsBox = document.getElementById('modelSpecsBox');
const btnAddCamera = document.getElementById('btnAddCamera');

const btnToggleCustomModelForm = document.getElementById('btnToggleCustomModelForm');
const customModelForm = document.getElementById('customModelForm');
const btnSaveCustomModel = document.getElementById('btnSaveCustomModel');

const activeCamerasList = document.getElementById('activeCamerasList');
const activeCamCount = document.getElementById('activeCamCount');

// Modal Calibración
const calibrationModal = document.getElementById('calibrationModal');
const btnCloseCalibModal = document.getElementById('btnCloseCalibModal');
const calibrationInputBox = document.getElementById('calibrationInputBox');
const calibMeters = document.getElementById('calibMeters');
const btnSaveCalib = document.getElementById('btnSaveCalib');
const btnCancelCalib = document.getElementById('btnCancelCalib');

// Overlay Instrucciones
const instructionsOverlay = document.getElementById('instructionsOverlay');
const btnCloseInstructions = document.getElementById('btnCloseInstructions');

// Selectores e Inputs de Calibración
const btnMethodDims = document.getElementById('btnMethodDims');
const btnMethodLine = document.getElementById('btnMethodLine');
const panelCalibDims = document.getElementById('panelCalibDims');
const panelCalibLine = document.getElementById('panelCalibLine');
const calibTotalWidth = document.getElementById('calibTotalWidth');
const calibTotalLength = document.getElementById('calibTotalLength');
const calibTotalHeight = document.getElementById('calibTotalHeight');
const btnApplyTotalDims = document.getElementById('btnApplyTotalDims');

// Elementos de Cotas (Medidas)
const btnDrawDimension = document.getElementById('btnDrawDimension');
const activeCotasList = document.getElementById('activeCotasList');
const activeCotasCount = document.getElementById('activeCotasCount');
const dimensionModal = document.getElementById('dimensionModal');
const dimLabelInput = document.getElementById('dimLabelInput');
const btnSaveDimension = document.getElementById('btnSaveDimension');
const btnCancelDimension = document.getElementById('btnCancelDimension');

// Elementos de Exportar/Importar Proyecto JSON e Imprimir
const btnExportProject = document.getElementById('btnExportProject');
const btnImportProjectTrigger = document.getElementById('btnImportProjectTrigger');
const projectJSONUpload = document.getElementById('projectJSONUpload');
const btnPrintReport = document.getElementById('btnPrintReport');
const printReportContainer = document.getElementById('printReportContainer');

// Inputs para Propuesta e Impresión
const reportClientName = document.getElementById('reportClientName');
const reportLaborBudget = document.getElementById('reportLaborBudget');
const reportProjectDate = document.getElementById('reportProjectDate');
const reportObservations = document.getElementById('reportObservations');
const chkShowCables = document.getElementById('chkShowCables');
const rackHeightInput = document.getElementById('rackHeight');
const conduitHeightInput = document.getElementById('conduitHeight');
const btnDrawConduit = document.getElementById('btnDrawConduit');
const activeConduitsList = document.getElementById('activeConduitsList');
const activeConduitsCount = document.getElementById('activeConduitsCount');

// 4. INICIALIZACIÓN
window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    loadCustomModels();
    populateModelSelect();
    setupEventListeners();
    
    // Establecer fecha por defecto a hoy
    if (reportProjectDate) {
        const today = new Date().toISOString().split('T')[0];
        reportProjectDate.value = today;
    }
    
    // Cargar Plano Demo 1 por defecto
    loadSamplePlan(1);
    
    // Cargar cámaras previas de localStorage si existen
    loadStateFromLocalStorage();
    
    draw();
});

// Ajustar tamaño del canvas al contenedor
function resizeCanvas() {
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;
    draw();
}
window.addEventListener('resize', resizeCanvas);

// 5. EVENT LISTENERS GENERALES
function setupEventListeners() {
    // Zoom & Pan en Canvas
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Soporte Táctil para Celulares y Tablets
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Desactivar click derecho de menú contextual sobre el canvas para poder usarlo de arrastre
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    
    // Toolbar Flotante
    btnCalibrate.addEventListener('click', toggleCalibrationMode);
    btnStartCalibrate.addEventListener('click', toggleCalibrationMode);
    btnZoomIn.addEventListener('click', () => zoom(1.2));
    btnZoomOut.addEventListener('click', () => zoom(1 / 1.2));
    btnZoomReset.addEventListener('click', resetZoomAndPan);
    btnClear.addEventListener('click', clearAllCameras);
    btnExport.addEventListener('click', exportCanvasToImage);
    
    // Cargar imágenes
    imageUpload.addEventListener('change', handleImageUpload);
    samplePlan1.addEventListener('click', () => loadSamplePlan(1));
    samplePlan2.addEventListener('click', () => loadSamplePlan(2));
    
    // Selector de Cámara
    brandFilter.addEventListener('change', populateModelSelect);
    cameraModelSelect.addEventListener('change', updateModelSpecs);
    btnAddCamera.addEventListener('click', addCameraToCenter);
    
    // Formulario Custom Model Accordion
    btnToggleCustomModelForm.addEventListener('click', () => {
        const isVisible = customModelForm.style.display === 'block';
        customModelForm.style.display = isVisible ? 'none' : 'block';
        btnToggleCustomModelForm.textContent = isVisible ? '+ Crear Modelo Personalizado' : '- Ocultar Formulario';
    });
    btnSaveCustomModel.addEventListener('click', saveCustomModel);
    
    // Modal Calibración
    btnCloseCalibModal.addEventListener('click', () => calibrationModal.classList.remove('active'));
    btnSaveCalib.addEventListener('click', saveCalibrationValue);
    btnCancelCalib.addEventListener('click', cancelCalibration);
    
    // Métodos de calibración (Medidas Totales / Línea)
    btnMethodDims.addEventListener('click', () => switchCalibrationMethod('dims'));
    btnMethodLine.addEventListener('click', () => switchCalibrationMethod('line'));
    calibTotalWidth.addEventListener('input', handleTotalWidthChange);
    btnApplyTotalDims.addEventListener('click', applyTotalDimensions);
    
    // Botones de Cotas (Medidas)
    btnDrawDimension.addEventListener('click', toggleDrawDimensionMode);
    btnSaveDimension.addEventListener('click', saveDimensionLabel);
    btnCancelDimension.addEventListener('click', cancelDimensionLine);
    
    // Botón de Cañería
    btnDrawConduit.addEventListener('click', toggleDrawConduitMode);
    
    // Checkbox Tendido Cables
    chkShowCables.addEventListener('change', e => {
        appState.showCables = e.target.checked;
        saveStateToLocalStorage();
        draw();
    });
    
    // Inputs de Alturas para Rack 3D
    rackHeightInput.addEventListener('input', e => {
        let val = parseFloat(e.target.value);
        appState.rackHeight = isNaN(val) ? 1.6 : val;
        saveStateToLocalStorage();
        renderActiveCamerasList();
        draw();
    });
    conduitHeightInput.addEventListener('input', e => {
        let val = parseFloat(e.target.value);
        appState.conduitHeight = isNaN(val) ? 6.0 : val;
        saveStateToLocalStorage();
        renderActiveCamerasList();
        draw();
    });

    // Botones de Guardar / Cargar Proyectos (JSON) e Impresión
    btnExportProject.addEventListener('click', exportProjectJSON);
    btnImportProjectTrigger.addEventListener('click', () => projectJSONUpload.click());
    projectJSONUpload.addEventListener('change', importProjectJSON);
    btnPrintReport.addEventListener('click', printTechnicalReport);
    
    // Cerrar Instrucciones
    btnCloseInstructions.addEventListener('click', () => {
        instructionsOverlay.style.opacity = '0';
        setTimeout(() => {
            instructionsOverlay.style.display = 'none';
        }, 300);
    });
    
    // Doble Click para agregar cámara rápido
    canvas.addEventListener('dblclick', handleDoubleClick);
}

// 6. GESTIÓN DE MODELOS PERSONALIZADOS (LocalStorage)
function loadCustomModels() {
    const saved = localStorage.getItem('camPlanner_customModels');
    if (saved) {
        try {
            appState.customModels = JSON.parse(saved);
        } catch(e) {
            console.error('Error cargando modelos personalizados:', e);
            appState.customModels = [];
        }
    }
}

function saveCustomModel() {
    const brandVal = document.getElementById('newCamBrand').value;
    const nameVal = document.getElementById('newCamName').value.trim();
    const fovVal = parseFloat(document.getElementById('newCamFOV').value);
    const rangeVal = parseFloat(document.getElementById('newCamRange').value);
    const lensVal = document.getElementById('newCamLens').value.trim() || '4mm';
    
    if (!nameVal) {
        alert('Por favor ingresa un nombre para el modelo.');
        return;
    }
    
    const newModel = {
        brand: 'custom',
        brandName: brandVal,
        model: `${nameVal} (${lensVal})`,
        fov: fovVal,
        range: rangeVal,
        lens: lensVal,
        color: '#ff4b4b' // Color rojo por defecto para personalizados
    };
    
    appState.customModels.push(newModel);
    localStorage.setItem('camPlanner_customModels', JSON.stringify(appState.customModels));
    
    // Resetear formulario
    document.getElementById('newCamName').value = '';
    customModelForm.style.display = 'none';
    btnToggleCustomModelForm.textContent = '+ Crear Modelo Personalizado';
    
    // Refrescar selector
    brandFilter.value = 'custom';
    populateModelSelect();
    cameraModelSelect.value = newModel.model;
    updateModelSpecs();
}

// Llenar selector de modelos según filtro de marca
function populateModelSelect() {
    const selectedBrand = brandFilter.value;
    cameraModelSelect.innerHTML = '';
    
    // Juntar presets con personalizados
    const allModels = [...CAMERA_PRESETS, ...appState.customModels];
    
    const filtered = allModels.filter(m => {
        if (selectedBrand === 'all') return true;
        if (selectedBrand === 'custom') return m.brand === 'custom';
        return m.brand === selectedBrand;
    });
    
    if (filtered.length === 0) {
        const opt = document.createElement('option');
        opt.textContent = '-- Sin Modelos Guardados --';
        opt.disabled = true;
        cameraModelSelect.appendChild(opt);
    } else {
        filtered.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.model;
            // Si es personalizado, mostrar su marca real
            const brandDisplay = m.brand === 'custom' ? m.brandName : m.brandName;
            opt.textContent = `[${brandDisplay}] ${m.model}`;
            cameraModelSelect.appendChild(opt);
        });
    }
    
    updateModelSpecs();
}

// Mostrar especificaciones del modelo seleccionado en sidebar
function getSelectedModelDetails() {
    const modelName = cameraModelSelect.value;
    const allModels = [...CAMERA_PRESETS, ...appState.customModels];
    return allModels.find(m => m.model === modelName);
}

function updateModelSpecs() {
    const m = getSelectedModelDetails();
    if (!m) {
        modelSpecsBox.innerHTML = '<p style="color: var(--text-muted)">Selecciona un modelo para ver detalles.</p>';
        return;
    }
    
    modelSpecsBox.innerHTML = `
        <div class="spec-line"><span class="spec-label">Marca:</span><span class="spec-val">${m.brand === 'custom' ? m.brandName : m.brandName}</span></div>
        <div class="spec-line"><span class="spec-label">Lente:</span><span class="spec-val">${m.lens}</span></div>
        <div class="spec-line"><span class="spec-label">Apertura (FOV):</span><span class="spec-val">${m.fov}°</span></div>
        <div class="spec-line"><span class="spec-label">Alcance IR:</span><span class="spec-val">${m.range} metros</span></div>
    `;
}

// 7. CARGA DE IMÁGENES / PLANOS PROCEDURALES
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    appState.imageName = file.name;
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            appState.backgroundImage = img;
            // Quitar calibración previa al cambiar de imagen
            appState.calibrated = false;
            appState.calibPoints = [];
            appState.pixelsPerMeter = 10.0; // Reset a default
            appState.conduits = [];
            appState.measurements = [];
            renderConduitsList();
            renderCotasList();
            updateLengthFromWidth();
            updateScaleUI();
            resetZoomAndPan();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Genera un plano ficticio en un canvas offscreen y lo asigna como fondo
function loadSamplePlan(type) {
    const offscreen = document.createElement('canvas');
    const octx = offscreen.getContext('2d');
    
    if (type === 1) {
        // Terreno Grande Exterior (ej. 120m x 90m)
        offscreen.width = 2400;
        offscreen.height = 1800;
        appState.imageName = 'Plano Terreno Grande (120m x 90m)';
        appState.pixelsPerMeter = 20.0; // 2400px / 120m = 20px/m
        
        // Fondo pasto/tierra oscura
        octx.fillStyle = '#0f1711';
        octx.fillRect(0, 0, 2400, 1800);
        
        // Dibujar grilla
        octx.strokeStyle = 'rgba(255,255,255,0.02)';
        octx.lineWidth = 1;
        const step = 100; // Cada 5 metros
        for (let x = 0; x < 2400; x += step) {
            octx.beginPath(); octx.moveTo(x, 0); octx.lineTo(x, 1800); octx.stroke();
        }
        for (let y = 0; y < 1800; y += step) {
            octx.beginPath(); octx.moveTo(0, y); octx.lineTo(2400, y); octx.stroke();
        }
        
        // Calle en la izquierda
        octx.fillStyle = '#212529';
        octx.fillRect(0, 0, 250, 1800);
        
        // Líneas de la calle
        octx.strokeStyle = '#f8f9fa';
        octx.lineWidth = 3;
        octx.setLineDash([20, 20]);
        octx.beginPath(); octx.moveTo(125, 0); octx.lineTo(125, 1800); octx.stroke();
        octx.setLineDash([]);
        
        // Cerca perimetral
        octx.strokeStyle = '#6c757d';
        octx.lineWidth = 4;
        octx.strokeRect(250, 50, 2100, 1700);
        
        // Portón (Amarillo)
        octx.strokeStyle = '#ffc107';
        octx.lineWidth = 8;
        octx.beginPath(); octx.moveTo(250, 600); octx.lineTo(250, 900); octx.stroke(); // Portón de 15m (300px)
        
        // Casa en medio
        octx.fillStyle = '#2a3439';
        octx.strokeStyle = '#f8f9fa';
        octx.lineWidth = 6;
        octx.fillRect(1000, 600, 600, 500); // Casa de 30m x 25m
        octx.strokeRect(1000, 600, 600, 500);
        
        // Piscina
        octx.fillStyle = '#0b5257';
        octx.fillRect(1150, 1250, 300, 150); // Piscina de 15m x 7.5m
        octx.strokeStyle = '#ffffff';
        octx.lineWidth = 2;
        octx.strokeRect(1150, 1250, 300, 150);
        
        // Depósito/Almacén
        octx.fillStyle = '#343a40';
        octx.fillRect(1900, 100, 400, 300); // 20m x 15m
        octx.strokeRect(1900, 100, 400, 300);
        
        // Textos
        octx.fillStyle = 'rgba(255,255,255,0.4)';
        octx.font = 'bold 36px Outfit';
        octx.fillText('AVENIDA PRINCIPAL', 40, 900);
        octx.fillText('ACCESO PRINCIPAL (PORTÓN 15m)', 280, 760);
        octx.fillText('CASA CENTRAL', 1180, 860);
        octx.fillText('DEPÓSITO NORTE', 1980, 260);
        octx.fillText('PISCINA', 1240, 1340);
        octx.fillText('120 METROS', 1200, 1770);
        octx.fillText('90 METROS', 2250, 900);
        
        // Línea de referencia indicadora
        octx.strokeStyle = 'rgba(255,255,255,0.2)';
        octx.lineWidth = 2;
        octx.beginPath(); octx.moveTo(250, 1750); octx.lineTo(2350, 1750); octx.stroke();
        octx.beginPath(); octx.moveTo(2300, 50); octx.lineTo(2300, 1750); octx.stroke();
        
    } else {
        // Fábrica Industrial Grande (ej. 150m x 100m)
        offscreen.width = 3000;
        offscreen.height = 2000;
        appState.imageName = 'Plano Nave Industrial (150m x 100m)';
        appState.pixelsPerMeter = 20.0; // 3000px / 150m = 20px/m
        
        // Fondo gris oscuro concreto
        octx.fillStyle = '#11131a';
        octx.fillRect(0, 0, 3000, 2000);
        
        // Nave Principal (Paredes)
        octx.fillStyle = '#1c1e29';
        octx.strokeStyle = '#4e5470';
        octx.lineWidth = 10;
        octx.fillRect(400, 300, 2200, 1400); // Fábrica de 110m x 70m
        octx.strokeRect(400, 300, 2200, 1400);
        
        // Racks / Estanterías
        octx.fillStyle = '#5c4513';
        octx.strokeStyle = '#b8860b';
        octx.lineWidth = 4;
        const rackW = 800; // 40m
        const rackH = 100; // 5m
        for (let i = 0; i < 4; i++) {
            octx.fillRect(600, 500 + i * 200, rackW, rackH);
            octx.strokeRect(600, 500 + i * 200, rackW, rackH);
            octx.fillRect(1600, 500 + i * 200, rackW, rackH);
            octx.strokeRect(1600, 500 + i * 200, rackW, rackH);
        }
        
        // Muelles de Carga (Portones de Carga)
        octx.fillStyle = '#2a2f45';
        octx.strokeStyle = '#00d2ff';
        octx.lineWidth = 6;
        for (let i = 0; i < 5; i++) {
            octx.fillRect(800 + i * 300, 260, 160, 40); // 5 muelles de 8 metros cada uno
            octx.strokeRect(800 + i * 300, 260, 160, 40);
        }
        
        // Oficinas internas
        octx.fillStyle = '#222738';
        octx.strokeStyle = '#6c757d';
        octx.lineWidth = 5;
        octx.fillRect(400, 1300, 700, 400); // Oficina de 35m x 20m
        octx.strokeRect(400, 1300, 700, 400);
        
        // Textos
        octx.fillStyle = 'rgba(255,255,255,0.4)';
        octx.font = 'bold 36px Outfit';
        octx.fillText('ZONA DE RACKS - SECTOR OESTE', 750, 1200);
        octx.fillText('ZONA DE RACKS - SECTOR ESTE', 1750, 1200);
        octx.fillText('MUELLES DE CARGA (A - E)', 1200, 220);
        octx.fillText('OFICINAS Y CONTROL', 550, 1500);
        octx.fillText('PATIO DE MANIOBRAS (EXTERIOR)', 1200, 100);
        octx.fillText('150 METROS', 1500, 1950);
        octx.fillText('100 METROS', 2850, 1000);
        
        // Línea de referencia perimetral exterior
        octx.strokeStyle = 'rgba(255,255,255,0.1)';
        octx.lineWidth = 2;
        octx.strokeRect(100, 50, 2800, 1850);
    }
    
    const img = new Image();
    img.onload = function() {
        appState.backgroundImage = img;
        appState.calibrated = true;
        if (type === 1) {
            appState.totalWidth = 120;
            appState.totalLength = 90;
            appState.totalHeight = 6;
        } else {
            appState.totalWidth = 150;
            appState.totalLength = 100;
            appState.totalHeight = 6;
        }
        calibTotalWidth.value = appState.totalWidth;
        calibTotalLength.value = appState.totalLength;
        calibTotalHeight.value = appState.totalHeight;
        updateScaleUI();
        resetZoomAndPan();
    };
    img.src = offscreen.toDataURL();
}

// 8. COORDINATE TRANSLATION HELPERS
// Traduce coordenadas del mouse (clientX/clientY) a coordenadas dentro del Canvas transformado (mundo real del plano)
function getTransformedCoords(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    const x = (mouseX - appState.panOffsetX) / appState.zoomScale;
    const y = (mouseY - appState.panOffsetY) / appState.zoomScale;
    
    return { x, y };
}

// Convierte metros a píxeles
function metersToPixels(m) {
    return m * appState.pixelsPerMeter;
}

// Convierte píxeles a metros
function pixelsToMeters(px) {
    return px / appState.pixelsPerMeter;
}

// Helper para convertir HEX a RGB para transparencia
function hexToRgb(hex) {
    // Si viene en formato corto #0ff -> #00ffff
    let c = hex.substring(1);
    if(c.length === 3) {
        c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const num = parseInt(c, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

// 9. ZOOM AND PAN
function handleWheel(e) {
    e.preventDefault();
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Traducir punto de zoom en espacio del mundo
    const worldX = (mouseX - appState.panOffsetX) / appState.zoomScale;
    const worldY = (mouseY - appState.panOffsetY) / appState.zoomScale;
    
    const zoomFactor = 1.15;
    let newScale = appState.zoomScale;
    
    if (e.deltaY < 0) {
        newScale = Math.min(8.0, appState.zoomScale * zoomFactor);
    } else {
        newScale = Math.max(0.04, appState.zoomScale / zoomFactor);
    }
    
    appState.zoomScale = newScale;
    
    // Ajustar offset para mantener el puntero en la misma posición de coordenadas del mundo
    appState.panOffsetX = mouseX - worldX * appState.zoomScale;
    appState.panOffsetY = mouseY - worldY * appState.zoomScale;
    
    draw();
}

function zoom(factor) {
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const worldX = (centerX - appState.panOffsetX) / appState.zoomScale;
    const worldY = (centerY - appState.panOffsetY) / appState.zoomScale;
    
    appState.zoomScale = Math.max(0.04, Math.min(8.0, appState.zoomScale * factor));
    
    appState.panOffsetX = centerX - worldX * appState.zoomScale;
    appState.panOffsetY = centerY - worldY * appState.zoomScale;
    
    draw();
}

function resetZoomAndPan() {
    if (!appState.backgroundImage) return;
    
    // Ajustar el zoom para que toda la imagen de fondo quepa en el canvas
    const imgRatio = appState.backgroundImage.width / appState.backgroundImage.height;
    const canvasRatio = canvas.width / canvas.height;
    
    if (imgRatio > canvasRatio) {
        appState.zoomScale = canvas.width / appState.backgroundImage.width;
    } else {
        appState.zoomScale = canvas.height / appState.backgroundImage.height;
    }
    
    // Centrar imagen
    appState.panOffsetX = (canvas.width - appState.backgroundImage.width * appState.zoomScale) / 2;
    appState.panOffsetY = (canvas.height - appState.backgroundImage.height * appState.zoomScale) / 2;
    
    draw();
}

// 10. CALIBRACIÓN DE ESCALA
function toggleCalibrationMode() {
    appState.isCalibrating = !appState.isCalibrating;
    appState.calibPoints = [];
    
    if (appState.isCalibrating) {
        // Desactivar otros modos
        appState.isDrawingDimension = false;
        btnDrawDimension.classList.remove('active');
        appState.isDrawingConduit = false;
        btnDrawConduit.classList.remove('active');
        
        btnCalibrate.classList.add('active');
        btnStartCalibrate.classList.add('btn-primary');
        btnStartCalibrate.textContent = 'Calibrando (Haz clic en mapa)...';
        calibrationModal.classList.add('active');
        calibrationInputBox.style.display = 'none';
        canvas.style.cursor = 'crosshair';
    } else {
        cancelCalibration();
    }
    draw();
}

function cancelCalibration() {
    appState.isCalibrating = false;
    appState.calibPoints = [];
    btnCalibrate.classList.remove('active');
    btnStartCalibrate.classList.remove('btn-primary');
    btnStartCalibrate.textContent = 'Iniciar Calibración';
    calibrationInputBox.style.display = 'none';
    canvas.style.cursor = 'grab';
    draw();
}

function saveCalibrationValue() {
    if (appState.calibPoints.length < 2) return;
    
    const meters = parseFloat(calibMeters.value);
    if (isNaN(meters) || meters <= 0) {
        alert('Por favor ingresa un número de metros válido mayor a 0.');
        return;
    }
    
    const p1 = appState.calibPoints[0];
    const p2 = appState.calibPoints[1];
    
    // Distancia en píxeles (dentro de las coordenadas de la imagen)
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const pixelDist = Math.sqrt(dx*dx + dy*dy);
    
    if (pixelDist < 2) {
        alert('La línea trazada es demasiado corta para calibrar. Dibuja una línea más larga.');
        return;
    }
    
    appState.pixelsPerMeter = pixelDist / meters;
    appState.calibrated = true;
    
    cancelCalibration();
    updateScaleUI();
    saveStateToLocalStorage();
    
    // Mostrar un aviso flotante de éxito
    scaleIndicator.style.animation = 'pulse 1s';
    setTimeout(() => scaleIndicator.style.animation = '', 1000);
}

function updateScaleUI() {
    if (appState.calibrated) {
        scaleIndicator.textContent = `Escala: 1m = ${appState.pixelsPerMeter.toFixed(1)}px | Archivo: ${appState.imageName}`;
        calibrationStatusDot.classList.add('calibrated');
    } else {
        scaleIndicator.textContent = `Escala: Sin calibrar (1px = 1px) | Archivo: ${appState.imageName}`;
        calibrationStatusDot.classList.remove('calibrated');
    }
    
    // Actualizar todos los campos de visualización de alcance de cámaras activas
    renderActiveCamerasList();
    draw();
}

// FUNCIONES DE CALIBRACIÓN DE SUPERFICIE COMPLETA
function updateLengthFromWidth() {
    if (!appState.backgroundImage) return;
    const w = parseFloat(calibTotalWidth.value);
    if (isNaN(w) || w <= 0) return;
    
    const ratio = appState.backgroundImage.height / appState.backgroundImage.width;
    const l = w * ratio;
    calibTotalLength.value = Math.round(l);
}

function handleTotalWidthChange() {
    updateLengthFromWidth();
}

function switchCalibrationMethod(method) {
    if (method === 'dims') {
        btnMethodDims.classList.add('active');
        btnMethodLine.classList.remove('active');
        panelCalibDims.style.display = 'block';
        panelCalibLine.style.display = 'none';
        updateLengthFromWidth();
    } else {
        btnMethodLine.classList.add('active');
        btnMethodDims.classList.remove('active');
        panelCalibLine.style.display = 'block';
        panelCalibDims.style.display = 'none';
    }
}

function applyTotalDimensions() {
    if (!appState.backgroundImage) {
        alert('Por favor carga una imagen o selecciona un plano demo antes de aplicar las dimensiones.');
        return;
    }
    
    const w = parseFloat(calibTotalWidth.value);
    const h = parseFloat(calibTotalHeight.value);
    if (isNaN(w) || w <= 0) {
        alert('Por favor ingresa un ancho total válido.');
        return;
    }
    
    // Calcular escala: pixels por metro
    appState.pixelsPerMeter = appState.backgroundImage.width / w;
    appState.calibrated = true;
    appState.totalWidth = w;
    appState.totalLength = parseFloat(calibTotalLength.value);
    appState.totalHeight = isNaN(h) ? 6 : h;
    
    updateScaleUI();
    saveStateToLocalStorage();
    
    // Alerta visual de éxito
    scaleIndicator.style.animation = 'pulse 1s';
    setTimeout(() => scaleIndicator.style.animation = '', 1000);
}

// 11. GESTIÓN DE CÁMARAS EN EL LIENZO
function addCameraToCenter() {
    if (!appState.backgroundImage) {
        alert('Por favor carga una imagen o selecciona un plano demo antes de agregar cámaras.');
        return;
    }
    
    const m = getSelectedModelDetails();
    if (!m) return;
    
    // Centrar en el viewport actual
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const worldCoords = getTransformedCoords(centerX + rect.left, centerY + rect.top);
    
    addNewCamera(m, worldCoords.x, worldCoords.y);
}

function handleDoubleClick(e) {
    if (appState.isDrawingConduit) {
        saveConduitLine();
        return;
    }
    
    if (appState.isCalibrating || !appState.backgroundImage) return;
    
    const m = getSelectedModelDetails();
    if (!m) return;
    
    const rect = canvas.getBoundingClientRect();
    const worldCoords = getTransformedCoords(e.clientX, e.clientY);
    
    addNewCamera(m, worldCoords.x, worldCoords.y);
}

function addNewCamera(modelData, x, y) {
    const camId = 'cam_' + Date.now() + '_' + Math.floor(Math.random()*1000);
    const count = appState.cameras.length + 1;
    
    const newCam = {
        id: camId,
        name: `Cámara ${count}`,
        brand: modelData.brand,
        brandName: modelData.brandName,
        model: modelData.model.split(' (')[0], // Quitar sufijos
        lens: modelData.lens,
        x: x,
        y: y,
        fov: modelData.fov,
        range: modelData.range,
        rotation: 0, // Mirando a la derecha (0°) por defecto
        opacity: 0.35,
        height: 3,   // Altura de instalación en metros (por defecto 3m)
        color: modelData.color
    };
    
    appState.cameras.push(newCam);
    appState.selectedCameraId = camId;
    
    saveStateToLocalStorage();
    renderActiveCamerasList();
    draw();
}

function deleteCamera(id) {
    appState.cameras = appState.cameras.filter(c => c.id !== id);
    if (appState.selectedCameraId === id) {
        appState.selectedCameraId = null;
    }
    saveStateToLocalStorage();
    renderActiveCamerasList();
    draw();
}

function clearAllCameras() {
    if (appState.cameras.length === 0) return;
    if (confirm('¿Estás seguro de que quieres eliminar TODAS las cámaras del plano?')) {
        appState.cameras = [];
        appState.selectedCameraId = null;
        saveStateToLocalStorage();
        renderActiveCamerasList();
        draw();
    }
}

// Proyectar punto P al segmento AB
function projectPointToSegment(P, A, B) {
    const abX = B.x - A.x;
    const abY = B.y - A.y;
    const apX = P.x - A.x;
    const apY = P.y - A.y;
    
    const abLenSq = abX * abX + abY * abY;
    if (abLenSq === 0) return { x: A.x, y: A.y, t: 0 };
    
    let t = (apX * abX + apY * abY) / abLenSq;
    t = Math.max(0, Math.min(1, t)); // Limitar al segmento
    
    return {
        x: A.x + t * abX,
        y: A.y + t * abY,
        t: t
    };
}

// Proyectar punto P a una línea string (cañería)
function projectPointToPath(P, points) {
    let minD = Infinity;
    let bestProj = null;
    let bestSegmentIndex = -1;
    
    for (let i = 0; i < points.length - 1; i++) {
        const A = points[i];
        const B = points[i+1];
        const proj = projectPointToSegment(P, A, B);
        const dx = P.x - proj.x;
        const dy = P.y - proj.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        
        if (d < minD) {
            minD = d;
            bestProj = proj;
            bestSegmentIndex = i;
        }
    }
    
    return {
        point: bestProj, // {x, y}
        segmentIndex: bestSegmentIndex,
        distanceToPath: minD
    };
}

// Distancia en píxeles a lo largo de los segmentos de la cañería
function pathDistanceBetweenProjections(points, proj1, proj2) {
    let idx1 = proj1.segmentIndex;
    let idx2 = proj2.segmentIndex;
    let p1 = proj1.point;
    let p2 = proj2.point;
    
    if (idx1 === idx2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
    
    if (idx1 > idx2) {
        let temp = idx1; idx1 = idx2; idx2 = temp;
        let tempP = p1; p1 = p2; p2 = tempP;
    }
    
    let totalD = 0;
    
    // De p1 al final del segmento idx1
    const endSegment1 = points[idx1 + 1];
    let dx = endSegment1.x - p1.x;
    let dy = endSegment1.y - p1.y;
    totalD += Math.sqrt(dx*dx + dy*dy);
    
    // Segmentos intermedios completos
    for (let i = idx1 + 1; i < idx2; i++) {
        const A = points[i];
        const B = points[i+1];
        const segDx = B.x - A.x;
        const segDy = B.y - A.y;
        totalD += Math.sqrt(segDx*segDx + segDy*segDy);
    }
    
    // Del inicio del segmento idx2 a p2
    const startSegment2 = points[idx2];
    dx = p2.x - startSegment2.x;
    dy = p2.y - startSegment2.y;
    totalD += Math.sqrt(dx*dx + dy*dy);
    
    return totalD;
}

// Función para calcular la distancia real 3D (Opción B)
function calculateRealDistance(cam) {
    if (!appState.rack) return 0;
    
    let dist2D = 0;
    
    // Si hay cañerías trazadas, calcular la distancia recorriendo la cañería
    if (appState.conduits && appState.conduits.length > 0) {
        let minTotalDist = Infinity;
        
        appState.conduits.forEach(cond => {
            if (cond.points.length < 2) return;
            
            // Proyectar Rack a la cañería
            const rackProj = projectPointToPath(appState.rack, cond.points);
            // Proyectar Cámara a la cañería
            const camProj = projectPointToPath(cam, cond.points);
            
            // Calcular distancias de conexión
            const distRackToCond = rackProj.distanceToPath;
            const distCamToCond = camProj.distanceToPath;
            const distAlongCond = pathDistanceBetweenProjections(cond.points, rackProj, camProj);
            
            const total2D = distRackToCond + distAlongCond + distCamToCond;
            if (total2D < minTotalDist) {
                minTotalDist = total2D;
            }
        });
        
        dist2D = minTotalDist === Infinity ? 0 : pixelsToMeters(minTotalDist);
    } else {
        // Fallback: Línea recta directa
        const dx = cam.x - appState.rack.x;
        const dy = cam.y - appState.rack.y;
        dist2D = pixelsToMeters(Math.sqrt(dx*dx + dy*dy));
    }
    
    // Subida vertical del Rack al Caño principal
    const verticalClimbRack = Math.max(0, appState.conduitHeight - appState.rackHeight);
    
    // Subida/bajada vertical desde el Caño principal hasta la cámara
    const verticalChangeCam = Math.abs((cam.height || 3) - appState.conduitHeight);
    
    return dist2D + verticalClimbRack + verticalChangeCam;
}

// 12. GESTIÓN DEL PANEL DE CÁMARAS ACTIVAS
function renderActiveCamerasList() {
    activeCamCount.textContent = appState.cameras.length;
    
    if (appState.cameras.length === 0) {
        activeCamerasList.innerHTML = `
            <div class="no-cameras-placeholder">
                No has agregado cámaras al plano. Presiona "Añadir al Plano" o haz doble clic en el lienzo.
            </div>
        `;
        return;
    }
    
    activeCamerasList.innerHTML = '';
    
    appState.cameras.forEach(cam => {
        const isSelected = cam.id === appState.selectedCameraId;
        const card = document.createElement('div');
        card.className = `camera-card ${isSelected ? 'selected' : ''}`;
        card.dataset.id = cam.id;
        
        card.addEventListener('click', () => {
            appState.selectedCameraId = cam.id;
            renderActiveCamerasList();
            draw();
        });
        
        // Calcular distancia al rack
        const dx = cam.x - (appState.rack ? appState.rack.x : 500);
        const dy = cam.y - (appState.rack ? appState.rack.y : 350);
        const dist2D = pixelsToMeters(Math.sqrt(dx*dx + dy*dy));
        const distReal = calculateRealDistance(cam);
        
        card.innerHTML = `
            <div class="cam-card-header">
                <div class="cam-card-title-group">
                    <span class="cam-card-dot" style="background-color: ${cam.color}"></span>
                    <input type="text" class="cam-card-name-input" value="${cam.name}" data-id="${cam.id}" title="Editar nombre">
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="cam-card-brand">${cam.brandName}</span>
                    <button class="cam-card-delete" data-id="${cam.id}" title="Eliminar Cámara">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
            <div class="cam-card-body">
                <div style="color: var(--text-muted); font-size: 10px; margin-bottom: 2px; display: flex; justify-content: space-between;">
                    <span>${cam.model} (${cam.lens})</span>
                    <span style="color: var(--color-primary); font-weight: bold; font-family: monospace; font-size: 11px;" title="Distancia real con alturas (Plano 2D: ${Math.round(dist2D)}m)">Dist. Real: ${Math.round(distReal)}m</span>
                </div>
                <div class="cam-card-controls">
                    <!-- Rotación -->
                    <div class="ctrl-row">
                        <span class="ctrl-label">Rotación</span>
                        <input type="range" class="ctrl-slider rot-slider" min="0" max="360" value="${Math.round(cam.rotation)}" data-id="${cam.id}">
                        <span class="ctrl-value">${Math.round(cam.rotation)}°</span>
                    </div>
                    <!-- Ángulo FOV -->
                    <div class="ctrl-row">
                        <span class="ctrl-label">Apertura</span>
                        <input type="range" class="ctrl-slider fov-slider" min="10" max="180" value="${Math.round(cam.fov)}" data-id="${cam.id}">
                        <span class="ctrl-value">${Math.round(cam.fov)}°</span>
                    </div>
                    <!-- Alcance en Metros -->
                    <div class="ctrl-row">
                        <span class="ctrl-label">Alcance</span>
                        <input type="range" class="ctrl-slider range-slider" min="2" max="${cam.range > 200 ? 600 : 150}" value="${Math.round(cam.range)}" data-id="${cam.id}">
                        <span class="ctrl-value">${Math.round(cam.range)}m</span>
                    </div>
                    <!-- Altura de Montaje -->
                    <div class="ctrl-row">
                        <span class="ctrl-label">Alt. Montaje</span>
                        <input type="range" class="ctrl-slider height-slider" min="1" max="15" step="0.5" value="${cam.height || 3}" data-id="${cam.id}">
                        <span class="ctrl-value">${cam.height || 3}m</span>
                    </div>
                    <!-- Transparencia del Haz -->
                    <div class="ctrl-row">
                        <span class="ctrl-label">Opacidad</span>
                        <input type="range" class="ctrl-slider opacity-slider" min="5" max="100" value="${Math.round(cam.opacity * 100)}" data-id="${cam.id}">
                        <span class="ctrl-value">${Math.round(cam.opacity * 100)}%</span>
                    </div>
                    <!-- Color Picker -->
                    <div class="ctrl-row">
                        <span class="ctrl-label">Color Haz</span>
                        <div class="color-picker-wrapper">
                            <span class="color-circle-btn" style="background-color: ${cam.color}" data-id="${cam.id}"></span>
                            <input type="color" class="color-input-hidden" value="${cam.color}" data-id="${cam.id}">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        activeCamerasList.appendChild(card);
    });
    
    // Enlazar eventos de inputs dentro de la lista
    bindActiveCamerasInputs();
}

function bindActiveCamerasInputs() {
    // Input de Nombre
    document.querySelectorAll('.cam-card-name-input').forEach(inp => {
        inp.addEventListener('change', e => {
            const id = e.target.dataset.id;
            const cam = appState.cameras.find(c => c.id === id);
            if(cam && e.target.value.trim()) {
                cam.name = e.target.value.trim();
                saveStateToLocalStorage();
                draw();
            }
        });
        inp.addEventListener('click', e => e.stopPropagation()); // Evitar seleccionar tarjeta
    });
    
    // Sliders
    document.querySelectorAll('.rot-slider').forEach(s => {
        s.addEventListener('input', e => {
            const id = e.target.dataset.id;
            const cam = appState.cameras.find(c => c.id === id);
            if (cam) {
                cam.rotation = parseFloat(e.target.value);
                e.target.nextElementSibling.textContent = `${Math.round(cam.rotation)}°`;
                draw();
            }
        });
        s.addEventListener('change', () => saveStateToLocalStorage());
        s.addEventListener('click', e => e.stopPropagation());
    });
    
    document.querySelectorAll('.fov-slider').forEach(s => {
        s.addEventListener('input', e => {
            const id = e.target.dataset.id;
            const cam = appState.cameras.find(c => c.id === id);
            if (cam) {
                cam.fov = parseFloat(e.target.value);
                e.target.nextElementSibling.textContent = `${Math.round(cam.fov)}°`;
                draw();
            }
        });
        s.addEventListener('change', () => saveStateToLocalStorage());
        s.addEventListener('click', e => e.stopPropagation());
    });

    document.querySelectorAll('.range-slider').forEach(s => {
        s.addEventListener('input', e => {
            const id = e.target.dataset.id;
            const cam = appState.cameras.find(c => c.id === id);
            if (cam) {
                cam.range = parseFloat(e.target.value);
                e.target.nextElementSibling.textContent = `${Math.round(cam.range)}m`;
                draw();
            }
        });
        s.addEventListener('change', () => saveStateToLocalStorage());
        s.addEventListener('click', e => e.stopPropagation());
    });
    
    document.querySelectorAll('.height-slider').forEach(s => {
        s.addEventListener('input', e => {
            const id = e.target.dataset.id;
            const cam = appState.cameras.find(c => c.id === id);
            if (cam) {
                cam.height = parseFloat(e.target.value);
                e.target.nextElementSibling.textContent = `${cam.height.toFixed(1)}m`;
                draw();
            }
        });
        s.addEventListener('change', () => saveStateToLocalStorage());
        s.addEventListener('click', e => e.stopPropagation());
    });
    
    document.querySelectorAll('.opacity-slider').forEach(s => {
        s.addEventListener('input', e => {
            const id = e.target.dataset.id;
            const cam = appState.cameras.find(c => c.id === id);
            if (cam) {
                cam.opacity = parseFloat(e.target.value) / 100;
                e.target.nextElementSibling.textContent = `${Math.round(cam.opacity * 100)}%`;
                draw();
            }
        });
        s.addEventListener('change', () => saveStateToLocalStorage());
        s.addEventListener('click', e => e.stopPropagation());
    });
    
    // Color Picker
    document.querySelectorAll('.color-circle-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const colorInp = btn.nextElementSibling;
            colorInp.click();
        });
    });
    
    document.querySelectorAll('.color-input-hidden').forEach(inp => {
        inp.addEventListener('input', e => {
            const id = e.target.dataset.id;
            const cam = appState.cameras.find(c => c.id === id);
            if (cam) {
                cam.color = e.target.value;
                inp.previousElementSibling.style.backgroundColor = cam.color;
                // También actualizar el punto del header de la tarjeta
                const dot = inp.closest('.camera-card').querySelector('.cam-card-dot');
                if(dot) dot.style.backgroundColor = cam.color;
                draw();
            }
        });
        inp.addEventListener('change', () => saveStateToLocalStorage());
    });
    
    // Botón Eliminar
    document.querySelectorAll('.cam-card-delete').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const id = btn.dataset.id;
            deleteCamera(id);
        });
    });
}

// 13. MOUSE EVENTS ON CANVAS (DRAG, ROTATE, PAN, CALIBRATE)
function handleMouseDown(e) {
    const isRightClick = e.button === 2;
    const isSpacePressed = false; // Se puede capturar en Window, pero el click derecho es más práctico
    
    const rect = canvas.getBoundingClientRect();
    const worldCoords = getTransformedCoords(e.clientX, e.clientY);
    
    // 1. Modo Calibración
    if (appState.isCalibrating) {
        if (e.button !== 0) return; // Solo click izquierdo
        
        if (appState.calibPoints.length === 0) {
            appState.calibPoints.push({ x: worldCoords.x, y: worldCoords.y });
        } else if (appState.calibPoints.length === 1) {
            appState.calibPoints.push({ x: worldCoords.x, y: worldCoords.y });
            // Mostrar panel de entrada de metros
            calibrationInputBox.style.display = 'block';
            calibMeters.focus();
        } else {
            // Reiniciar con un nuevo punto
            appState.calibPoints = [{ x: worldCoords.x, y: worldCoords.y }];
            calibrationInputBox.style.display = 'none';
        }
        draw();
        return;
    }
    
    // 1c. Modo Dibujo de Cañería
    if (appState.isDrawingConduit) {
        if (e.button !== 0) return; // Solo click izquierdo
        appState.conduitPoints.push({ x: worldCoords.x, y: worldCoords.y });
        draw();
        return;
    }

    // 1b. Modo Dibujo de Cota
    if (appState.isDrawingDimension) {
        if (e.button !== 0) return; // Solo click izquierdo
        
        if (appState.dimensionPoints.length === 0) {
            appState.dimensionPoints.push({ x: worldCoords.x, y: worldCoords.y });
        } else if (appState.dimensionPoints.length === 1) {
            appState.dimensionPoints.push({ x: worldCoords.x, y: worldCoords.y });
            
            // Calcular distancia matemática basada en la escala actual
            const p1 = appState.dimensionPoints[0];
            const p2 = appState.dimensionPoints[1];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const pixelDist = Math.sqrt(dx*dx + dy*dy);
            const metersDist = pixelsToMeters(pixelDist);
            
            // Mostrar modal de ingreso de texto de cota con la medida matemática pre-cargada
            dimensionModal.classList.add('active');
            dimLabelInput.value = `${Math.round(metersDist)}m`;
            dimLabelInput.focus();
            dimLabelInput.select(); // Selecciona el texto para que el usuario pueda sobrescribirlo si quiere
        }
        draw();
        return;
    }
    
    // 2. Pan (Arrastrar Lienzo)
    // Se activa con Click Derecho o click izquierdo si se mantiene presionada la barra espaciadora
    if (isRightClick || e.shiftKey) {
        appState.isPanning = true;
        appState.panStart = { x: e.clientX, y: e.clientY };
        canvas.style.cursor = 'grabbing';
        return;
    }
    
    // 3. Click Izquierdo normal: Interactuar con Cámaras
    if (e.button === 0) {
        // ¿Hizo click en el Gizmo de rotación de la cámara seleccionada?
        if (appState.selectedCameraId) {
            const cam = appState.cameras.find(c => c.id === appState.selectedCameraId);
            if (cam) {
                const rotRad = cam.rotation * Math.PI / 180;
                // Radio del gizmo en píxeles (distancia al handle)
                const gizmoDistance = 50 / appState.zoomScale;
                const hx = cam.x + Math.cos(rotRad) * gizmoDistance;
                const hy = cam.y + Math.sin(rotRad) * gizmoDistance;
                
                // Distancia entre click y el handle
                const dx = worldCoords.x - hx;
                const dy = worldCoords.y - hy;
                const distToHandle = Math.sqrt(dx*dx + dy*dy);
                
                // Tolerancia de 12px de pantalla para agarrar el handle
                if (distToHandle < 12 / appState.zoomScale) {
                    appState.isRotatingCamera = true;
                    appState.rotatingCameraId = cam.id;
                    canvas.style.cursor = 'crosshair';
                    return;
                }
            }
        }
        
        // ¿Hizo click sobre el Rack? (Para arrastrarlo)
        if (appState.rack) {
            const dx = worldCoords.x - appState.rack.x;
            const dy = worldCoords.y - appState.rack.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 28 / appState.zoomScale) {
                appState.isDraggingRack = true;
                appState.dragOffset = {
                    x: worldCoords.x - appState.rack.x,
                    y: worldCoords.y - appState.rack.y
                };
                canvas.style.cursor = 'grabbing';
                return;
            }
        }

        // ¿Hizo click sobre alguna cámara (para seleccionarla / arrastrarla)?
        // Evaluamos de la última a la primera (las de arriba primero)
        for (let i = appState.cameras.length - 1; i >= 0; i--) {
            const cam = appState.cameras[i];
            const dx = worldCoords.x - cam.x;
            const dy = worldCoords.y - cam.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Tolerancia de agarre de cámara: 28px en pantalla
            if (dist < 28 / appState.zoomScale) {
                appState.selectedCameraId = cam.id;
                appState.isDraggingCamera = true;
                appState.draggedCameraId = cam.id;
                appState.dragOffset = {
                    x: worldCoords.x - cam.x,
                    y: worldCoords.y - cam.y
                };
                canvas.style.cursor = 'grabbing';
                
                renderActiveCamerasList();
                // Scroll a la tarjeta seleccionada en la sidebar
                const card = document.querySelector(`.camera-card[data-id="${cam.id}"]`);
                if(card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                draw();
                return;
            }
        }
        
        // Si hizo click en el vacío, deseleccionar
        if (appState.selectedCameraId !== null) {
            appState.selectedCameraId = null;
            renderActiveCamerasList();
            draw();
        }
    }
}

function handleMouseMove(e) {
    const worldCoords = getTransformedCoords(e.clientX, e.clientY);
    appState.currentMouseWorldCoords = worldCoords;
    
    // Redibujar en tiempo real si estamos trazando una cota o cañería para ver la línea elástica
    if ((appState.isDrawingDimension && appState.dimensionPoints.length === 1) ||
        (appState.isDrawingConduit && appState.conduitPoints.length > 0)) {
        draw();
    }
    
    // 1. Panning del Lienzo
    if (appState.isPanning) {
        const dx = e.clientX - appState.panStart.x;
        const dy = e.clientY - appState.panStart.y;
        
        appState.panOffsetX += dx;
        appState.panOffsetY += dy;
        
        appState.panStart = { x: e.clientX, y: e.clientY };
        draw();
        return;
    }
    
    // 2. Rotando Cámara con Gizmo
    if (appState.isRotatingCamera) {
        const cam = appState.cameras.find(c => c.id === appState.rotatingCameraId);
        if (cam) {
            const dx = worldCoords.x - cam.x;
            const dy = worldCoords.y - cam.y;
            let angleRad = Math.atan2(dy, dx);
            if (angleRad < 0) angleRad += Math.PI * 2;
            
            cam.rotation = angleRad * 180 / Math.PI;
            
            // Actualizar slider en tiempo real si está visible
            const slider = document.querySelector(`.rot-slider[data-id="${cam.id}"]`);
            if (slider) {
                slider.value = Math.round(cam.rotation);
                slider.nextElementSibling.textContent = `${Math.round(cam.rotation)}°`;
            }
            
            draw();
        }
        return;
    }
    
    // 3. Arrastrando Cámara
    if (appState.isDraggingCamera) {
        const cam = appState.cameras.find(c => c.id === appState.draggedCameraId);
        if (cam) {
            cam.x = worldCoords.x - (appState.dragOffset ? appState.dragOffset.x : 0);
            cam.y = worldCoords.y - (appState.dragOffset ? appState.dragOffset.y : 0);
            draw();
        }
        return;
    }
    
    // 3b. Arrastrando Rack
    if (appState.isDraggingRack && appState.rack) {
        appState.rack.x = worldCoords.x - (appState.dragOffset ? appState.dragOffset.x : 0);
        appState.rack.y = worldCoords.y - (appState.dragOffset ? appState.dragOffset.y : 0);
        draw();
        return;
    }
    
    // 4. Actualizar cursor sobre elementos activos
    if (!appState.isCalibrating && appState.backgroundImage) {
        let hover = false;
        
        // Hover en Gizmo
        if (appState.selectedCameraId) {
            const cam = appState.cameras.find(c => c.id === appState.selectedCameraId);
            if (cam) {
                const rotRad = cam.rotation * Math.PI / 180;
                const gizmoDistance = 50 / appState.zoomScale;
                const hx = cam.x + Math.cos(rotRad) * gizmoDistance;
                const hy = cam.y + Math.sin(rotRad) * gizmoDistance;
                const dx = worldCoords.x - hx;
                const dy = worldCoords.y - hy;
                if (Math.sqrt(dx*dx + dy*dy) < 12 / appState.zoomScale) {
                    canvas.style.cursor = 'crosshair';
                    hover = true;
                }
            }
        }
        
        // Hover en Cámaras
        if (!hover) {
            for (let i = 0; i < appState.cameras.length; i++) {
                const cam = appState.cameras[i];
                const dx = worldCoords.x - cam.x;
                const dy = worldCoords.y - cam.y;
                if (Math.sqrt(dx*dx + dy*dy) < 28 / appState.zoomScale) {
                    canvas.style.cursor = 'move';
                    hover = true;
                    break;
                }
            }
        }
        
        // Hover en Rack
        if (!hover && appState.rack) {
            const dx = worldCoords.x - appState.rack.x;
            const dy = worldCoords.y - appState.rack.y;
            if (Math.sqrt(dx*dx + dy*dy) < 28 / appState.zoomScale) {
                canvas.style.cursor = 'move';
                hover = true;
            }
        }
        
        if (!hover) {
            canvas.style.cursor = 'grab';
        }
    }
}

function handleMouseUp(e) {
    if (appState.isPanning) {
        appState.isPanning = false;
        canvas.style.cursor = 'grab';
    }
    
    if (appState.isDraggingCamera) {
        appState.isDraggingCamera = false;
        appState.draggedCameraId = null;
        canvas.style.cursor = 'grab';
        saveStateToLocalStorage();
    }
    
    if (appState.isRotatingCamera) {
        appState.isRotatingCamera = false;
        appState.rotatingCameraId = null;
        canvas.style.cursor = 'grab';
        saveStateToLocalStorage();
    }
    
    if (appState.isDraggingRack) {
        appState.isDraggingRack = false;
        canvas.style.cursor = 'grab';
        saveStateToLocalStorage();
        renderActiveCamerasList();
    }
}

// 14. EXPORTAR EL DISEÑO COMBINADO
function exportCanvasToImage() {
    if (!appState.backgroundImage) return;
    const dataUrl = getCombinedCanvasDataURL();
    const link = document.createElement('a');
    link.download = `Planificacion_Camaras_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
}

// 15. LOCALSTORAGE PERSISTENCE OF STATE
function saveStateToLocalStorage() {
    const dataToSave = {
        cameras: appState.cameras,
        pixelsPerMeter: appState.pixelsPerMeter,
        calibrated: appState.calibrated,
        imageName: appState.imageName,
        totalWidth: appState.totalWidth,
        totalLength: appState.totalLength,
        totalHeight: appState.totalHeight,
        measurements: appState.measurements,
        rack: appState.rack,
        showCables: appState.showCables,
        rackHeight: appState.rackHeight,
        conduitHeight: appState.conduitHeight
    };
    localStorage.setItem('camPlanner_workspaceState', JSON.stringify(dataToSave));
}

function loadStateFromLocalStorage() {
    const saved = localStorage.getItem('camPlanner_workspaceState');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.imageName === appState.imageName) {
                appState.cameras = data.cameras || [];
                appState.pixelsPerMeter = data.pixelsPerMeter || 10.0;
                appState.calibrated = data.calibrated || false;
                appState.totalWidth = data.totalWidth || 100;
                appState.totalLength = data.totalLength || 75;
                appState.totalHeight = data.totalHeight || 6;
                appState.measurements = data.measurements || [];
                appState.rack = data.rack || { x: 500, y: 350, name: 'Rack Central' };
                appState.showCables = data.showCables !== undefined ? data.showCables : true;
                appState.rackHeight = data.rackHeight !== undefined ? data.rackHeight : 1.6;
                appState.conduitHeight = data.conduitHeight !== undefined ? data.conduitHeight : 6.0;
                
                if (chkShowCables) {
                    chkShowCables.checked = appState.showCables;
                }
                if (rackHeightInput) {
                    rackHeightInput.value = appState.rackHeight;
                }
                if (conduitHeightInput) {
                    conduitHeightInput.value = appState.conduitHeight;
                }
                
                calibTotalWidth.value = appState.totalWidth;
                calibTotalLength.value = appState.totalLength;
                calibTotalHeight.value = appState.totalHeight;
            }
        } catch (e) {
            console.error('Error cargando estado desde local storage:', e);
        }
    }
    
    updateScaleUI();
    renderActiveCamerasList();
    renderCotasList();
}

// 16. LIENZO - DIBUJO Y RENDERIZADO (CANVAS DRAW LOOP)
function draw() {
    // Limpiar Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Si no hay imagen de fondo cargada, dibujar pantalla de espera
    if (!appState.backgroundImage) {
        ctx.fillStyle = '#0b0c10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Outfit';
        ctx.textAlign = 'center';
        ctx.fillText('Por favor selecciona un plano o carga una imagen para comenzar.', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    ctx.save();
    
    // Aplicar transformaciones de Zoom & Pan
    ctx.translate(appState.panOffsetX, appState.panOffsetY);
    ctx.scale(appState.zoomScale, appState.zoomScale);
    
    // 1. Dibujar Imagen de Fondo
    ctx.drawImage(appState.backgroundImage, 0, 0);
    
    // 2. Dibujar haces de visión de las cámaras
    appState.cameras.forEach(cam => {
        const rotRad = cam.rotation * Math.PI / 180;
        const fovRad = cam.fov * Math.PI / 180;
        const radius = metersToPixels(cam.range);
        
        ctx.save();
        
        // Dibujar el haz con transparencia y degradado radial
        ctx.beginPath();
        ctx.moveTo(cam.x, cam.y);
        ctx.arc(cam.x, cam.y, radius, rotRad - fovRad / 2, rotRad + fovRad / 2);
        ctx.closePath();
        
        // Crear degradado radial desde la cámara al límite de alcance
        const grad = ctx.createRadialGradient(cam.x, cam.y, 0, cam.x, cam.y, radius);
        const rgb = hexToRgb(cam.color);
        
        grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${cam.opacity})`);
        grad.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${cam.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        ctx.fillStyle = grad;
        ctx.fill();
        
        // Bordes del cono de visión
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${cam.opacity * 1.5 > 1 ? 1 : cam.opacity * 1.5})`;
        ctx.lineWidth = 1.5 / appState.zoomScale; // Líneas finas en pantalla
        ctx.stroke();
        
        // Línea central del haz (dirección hacia la que apunta) - Solo para cámaras direccionales
        if (cam.fov < 360) {
            ctx.beginPath();
            ctx.setLineDash([5 / appState.zoomScale, 5 / appState.zoomScale]);
            ctx.moveTo(cam.x, cam.y);
            ctx.lineTo(cam.x + Math.cos(rotRad) * radius, cam.y + Math.sin(rotRad) * radius);
            ctx.stroke();
            ctx.setLineDash([]); // Reset
        }
        
        // Texto con el alcance en metros al final
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.max(10, 11 / appState.zoomScale)}px Outfit`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textX = cam.x + Math.cos(rotRad) * (radius + 15 / appState.zoomScale);
        const textY = cam.y + Math.sin(rotRad) * (radius + 15 / appState.zoomScale);
        
        // Dibujar un pequeño fondo oscuro para que la distancia sea legible
        ctx.save();
        ctx.fillStyle = 'rgba(9, 11, 17, 0.75)';
        const textStr = `${Math.round(cam.range)}m`;
        const textWidth = ctx.measureText(textStr).width;
        ctx.fillRect(textX - textWidth / 2 - 4, textY - 8, textWidth + 8, 16);
        ctx.restore();
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText(textStr, textX, textY);
        
        ctx.restore();
    });
    
    // 3. Dibujar íconos de cámara e interfaces interactivas (Gizmos)
    appState.cameras.forEach(cam => {
        const isSelected = cam.id === appState.selectedCameraId;
        const rotRad = cam.rotation * Math.PI / 180;
        
        ctx.save();
        ctx.translate(cam.x, cam.y);
        ctx.rotate(rotRad);
        
        // Dibujar círculo base
        ctx.fillStyle = cam.color;
        // Si está seleccionada, darle borde amarillo
        ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)';
        ctx.lineWidth = (isSelected ? 3 : 1.5) / appState.zoomScale;
        
        // Radio del ícono escalado
        const iconRadius = 8 / appState.zoomScale;
        ctx.beginPath();
        ctx.arc(0, 0, iconRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Lente (trapezoide apuntando al frente) o Símbolo de Access Point Wi-Fi
        if (cam.fov < 360) {
            ctx.beginPath();
            ctx.moveTo(iconRadius * 0.8, -iconRadius * 0.5);
            ctx.lineTo(iconRadius * 1.6, -iconRadius * 0.9);
            ctx.lineTo(iconRadius * 1.6, iconRadius * 0.9);
            ctx.lineTo(iconRadius * 0.8, iconRadius * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // Dibujar ondas Wi-Fi (Símbolo de AP)
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5 / appState.zoomScale;
            
            // Onda interna
            ctx.beginPath();
            ctx.arc(0, 0, iconRadius * 1.4, -Math.PI / 4 - Math.PI / 2, Math.PI / 4 - Math.PI / 2);
            ctx.stroke();
            
            // Onda externa
            ctx.beginPath();
            ctx.arc(0, 0, iconRadius * 1.9, -Math.PI / 4 - Math.PI / 2, Math.PI / 4 - Math.PI / 2);
            ctx.stroke();
            
            // Escribir "AP" en el centro
            ctx.rotate(-rotRad); // Escribir derecho
            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.max(6, 6 / appState.zoomScale)}px Outfit`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('AP', 0, 0.5 / appState.zoomScale);
            ctx.rotate(rotRad);
        }
        
        // Nombre encima de la cámara con metros (Volver a rotación 0 para escribir derecho)
        ctx.rotate(-rotRad);
        const labelStr = cam.fov === 360 
            ? `${cam.name} (R: ${Math.round(cam.range)}m)` 
            : `${cam.name} (H: ${cam.height || 3}m, R: ${Math.round(cam.range)}m)`;
            
        ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
        ctx.font = `bold ${Math.max(10, 11 / appState.zoomScale)}px Outfit`;
        ctx.textAlign = 'center';
        
        // Dibujar fondo oscuro adaptado al ancho del nuevo texto
        ctx.save();
        ctx.fillStyle = 'rgba(9, 11, 17, 0.75)';
        const nameW = ctx.measureText(labelStr).width;
        ctx.fillRect(-nameW/2 - 4, -iconRadius - 18, nameW + 8, 14);
        ctx.restore();
        
        ctx.fillStyle = isSelected ? '#ffffff' : '#e2e8f0';
        ctx.fillText(labelStr, 0, -iconRadius - 8);
        ctx.restore();
        
        // 4. Dibujar manejador (Gizmo) de rotación si está seleccionada
        if (isSelected) {
            ctx.save();
            const gizmoDistance = 50 / appState.zoomScale;
            const hx = cam.x + Math.cos(rotRad) * gizmoDistance;
            const hy = cam.y + Math.sin(rotRad) * gizmoDistance;
            
            // Línea del conector
            ctx.strokeStyle = '#00d2ff';
            ctx.lineWidth = 1.5 / appState.zoomScale;
            ctx.beginPath();
            ctx.moveTo(cam.x + Math.cos(rotRad) * 8 / appState.zoomScale, cam.y + Math.sin(rotRad) * 8 / appState.zoomScale);
            ctx.lineTo(hx, hy);
            ctx.stroke();
            
            // Círculo de control flotante
            ctx.fillStyle = '#00d2ff';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2 / appState.zoomScale;
            ctx.beginPath();
            ctx.arc(hx, hy, 6 / appState.zoomScale, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Anillo de selección alrededor del ícono de la cámara
            ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
            ctx.lineWidth = 2 / appState.zoomScale;
            ctx.beginPath();
            ctx.arc(cam.x, cam.y, 14 / appState.zoomScale, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.restore();
        }
    });
    
    // 5. Dibujar Líneas de Calibración
    if (appState.isCalibrating && appState.calibPoints.length > 0) {
        ctx.save();
        const p1 = appState.calibPoints[0];
        
        // Primer Punto
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 6 / appState.zoomScale, 0, Math.PI * 2);
        ctx.fill();
        
        if (appState.calibPoints.length === 1) {
            // El usuario aún no marca el segundo punto, pero podemos dibujar un punto temporal si queremos.
            // Por simplicidad solo dibujamos los fijos.
        } else if (appState.calibPoints.length === 2) {
            const p2 = appState.calibPoints[1];
            
            // Segundo Punto
            ctx.beginPath();
            ctx.arc(p2.x, p2.y, 6 / appState.zoomScale, 0, Math.PI * 2);
            ctx.fill();
            
            // Línea conectora
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3 / appState.zoomScale;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            
            // Texto indicativo encima de la línea
            ctx.fillStyle = '#ef4444';
            ctx.font = `bold ${Math.max(12, 14 / appState.zoomScale)}px Outfit`;
            ctx.textAlign = 'center';
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            ctx.fillText('LÍNEA DE CALIBRACIÓN', midX, midY - 15 / appState.zoomScale);
        }
        
        ctx.restore();
    }
    
    // 6. Dibujar Cotas Guardadas
    if (appState.measurements) {
        appState.measurements.forEach(m => {
            drawDimensionLine(ctx, m.p1, m.p2, m.label, '#00d2ff', 1.5 / appState.zoomScale);
        });
    }
    
    // 7. Dibujar Cota Temporal si se está trazando
    if (appState.isDrawingDimension && appState.dimensionPoints.length === 1 && appState.currentMouseWorldCoords) {
        drawDimensionLine(ctx, appState.dimensionPoints[0], appState.currentMouseWorldCoords, 'Nueva Medida...', '#00d2ff', 1.5 / appState.zoomScale);
    }
    
    // 7b. Dibujar Cañerías Guardadas
    if (appState.conduits) {
        appState.conduits.forEach(cond => {
            if (cond.points.length < 2) return;
            ctx.save();
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.75)'; // Color cañería (cyan)
            ctx.lineWidth = 4 / appState.zoomScale;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.beginPath();
            ctx.moveTo(cond.points[0].x, cond.points[0].y);
            for (let i = 1; i < cond.points.length; i++) {
                ctx.lineTo(cond.points[i].x, cond.points[i].y);
            }
            ctx.stroke();
            
            // Dibujar un borde blanco interior para estilo premium
            ctx.strokeStyle = '#090b11';
            ctx.lineWidth = 1.5 / appState.zoomScale;
            ctx.stroke();
            
            ctx.restore();
        });
    }
    
    // 7c. Dibujar Cañería Temporal en trazado
    if (appState.isDrawingConduit && appState.conduitPoints.length > 0 && appState.currentMouseWorldCoords) {
        ctx.save();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.lineWidth = 4 / appState.zoomScale;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash([4 / appState.zoomScale, 4 / appState.zoomScale]);
        
        ctx.beginPath();
        ctx.moveTo(appState.conduitPoints[0].x, appState.conduitPoints[0].y);
        for (let i = 1; i < appState.conduitPoints.length; i++) {
            ctx.lineTo(appState.conduitPoints[i].x, appState.conduitPoints[i].y);
        }
        ctx.lineTo(appState.currentMouseWorldCoords.x, appState.currentMouseWorldCoords.y);
        ctx.stroke();
        
        ctx.restore();
    }
    
    // 8. Dibujar Líneas de Cableado al Rack
    if (appState.rack && appState.showCables) {
        appState.cameras.forEach(cam => {
            const dx = cam.x - appState.rack.x;
            const dy = cam.y - appState.rack.y;
            const distReal = calculateRealDistance(cam);
            
            ctx.save();
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)'; // Cyan translúcido
            ctx.lineWidth = 1 / appState.zoomScale;
            ctx.setLineDash([4 / appState.zoomScale, 5 / appState.zoomScale]);
            
            ctx.beginPath();
            ctx.moveTo(appState.rack.x, appState.rack.y);
            ctx.lineTo(cam.x, cam.y);
            ctx.stroke();
            
            // Dibujar los metros de cable en el punto medio de la línea
            const midX = (cam.x + appState.rack.x) / 2;
            const midY = (cam.y + appState.rack.y) / 2;
            
            ctx.fillStyle = '#22d3ee';
            ctx.font = `bold ${Math.max(8, 9 / appState.zoomScale)}px Outfit`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.save();
            ctx.fillStyle = 'rgba(9, 11, 17, 0.85)';
            const distStr = `${Math.round(distReal)}m`;
            const dW = ctx.measureText(distStr).width;
            ctx.fillRect(midX - dW/2 - 2, midY - 6, dW + 4, 12);
            ctx.restore();
            
            ctx.fillText(distStr, midX, midY);
            ctx.restore();
        });
    }

    // 9. Dibujar Gabinete del Rack
    if (appState.rack) {
        ctx.save();
        ctx.translate(appState.rack.x, appState.rack.y);
        
        ctx.fillStyle = '#06b6d4';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 / appState.zoomScale;
        
        const rSize = 12 / appState.zoomScale;
        // Gabinete
        ctx.fillRect(-rSize, -rSize, rSize * 2, rSize * 2);
        ctx.strokeRect(-rSize, -rSize, rSize * 2, rSize * 2);
        
        // Estantes del gabinete
        ctx.strokeStyle = '#090b11';
        ctx.lineWidth = 1.5 / appState.zoomScale;
        ctx.beginPath();
        ctx.moveTo(-rSize + 4 / appState.zoomScale, -rSize / 2);
        ctx.lineTo(rSize - 4 / appState.zoomScale, -rSize / 2);
        ctx.moveTo(-rSize + 4 / appState.zoomScale, 0);
        ctx.lineTo(rSize - 4 / appState.zoomScale, 0);
        ctx.moveTo(-rSize + 4 / appState.zoomScale, rSize / 2);
        ctx.lineTo(rSize - 4 / appState.zoomScale, rSize / 2);
        ctx.stroke();
        
        // Etiqueta del Rack
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(10, 11 / appState.zoomScale)}px Outfit`;
        ctx.textAlign = 'center';
        
        ctx.save();
        ctx.fillStyle = 'rgba(6, 182, 212, 0.85)';
        const rName = appState.rack.name || 'Rack Central';
        const rNameW = ctx.measureText(rName).width;
        ctx.fillRect(-rNameW/2 - 4, -rSize - 18, rNameW + 8, 14);
        ctx.restore();
        
        ctx.fillText(rName, 0, -rSize - 8);
        ctx.restore();
    }
    
    ctx.restore();
}

// ==========================================================
// 17. MEDIDAS Y COTAS ADICIONALES (MÉTODOS Y DIBUJO)
// ==========================================================

function drawDimensionLine(context, p1, p2, label, color, lineWidth) {
    context.save();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = lineWidth;
    
    // Línea principal de cota
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    
    // Ángulo de la línea para las flechas
    const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    
    // Dibujar flechas en los extremos
    drawArrowhead(context, p1.x, p1.y, ang + Math.PI, lineWidth);
    drawArrowhead(context, p2.x, p2.y, ang, lineWidth);
    
    // Punto medio para el texto
    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;
    
    // Configurar fuente dinámica
    const baseFontSize = 12;
    // Si estamos en el editor con zoom, la fuente debe verse proporcional
    const fontSize = context === ctx ? Math.max(10, 11 / appState.zoomScale) : 12;
    context.font = `bold ${fontSize}px Outfit`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Dibujar fondo oscuro para la etiqueta
    const textWidth = context.measureText(label).width;
    const paddingX = 6;
    const paddingY = 4;
    const rectW = textWidth + paddingX * 2;
    const rectH = fontSize + paddingY * 2;
    
    context.save();
    context.fillStyle = 'rgba(9, 11, 17, 0.85)';
    context.fillRect(mx - rectW / 2, my - rectH / 2, rectW, rectH);
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.strokeRect(mx - rectW / 2, my - rectH / 2, rectW, rectH);
    context.restore();
    
    context.fillStyle = '#ffffff';
    context.fillText(label, mx, my);
    
    context.restore();
}

function drawArrowhead(context, x, y, angle, lineWidth) {
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.fillStyle = context.strokeStyle; // Mismo color de línea
    
    // Dimensiones de la flecha
    const arrowSize = 8;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(-arrowSize, -arrowSize * 0.4);
    context.lineTo(-arrowSize, arrowSize * 0.4);
    context.closePath();
    context.fill();
    
    context.restore();
}

function toggleDrawDimensionMode() {
    appState.isDrawingDimension = !appState.isDrawingDimension;
    appState.dimensionPoints = [];
    
    // Desactivar otros modos si estuvieran activos
    if (appState.isDrawingDimension) {
        appState.isCalibrating = false;
        btnCalibrate.classList.remove('active');
        btnStartCalibrate.classList.remove('btn-primary');
        btnStartCalibrate.textContent = 'Iniciar Calibración';
        calibrationInputBox.style.display = 'none';
        
        appState.isDrawingConduit = false;
        btnDrawConduit.classList.remove('active');
        
        btnDrawDimension.classList.add('active');
        canvas.style.cursor = 'crosshair';
    } else {
        cancelDimensionLine();
    }
    draw();
}

function cancelDimensionLine() {
    appState.isDrawingDimension = false;
    appState.dimensionPoints = [];
    btnDrawDimension.classList.remove('active');
    dimensionModal.classList.remove('active');
    canvas.style.cursor = 'grab';
    draw();
}

function saveDimensionLabel() {
    if (appState.dimensionPoints.length < 2) return;
    
    const labelVal = dimLabelInput.value.trim();
    if (!labelVal) {
        alert('Por favor ingresa una medida o etiqueta.');
        return;
    }
    
    const p1 = appState.dimensionPoints[0];
    const p2 = appState.dimensionPoints[1];
    const cotaId = 'cota_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    
    appState.measurements.push({
        id: cotaId,
        p1: p1,
        p2: p2,
        label: labelVal
    });
    
    cancelDimensionLine();
    renderCotasList();
    saveStateToLocalStorage();
}

function deleteCota(id) {
    appState.measurements = appState.measurements.filter(m => m.id !== id);
    renderCotasList();
    saveStateToLocalStorage();
    draw();
}

function renderCotasList() {
    activeCotasCount.textContent = appState.measurements.length;
    
    if (appState.measurements.length === 0) {
        activeCotasList.innerHTML = `
            <div class="no-cotas-placeholder" style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 12px; border: 1px dashed var(--border-color); border-radius: var(--radius-sm);">
                No hay cotas en el plano. Usa el botón "Medida" arriba para marcar distancias.
            </div>
        `;
        return;
    }
    
    activeCotasList.innerHTML = '';
    
    appState.measurements.forEach((m, idx) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justify = 'space-between';
        item.style.alignItems = 'center';
        item.style.padding = '8px';
        item.style.background = 'rgba(9, 11, 17, 0.4)';
        item.style.border = '1px solid var(--border-color)';
        item.style.borderRadius = '6px';
        
        item.innerHTML = `
            <div style="font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 250px;">
                <strong>#${idx + 1}:</strong> ${m.label}
            </div>
            <button class="cota-delete-btn" data-id="${m.id}" title="Eliminar cota" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; padding: 4px; border-radius: 4px; transition: all 0.2s;">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        
        item.querySelector('.cota-delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteCota(m.id);
        });
        
        activeCotasList.appendChild(item);
    });
}

// ==========================================================
// 17b. GESTIÓN Y DIBUJO DE CAÑERÍAS (CONDUIT ROUTING)
// ==========================================================

function toggleDrawConduitMode() {
    appState.isDrawingConduit = !appState.isDrawingConduit;
    appState.conduitPoints = [];
    
    if (appState.isDrawingConduit) {
        // Desactivar otros modos
        appState.isCalibrating = false;
        btnCalibrate.classList.remove('active');
        btnStartCalibrate.classList.remove('btn-primary');
        btnStartCalibrate.textContent = 'Iniciar Calibración';
        calibrationInputBox.style.display = 'none';
        
        appState.isDrawingDimension = false;
        btnDrawDimension.classList.remove('active');
        dimensionModal.classList.remove('active');
        
        btnDrawConduit.classList.add('active');
        canvas.style.cursor = 'crosshair';
        
        alert('Modo Cañería: Haz clics en el plano para trazar el caño. Doble clic en cualquier lugar para guardar el recorrido.');
    } else {
        cancelConduitLine();
    }
    draw();
}

function cancelConduitLine() {
    appState.isDrawingConduit = false;
    appState.conduitPoints = [];
    btnDrawConduit.classList.remove('active');
    canvas.style.cursor = 'grab';
    draw();
}

function saveConduitLine() {
    if (appState.conduitPoints.length < 2) {
        alert('Por favor dibuja al menos 2 puntos para trazar una cañería.');
        cancelConduitLine();
        return;
    }
    
    const condId = 'cond_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    
    // Guardar la cañería
    appState.conduits.push({
        id: condId,
        points: [...appState.conduitPoints]
    });
    
    cancelConduitLine();
    renderConduitsList();
    saveStateToLocalStorage();
    renderActiveCamerasList(); // Recalcular distancias
    draw();
}

function deleteConduit(id) {
    appState.conduits = appState.conduits.filter(c => c.id !== id);
    renderConduitsList();
    saveStateToLocalStorage();
    renderActiveCamerasList(); // Recalcular distancias
    draw();
}

function renderConduitsList() {
    if (!activeConduitsCount || !activeConduitsList) return;
    
    activeConduitsCount.textContent = appState.conduits.length;
    
    if (appState.conduits.length === 0) {
        activeConduitsList.innerHTML = `
            <div class="no-conduits-placeholder" style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 12px; border: 1px dashed var(--border-color); border-radius: var(--radius-sm);">
                No hay cañerías trazadas en el plano. Usa el botón "Cañería" arriba para trazar recorridos.
            </div>
        `;
        return;
    }
    
    activeConduitsList.innerHTML = '';
    
    appState.conduits.forEach((cond, idx) => {
        // Calcular longitud
        let lengthPx = 0;
        for (let i = 0; i < cond.points.length - 1; i++) {
            const dx = cond.points[i+1].x - cond.points[i].x;
            const dy = cond.points[i+1].y - cond.points[i].y;
            lengthPx += Math.sqrt(dx*dx + dy*dy);
        }
        const lengthM = pixelsToMeters(lengthPx);
        
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justify = 'space-between';
        item.style.alignItems = 'center';
        item.style.padding = '8px';
        item.style.background = 'rgba(6, 182, 212, 0.1)';
        item.style.border = '1px solid rgba(6, 182, 212, 0.3)';
        item.style.borderRadius = '6px';
        item.style.marginTop = '6px';
        
        item.innerHTML = `
            <div style="font-size: 12px; font-weight: 500;">
                <strong>Cañería #${idx + 1}:</strong> ${Math.round(lengthM)} m <span style="font-size: 10px; color: var(--text-muted);">(${cond.points.length} puntos)</span>
            </div>
            <button class="conduit-delete-btn" data-id="${cond.id}" title="Eliminar cañería" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; padding: 4px; border-radius: 4px; transition: all 0.2s;">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        
        item.querySelector('.conduit-delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteConduit(cond.id);
        });
        
        activeConduitsList.appendChild(item);
    });
}

// ==========================================================
// 18. GUARDAR Y CARGAR PROYECTOS (JSON)
// ==========================================================

function getImageDataURL(img) {
    if (img.src.startsWith('data:')) {
        return img.src;
    }
    try {
        const canvasTemp = document.createElement('canvas');
        canvasTemp.width = img.width;
        canvasTemp.height = img.height;
        const ctxTemp = canvasTemp.getContext('2d');
        ctxTemp.drawImage(img, 0, 0);
        return canvasTemp.toDataURL('image/jpeg', 0.85);
    } catch (e) {
        console.error('Error generando DataURL de la imagen:', e);
        return img.src;
    }
}

function exportProjectJSON() {
    if (!appState.backgroundImage) {
        alert('Carga una imagen antes de guardar el proyecto.');
        return;
    }
    
    btnExportProject.textContent = 'Guardando...';
    btnExportProject.disabled = true;
    
    setTimeout(() => {
        try {
            const projectData = {
                imageName: appState.imageName,
                backgroundImageDataURL: getImageDataURL(appState.backgroundImage),
                pixelsPerMeter: appState.pixelsPerMeter,
                calibrated: appState.calibrated,
                totalWidth: appState.totalWidth,
                totalLength: appState.totalLength,
                totalHeight: appState.totalHeight,
                cameras: appState.cameras,
                measurements: appState.measurements,
                rack: appState.rack,
                showCables: appState.showCables,
                rackHeight: appState.rackHeight,
                conduitHeight: appState.conduitHeight,
                conduits: appState.conduits
            };
            
            const jsonStr = JSON.stringify(projectData);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const link = document.createElement('a');
            link.download = `Proyecto_CCTV_${appState.imageName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
            link.href = URL.createObjectURL(blob);
            link.click();
        } catch (e) {
            console.error('Error exportando proyecto:', e);
            alert('Ocurrió un error al exportar el archivo del proyecto.');
        } finally {
            btnExportProject.textContent = 'Guardar JSON';
            btnExportProject.disabled = false;
        }
    }, 100);
}

function importProjectJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            if (!data.backgroundImageDataURL) {
                throw new Error('El archivo no contiene una imagen de fondo válida.');
            }
            
            const img = new Image();
            img.onload = function() {
                appState.backgroundImage = img;
                appState.imageName = data.imageName || 'Plano Importado';
                appState.pixelsPerMeter = data.pixelsPerMeter || 10.0;
                appState.calibrated = data.calibrated || false;
                appState.totalWidth = data.totalWidth || 100;
                appState.totalLength = data.totalLength || 75;
                appState.totalHeight = data.totalHeight || 6;
                appState.cameras = data.cameras || [];
                appState.measurements = data.measurements || [];
                appState.rack = data.rack || { x: 500, y: 350, name: 'Rack Central' };
                appState.showCables = data.showCables !== undefined ? data.showCables : true;
                appState.rackHeight = data.rackHeight !== undefined ? data.rackHeight : 1.6;
                appState.conduitHeight = data.conduitHeight !== undefined ? data.conduitHeight : 6.0;
                appState.conduits = data.conduits || [];
                
                if (chkShowCables) chkShowCables.checked = appState.showCables;
                if (rackHeightInput) rackHeightInput.value = appState.rackHeight;
                if (conduitHeightInput) conduitHeightInput.value = appState.conduitHeight;
                
                calibTotalWidth.value = appState.totalWidth;
                calibTotalLength.value = appState.totalLength;
                calibTotalHeight.value = appState.totalHeight;
                
                resetZoomAndPan();
                updateScaleUI();
                renderActiveCamerasList();
                renderCotasList();
                renderConduitsList();
                saveStateToLocalStorage();
                
                alert('¡Proyecto cargado con éxito!');
            };
            img.src = data.backgroundImageDataURL;
            
        } catch (err) {
            console.error('Error importando archivo JSON:', err);
            alert('Error al leer el archivo del proyecto: ' + err.message);
        } finally {
            projectJSONUpload.value = '';
        }
    };
    reader.readAsText(file);
}

// ==========================================================
// 19. FICHA TÉCNICA E IMPRESIÓN DEL REPORTE
// ==========================================================

function getCombinedCanvasDataURL() {
    if (!appState.backgroundImage) return '';
    
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = appState.backgroundImage.width;
    exportCanvas.height = appState.backgroundImage.height;
    const ectx = exportCanvas.getContext('2d');
    
    ectx.drawImage(appState.backgroundImage, 0, 0);
    
    appState.cameras.forEach(cam => {
        const rotRad = cam.rotation * Math.PI / 180;
        const fovRad = cam.fov * Math.PI / 180;
        const radius = metersToPixels(cam.range);
        
        ectx.save();
        ectx.beginPath();
        ectx.moveTo(cam.x, cam.y);
        ectx.arc(cam.x, cam.y, radius, rotRad - fovRad / 2, rotRad + fovRad / 2);
        ectx.closePath();
        
        const grad = ectx.createRadialGradient(cam.x, cam.y, 0, cam.x, cam.y, radius);
        const rgb = hexToRgb(cam.color);
        grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${cam.opacity})`);
        grad.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${cam.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ectx.fillStyle = grad;
        ectx.fill();
        
        ectx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${cam.opacity * 1.5 > 1 ? 1 : cam.opacity * 1.5})`;
        ectx.lineWidth = 2;
        ectx.stroke();
        
        ectx.beginPath();
        ectx.setLineDash([8, 8]);
        ectx.moveTo(cam.x, cam.y);
        ectx.lineTo(cam.x + Math.cos(rotRad) * radius, cam.y + Math.sin(rotRad) * radius);
        ectx.stroke();
        ectx.setLineDash([]);
        
        ectx.fillStyle = '#ffffff';
        ectx.shadowColor = 'rgba(0,0,0,0.8)';
        ectx.shadowBlur = 4;
        ectx.font = 'bold 14px Outfit';
        ectx.textAlign = 'center';
        ectx.textBaseline = 'middle';
        const textX = cam.x + Math.cos(rotRad) * (radius + 20);
        const textY = cam.y + Math.sin(rotRad) * (radius + 20);
        ectx.fillText(`${Math.round(cam.range)}m`, textX, textY);
        ectx.shadowBlur = 0;
        ectx.restore();
        
        ectx.save();
        ectx.translate(cam.x, cam.y);
        ectx.rotate(rotRad);
        
        ectx.fillStyle = cam.color;
        ectx.strokeStyle = '#ffffff';
        ectx.lineWidth = 2;
        
        ectx.rotate(-rotRad);
        const labelStr = cam.fov === 360 
            ? `${cam.name} (R: ${Math.round(cam.range)}m)` 
            : `${cam.name} (H: ${cam.height || 3}m, R: ${Math.round(cam.range)}m)`;
            
        ectx.fillStyle = '#ffffff';
        ectx.shadowColor = 'rgba(0,0,0,0.8)';
        ectx.shadowBlur = 4;
        ectx.font = 'bold 12px Outfit';
        ectx.textAlign = 'center';
        ectx.fillText(labelStr, 0, -20);
        ectx.rotate(rotRad);
        
        ectx.beginPath();
        ectx.arc(0, 0, 10, 0, Math.PI * 2);
        ectx.fill();
        ectx.stroke();
        
        ectx.beginPath();
        ectx.moveTo(8, -5);
        ectx.lineTo(16, -9);
        ectx.lineTo(16, 9);
        ectx.lineTo(8, 5);
        ectx.closePath();
        ectx.fill();
        ectx.stroke();
        
        ectx.restore();
    });
    
    if (appState.measurements) {
        appState.measurements.forEach(m => {
            drawDimensionLine(ectx, m.p1, m.p2, m.label, '#00d2ff', 2);
        });
    }
    
    // 7b. Dibujar Cañerías Guardadas en Exportación
    if (appState.conduits) {
        appState.conduits.forEach(cond => {
            if (cond.points.length < 2) return;
            ectx.save();
            ectx.strokeStyle = 'rgba(6, 182, 212, 0.75)'; // Cyan
            ectx.lineWidth = 6;
            ectx.lineCap = 'round';
            ectx.lineJoin = 'round';
            
            ectx.beginPath();
            ectx.moveTo(cond.points[0].x, cond.points[0].y);
            for (let i = 1; i < cond.points.length; i++) {
                ectx.lineTo(cond.points[i].x, cond.points[i].y);
            }
            ectx.stroke();
            
            ectx.strokeStyle = '#090b11';
            ectx.lineWidth = 2;
            ectx.stroke();
            
            ectx.restore();
        });
    }
    
    // 8. Dibujar Líneas de Cableado al Rack en Exportación
    if (appState.rack && appState.showCables) {
        appState.cameras.forEach(cam => {
            const dx = cam.x - appState.rack.x;
            const dy = cam.y - appState.rack.y;
            const distReal = calculateRealDistance(cam);
            
            ectx.save();
            ectx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
            ectx.lineWidth = 1.5;
            ectx.setLineDash([6, 8]);
            
            ectx.beginPath();
            ectx.moveTo(appState.rack.x, appState.rack.y);
            ectx.lineTo(cam.x, cam.y);
            ectx.stroke();
            
            // Dibujar los metros
            const midX = (cam.x + appState.rack.x) / 2;
            const midY = (cam.y + appState.rack.y) / 2;
            
            ectx.fillStyle = '#06b6d4';
            ectx.font = 'bold 10px Outfit';
            ectx.textAlign = 'center';
            ectx.textBaseline = 'middle';
            
            ectx.save();
            ectx.fillStyle = 'rgba(9, 11, 17, 0.85)';
            const distStr = `${Math.round(distReal)}m`;
            const dW = ectx.measureText(distStr).width;
            ectx.fillRect(midX - dW/2 - 2, midY - 6, dW + 4, 12);
            ectx.restore();
            
            ectx.fillText(distStr, midX, midY);
            ectx.restore();
        });
    }

    // 9. Dibujar Gabinete del Rack en Exportación
    if (appState.rack) {
        ectx.save();
        ectx.translate(appState.rack.x, appState.rack.y);
        
        ectx.fillStyle = '#06b6d4';
        ectx.strokeStyle = '#ffffff';
        ectx.lineWidth = 3;
        
        const rSize = 14;
        // Gabinete
        ectx.fillRect(-rSize, -rSize, rSize * 2, rSize * 2);
        ectx.strokeRect(-rSize, -rSize, rSize * 2, rSize * 2);
        
        // Estantes
        ectx.strokeStyle = '#090b11';
        ectx.lineWidth = 2;
        ectx.beginPath();
        ectx.moveTo(-rSize + 4, -rSize / 2);
        ectx.lineTo(rSize - 4, -rSize / 2);
        ectx.moveTo(-rSize + 4, 0);
        ectx.lineTo(rSize - 4, 0);
        ectx.moveTo(-rSize + 4, rSize / 2);
        ectx.lineTo(rSize - 4, rSize / 2);
        ectx.stroke();
        
        // Etiqueta
        ectx.fillStyle = '#ffffff';
        ectx.font = 'bold 12px Outfit';
        ectx.textAlign = 'center';
        
        ectx.save();
        ectx.fillStyle = 'rgba(6, 182, 212, 0.85)';
        const rName = appState.rack.name || 'Rack Central';
        const rNameW = ectx.measureText(rName).width;
        ectx.fillRect(-rNameW/2 - 4, -rSize - 18, rNameW + 8, 14);
        ectx.restore();
        
        ectx.fillText(rName, 0, -rSize - 8);
        ectx.restore();
    }
    
    return exportCanvas.toDataURL('image/png');
}

function printTechnicalReport() {
    if (!appState.backgroundImage) {
        alert('Carga una imagen antes de generar el reporte.');
        return;
    }
    
    // Obtener valores de los inputs
    const clientName = reportClientName ? reportClientName.value.trim() : '';
    const laborBudget = reportLaborBudget ? reportLaborBudget.value.trim() : '';
    const projectDate = reportProjectDate && reportProjectDate.value 
        ? new Date(reportProjectDate.value + 'T00:00:00').toLocaleDateString() 
        : new Date().toLocaleDateString();
    const observations = reportObservations ? reportObservations.value.trim() : '';
    
    btnPrintReport.textContent = 'Generando Reporte...';
    btnPrintReport.disabled = true;
    
    setTimeout(() => {
        try {
            const mapDataUrl = getCombinedCanvasDataURL();
            
            // Filas de cámaras y cálculo de distancia al rack
            let camerasRows = '';
            appState.cameras.forEach((cam, idx) => {
                const distReal = calculateRealDistance(cam);
                
                camerasRows += `
                    <tr>
                        <td style="text-align:center;"><strong>${idx + 1}</strong></td>
                        <td><strong>${cam.name}</strong></td>
                        <td>${cam.brandName}</td>
                        <td>${cam.model}</td>
                        <td>${cam.lens}</td>
                        <td style="text-align:center;">${cam.height || 3} m</td>
                        <td style="text-align:center;">${Math.round(cam.fov)}°</td>
                        <td style="text-align:center;">${Math.round(cam.range)} m</td>
                        <td style="text-align:center; font-family: monospace; font-weight: 500;">${Math.round(distReal)} m</td>
                        <td><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${cam.color}; margin-right:6px; vertical-align:middle;"></span>${cam.color}</td>
                    </tr>
                `;
            });
            
            if (appState.cameras.length === 0) {
                camerasRows = `<tr><td colspan="10" style="text-align:center; color: #555;">No hay cámaras instaladas en el plano.</td></tr>`;
            }
            
            // Filas de cotas (medidas)
            let cotasRows = '';
            appState.measurements.forEach((m, idx) => {
                cotasRows += `
                    <tr>
                        <td style="text-align:center;">Cota #${idx + 1}</td>
                        <td><strong>${m.label}</strong></td>
                    </tr>
                `;
            });
            
            // Sección de Propuesta Comercial
            let budgetSectionHtml = '';
            if (laborBudget) {
                budgetSectionHtml = `
                <div class="print-section-title">2. Propuesta Comercial (Mano de Obra)</div>
                <table class="print-table" style="max-width: 650px;">
                    <thead>
                        <tr>
                            <th>Concepto / Descripción del Servicio</th>
                            <th style="width: 150px; text-align: right;">Monto ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Mano de Obra de Instalación y Configuración Profesional:</strong><br>
                                <span style="font-size: 10px; color: #555;">
                                    Incluye el montaje físico de ${appState.cameras.length} cámaras, cableado estructurado, canalización, conexionado de switches PoE / NVR, orientación de lentes para cobertura exacta, configuración de visualización remota en dispositivos móviles y pruebas de conectividad final.
                                </span>
                            </td>
                            <td style="text-align: right; font-size: 14px; font-weight: bold; vertical-align: middle;">
                                ${laborBudget.includes('$') ? laborBudget : '$' + laborBudget}
                            </td>
                        </tr>
                    </tbody>
                </table>
                `;
            }
            
            // Sección de Observaciones
            let observationsSectionHtml = '';
            if (observations) {
                const formattedObs = observations.replace(/\n/g, '<br>');
                observationsSectionHtml = `
                <div class="print-section-title">Observaciones y Detalles del Proyecto</div>
                <div style="font-size: 11px; line-height: 1.5; background: #f9f9f9; padding: 12px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 20px; color: #333;">
                    ${formattedObs}
                </div>
                `;
            }
            
            // Construir HTML completo del Reporte para impresión
            printReportContainer.innerHTML = `
                <div class="print-header">
                    <div>
                        <h1>PROPUESTA TÉCNICA Y ECONÓMICA DE CCTV</h1>
                        <p style="font-weight: 600; color: #3b82f6; margin: 2px 0;">El Cóndor • Servicios Integrales & Seguridad</p>
                        <p style="margin: 4px 0 0 0; font-size: 11px;">
                            ${clientName ? `<strong>Cliente:</strong> ${clientName} | ` : ''}
                            <strong>Fecha:</strong> ${projectDate}
                        </p>
                    </div>
                    <div class="print-logo-box">
                        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2.5" fill="none" class="print-logo-icon"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                        <span style="font-weight:800; font-size:1.1rem; letter-spacing: 1px; color:#0b0f19;">EL CÓNDOR</span>
                    </div>
                </div>
                
                <div class="print-section-title">1. Cobertura Visual y Distribución en Planta (Mapa)</div>
                <div class="print-map-wrapper">
                    <img src="${mapDataUrl}" class="print-map-img" alt="Mapa de Cobertura CCTV">
                </div>
                
                ${budgetSectionHtml}
                
                <div class="print-section-title">3. Ficha Técnica y Especificaciones de Cámaras</div>
                <table class="print-table">
                    <thead>
                        <tr>
                            <th style="width: 40px; text-align:center;">#</th>
                            <th>Ubicación / Nombre</th>
                            <th>Marca</th>
                            <th>Modelo Cámara</th>
                            <th>Lente</th>
                            <th style="text-align:center;">Alt. Montaje</th>
                            <th style="text-align:center;">Ángulo (FOV)</th>
                            <th style="text-align:center;">Rango IR</th>
                            <th style="text-align:center;">Dist. Rack</th>
                            <th>Color Haz</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${camerasRows}
                    </tbody>
                </table>
                
                ${appState.cameras.length > 0 ? `
                <div style="font-size: 10px; margin-top: 8px; color: #555; border-top: 1px dashed #ccc; padding-top: 8px; margin-bottom: 20px;">
                    <span>* La distancia al Rack se calcula en 3D: incluye la distancia horizontal plana más la subida vertical desde el Rack (a ${appState.rackHeight}m) hasta la cañería estanca (a ${appState.conduitHeight}m) y el tramo vertical hasta la altura de cada cámara.</span>
                </div>
                ` : ''}
                
                ${appState.measurements.length > 0 ? `
                <div class="print-section-title">4. Medidas de Referencia del Terreno (Cotas)</div>
                <table class="print-table" style="max-width: 500px;">
                    <thead>
                        <tr>
                            <th style="width: 150px; text-align:center;">Referencia en Plano</th>
                            <th>Dimensión Real Anotada</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cotasRows}
                    </tbody>
                </table>
                ` : ''}
                
                ${observationsSectionHtml}
                
                <div class="print-footer">
                    <p>Reporte técnico comercial generado por CamPlanner PRO en representación de El Cóndor.</p>
                    <p>© 2026 El Cóndor Servicios Integrales • Quilmes / Hudson, Buenos Aires.</p>
                </div>
            `;
            
            window.print();
            
        } catch (e) {
            console.error('Error al imprimir el reporte:', e);
            alert('Ocurrió un error al generar la hoja de impresión.');
        } finally {
            btnPrintReport.textContent = 'Imprimir / Guardar PDF';
            btnPrintReport.disabled = false;
        }
    }, 200);
}

// ==========================================================
// 20. SOPORTE DE EVENTOS TÁCTILES PARA MÓVILES (TOUCH WRAPPERS)
// ==========================================================

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY,
            button: 0
        });
        canvas.dispatchEvent(mouseEvent);
        
        if (appState.isDrawingDimension || appState.isCalibrating || appState.selectedCameraId) {
            e.preventDefault();
        }
    }
}

function handleTouchMove(e) {
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        e.preventDefault();
    }
}

function handleTouchMoveMulti(e) {
    // Para pellizcos futuros o zooms multitouch
}

function handleTouchEnd(e) {
    const mouseEvent = new MouseEvent('mouseup', {
        button: 0
    });
    window.dispatchEvent(mouseEvent);
    e.preventDefault();
}
