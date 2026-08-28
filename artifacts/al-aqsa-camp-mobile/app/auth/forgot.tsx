import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Field, fonts, PrimaryButton } from '@/components/ui';
import { useColors } from '@/hooks/useColors';

export default function ForgotScreen() {
  const colors = useColors();
  const [email, setEmail] = useState('');
  return (
    <KeyboardAwareScrollViewCompat contentContainerStyle={styles.content} bottomOffset={60}>
      <Text style={[styles.title, { color: colors.foreground }]}>استعادة الوصول</Text>
      <Text style={[styles.copy, { color: colors.mutedForeground }]}>أدخل البريد المسجل وسننتقل إلى خطوة التحقق التجريبية.</Text>
      <Field label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="name@example.com" />
      <PrimaryButton label="إرسال رمز التحقق" icon="mail-outline" disabled={!email.includes('@')} onPress={() => router.push('/auth/otp')} />
    </KeyboardAwareScrollViewCompat>
  );
}
const styles = StyleSheet.create({ content: { padding: 24, gap: 18 }, title: { fontFamily: fonts.extraBold, fontSize: 26, textAlign: 'right', marginTop: 24 }, copy: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, textAlign: 'right' } });