import React, { useState } from 'react';
import {Box, Button,TextField, Typography,FormControlLabel, Switch, Grid, MenuItem, InputAdornment, Select, FormControl, InputLabel, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {  GiMineTruck } from 'react-icons/gi';
import WarningIcon from '@mui/icons-material/Warning';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WifiIcon from '@mui/icons-material/Wifi';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BuildIcon from '@mui/icons-material/Build'; 

const Reportes = () => {
  const [systems, setSystems] = useState({
    FMS: { activities: [], noActivity: true },
    OAS: { activities: [], noActivity: true },
    CAS: { activities: [], noActivity: true },
    ITRACK: { activities: [], noActivity: true },
    AXIS: { activities: [], noActivity: true },
    WIFI: { activities: [], noActivity: true },
  });
  
  const handleAddActivity = (system) => {
    const updatedSystems = { ...systems };
    updatedSystems[system].activities.push({
      tipoEquipo: '',
      equipo: '',
      falla: '',
      actividad: '',
      comentario: '',
      mantenimiento: 'Correctivo', 
      checkSolucionado: false,
      checkNoSolucionado: false,
      checkPendiente: false,
      hasAddedNew: false,
    });
    setSystems(updatedSystems);
  };
  

  const handleDeleteActivity = (system) => {
    const updatedSystems = { ...systems };
    if (updatedSystems[system].activities.length > 0) {
      updatedSystems[system].activities.pop();

    }
    setSystems(updatedSystems);
  };

  const handleSwitchChange = (system) => {
    const updatedSystems = { ...systems };
    updatedSystems[system].noActivity = !updatedSystems[system].noActivity;
    if (updatedSystems[system].noActivity) {
      updatedSystems[system].activities = [];
    }
    setSystems(updatedSystems);
  };

  const handleCheckboxChange = (system, index, selection) => {
    const updatedSystems = { ...systems };
    const activity = updatedSystems[system].activities[index];
  
    activity.checkSolucionado = selection === 'solucionado';
    activity.checkNoSolucionado = selection === 'noSolucionado';
    activity.checkPendiente = selection === 'pendiente';

    if (selection === 'noSolucionado') {
      activity.hideComentarios = true;  
  
      updatedSystems[system].activities.push({
        tipoEquipo: activity.tipoEquipo,   
        equipo: activity.equipo,           
        falla: activity.falla,             
        actividad: '',
        comentario: '',
        mantenimiento: 'Correctivo',
        checkSolucionado: false,
        checkNoSolucionado: false,
        checkPendiente: false,
        hideComentarios: false, 
        isSimpleView: true, 
      });
    }
  
    setSystems(updatedSystems);
  };
  
  
  const tipoEquipoOptions = {
    default: ['Camión', 'Pala', 'Cargador', 'Perforadora', 'Motoniveladora', 'Tractor de ruedas'],
    OAS: ['Camión'],
    CAS: ['Camión', 'Pala', 'Cargador', 'Tractor de ruedas'],
    ITRACK: ['Camión'],
    AXIS: ['Cámara'],
    WIFI: ['Access Point', 'Repetidor'],
  };

  const equipoOptions = {
    Camión: Array.from({ length: 34 }, (_, i) => `T-${210 + i}`),
    Pala: ['SV-102', 'SV-103', 'SV-104', 'SV-105', 'SV-106'],
    Cargador: ['LD-501', 'LD-502', 'LD-503', 'LD-505'],
    Perforadora: ['DL-704', 'DL-705', 'DL-706', 'DL-708', 'DL-709'],
    Motoniveladora: ['MG-601', 'MG-602', 'MG-603', 'MG-604', 'MG-605'],
    'Tractor de ruedas': ['WT-408', 'WT-409', 'WT-410', 'WT-411', 'WT-412'],
    Cámara: ['Cerrillos', 'Jayula', '3 Gigantes', 'Dispatch'],
    'Access Point': Array.from({ length: 17 }, (_, i) => `AP-${201 + i}`),
    Repetidor: Array.from({ length: 10 }, (_, i) => `RP-${235 + i}`)
  };

  const fallaOptions = {
    FMS: ['GPS', 'Core', 'Antena', 'Display', 'Comunicacion', 'Alta precision','Otro'],
    OAS: ['GPS', 'Core', 'Comunicacion', 'Configuracion', 'Camara cabina', 'Camara frontal','Otro'],
    CAS: ['GPS','Antena', 'Display', 'Comunicacion', 'Configuracion', 'Otro'],
    ITRACK: ['HUB', 'Sensores','Otro'],
    AXIS: ['Camara','Otro'],
    WIFI: ['AP','Otro']
  };

  const actividadOptions = {
    GPS: ['Reinicio remoto del equipo', 'Reinicio fisico del equipo', 'Reinicio desde Master switch','Ajuste y limpieza de conector','Cambio de GPS','Pendiente de revision','Soporte HxGN','Otro'],
    Core: ['Reinicio del JAMS', 'Reinicio remoto de Core','Reinicio fisico de Core','Ajuste de conectores','Cambio de Core','Reinicio desde Master switch','Carga de configuracion','Pendiente de revision','Soporte HxGN','Otro'],
    Antena:['Soporte HxGN','Otro'],
    Display: ['Reinicio del JAMS','Reinicio fisico del Display','Ajuste de conector','Carga de configuracion','Pendiente de revision','Soporte HxGN','Otro'],
    Comunicacion: ['Reinicio remoto de AP','Reinicio fisico de AP','Configuracion de AP','Reset de fabrica','Cambio de IP','Cambio de supresor de transientes','Reubicacaion de WAP','Soporte HxGN','Otro'],
    'Alta precision': ['No marca profundidad de broca','No visualiza poligonos','GPS modo bad','GPS modo floating','Soporte HxGN','Otro'],
    Configuracion: ['Soporte HxGN','Otro'],
    'Camara cabina': ['Soporte HxGN','Otro'],
    'Camara frontal': ['Soporte HxGN','Otro'],
    HUB:['Soporte','Otro'],
    Sensores:['Soporte','Otro'],
  };
  
  const renderActividadSelectWithCheckbox = (sistema, activity, index) => {
    const availableActivities = actividadOptions[activity.falla] || ['Sin actividad disponible'];
  
    return (
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={8}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor={`actividad-${index}`}>Actividad</InputLabel>
            <Select
              label="Actividad"
              value={activity.actividad}
              onChange={(e) => {
                const updatedSystems = { ...systems };
                updatedSystems[sistema].activities[index].actividad = e.target.value;
                setSystems(updatedSystems);
              }}
              startAdornment={<InputAdornment position="start"><LightbulbIcon /></InputAdornment>}
            >
              {availableActivities.map((opcion, i) => (
                <MenuItem key={i} value={opcion}>
                  {opcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
  
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', gap: 1, ml: 1, alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={activity.checkSolucionado}
                  onChange={() => handleCheckboxChange(sistema, index, 'solucionado')}
                  sx={{ transform: 'scale(0.8)' }}
                />
              }
              label="S"
              labelPlacement="end"
              sx={{ fontSize: 12 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={activity.checkNoSolucionado}
                  onChange={() => handleCheckboxChange(sistema, index, 'noSolucionado')}
                  sx={{ transform: 'scale(0.8)' }}
                />
              }
              label="N"
              labelPlacement="end"
              sx={{ fontSize: 12 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={activity.checkPendiente}
                  onChange={() => handleCheckboxChange(sistema, index, 'pendiente')}
                  sx={{ transform: 'scale(0.8)' }}
                />
              }
              label="P"
              labelPlacement="end"
              sx={{ fontSize: 12 }}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };
  
  
  
  const getIconForSystem = (system) => {
    switch (system) {
      case 'AXIS':
        return <CameraAltIcon size={26} style={{ color: 'black' }} />;
      case 'WIFI':
        return <WifiIcon size={26} style={{ color: 'black' }} />;
      default:
        return <GiMineTruck size={26} style={{ color: 'black' }} />;
    }
  };

  const renderSelectOrFixedInput = (sistema, activity, index) => {
    if (sistema === 'OAS' || sistema === 'ITRACK') {
      activity.tipoEquipo = 'Camión'; // Fijo camion
    } else if (sistema === 'AXIS') {
      activity.tipoEquipo = 'Cámara'; // Fijo camara
    }
    return (
      <FormControl fullWidth>
        <InputLabel>Tipo de Equipo</InputLabel>
        <Select
          value={activity.tipoEquipo}
          onChange={(e) => { 
            const updatedSystems = { ...systems };
            updatedSystems[sistema].activities[index].tipoEquipo = e.target.value;
            setSystems(updatedSystems);
          }}
          displayEmpty
          startAdornment={<InputAdornment position="start">{getIconForSystem(sistema)}</InputAdornment>}
          label="Tipo de Equipo"
          readOnly={sistema === 'OAS' || sistema === 'ITRACK' || sistema === 'AXIS'}
        >
          {(tipoEquipoOptions[sistema] || tipoEquipoOptions.default).map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const renderEquipoSelect = (sistema, activity, index) => (
    <TextField
      label="Equipo"
      variant="outlined"
      fullWidth
      select
      value={activity.equipo}
      onChange={(e) => {
        const updatedSystems = { ...systems };
        updatedSystems[sistema].activities[index].equipo = e.target.value;
        setSystems(updatedSystems);
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">{getIconForSystem(sistema)}</InputAdornment>
      }}
    >
      {(equipoOptions[activity.tipoEquipo] || []).map(equipo => (
        <MenuItem key={equipo} value={equipo}>
          {equipo}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderFallaSelect = (sistema, activity, index) => (
    <TextField
      label="Falla"
      variant="outlined"
      fullWidth
      select
      value={activity.falla}
      onChange={(e) => {
        const updatedSystems = { ...systems };
        updatedSystems[sistema].activities[index].falla = e.target.value;
        setSystems(updatedSystems);
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><WarningIcon style={{ color: 'black' }} /></InputAdornment>
      }}
    >
      {(fallaOptions[sistema] || []).map((falla) => (
        <MenuItem key={falla} value={falla}>
          {falla}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderMantenimientoSelect = () => (
    <TextField
      label="Mantenimiento"
      variant="outlined"
      fullWidth
      value="Correctivo"
      InputProps={{
        readOnly: true,
        startAdornment: <InputAdornment position="start"><BuildIcon /></InputAdornment>
      }}
    />
  );
  
  return (
    <Box sx={{ width: '100%', margin: 'auto', marginTop: 2, padding: 2, backgroundColor: '#FFFFFF', borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reporte Diario
      </Typography>
      <Grid container spacing={2}>
        {/* Inputs Técnico, Turno y Fecha */}
        <Grid item xs={4}>
          <TextField label="Nombre Técnico" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Turno" variant="outlined" fullWidth select>
            <MenuItem value="diurno">Diurno</MenuItem>
            <MenuItem value="nocturno">Nocturno</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Fecha" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>
      
      {Object.keys(systems).map((sistema) => (
        <Box key={sistema} sx={{ marginTop: 2, padding: 2, backgroundColor: '#9BC1CB', borderRadius: 1 }}>
          <Typography variant="h6">{`Reporte de ${sistema}`}</Typography>
          <FormControlLabel
            control={<Switch checked={systems[sistema].noActivity} onChange={() => handleSwitchChange(sistema)} color="primary" />}
            label="No se reporta actividad"
          />
          {!systems[sistema].noActivity && (
            <>
              {systems[sistema].activities.map((activity, index) => (
  <Grid container spacing={1} key={index} sx={{ marginBottom: 2 }}>
    <Grid item xs={1.5}>
      {renderMantenimientoSelect(sistema, activity, index)}
    </Grid>
   
    <Grid item xs={2}>
      {renderSelectOrFixedInput(sistema, activity, index)}
    </Grid>
    <Grid item xs={1.5}>
      {renderEquipoSelect(sistema, activity, index)}
    </Grid>
    <Grid item xs={2.5}>
      {renderFallaSelect(sistema, activity, index)}
    </Grid>
    <Grid item xs={3.8}>
  {renderActividadSelectWithCheckbox(sistema, activity, index)}
</Grid>
    
<Grid item xs={12}>
  {!activity.hideComentarios && (
    <TextField
      label="Comentarios"
      variant="outlined"
      fullWidth
      multiline
      value={activity.comentario}
      onChange={(e) => {
        const updatedSystems = { ...systems };
        updatedSystems[sistema].activities[index].comentario = e.target.value;
        setSystems(updatedSystems);
      }}
    />
  )}
</Grid>

 
  </Grid>
))}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleAddActivity(sistema)}>
                  Añadir Reporte
                </Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteActivity(sistema)}>
                  Eliminar Reporte
                </Button>
              </Box>
            </>
          )}
          
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Button variant="contained" color="success">Guardar Reporte</Button>
        <Button variant="contained" color='primary'>Generar Reporte</Button>
      </Box>
    </Box>
  );
};
export default Reportes;
