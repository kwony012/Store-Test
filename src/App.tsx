/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  ShoppingBag, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Share, 
  Store, 
  Compass, 
  User, 
  Home as HomeIcon,
  QrCode,
  Map as MapIcon,
  CalendarCheck,
  Layers,
  Hourglass,
  Archive,
  Smile,
  Megaphone,
  MessageCircle,
  HelpCircle,
  Settings,
  Mountain,
  ListChecks,
  Timer,
  Users,
  Facebook,
  Instagram,
  X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type View = "home" | "detail" | "login";

// --- Components ---

const TopAppBar = ({ 
  title, 
  onMenuClick, 
  onBackClick, 
  showBack = false,
  showMenu = true,
  showShare = false
}: { 
  title: string; 
  onMenuClick?: () => void; 
  onBackClick?: () => void;
  showBack?: boolean;
  showMenu?: boolean;
  showShare?: boolean;
}) => (
  <header className="fixed top-0 left-0 w-full h-16 bg-surface/80 backdrop-blur-xl z-50 flex items-center justify-between px-6">
    <div className="flex items-center gap-4">
      {showBack ? (
        <button onClick={onBackClick} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </button>
      ) : showMenu ? (
        <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <Menu className="w-6 h-6 text-primary" />
        </button>
      ) : <div className="w-10" />}
    </div>
    <h1 className="text-xl font-black text-on-surface tracking-tighter font-display">
      {title}
    </h1>
    <div className="flex items-center gap-2">
      {showShare ? (
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <Share className="w-6 h-6 text-primary" />
        </button>
      ) : (
        <button className="bg-primary-container text-on-primary-fixed px-5 py-2 rounded-full text-sm font-bold scale-95 active:scale-90 transition-transform">
          Login
        </button>
      )}
    </div>
  </header>
);

const BottomNavBar = ({ activeView, onViewChange }: { activeView: View; onViewChange: (v: View) => void }) => (
  <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/80 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-10px_40px_rgba(46,47,43,0.05)]">
    <button 
      onClick={() => onViewChange("home")}
      className={cn(
        "flex flex-col items-center justify-center px-5 py-1.5 rounded-full transition-all",
        activeView === "home" ? "bg-primary-container text-on-primary-fixed" : "text-on-surface-variant"
      )}
    >
      <HomeIcon className="w-6 h-6" />
      <span className="text-[11px] font-medium mt-0.5">Home</span>
    </button>
    <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5">
      <Store className="w-6 h-6" />
      <span className="text-[11px] font-medium mt-0.5">Store</span>
    </button>
    <button className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5">
      <Compass className="w-6 h-6" />
      <span className="text-[11px] font-medium mt-0.5">Activity</span>
    </button>
    <button 
      onClick={() => onViewChange("login")}
      className={cn(
        "flex flex-col items-center justify-center px-5 py-1.5 rounded-full transition-all",
        activeView === "login" ? "bg-primary-container text-on-primary-fixed" : "text-on-surface-variant"
      )}
    >
      <User className="w-6 h-6" />
      <span className="text-[11px] font-medium mt-0.5">Profile</span>
    </button>
  </nav>
);

const Drawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-[2px] z-[60]"
        />
        <motion.aside 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 left-0 z-[70] w-4/5 max-w-sm bg-white/90 backdrop-blur-xl rounded-r-[3rem] h-full shadow-2xl flex flex-col pt-12 pb-8"
        >
          <div className="px-6 mb-8">
            <div className="grid grid-cols-3 gap-3">
              <button className="bg-primary-container text-on-primary-fixed flex flex-col items-center justify-center py-4 rounded-2xl gap-2 shadow-sm">
                <QrCode className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase">My QR</span>
              </button>
              <button className="bg-surface-container-high/50 text-on-surface-variant flex flex-col items-center justify-center py-4 rounded-2xl gap-2">
                <MapIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase text-center">Draw Tour</span>
              </button>
              <button className="bg-surface-container-high/50 text-on-surface-variant flex flex-col items-center justify-center py-4 rounded-2xl gap-2">
                <CalendarCheck className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase text-center leading-none">예약/응모</span>
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 space-y-1">
            {[
              { icon: Layers, label: "Program" },
              { icon: MapPin, label: "성수 AGITIO" },
              { icon: Hourglass, label: "Waiting" },
              { icon: Archive, label: "짐 보관" },
            ].map((item) => (
              <button key={item.label} className="w-full text-on-surface-variant font-medium px-6 py-3.5 flex items-center gap-4 hover:bg-surface-container-low transition-colors rounded-full">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="h-px mx-6 my-4 bg-outline-variant/20" />
            {[
              { icon: Smile, label: "만족도 / 설문 조사" },
              { icon: Megaphone, label: "공지사항" },
              { icon: MessageCircle, label: "1:1 문의" },
              { icon: HelpCircle, label: "자주 묻는 질문" },
              { icon: Settings, label: "설정" },
            ].map((item) => (
              <button key={item.label} className="w-full text-on-surface-variant font-medium px-6 py-3.5 flex items-center gap-4 hover:bg-surface-container-low transition-colors rounded-full">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="px-6 mt-4">
            <button className="w-full py-4 bg-surface-container-low text-on-surface-variant font-bold rounded-full text-sm border border-outline-variant/10">
              LOGOUT
            </button>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-8 -right-16 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

// --- Views ---

const HomeView = ({ onDetailClick }: { onDetailClick: () => void }) => {
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  return (
    <div className="pt-24 pb-32 px-6 max-w-screen-xl mx-auto">
      {/* Greeting */}
      <section className="mb-12">
        <span className="inline-block px-4 py-1.5 bg-primary-container/20 text-primary font-bold rounded-full text-xs mb-4 tracking-wider uppercase">Flagship Store</span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1.1] text-on-surface mb-4 font-display">
          새로운 가능성이<br />시작되는 곳, <span className="text-primary">아지티오</span>
        </h2>
        <p className="text-on-surface-variant text-lg max-w-lg leading-relaxed font-medium">
          취향을 발견하고 일상을 확장하는<br />MZ세대를 위한 새로운 감각의 복합문화공간.
        </p>
      </section>

      {/* Bento Hero */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <div className="md:col-span-8 relative group overflow-hidden rounded-xl h-[400px]">
          <img 
            alt="Main Event" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src="https://picsum.photos/seed/agitio-main/1200/800"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-primary-container font-bold mb-2">Grand Opening Event</p>
            <h3 className="text-3xl font-extrabold mb-4 leading-tight font-display">오직 당신만을 위한<br />프라이빗 커뮤니티 데이</h3>
            <div className="flex gap-2">
              <div className="h-1.5 w-12 bg-primary-container rounded-full" />
              <div className="h-1.5 w-1.5 bg-white/40 rounded-full" />
              <div className="h-1.5 w-1.5 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
        <div className="md:col-span-4 grid grid-rows-2 gap-6">
          <div className="bg-primary-container rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-2xl font-black text-on-primary-fixed mb-2 font-display">Membership</h4>
              <p className="text-on-primary-fixed/80 font-medium">프리미엄 멤버십 가입하고<br />라운지 무제한 이용하기</p>
            </div>
            <Plus className="w-16 h-16 absolute -right-4 -bottom-4 text-on-primary-fixed/10 group-hover:scale-110 transition-transform" />
          </div>
          <div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-between relative group overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-2xl font-black text-on-surface mb-2 font-display">Pop-up Store</h4>
              <p className="text-on-surface-variant font-medium">이번 달의 라이징 브랜드<br />'Studio O'를 만나보세요</p>
            </div>
            <Store className="w-16 h-16 absolute -right-4 -bottom-4 text-on-surface/5 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="mb-20">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight mb-2 font-display">Program</h3>
            <p className="text-on-surface-variant leading-relaxed">아지티오의 다양한 프로그램에 참여해보세요.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 hover:opacity-70 transition-opacity pt-1">
            전체보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-extrabold font-display">2024. 11</span>
              <div className="flex gap-4">
                <ChevronLeft className="w-6 h-6 cursor-pointer text-on-surface-variant" />
                <ChevronRight className="w-6 h-6 cursor-pointer text-on-surface-variant" />
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center text-sm mb-2">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <div key={d} className={cn("font-bold", d === 'SUN' ? "text-red-500" : "text-on-surface-variant")}>{d}</div>
              ))}
              <div className="py-2 font-medium text-red-500">4</div>
              <div className="py-2 font-medium">5</div>
              <div className="py-2 relative flex justify-center items-center">
                <span className="z-10 font-bold text-on-primary-fixed">6</span>
                <div className="absolute inset-0 bg-primary-container rounded-full w-9 h-9 mx-auto" />
              </div>
              <div className="py-2 font-medium">7</div>
              <div className="py-2 font-medium">8</div>
              <div className="py-2 font-medium">9</div>
              <div className="py-2 font-medium">10</div>
            </div>
            <motion.div 
              initial={false}
              animate={{ height: isCalendarExpanded ? "auto" : 0, opacity: isCalendarExpanded ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-7 gap-y-4 text-center text-sm border-t border-outline-variant/10 pt-4">
                {Array.from({ length: 21 }).map((_, i) => (
                  <div key={i} className="py-2 font-medium text-on-surface-variant/40">{11 + i}</div>
                ))}
              </div>
            </motion.div>
            <button 
              onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
              className="flex justify-center items-center w-full pt-2 group"
            >
              <div className="bg-surface-container-low p-1 rounded-full group-hover:bg-primary-container/20 transition-colors">
                <motion.div animate={{ rotate: isCalendarExpanded ? 180 : 0 }}>
                  <ChevronLeft className="w-5 h-5 -rotate-90 text-on-surface-variant" />
                </motion.div>
              </div>
            </button>
          </div>

          {/* Program List */}
          <div className="lg:col-span-7 space-y-4">
            {[
              { title: "Morning Flow Yoga", time: "08:30 - 09:30", img: "yoga" },
              { title: "Startup Founder Talk", time: "14:00 - 15:30", img: "talk" },
              { title: "Acoustic Night Live", time: "19:30 - 21:00", img: "music" },
            ].map((item) => (
              <button 
                key={item.title} 
                onClick={onDetailClick}
                className="w-full group bg-surface-container-low hover:bg-surface-container-high transition-colors p-4 rounded-xl flex items-center justify-between text-left"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img alt={item.title} className="w-full h-full object-cover" src={`https://picsum.photos/seed/${item.img}/200/200`} referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {item.time}
                    </p>
                  </div>
                </div>
                <div className="bg-primary-container text-on-primary-fixed w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-6 h-6" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Space Guide */}
      <section className="mb-20">
        <h3 className="text-3xl font-extrabold tracking-tight mb-8 font-display">Space Guide</h3>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
          {[
            { title: "1F Discover Hub", img: "space1" },
            { title: "2F Creative Atelier", img: "space2", active: true },
            { title: "3F Mindful Roof", img: "space3" },
          ].map((space) => (
            <div key={space.title} className="flex-shrink-0 w-64">
              <div className={cn(
                "aspect-[4/3] rounded-2xl overflow-hidden mb-3",
                space.active && "border-4 border-primary"
              )}>
                <img alt={space.title} className="w-full h-full object-cover" src={`https://picsum.photos/seed/${space.img}/400/300`} referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-lg font-bold text-center">{space.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Notice */}
      <section className="mb-20">
        <div className="bg-surface-container-low rounded-xl p-10">
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-6">
            <h3 className="text-2xl font-extrabold tracking-tight font-display">Notice</h3>
            <button className="text-primary font-bold text-sm">See all</button>
          </div>
          <ul className="space-y-6">
            {[
              { tag: "Update", title: "아지티오 모바일 앱 정식 출시 안내", date: "2024.11.01" },
              { tag: "Policy", title: "이용 약관 및 개인정보 처리방침 변경 공지", date: "2024.10.28" },
              { tag: "Event", title: "11월 신규 가입자 웰컴 키트 증정 이벤트", date: "2024.10.25" },
            ].map((notice) => (
              <li key={notice.title} className="flex flex-col md:flex-row md:items-center justify-between group cursor-pointer gap-2">
                <div className="flex gap-4 items-center">
                  <span className="px-3 py-1 bg-surface-container-highest rounded-full text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{notice.tag}</span>
                  <span className="font-bold text-lg group-hover:text-primary transition-colors">{notice.title}</span>
                </div>
                <span className="text-on-surface-variant text-sm font-medium">{notice.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col gap-8 text-left border-t border-outline-variant/10 pt-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <p className="text-xs leading-relaxed text-on-surface-variant max-w-md">
              Company: 엠더블유케이 (주) | CEO: 김문규 | Reg No: 123-45-67890 | Address: 서울 구로구 디지털로 26길 123 지플러스타워 1108호
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs font-bold text-primary underline">Customer Center: 02.554.7496</a>
              <a href="#" className="text-xs text-on-surface-variant">Terms of Service</a>
              <a href="#" className="text-xs text-on-surface-variant">Privacy Policy</a>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-fixed transition-all">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-fixed transition-all">
              <Instagram className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-fixed transition-all">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-xs text-on-surface-variant/60 pb-12">© 2024 AGITIO Flagship Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const ProgramDetailView = ({ onBack }: { onBack: () => void }) => (
  <div className="pt-20 pb-32">
    <section className="px-4 mb-8">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-surface-container-low">
        <img 
          alt="Morning Flow Yoga" 
          className="w-full h-full object-cover" 
          src="https://picsum.photos/seed/yoga-detail/800/1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="px-4 py-1.5 bg-primary-container text-on-primary-fixed text-[11px] font-bold uppercase tracking-widest rounded-full mb-2 inline-block">Wellness Workshop</span>
          <h2 className="text-white text-3xl font-black tracking-tight font-display">Morning Flow &<br />Signature Scent</h2>
        </div>
      </div>
    </section>

    <section className="px-6 space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
            <CalendarCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Date</p>
            <p className="text-base font-bold text-on-surface">2024.11.27 (Wed)</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Time</p>
            <p className="text-base font-bold text-on-surface">08:00 AM — 10:30 AM</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Location</p>
            <p className="text-base font-bold text-on-surface">3F Rooftop Garden, AGITIO Flagship</p>
          </div>
        </div>
      </div>

      <div className="h-[2px] w-12 bg-primary-container" />
      
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-on-surface-variant font-medium italic">
          Begin your day with an intentional breath. Our "Morning Flow" session is designed to awaken your senses amidst the urban greenery of our rooftop sanctuary.
        </p>
        <p className="text-on-surface-variant leading-relaxed">
          Following the yoga flow, immerse yourself in a curated olfactory journey where you'll blend your own Signature Scent inspired by the morning dew and golden sun. This exclusive workshop combines physical mindfulness with creative expression.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-surface-container-lowest p-6 rounded-lg flex flex-col gap-3 shadow-sm border border-outline-variant/10">
          <ListChecks className="w-6 h-6 text-primary" />
          <p className="text-sm font-bold text-on-surface">Requirements</p>
          <p className="text-xs text-on-surface-variant leading-relaxed">Comfortable athletic wear recommended. Yoga mats and essential oils provided by AGITIO.</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-lg flex flex-col gap-3 shadow-sm border border-outline-variant/10">
          <Timer className="w-6 h-6 text-primary" />
          <p className="text-sm font-bold text-on-surface">Duration</p>
          <p className="text-xs text-on-surface-variant">150 Minutes</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-lg flex flex-col gap-3 shadow-sm border border-outline-variant/10">
          <Users className="w-6 h-6 text-primary" />
          <p className="text-sm font-bold text-on-surface">Capacity</p>
          <p className="text-xs text-on-surface-variant">Max 12 People</p>
        </div>
      </div>
    </section>

    <div className="fixed bottom-24 left-0 w-full px-6 z-40">
      <button className="w-full bg-primary-container text-on-primary-fixed py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all">
        Reserve Now
      </button>
    </div>
  </div>
);

const LoginView = () => (
  <div className="pt-28 pb-12 px-8 flex-1 flex flex-col max-w-md mx-auto min-h-screen">
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-on-background tracking-tight leading-tight mb-4 font-display">
        반가워요!<br />
        <span className="text-primary">아지티오</span>에서 당신만의 여정을 시작해보세요.
      </h2>
      <div className="w-16 h-1.5 bg-primary-container rounded-full" />
    </section>

    <div className="relative w-full h-48 mb-12 rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center">
      <img 
        alt="Abstract path" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30" 
        src="https://picsum.photos/seed/path/600/400"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-10 text-center">
        <Mountain className="w-12 h-12 text-primary mx-auto mb-2" />
        <p className="text-sm font-semibold text-on-surface-variant tracking-wide uppercase">The Optimistic Path</p>
      </div>
    </div>

    <div className="space-y-4 mb-10">
      <button className="w-full h-14 bg-[#FEE500] text-[#191919] font-bold rounded-full flex items-center justify-center px-6 active:scale-[0.98] transition-all">
        <MessageCircle className="w-5 h-5 mr-3 fill-current" />
        카카오로 시작하기
      </button>
      <button className="w-full h-14 bg-[#03C75A] text-white font-bold rounded-full flex items-center justify-center px-6 active:scale-[0.98] transition-all">
        <Compass className="w-5 h-5 mr-3 fill-current" />
        네이버로 시작하기
      </button>
      <button className="w-full h-14 bg-white border border-outline-variant/30 text-on-background font-bold rounded-full flex items-center justify-center px-6 active:scale-[0.98] transition-all">
        <img alt="Google" className="w-5 h-5 mr-3" src="https://www.google.com/favicon.ico" referrerPolicy="no-referrer" />
        Google 계정으로 로그인
      </button>
    </div>

    <div className="relative flex items-center mb-8">
      <div className="flex-grow border-t border-outline-variant/20" />
      <span className="flex-shrink mx-4 text-xs font-semibold text-on-surface-variant tracking-widest uppercase">Or email</span>
      <div className="flex-grow border-t border-outline-variant/20" />
    </div>

    <div className="space-y-6 text-center">
      <button className="w-full text-on-surface font-semibold py-2 hover:text-primary transition-colors">
        이메일로 로그인
      </button>
      <div className="flex items-center justify-center space-x-4 text-sm text-on-surface-variant">
        <button className="hover:text-primary transition-colors">아이디 찾기</button>
        <span className="text-outline-variant/40">|</span>
        <button className="hover:text-primary transition-colors">비밀번호 찾기</button>
      </div>
    </div>

    <footer className="mt-auto pt-12 text-center">
      <p className="text-on-surface-variant text-sm mb-2">아직 회원이 아니신가요?</p>
      <button className="text-primary font-bold text-lg hover:underline decoration-2 underline-offset-4">
        지금 바로 회원가입하기
      </button>
    </footer>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>("home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-fixed">
      <TopAppBar 
        title={view === "home" ? "AGITIO" : view === "detail" ? "Program Details" : "Login"} 
        onMenuClick={() => setIsDrawerOpen(true)}
        onBackClick={() => setView("home")}
        showBack={view === "detail"}
        showMenu={view === "home"}
        showShare={view === "detail"}
      />

      <motion.main
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {view === "home" && <HomeView onDetailClick={() => setView("detail")} />}
        {view === "detail" && <ProgramDetailView onBack={() => setView("home")} />}
        {view === "login" && <LoginView />}
      </motion.main>

      <BottomNavBar activeView={view} onViewChange={setView} />
      
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
}
