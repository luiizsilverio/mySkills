import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Platform,
	FlatList,
	Alert,
	Keyboard
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

export default function Home() {
	const [newSkill, setNewSkill] = useState('')
	const [mySkills, setMySkills] = useState<SkillData[]>([])
	const [greetings, setGreetings] = useState('')

	type SkillData = {
		id: string
		name: string
	}

	function handleAddNewSkill() {
		if (!newSkill) {
			Alert.alert('Atenção', 'Informe o skill')
		} else
		if (mySkills.some(skill => skill.name === newSkill)) {
			Alert.alert('Atenção', 'Já existe esse skill')
		} else {
			const data = {
				id: String(new Date().getTime()),
				name: newSkill
			}
			setMySkills(oldState => [...oldState, data])
			Keyboard.dismiss() // fecha o teclado
		}
	}

	function handleRemoveSkill(id: string) {
		function excluiSkill() {
			setMySkills(oldState => oldState.filter(skill => (
				skill.id !== id
			)))
		}

		Alert.alert(
			'Exclusão da skill', // Título
			'Confirma exclusão da skill?', // Mensagem
			[
				{ // primeiro botão
					text: "Confirma", 
					onPress: () => excluiSkill()
				},
				{ // segundo botão
					text: "Cancela",
					onPress: () => {}
				},
			]
		)		
	}

	useEffect(() => {
		const currentHour = new Date().getHours()
		if (currentHour < 12) {
			setGreetings('Bom dia')
		} else if (currentHour < 18) {
			setGreetings('Boa tarde')
		} else {
			setGreetings('Boa noite')
		}
	}, [])
	
  return (
    <>
      <View style={styles.container}>

        <Text style={styles.title}>
					Bem-vindo, Luiz
				</Text>

				<Text style={styles.greetings}>
					{ greetings }
				</Text>

				<TextInput
					style={styles.input}
					placeholder="New skill"
					placeholderTextColor="#777"
					onChangeText={setNewSkill}
				/>

				<Button
					title="Adicionar"
					onPress={handleAddNewSkill}
				/>

				<Text style={[styles.title, {marginVertical: 40}]}>
					My Skills
				</Text>

				<FlatList
					data={mySkills}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<SkillCard 
							skill={item.name}
							onPress={() => handleRemoveSkill(item.id)}
						/>
					)}
				/>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#121015',
		paddingHorizontal: 30,
		paddingVertical: 70
  },
	title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold'
	},
	input: {
		backgroundColor: '#1f1e25',
		color: '#fff',
		fontSize: 18,
		padding: Platform.OS === 'ios' ? 15 : 12,
		marginTop: 30,
		borderRadius: 7
	},
	greetings: {
		color: '#fff'
	}
})