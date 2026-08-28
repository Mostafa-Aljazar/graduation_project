import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Field, fonts, PrimaryButton } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';

export default function AddAidScreen() {
  const colors = useColors();
  const { addAid } = useApp();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const submit = async () => {
    setError('');
    try {
      await addAid(title.trim(), type.trim());
      router.back();
    } catch {
      setError('تعذر حفظ الحملة. تحقق من اتصال الإنترنت وصلاحيات الحساب ثم حاول مرة أخرى.');
    }
  };
  return (
    <KeyboardAwareScrollViewCompat contentContainerStyle={styles.content} bottomOffset={60}>
      <Text style={[styles.copy, { color: colors.mutedForeground }]}>ستُحفظ الحملة وتُزامن مع بيانات المخيم.</Text>
      <Field label="اسم الحملة" value={title} onChangeText={setTitle} placeholder="مثال: حملة المياه" />
      <Field label="نوع المساعدة" value={type} onChangeText={setType} placeholder="غذاء، صحة، إيواء..." />
      {error ? <Text style={[styles.error, { color: colors.destructive }]}>{error}</Text> : null}
      <PrimaryButton testID="save-aid" label="حفظ الحملة" icon="checkmark" disabled={!title.trim() || !type.trim()} onPress={() => void submit()} />
    </KeyboardAwareScrollViewCompat>
  );
}
const styles = StyleSheet.create({ content: { padding: 24, gap: 18 }, copy: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 22, textAlign: 'right' }, error: { fontFamily: fonts.medium, textAlign: 'right' } });