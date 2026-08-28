import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, fonts, ScreenHeader, StatusPill } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';

export default function AidDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { aids } = useApp();
  const aid = aids.find((item) => item.id === id);
  if (!aid) return <View style={[styles.center, { backgroundColor: colors.background }]}><Text style={{ color: colors.foreground, fontFamily: fonts.bold }}>لم يتم العثور على الحملة</Text></View>;
  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceTint }]}>
      <ScreenHeader title={aid.title} subtitle={`${aid.type} · ${aid.date}`} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card><View style={styles.top}><StatusPill text={aid.status} /><Ionicons name="cube-outline" size={30} color={colors.primary} /></View><Text style={[styles.number, { color: colors.primary }]}>{aid.families}</Text><Text style={[styles.caption, { color: colors.mutedForeground }]}>عائلة مستفيدة حتى الآن</Text></Card>
        <Card><Text style={[styles.heading, { color: colors.foreground }]}>سجل التوزيع</Text>{['المربع أ — 46 عائلة', 'المربع ب — 48 عائلة', 'المربع ج — 34 عائلة'].map((line) => <View key={line} style={[styles.line, { borderBottomColor: colors.border }]}><Ionicons name="checkmark-circle" size={19} color={colors.success} /><Text style={[styles.lineText, { color: colors.foreground }]}>{line}</Text></View>)}</Card>
        <Card><Text style={[styles.heading, { color: colors.foreground }]}>ملاحظة</Text><Text style={[styles.note, { color: colors.mutedForeground }]}>تفاصيل هذه الشاشة تجريبية ومحلية، ولا تمثل حالة توزيع مشتركة مع الموقع.</Text></Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, content: { padding: 16, gap: 13, paddingBottom: 40 },
  top: { flexDirection: 'row', justifyContent: 'space-between' }, number: { fontFamily: fonts.extraBold, fontSize: 42, textAlign: 'right', marginTop: 8 },
  caption: { fontFamily: fonts.regular, textAlign: 'right' }, heading: { fontFamily: fonts.bold, fontSize: 17, textAlign: 'right', marginBottom: 8 },
  line: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingVertical: 12, borderBottomWidth: 1 },
  lineText: { fontFamily: fonts.medium, fontSize: 14 }, note: { fontFamily: fonts.regular, lineHeight: 22, textAlign: 'right' },
});