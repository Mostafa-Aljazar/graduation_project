import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Field, fonts, PrimaryButton } from '@/components/ui';
import { useColors } from '@/hooks/useColors';

export default function OtpScreen() {
  const colors = useColors();
  const [code, setCode] = useState('');
  return (
    <KeyboardAwareScrollViewCompat contentContainerStyle={styles.content} bottomOffset={60}>
      <Text style={[styles.title, { color: colors.foreground }]}>أدخل الرمز</Text>
      <Text style={[styles.copy, { color: colors.mutedForeground }]}>هذه تجربة واجهة محلية؛ استخدم أي ستة أرقام للمتابعة.</Text>
      <Field label="رمز التحقق" value={code} onChangeText={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))} keyboardType="number-pad" placeholder="000000" />
      <PrimaryButton label="تحقق" icon="checkmark" disabled={code.length !== 6} onPress={() => router.replace('/auth/login')} />
    </KeyboardAwareScrollViewCompat>
  );
}
const styles = StyleSheet.create({ content: { padding: 24, gap: 18 }, title: { fontFamily: fonts.extraBold, fontSize: 26, textAlign: 'right', marginTop: 24 }, copy: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, textAlign: 'right' } });