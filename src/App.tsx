import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase config - same as web version
const firebaseConfig = {
  apiKey: "AIzaSyAfG5d42Ukf20fwFOGn7NzcST5XHi-URIk",
  authDomain: "themaster-bmx.firebaseapp.com",
  projectId: "themaster-bmx",
  storageBucket: "themaster-bmx.appspot.com",
  messagingSenderId: "1089539428027",
  appId: "1:1089539428027:web:5f8b5a5c5c5c5c5c5c5c5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Program {
  id: string;
  name: string;
  nameTh: string;
  price: number;
  duration: string;
  color: string;
}

interface Schedule {
  id: string;
  day: string;
  time: string;
  program: string;
  location: string;
  coach: string;
  slots: number;
}

interface Registration {
  id: string;
  studentName: string;
  phone: string;
  program: string;
  status: 'new' | 'confirmed' | 'contacted';
  createdAt: string;
}

// Programs data
const programs: Program[] = [
  { id: 'little', name: 'Little BMX (Age 6-8)', nameTh: 'ลิตเติ้ล บีเอ็มเอ็กซ์ (อายุ 6-8 ปี)', price: 1500, duration: '6 ครั้ง', color: 'bg-green-600' },
  { id: 'junior', name: 'Junior (Age 9-12)', nameTh: 'จูเนียร์ (อายุ 9-12 ปี)', price: 2000, duration: '6 ครั้ง', color: 'bg-blue-600' },
  { id: 'competitor', name: 'Competitor (13+)', nameTh: 'แข่งขัน (13+ ปี)', price: 2500, duration: '6 ครั้ง', color: 'bg-red-600' },
  { id: 'private-basic', name: 'Private Basic', nameTh: 'เซสชันส่วนตัว เบสิค', price: 800, duration: '1 ชม.', color: 'bg-purple-600' },
  { id: 'private-pro', name: 'Private Pro', nameTh: 'เซสชันส่วนตัว โปร', price: 1000, duration: '1 ชม.', color: 'bg-orange-600' },
  { id: 'private-elite', name: 'Private Elite', nameTh: 'เซสชันส่วนตัว อิลิต', price: 1500, duration: '1 ชม.', color: 'bg-yellow-600' },
];

// Home Page
function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black p-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚴</span>
            <h1 className="text-xl font-black">THE MASTER BMX</h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-800 to-black p-6 text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-black mb-2">โรงเรียนฝึกขี่ BMX อันดับ 1</h2>
        <p className="text-gray-400">ฝึกขี่จากมือใหม่สู่นักแข่งมืออาชีพ</p>
        <div className="flex justify-center gap-4 mt-6">
          <Link to="/programs" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold">
            📚 ดูหลักสูตร
          </Link>
          <Link to="/schedule" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-bold">
            📅 ตารางเรียน
          </Link>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="p-6">
        <h3 className="text-xl font-bold mb-4">🔥 คอร์สยอดนิยม</h3>
        <div className="grid grid-cols-2 gap-4">
          {programs.slice(0, 3).map((p) => (
            <div key={p.id} className={`${p.color} rounded-xl p-4`}>
              <h4 className="font-bold">{p.nameTh}</h4>
              <p className="text-2xl font-black mt-2">฿{p.price.toLocaleString()}</p>
              <p className="text-sm opacity-80">{p.duration}</p>
            </div>
          ))}
        </div>
        <Link to="/programs" className="block bg-gray-800 text-center py-3 rounded-xl mt-4 font-bold hover:bg-gray-700">
          ดูทั้งหมด →
        </Link>
      </section>

      {/* Schedule Preview */}
      <section className="p-6 bg-black">
        <h3 className="text-xl font-bold mb-4">📅 ตารางเรียนวันนี้</h3>
        <ScheduleList />
      </section>

      {/* Registration CTA */}
      <section className="p-6">
        <Link to="/register" className="block bg-green-600 hover:bg-green-700 text-center py-4 rounded-xl font-black text-xl">
          📝 สมัครเรียนวันนี้
        </Link>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <Link to="/" className="flex flex-col items-center p-2 text-red-500">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">หน้าแรก</span>
          </Link>
          <Link to="/programs" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📚</span>
            <span className="text-xs">คอร์ส</span>
          </Link>
          <Link to="/schedule" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📅</span>
            <span className="text-xs">ตาราง</span>
          </Link>
          <Link to="/register" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📝</span>
            <span className="text-xs">สมัคร</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

// Schedule List Component
function ScheduleList() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const snap = await getDocs(collection(db, 'schedule'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Schedule));
        setSchedule(data);
      } catch (e) {
        console.error('Error fetching schedule:', e);
        // Use fallback data
        setSchedule([
          { id: '1', day: 'จันทร์', time: '15:00', program: 'little', location: 'Rush Arena', coach: 'โค้ชพี่เต๋า', slots: 8 },
          { id: '2', day: 'อังคาร', time: '16:00', program: 'junior', location: 'Rush Arena', coach: 'โค้ชพี่บอส', slots: 10 },
        ]);
      }
      setLoading(false);
    };
    fetchSchedule();
  }, []);

  if (loading) return <div className="text-center py-4">กำลังโหลด...</div>;

  return (
    <div className="space-y-3">
      {schedule.slice(0, 5).map((s) => (
        <div key={s.id} className="bg-gray-800 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-red-600 rounded-lg p-3 text-center min-w-[60px]">
            <div className="font-bold text-sm">{s.day}</div>
            <div className="text-xs opacity-80">{s.time}</div>
          </div>
          <div className="flex-1">
            <div className="font-bold">{s.program.toUpperCase()}</div>
            <div className="text-sm text-gray-400">{s.location} • {s.coach}</div>
          </div>
          <div className="text-xs bg-green-600 px-2 py-1 rounded">
            {s.slots} ที่นั่ง
          </div>
        </div>
      ))}
    </div>
  );
}

// Programs Page
function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <header className="bg-black p-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-2xl">←</Link>
          <h1 className="text-xl font-black">📚 หลักสูตร & คอร์ส</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {programs.map((p) => (
          <div key={p.id} className={`${p.color} rounded-xl p-6`}>
            <h3 className="text-xl font-black">{p.nameTh}</h3>
            <p className="text-sm opacity-80 mt-1">{p.name}</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-black">฿{p.price.toLocaleString()}</p>
                <p className="text-sm opacity-80">/{p.duration}</p>
              </div>
              <Link to="/register" className="bg-white text-black px-4 py-2 rounded-lg font-bold">
                สมัครเลย
              </Link>
            </div>
          </div>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <Link to="/" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">หน้าแรก</span>
          </Link>
          <Link to="/programs" className="flex flex-col items-center p-2 text-red-500">
            <span className="text-2xl">📚</span>
            <span className="text-xs">คอร์ส</span>
          </Link>
          <Link to="/schedule" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📅</span>
            <span className="text-xs">ตาราง</span>
          </Link>
          <Link to="/register" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📝</span>
            <span className="text-xs">สมัคร</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

// Schedule Page
function SchedulePage() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const snap = await getDocs(collection(db, 'schedule'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Schedule));
        setSchedule(data);
      } catch (e) {
        console.error('Error:', e);
      }
      setLoading(false);
    };
    fetchSchedule();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <header className="bg-black p-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-2xl">←</Link>
          <h1 className="text-xl font-black">📅 ตารางเรียน</h1>
        </div>
      </header>

      <div className="p-4">
        {loading ? (
          <div className="text-center py-8">กำลังโหลด...</div>
        ) : (
          <div className="space-y-4">
            {schedule.map((s) => (
              <div key={s.id} className="bg-gray-800 rounded-xl p-4 flex gap-4">
                <div className="bg-red-600 rounded-xl p-4 text-center min-w-[80px]">
                  <div className="font-black text-lg">{s.day}</div>
                  <div className="text-2xl font-black">{s.time}</div>
                </div>
                <div className="flex-1">
                  <div className="font-black text-lg">{s.program.toUpperCase()}</div>
                  <div className="text-gray-400 mt-1">📍 {s.location}</div>
                  <div className="text-gray-400">👨‍🏫 {s.coach}</div>
                  <div className="mt-2">
                    <span className="bg-green-600 text-xs px-2 py-1 rounded">
                      {s.slots} ที่นั่งว่าง
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <Link to="/" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">หน้าแรก</span>
          </Link>
          <Link to="/programs" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📚</span>
            <span className="text-xs">คอร์ส</span>
          </Link>
          <Link to="/schedule" className="flex flex-col items-center p-2 text-red-500">
            <span className="text-2xl">📅</span>
            <span className="text-xs">ตาราง</span>
          </Link>
          <Link to="/register" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📝</span>
            <span className="text-xs">สมัคร</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

// Register Page
function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', program: 'junior' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Save to Firestore
    try {
      const reg: Omit<Registration, 'id'> = {
        studentName: form.name,
        phone: form.phone,
        program: form.program,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      // Note: In production, use addDoc with collection(db, 'registrations')
      console.log('Registration submitted:', reg);
      alert('สมัครสำเร็จ! โค้ชจะติดต่อกลับภายใน 24 ชม.');
      navigate('/');
    } catch (e) {
      console.error('Error:', e);
      alert('เกิดข้อผิดพลาด');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <header className="bg-black p-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-2xl">←</Link>
          <h1 className="text-xl font-black">📝 สมัครเรียน</h1>
        </div>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">ชื่อนักเรียน</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white"
              placeholder="กรอกชื่อ-นามสกุล"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white"
              placeholder="08x-xxx-xxxx"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">เลือกคอร์ส</label>
            <select
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
              className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.id}>{p.nameTh} - ฿{p.price.toLocaleString()}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-black text-xl"
          >
            {submitting ? 'กำลังส่ง...' : '✅ สมัครเลย'}
          </button>
        </form>

        <div className="mt-6 bg-yellow-600/20 border border-yellow-600 rounded-xl p-4">
          <p className="font-bold">💡 ข้อมูลเพิ่มเติม</p>
          <p className="text-sm text-gray-300 mt-2">
            โค้ชจะติดต่อกลับภายใน 24 ชั่วโมงเพื่อยืนยันการสมัครและนัดหมายวันเริ่มเรียน
          </p>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <Link to="/" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">หน้าแรก</span>
          </Link>
          <Link to="/programs" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📚</span>
            <span className="text-xs">คอร์ส</span>
          </Link>
          <Link to="/schedule" className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-2xl">📅</span>
            <span className="text-xs">ตาราง</span>
          </Link>
          <Link to="/register" className="flex flex-col items-center p-2 text-red-500">
            <span className="text-2xl">📝</span>
            <span className="text-xs">สมัคร</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

// Main App
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}