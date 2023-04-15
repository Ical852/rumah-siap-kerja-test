import { showMessage } from 'react-native-flash-message'
import { customColors } from '../colors'

export const showError = (message) => {
    showMessage({
        message: message,
        type: 'default',
        backgroundColor: customColors.red,
        color: customColors.white
    })
}

export const showSuccess = (message) => {
    showMessage({
        message: message,
        type: 'default',
        backgroundColor: customColors.green,
        color: customColors.white
    })
}