import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Field, fonts, PrimaryButton } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';

export default function LoginScreen() {
  const colors = useColors();
  const { signIn } = useApp();
  const [email, setEmail] = useState('staff@alaqsa.local');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const submit = () => {
    if (!email.includes('@') || password.length < 6) return setError('تحقق من البريد وكلمة المرور (6 أحرف على الأقل).');
    signIn();
    router.dismissAll();
  };
  return (
    <KeyboardAwareScrollViewCompat contentContainerStyle={styles.content} bottomOffset={60}>
      <View style={[styles.logo, { backgroundColor: colors.primary }]}><Text style={[styles.logoText, { color: colors.gold }]}>الأقصى</Text></View>
      <Text style={[styles.title, { color: colors.foreground }]}>مرحباً بعودتك</Text>
      <Text style={[styles.copy, { color: colors.mutedForeground }]}>استخدم الحساب التجريبي للوصول إلى أدوات إدارة المخيم على هذا الجهاز.</Text>
      <Field label="البريد الإلكتروني" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Field label="كلمة المرور" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
      <PrimaryButton testID="login-submit" label="دخول" icon="arrow-back" onPress={submit} />
      <Pressable onPress={() => router.push('/auth/forgot')}><Text style={[styles.link, { color: colors.primary }]}>نسيت كلمة المرور؟</Text></Pressable>
    </KeyboardAwareScrollViewCompat>
  );
}
const styles = StyleSheet.create({
  content: { padding: 24, gap: 17 }, logo: { width: 78, height: 78, borderRadius: 39, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  logoText: { fontFamily: fonts.extraBold, fontSize: 18 }, title: { fontFamily: fonts.extraBold, fontSize: 27, textAlign: 'center' },
  copy: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 22, textAlign: 'center' }, error: { fontFamily: fonts.medium, textAlign: 'right' },
  link: { fontFamily: fonts.bold, textAlign: 'center', paddingVertical: 8 },
});