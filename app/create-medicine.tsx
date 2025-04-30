import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { medicineService } from '../services/medicineService';
import Footer from '@/components/Footer';

export default function CreateMedicineScreen() {
  const [lembrarReposicao, setLembrarReposicao] = useState(false);
  const [notificarContatos, setNotificarContatos] = useState(false);

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [diasTratamento, setDiasTratamento] = useState(1);
  const [frequenciaUso, setFrequenciaUso] = useState('');
  const [medicoResponsavel, setMedicoResponsavel] = useState('');
  const [alarme, setAlarme] = useState('');
  const router = useRouter();

  async function salvarMedicamento() {
    if (!nome || !tipo || !dosagem) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    await medicineService.adicionar({
      id: String(Date.now()),
      nome,
      detalhe: `${tipo} - ${dosagem}`,
      horario: dataInicio,
      icone: 'pill', 
      tipo,
      dosagem,
      dataInicio,
      diasTratamento,
      frequenciaUso,
      medicoResponsavel,
      alarme,
      lembrarReposicao,
      notificarContatos,
    });


    router.push('/my-medicines');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#8793FF' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Novo medicamento</Text>

        <TouchableOpacity style={styles.imagemContainer}>
          <Ionicons name="camera-outline" size={32} color="#9b59b6" />
        </TouchableOpacity>

        <View style={styles.inputComIcone}>
          <Ionicons name="medkit-outline" size={20} color="#9b59b6" />
          <TextInput placeholder="Nome do Medicamento" style={styles.input} value={nome} onChangeText={setNome} />
        </View>

        <Text style={styles.label}>Tipo de Medicamento</Text>
        <View style={styles.tipoRow}>
          {['comprimido', 'líquido', 'gotas', 'injetável'].map((item) => (
            <TouchableOpacity key={item} style={styles.tipoBotao} onPress={() => setTipo(item)}>
              <MaterialCommunityIcons name="pill" size={18} color="#9b59b6" />
              <Text style={styles.tipoTexto}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputComIcone}>
          <Ionicons name="options-outline" size={20} color="#9b59b6" />
          <TextInput placeholder="Dosagem" style={styles.input} value={dosagem} onChangeText={setDosagem} />
        </View>

        <View style={styles.inputComIcone}>
          <Ionicons name="calendar-outline" size={20} color="#9b59b6" />
          <TextInput placeholder="Data de Início (10/03/2025)" style={styles.input} value={dataInicio} onChangeText={setDataInicio} />
        </View>

        <View style={styles.tratamento}>
          <TouchableOpacity style={styles.tratamentoBotao} onPress={() => setDiasTratamento(Math.max(1, diasTratamento - 1))}>
            <Text style={styles.tratamentoTexto}>-</Text>
          </TouchableOpacity>
          <Text style={styles.tratamentoDias}>{diasTratamento}</Text>
          <TouchableOpacity style={styles.tratamentoBotao} onPress={() => setDiasTratamento(diasTratamento + 1)}>
            <Text style={styles.tratamentoTexto}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputComIcone}>
          <Ionicons name="repeat-outline" size={20} color="#9b59b6" />
          <TextInput placeholder="Frequência de Uso" style={styles.input} value={frequenciaUso} onChangeText={setFrequenciaUso} />
        </View>

        <View style={styles.inputComIcone}>
          <Ionicons name="person-outline" size={20} color="#9b59b6" />
          <TextInput placeholder="Médico Responsável" style={styles.input} value={medicoResponsavel} onChangeText={setMedicoResponsavel} />
        </View>

        <View style={styles.inputComIcone}>
          <Ionicons name="alarm-outline" size={20} color="#9b59b6" />
          <TextInput placeholder="Alarme" style={styles.input} value={alarme} onChangeText={setAlarme} />
        </View>

        <TouchableOpacity style={styles.addAlarmeButton}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Criar lembretes de reposição?</Text>
          <Switch value={lembrarReposicao} onValueChange={setLembrarReposicao} />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enviar notificação para contatos</Text>
          <Switch value={notificarContatos} onValueChange={setNotificarContatos} />
        </View>

        <TouchableOpacity style={styles.novoMedicamentoButton} onPress={salvarMedicamento}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Novo Medicamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelarButton} onPress={() => router.back()}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancelar</Text>
        </TouchableOpacity>

      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#8793FF', padding: 20, paddingTop: 60, paddingBottom: 100 },
  voltar: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  titulo: { color: '#fff', fontSize: 20, marginBottom: 20, alignSelf: 'center' },
  imagemContainer: { backgroundColor: '#fff', height: 160, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  inputComIcone: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 30, paddingHorizontal: 20, paddingVertical: 10, marginBottom: 12 },
  input: { flex: 1, marginLeft: 10 },
  label: { color: '#fff', fontWeight: 'bold', marginBottom: 8, marginTop: 10 },
  tipoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', marginBottom: 15 },
  tipoBotao: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, marginBottom: 10 },
  tipoTexto: { color: '#333', fontSize: 14, marginLeft: 5 },
  tratamento: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  tratamentoBotao: { backgroundColor: '#fff', borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  tratamentoTexto: { fontSize: 20, fontWeight: 'bold' },
  tratamentoDias: { marginHorizontal: 20, color: '#fff', fontSize: 18 },
  addAlarmeButton: { backgroundColor: '#9b59b6', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  switchLabel: { color: '#fff', fontSize: 14 },
  novoMedicamentoButton: { backgroundColor: '#333', padding: 15, borderRadius: 20, alignItems: 'center', marginTop: 20 },
  cancelarButton: { backgroundColor: '#e57373', padding: 15, borderRadius: 20, alignItems: 'center', marginTop: 10 },
});
