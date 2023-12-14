import { View, Text } from "react-native"
import { globalStyles } from '../../styles/globalStyleSheet'

export const TermsAndConditionsScreen = ({ navigation }) => {
    return (
        <View style={{ maxWidth: 700, alignSelf: 'center' }}>
            <Text style={globalStyles.H2}>
                User Agreement for ZeroCold
            </Text>
            <Text style= {[globalStyles.Body, { padding: 24 }]}>
                1. Acceptance of Terms{"\n"}
                By accessing or using the ZeroCold, you agree to be bound by this User Agreement. If you do not agree, do not use the App.
                {"\n\n"}
                2. Test Application{"\n"}
                The App is a test version provided for evaluation and feedback purposes only. It is not a final product and may contain bugs or errors.
                {"\n\n"}
                3. No Warranties{"\n"}
                The App is provided "as-is" without any warranties, express or implied. We make no guarantees regarding the App's performance or reliability.
                {"\n\n"}
                4. User's Responsibility{"\n"}
                You acknowledge that you use the App at your own risk. We are not responsible for any direct or indirect consequences of your use of the App.
                {"\n\n"}
                5. Limitation of Liability{"\n"}
                We will not be liable for any damages, including but not limited to incidental, consequential, or punitive damages arising out of your use of the App.
                {"\n\n"}
                6. Changes to Agreement{"\n"}
                We may update this agreement at any time. Continued use of the App after changes indicates your acceptance of the new terms.
                {"\n\n"}
                7. Contact Information{"\n"}
                For any questions about this agreement, please contact [TOS@pamojainstitute.org].
            </Text>
        </View>
    )
}

export default TermsAndConditionsScreen