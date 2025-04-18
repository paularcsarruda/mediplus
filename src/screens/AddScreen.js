import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddScreen({ navigation }) {
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('comprimido');
  const [dosagem, setDosagem] = useState('');
  const [dataInicio, setDataInicio] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [duracaoDias, setDuracaoDias] = useState(1);
  const [frequenciaUso, setFrequenciaUso] = useState('');
  const [medicoResponsavel, setMedicoResponsavel] = useState('');
  const [lembreteReposicao, setLembreteReposicao] = useState(false);
  const [notificarContatos, setNotificarContatos] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [mostrarTimePicker, setMostrarTimePicker] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(new Date());

  const salvarMedicamento = async () => {
    const novoMed = {
      nome: nomeMedicamento,
      tipo: tipoSelecionado,
      dose: dosagem,
      dataInicio: dataInicio.toISOString().split('T')[0],
      duracao: duracaoDias,
      frequencia: frequenciaUso,
      medico: medicoResponsavel,
      alarme: horarios.map(date => `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`),
      reposicao: lembreteReposicao,
      notificar: notificarContatos,
    };

    try {
      const medsSalvos = await AsyncStorage.getItem('medicamentos');
      const lista = medsSalvos ? JSON.parse(medsSalvos) : [];
      lista.push(novoMed);
      await AsyncStorage.setItem('medicamentos', JSON.stringify(lista));
      navigation.navigate('Home');
    } catch (e) {
      console.error('Erro ao salvar medicamento:', e);
    }
  };

  const adicionarHorario = () => {
    setHorarios([...horarios, horarioSelecionado]);
    setMostrarTimePicker(false);
  };

  const removerHorario = (index) => {
    const novosHorarios = [...horarios];
    novosHorarios.splice(index, 1);
    setHorarios(novosHorarios);
  };

  const showTimePicker = () => {
    setMostrarTimePicker(true);
  };

  const onTimeChange = (event, selectedTime) => {
    setMostrarTimePicker(false);
    if (selectedTime) {
      setHorarioSelecionado(selectedTime);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.voltar}>
        <Ionicons name="chevron-back-circle-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Container para a imagem da câmera */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <Ionicons name="camera-outline" size={40} color="#888" />
        </View>
      </View>

      <Text style={styles.label}>medicamento</Text>
      <TextInput 
        placeholder="ex: Paracetamol, Novalgina"
        style={styles.input}
        value={nomeMedicamento}
        onChangeText={setNomeMedicamento}
      />

      <Text style={styles.label}>tipo de medicamento</Text>
      <View style={styles.tipoContainer}>
        {['comprimido', 'líquido', 'gotas', 'injetável'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.tipoBtn, tipoSelecionado === tipo && styles.tipoBtnAtivo]}
            onPress={() => setTipoSelecionado(tipo)}
          >
            <Text style={styles.tipoText}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>dosagem</Text>
      <TextInput
        placeholder="ex: 500mg, 1 comprimido"
        style={styles.input}
        value={dosagem}
        onChangeText={setDosagem}
      />

      <Text style={styles.label}>início e duração do tratamento (dias)</Text>
      <View style={styles.dateDurationContainer}>
        <TouchableOpacity
          onPress={() => setMostrarDatePicker(true)}
          style={styles.dateBtn}
        >
          <Ionicons name="calendar-outline" size={20} color="#4B0082" style={{ marginRight: 5 }} />
          <Text style={{ color: '#4B0082' }}>
            {dataInicio.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <View style={styles.durationContainer}>
          <Text style={{ color: '#4B0082', marginRight: 5 }}></Text>
          <TouchableOpacity onPress={() => setDuracaoDias(Math.max(1, duracaoDias - 1))} style={styles.durationControl}>
            <Ionicons name="remove-outline" size={20} color="#4B0082" />
          </TouchableOpacity>
          <Text style={styles.durationText}>{duracaoDias}</Text>
          <TouchableOpacity onPress={() => setDuracaoDias(duracaoDias + 1)} style={styles.durationControl}>
            <Ionicons name="add-outline" size={20} color="#4B0082" />
          </TouchableOpacity>
        </View>
      </View>

      {mostrarDatePicker && (
        <DateTimePicker
          value={dataInicio}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            if (selectedDate) setDataInicio(selectedDate);
            setMostrarDatePicker(false);
          }}
        />
      )}

      <Text style={styles.label}>frequência de uso</Text>
      <TextInput
        placeholder="ex: 1 vez ao dia, a cada 8 horas"
        style={styles.input}
        value={frequenciaUso}
        onChangeText={setFrequenciaUso}
      />

      <Text style={styles.label}>médico responsável</Text>
      <TextInput
        placeholder="nome do médico"
        style={styles.input}
        value={medicoResponsavel}
        onChangeText={setMedicoResponsavel}
      />

      <TouchableOpacity style={styles.alarmContainer} onPress={showTimePicker}>
        <Ionicons name="alarm-outline" size={24} color="#4B0082" />
        <Text style={{ color: '#4B0082', marginLeft: 10 }}>adicionar alarme</Text>
      </TouchableOpacity>

      {horarios.length > 0 && (
        <View style={styles.alarmsList}>
          <Text style={styles.label}>Horários de Alarme:</Text>
          {horarios.map((horario, index) => (
            <View key={index} style={styles.alarmItem}>
              <Text>{`${horario.getHours().toString().padStart(2, '0')}:${horario.getMinutes().toString().padStart(2, '0')}`}</Text>
              <TouchableOpacity onPress={() => removerHorario(index)}>
                <Ionicons name="close-circle-outline" size={20} color="#E9967A" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {mostrarTimePicker && (
        <DateTimePicker
          value={horarioSelecionado}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.textswitch}>criar lembretes de reposição?</Text>
        <Switch 
          value={lembreteReposicao} 
          onValueChange={setLembreteReposicao} 
          trackColor={{ false: '#767577', true: '#7121D9' }}
          thumbColor={lembreteReposicao ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.textswitch}>enviar notificação para contatos</Text>
        <Switch 
          value={notificarContatos} 
          onValueChange={setNotificarContatos} 
          trackColor={{ false: '#767577', true: '#7121D9' }}
          thumbColor={notificarContatos ? '#fff' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.btnCadastrar} onPress={salvarMedicamento}>
        <Text style={styles.btnText}>novo medicamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>cancelar</Text>
      </TouchableOpacity>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 130,
    backgroundColor: '#8793FF',
    flexGrow: 1,
  },
  voltar: {
    position: 'absolute',
    top: 55,
    left: 15,
    zIndex: 10,
  },
  cameraContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraPlaceholder: {
    width: 350, 
    height: 160, 
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 5,
    color: '#4B0082',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    marginBottom: 15,
    paddingLeft: 20,
    color: '#333',
    fontSize: 12,
  },
  tipoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tipoBtn: {
    width: '48%', // Isso vai garantir que dois botões caibam por linha
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 5, // Adiciona um espaço entre as linhas
    justifyContent: 'center',
  },
  tipoBtnAtivo: {
    backgroundColor: '#9370DB',
  },
  tipoText: {
    color: '#4B0082',
  },
  dateDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  dateBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    marginRight: 10,
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 40,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingRight: 20,
  },
  durationControl: {
    paddingHorizontal: 10,
  },
  durationText: {
    fontSize: 16,
    color: '#4B0082',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  btnCadastrar: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  btnCancelar: {
    backgroundColor: '#FD9696',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alarmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 30,
    marginBottom: 15,
  },
  alarmsList: {
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  textswitch: {
    color: '#fff',
  },
});
