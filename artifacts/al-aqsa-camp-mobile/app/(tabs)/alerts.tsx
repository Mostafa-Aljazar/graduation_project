import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, fonts, ScreenHeader, StatusPill } from '@/components/ui';
import { useColors } from '@/hooks/useColors';

const alerts = [
  { title: 'مهمة أمنية جديدة', body: 'متابعة تنظيم الدور عند نقطة التوزيع الرئيسية.', time: 'منذ 12 دقيقة', icon: 'shield-checkmark-outline' as const, tone: 'red' as const },
  { title: 'اكتملت قائمة المربع ب', body: 'تم اعتماد 48 عائلة ضمن حملة السلال الغذائية.', time: 'منذ ساعة', icon: 'checkmark-circle-outline' as const, tone: 'green' as const },
  { title: 'شكوى بحاجة للمتابعة', body: 'وردت ملاحظة بخصوص موعد تسليم مستلزمات النظافة.', time: 'أمس', icon: 'chatbox-ellipses-outline' as const, tone: 'gold' as const },
];
export default function AlertsScreen() {
  const colors = useColors();
  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceTint }]}>
      <ScreenHeader title="التنبيهات والمهام" subtitle="آخر المستجدات التشغيلية" />
      <ScrollView contentContainerStyle={styles.content}>
        {alerts.map((alert) => (
          <Card key={alert.title}>
            <View style={styles.row}>
              <StatusPill text={alert.time} tone={alert.tone} />
              <View style={styles.text}>
                <Text style={[styles.title, { color: colors.foreground }]}>{alert.title}</Text>
                <Text style={[styles.body, { color: colors.mutedForeground }]}>{alert.body}</Text>
              </View>
              <Ionicons name={alert.icon} size={25} color={alert.tone === 'red' ? colors.destructive : colors.primary} />
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1 }, content: { padding: 16, paddingBottom: 118, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 11 }, text: { flex: 1, alignItems: 'flex-end' },
  title: { fontFamily: fonts.bold, fontSize: 16 }, body: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, textAlign: 'right', marginTop: 3 },
});