import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAfG5d42Ukf20fwFOGn7NzcST5XHi-URIk",
  authDomain: "themaster-bmx.firebaseapp.com",
  projectId: "themaster-bmx",
  storageBucket: "themaster-bmx.appspot.com",
  messagingSenderId: "1089539428027",
  appId: "1:1089539428027:web:5f8b5a5c5c5c5c5c5c5c5c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Program {
  id: string;
  name: string;
  nameTh: string;
  price: number;
  duration: string;
  gradient: string;
  icon: string;
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

const programs: Program[] = [
  { id: 'little', name: 'Little BMX', nameTh: 'ลิตเติ้ล บีเอ็มเอ็กซ์ (6-8 ปี)', price: 1500, duration: '6 ครั้ง', gradient: 'from-emerald-500 to-teal-600', icon: '🚴' },
  { id: 'junior', name: 'Junior', nameTh: 'จูเนียร์ (9-12 ปี)', price: 2000, duration: '6 ครั้ง', gradient: 'from-blue-500 to-indigo-600', icon: '🏆' },
  { id: 'competitor', name: 'Competitor', nameTh: 'แข่งขัน (13+ ปี)', price: 2500, duration: '6 ครั้ง', gradient: 'from-red-500 to-rose-600', icon: '⚡' },
  { id: 'private-basic', name: 'Private Basic', nameTh: 'เซสชันส่วนตัว เบสิค', price: 800, duration: '1 ชม.', gradient: 'from-purple-500 to-violet-600', icon: '🎯' },
  { id: 'private-pro', name: 'Private Pro', nameTh: 'เซสชันส่วนตัว โปร', price: 1000, duration: '1 ชม.', gradient: 'from-orange-500 to-amber-600', icon: '🔥' },
  { id: 'private-elite', name: 'Private Elite', nameTh: 'เซสชันส่วนตัว อิลิต', price: 1500, duration: '1 ชม.', gradient: 'from-yellow-500 to-amber-500', icon: '💎' },
];

const locations = {
  rush: { name: 'Rush Arena', emoji: '🏟️' },
  bang: { name: 'Bang Sare', emoji: '🌴' },
  pattaya: { name: 'Pattaya', emoji: '🏖️' }
};

// Premium Header
function PremiumHeader({ title, emoji }: { title: string; emoji: string }) {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-red-500/30">
            {emoji}
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight">{title}</h1>
            <p className="text-xs text-gray-400">The Master BMX School</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Premium Card
function PremiumCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );
}

// Program Card
function ProgramCard({ program }: { program: Program }) {
  return (
    <Link to="/register" state={{ program: program.id }} className="block">
      <PremiumCard className="overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10">
        <div className={`bg-gradient-to-r ${program.gradient} p-5`}>
          <div className="flex items-start justify-between">
            <div className="text-4xl">{program.icon}</div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white">
              {program.duration}
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-black mb-1">{program.nameTh}</h3>
          <p className="text-sm text-gray-400 mb-4">{program.name}</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-black text-white">฿{program.price.toLocaleString()}</p>
              <p className="text-xs text-gray-500">/ คอร์ส</p>
            </div>
            <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl text-sm font-bold">
              สมัครเลย →
            </div>
          </div>
        </div>
      </PremiumCard>
    </Link>
  );
}

// Home Page
function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-red-400">เปิดรับสมัครแล้ววันนี้!</span>
          </div>
          
          <div className="text-7xl mb-6 animate-bounce">🏆</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            THE MASTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">BMX</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">โรงเรียนฝึกขี่จักรยาน BMX อันดับ 1 ในประเทศไทย</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/programs')}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-500/30 hover:scale-105 transition-all"
            >
              📚 เลือกคอร์ส
            </button>
            <button 
              onClick={() => navigate('/schedule')}
              className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all"
            >
              📅 ดูตารางเรียน
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: '👨‍🎓', value: '500+', label: 'นักเรียน' },
            { emoji: '🏅', value: '50+', label: 'เหรียญรางวัล' },
            { emoji: '⭐', value: '4.9', label: 'คะแนนรีวิว' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center hover:scale-105 transition-all">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Programs Preview */}
      <div className="max-w-4xl mx-auto px-4 mt-12 pb-32">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">🔥 คอร์สยอดนิยม</h2>
          <button onClick={() => navigate('/programs')} className="text-red-400 font-bold text-sm hover:text-red-300">
            ดูทั้งหมด →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.slice(0, 4).map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 p-3 z-50">
        <div className="max-w-4xl mx-auto flex justify-around">
          {[
            { path: '/', icon: '🏠', label: 'หน้าแรก', active: true },
            { path: '/programs', icon: '📚', label: 'คอร์ส', active: false },
            { path: '/schedule', icon: '📅', label: 'ตาราง', active: false },
            { path: '/register', icon: '📝', label: 'สมัคร', active: false },
          ].map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                item.active 
                  ? 'text-red-500 bg-red-500/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

// Programs Page
function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      <PremiumHeader title="📚 หลักสูตรทั้งหมด" emoji="📚" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2">เลือกคอร์สที่ใช่</h2>
          <p className="text-gray-400">ทุกคอร์สออกแบบมาเพื่อพัฒนาทักษะการขี่ BMX ของคุณ</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 p-3 z-50">
        <div className="max-w-4xl mx-auto flex justify-around">
          {[
            { path: '/', icon: '🏠', label: 'หน้าแรก' },
            { path: '/programs', icon: '📚', label: 'คอร์ส', active: true },
            { path: '/schedule', icon: '📅', label: 'ตาราง' },
            { path: '/register', icon: '📝', label: 'สมัคร' },
          ].map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                (item as any).active 
                  ? 'text-red-500 bg-red-500/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

// Schedule Page
function SchedulePage() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const snap = await getDocs(collection(db, 'schedule'));
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Schedule));
        setSchedule(data);
      } catch (e) {
        setSchedule([
          { id: '1', day: 'จันทร์', time: '15:00', program: 'little', location: 'rush', coach: 'โค้ชพี่เต๋า', slots: 8 },
          { id: '2', day: 'อังคาร', time: '16:00', program: 'junior', location: 'rush', coach: 'โค้ชพี่บอส', slots: 10 },
          { id: '3', day: 'พุธ', time: '17:00', program: 'competitor', location: 'bang', coach: 'โค้ชพี่เต๋า', slots: 6 },
          { id: '4', day: 'พฤหัส', time: '15:00', program: 'little', location: 'rush', coach: 'โค้ชพี่บอส', slots: 8 },
          { id: '5', day: 'ศุกร์', time: '18:00', program: 'competitor', location: 'rush', coach: 'โค้ชพี่เต๋า', slots: 12 },
          { id: '6', day: 'เสาร์', time: '10:00', program: 'junior', location: 'bang', coach: 'โค้ชพี่บอส', slots: 10 },
          { id: '7', day: 'อาทิตย์', time: '09:00', program: 'competitor', location: 'pattaya', coach: 'โค้ชพี่เต๋า', slots: 8 },
        ]);
      }
      setLoading(false);
    };
    fetchSchedule();
  }, []);

  const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
  const filteredSchedule = selectedDay 
    ? schedule.filter(s => s.day === selectedDay)
    : schedule;

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      <PremiumHeader title="📅 ตารางเรียน" emoji="📅" />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Day Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setSelectedDay(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              selectedDay === null 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            ทั้งหมด
          </button>
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                selectedDay === day 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400">กำลังโหลด...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSchedule.map((s, i) => {
              const loc = locations[s.location as keyof typeof locations] || { name: s.location, emoji: '📍' };
              const program = programs.find(p => p.id === s.program);
              return (
                <div 
                  key={s.id} 
                  className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:scale-[1.01] transition-all"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program?.gradient || 'from-gray-600 to-gray-700'} flex flex-col items-center justify-center shadow-lg`}>
                      <div className="text-sm font-black">{s.day}</div>
                      <div className="text-xl font-black">{s.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{program?.icon || '🏃'}</span>
                        <h3 className="text-lg font-black">{s.program.toUpperCase()}</h3>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <span>{loc.emoji}</span>
                          {loc.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>👨‍🏫</span>
                          {s.coach}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-black ${s.slots > 5 ? 'text-green-400' : s.slots > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {s.slots}
                      </div>
                      <div className="text-xs text-gray-500">ที่นั่งว่าง</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 p-3 z-50">
        <div className="max-w-4xl mx-auto flex justify-around">
          {[
            { path: '/', icon: '🏠', label: 'หน้าแรก' },
            { path: '/programs', icon: '📚', label: 'คอร์ส' },
            { path: '/schedule', icon: '📅', label: 'ตาราง', active: true },
            { path: '/register', icon: '📝', label: 'สมัคร' },
          ].map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                (item as any).active 
                  ? 'text-red-500 bg-red-500/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold mt-1">{item.label}</span>
            </Link>
          ))}
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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      setTimeout(() => navigate('/'), 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-3xl font-black mb-4">สมัครสำเร็จ!</h2>
          <p className="text-gray-400 mb-8">โค้ชจะติดต่อกลับภายใน 24 ชม.</p>
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      <PremiumHeader title="📝 สมัครเรียน" emoji="📝" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🚴</div>
          <h2 className="text-2xl font-black mb-2">เริ่มต้นการเดินทาง BMX ของคุณ</h2>
          <p className="text-gray-400">กรอกข้อมูลด้านล่างแล้วโค้ชจะติดต่อกลับ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <label className="block text-sm font-bold text-gray-300 mb-3">🏷️ คอร์สที่สนใจ</label>
            <div className="grid grid-cols-2 gap-3">
              {programs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setForm({ ...form, program: p.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    form.program === p.id 
                      ? 'border-red-500 bg-red-500/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{p.icon}</div>
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-xs text-gray-400">฿{p.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <label className="block text-sm font-bold text-gray-300 mb-3">👤 ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="กรอกชื่อ-นามสกุล"
              required
            />
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <label className="block text-sm font-bold text-gray-300 mb-3">📱 เบอร์โทรศัพท์</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="08x-xxx-xxxx"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 py-5 rounded-2xl font-black text-xl shadow-xl shadow-red-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                กำลังส่ง...
              </>
            ) : (
              <>🎯 สมัครเลย</>
            )}
          </button>
        </form>

        <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center">
          <p className="text-green-400 font-bold mb-2">✨ รับประกันความพึงพอใจ</p>
          <p className="text-sm text-gray-400">ถ้าไม่ถูกใจ สามารถขอยกเลิกได้ภายใน 7 วัน</p>
        </div>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 p-3 z-50">
        <div className="max-w-4xl mx-auto flex justify-around">
          {[
            { path: '/', icon: '🏠', label: 'หน้าแรก' },
            { path: '/programs', icon: '📚', label: 'คอร์ส' },
            { path: '/schedule', icon: '📅', label: 'ตาราง' },
            { path: '/register', icon: '📝', label: 'สมัคร', active: true },
          ].map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                (item as any).active 
                  ? 'text-red-500 bg-red-500/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-bold mt-1">{item.label}</span>
            </Link>
          ))}
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