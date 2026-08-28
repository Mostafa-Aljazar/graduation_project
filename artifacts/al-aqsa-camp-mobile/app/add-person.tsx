import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Field, fonts, PrimaryButton } from '@/components/ui';
import { Person, useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';

export default function AddPersonScreen() {
  const colors = useColors();
  const { addPerson } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<Person['role']>('نازح');
  return (
    <KeyboardAwareScrollViewCompat contentContainerStyle={styles.content} bottomOffset={60}>
      <Field label="الاسم الكامل" value={name} onChangeText={setName} />
      <Field label="رقم الهاتف" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={[styles.label, { color: colors.foreground }]}>الدور</Text>
      <View style={styles.roles}>{(['نازح', 'مندوب', 'حارس'] as Person['role'][]).map((item) => <Pressable key={item} onPress={() => setRole(item)} style={[styles.role, { backgroundColor: role === item ? colors.primary : colors.muted }]}><Text style={[styles.roleText, { color: role === item ? colors.primaryForeground : colors.foreground }]}>{item}</Text></Pressable>)}</View>
      <PrimaryButton testID="save-person" label="حفظ السجل" icon="person-add-outline" disabled={!name.trim() || phone.length < 6} onPress={() => { addPerson(name.trim(), role, phone.trim()); router.back(); }} />
    </KeyboardAwareScrollViewCompat>
  );
}
const styles = StyleSheet.create({
  content: { padding: 24, gap: 18 }, label: { fontFamily: fonts.bold, textAlign: 'right' }, roles: { flexDirection: 'row-reverse', gap: 8 },
  role: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' }, roleText: { fontFamily: fonts.bold },
});