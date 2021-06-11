import React from 'react'
import { 
	Text, 
	TouchableOpacity, 
	TouchableOpacityProps,
	StyleSheet 
} from 'react-native'

type ButtonProps = TouchableOpacityProps & {
	title: string
}

// {...rest} pega todas as propriedades do TouchableOpacityProps
export function Button({ title, ...rest }: ButtonProps) {
    return (
			<TouchableOpacity 
        style={styles.button}
        activeOpacity={.7}        
				{...rest} //onPress={onPress}
			>
					<Text style={styles.buttonText}>{ title }</Text>
			</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#a370f7',
		padding: 15,
		borderRadius: 7,
		alignItems: 'center',
		marginTop: 20
	},
	buttonText: {
		color: '#fff',
		fontSize: 17,
		fontWeight: 'bold'
	}
})