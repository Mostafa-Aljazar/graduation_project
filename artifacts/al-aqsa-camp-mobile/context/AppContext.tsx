import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Aid = { id: string; title: string; type: string; families: number; status: 'نشطة' | 'مكتملة'; date: string };
export type Person = { id: string; name: string; role: 'نازح' | 'مندوب' | 'حارس'; phone: string; location: string };

const initialAids: Aid[] = [
  { id: 'aid-1', title: 'حملة السلال الغذائية', type: 'غذاء', families: 128, status: 'نشطة', date: '28 آب 2026' },
  { id: 'aid-2', title: 'توزيع مستلزمات النظافة', type: 'صحة', families: 84, status: 'نشطة', date: '26 آب 2026' },
  { id: 'aid-3', title: 'دفعة الأغطية الصيفية', type: 'إيواء', families: 63, status: 'مكتملة', date: '22 آب 2026' },
];
const initialPeople: Person[] = [
  { id: 'p-1', name: 'محمود الحسن', role: 'مندوب', phone: '0599 123 456', location: 'المربع أ' },
  { id: 'p-2', name: 'أمينة سالم', role: 'نازح', phone: '0598 221 184', location: 'الخيمة 42' },
  { id: 'p-3', name: 'سامي منصور', role: 'حارس', phone: '0597 315 009', location: 'البوابة الشمالية' },
  { id: 'p-4', name: 'ليلى أحمد', role: 'نازح', phone: '0598 114 730', location: 'الخيمة 18' },
];

type AppValue = {
  signedIn: boolean;
  aids: Aid[];
  people: Person[];
  signIn: () => void;
  signOut: () => void;
  addAid: (title: string, type: string) => void;
  addPerson: (name: string, role: Person['role'], phone: string) => void;
};

const AppContext = createContext<AppValue | null>(null);
const STORAGE_KEY = 'al-aqsa-mobile-state-v1';

export function AppProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [aids, setAids] = useState<Aid[]>(initialAids);
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const data = JSON.parse(raw) as { signedIn?: boolean; aids?: Aid[]; people?: Person[] };
        setSignedIn(data.signedIn ?? false);
        setAids(data.aids ?? initialAids);
        setPeople(data.people ?? initialPeople);
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ signedIn, aids, people }));
  }, [aids, hydrated, people, signedIn]);

  const value = useMemo<AppValue>(() => ({
    signedIn,
    aids,
    people,
    signIn: () => setSignedIn(true),
    signOut: () => setSignedIn(false),
    addAid: (title, type) => setAids((current) => [{
      id: Date.now().toString(),
      title,
      type,
      families: 0,
      status: 'نشطة',
      date: 'اليوم',
    }, ...current]),
    addPerson: (name, role, phone) => setPeople((current) => [{
      id: Date.now().toString(),
      name,
      role,
      phone,
      location: 'بانتظار التحديد',
    }, ...current]),
  }), [aids, people, signedIn]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used within AppProvider');
  return value;
}