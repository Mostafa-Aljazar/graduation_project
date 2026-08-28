import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, fonts, PrimaryButton, ScreenHeader, StatusPill } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';

export default function AccountScreen() {
  const colors = useColors();
  const { signedIn, signOut } = useApp();
  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceTint }]}>
      <ScreenHeader title="الحساب" subtitle="إعدادات فريق المخيم" />
      <ScrollView contentContainerStyle={styles.content}>
        {signedIn ? (
          <>
            <Card>
              <View style={styles.profile}>
                <View style={styles.profileText}>
                  <Text style={[styles.name, { color: colors.foreground }]}>أحمد الخطيب</Text>
                  <Text style={[styles.meta, { color: colors.mutedForeground }]}>مدير عمليات المخيم</Text>
                  <StatusPill text="حساب تجريبي محلي" tone="gold" />
                </View>
                <View style={[styles.avatar, { backgroundColor: colors.accent }]}><Ionicons name="person" size={32} color={colors.primary} /></View>
              </View>
            </Card>
            <Card><Text style={[styles.heading, { color: colors.foreground }]}>عن هذه النسخة</Text><Text style={[styles.copy, { color: colors.mutedForeground }]}>البيانات والإجراءات محفوظة على هذا الجهاز فقط ولا تتم مزامنتها مع موقع الويب أو أجهزة الفريق.</Text></Card>
            <PrimaryButton label="تسجيل الخروج" icon="log-out-outline" onPress={() => Alert.alert('تسجيل الخروج', 'هل تريد إنهاء الجلسة المحلية؟', [{ text: 'إلغاء' }, { text: 'خروج', style: 'destructive', onPress: signOut }])} />
          </>
        ) : (
          <Card>
            <Ionicons name="lock-closed-outline" size={36} color={colors.primary} style={styles.lock} />
            <Text style={[styles.heading, { color: colors.foreground }]}>دخول فريق المخيم</Text>
            <Text style={[styles.copy, { color: colors.mutedForeground }]}>ادخل للوصول إلى إجراءات الإدارة المحلية على هذا الهاتف.</Text>
            <View style={styles.gap}><PrimaryButton testID="account-login" label="تسجيل الدخول" icon="log-in-outline" onPress={() => router.push('/auth/login')} /></View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1 }, content: { padding: 16, paddingBottom: 118, gap: 14 },
  profile: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 14 },
  profileText: { flex: 1, alignItems: 'flex-end', gap: 5 }, avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.extraBold, fontSize: 20 }, meta: { fontFamily: fonts.regular, fontSize: 14 },
  heading: { fontFamily: fonts.bold, fontSize: 18, textAlign: 'right' }, copy: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 22, textAlign: 'right', marginTop: 8 },
  lock: { alignSelf: 'center', marginBottom: 12 }, gap: { marginTop: 18 },
});