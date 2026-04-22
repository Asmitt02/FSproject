import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Book,
  Award,
  BookOpen,
  Clock,
  Settings,
  User,
  Play,
  CheckCircle2,
  ChevronRight,
  LogOut,
  Briefcase,
  Code,
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  Target,
  TrendingUp,
  Upload,
  Zap,
  Trophy,
  Flame,
  Star,
  FileText,
  BarChart2,
  X,
  MessageCircle,
  Send,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [progressValue, setProgressValue] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [dailyAnswer, setDailyAnswer] = useState("");
  
  // Custom Path State
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);
  const [generatedPath, setGeneratedPath] = useState(null);
  
  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I'm your career assistant. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const currentPath = {
    title: "Fullstack Web Development",
    progress: 45,
    modulesTotal: 12,
    modulesCompleted: 5,
  };

  const [userStats, setUserStats] = useState({
    level: 1,
    rank: "Beginner",
    xp: 0,
    nextLevelXp: 1000,
    streak: 0,
    hasCheckedIn: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/student-login");
          return;
        }
        const res = await fetch(`${API}/api/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setUserProfile(data.user);
          setUserStats({
            level: data.user.level || 1,
            xp: data.user.xp || 0,
            nextLevelXp: data.user.nextLevelXp || 1000,
            streak: data.user.streak || 0,
            hasCheckedIn: data.user.hasCheckedIn || false,
            rank: (data.user.level || 1) >= 15 ? "Master" : (data.user.level >= 5 ? "Pro" : "Beginner"),
          });
        } else {
          localStorage.removeItem("token");
          navigate("/student-login");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate, API]);

  const handleCheckInSubmit = async () => {
    if (dailyAnswer.toLowerCase().trim() !== "cascading style sheets") {
      alert("Incorrect answer. Try again!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/check-in`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setUserStats({
          level: data.user.level,
          xp: data.user.xp,
          nextLevelXp: data.user.nextLevelXp,
          streak: data.user.streak,
          hasCheckedIn: data.user.hasCheckedIn,
          rank: data.user.level >= 15 ? "Master" : (data.user.level >= 5 ? "Pro" : "Beginner"),
        });
        setIsCheckInModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const marketDemandData = [
    { month: "Jan", demand: 40 },
    { month: "Feb", demand: 55 },
    { month: "Mar", demand: 70 },
    { month: "Apr", demand: 65 },
    { month: "May", demand: 85 },
    { month: "Jun", demand: 110 },
  ];

  const salaryData = [
    { role: "Entry", salary: 75 },
    { role: "Mid", salary: 110 },
    { role: "Senior", salary: 145 },
    { role: "Lead", salary: 180 },
  ];

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(currentPath.progress), 500);
    return () => clearTimeout(timer);
  }, [currentPath.progress]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(20);
    setAnalysisResult(null);
    
    try {
      const token = localStorage.getItem("token");
      setUploadProgress(50);
      
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(`${API}/api/analyze-skill`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      
      setUploadProgress(80);
      const data = await res.json();
      
      if (data.success && data.analysis) {
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setAnalysisResult(data.analysis);
        }, 500);
      } else {
        throw new Error("Analysis failed");
      }
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert("Failed to analyze resume.");
    }
  };

  const handleGeneratePath = async () => {
    if (!analysisResult) return;
    setIsGeneratingPath(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/generate-path`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          role: analysisResult.role,
          weakAreas: analysisResult.weakAreas,
          missingSkills: analysisResult.missingSkills,
          strengths: analysisResult.strengths
        })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedPath(data.path);
      } else {
        alert(data.error || "Failed to generate custom path.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the server. Please try again.");
    } finally {
      setIsGeneratingPath(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsChatLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage]
        })
      });
      const data = await res.json();
      if (data.success) {
        setChatMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "skills", label: "Skill Analyzer", icon: Target },
    { id: "courses", label: "My Courses", icon: Book },
    { id: "internships", label: "Internships", icon: Briefcase },
    { id: "hackathons", label: "Hackathons", icon: Code },
    { id: "market", label: "Market Insights", icon: TrendingUp },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex bg-gray-50/50 min-h-screen dark:bg-zinc-950 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 flex-shrink-0 flex flex-col hidden md:flex z-10 shadow-sm relative">
        <div className="p-6 border-b dark:border-zinc-800">
          <div
            className="flex items-center gap-2 font-semibold text-lg text-primary cursor-pointer"
            onClick={() => navigate("/")}
          >
            <BookOpen className="h-6 w-6" />
            <span>AI Path Learn</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start transition-all group relative ${
                activeTab === item.id
                  ? "font-medium shadow-sm"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={`mr-2 h-4 w-4 transition-transform ${activeTab === item.id ? "text-primary scale-110" : "group-hover:scale-110"}`}
              />
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="p-4 border-t dark:border-zinc-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
            onClick={() => navigate("/")}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative bg-grid-black/[0.02]">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Welcome back, {userProfile?.name?.split(' ')[0] || "Student"}! 👋
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      You're currently on track with your learning goals. Let's keep
                      the momentum going!
                    </p>
                  </div>
                  
                  {/* Gamification Top Bar */}
                  <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-3 rounded-2xl border dark:border-zinc-800 shadow-sm">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => !userStats.hasCheckedIn && setIsCheckInModalOpen(true)}
                      className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer transition-colors ${userStats.hasCheckedIn ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400' : 'bg-orange-50 text-orange-500 hover:bg-orange-100 dark:bg-orange-950/30'} rounded-lg group relative`}
                    >
                      <Flame className={`w-5 h-5 fill-current ${userStats.hasCheckedIn ? 'animate-bounce' : 'group-hover:animate-pulse'}`} />
                      <span className="font-bold text-sm">{userStats.streak} Day Streak</span>
                      {!userStats.hasCheckedIn && (
                        <span className="absolute -top-2 -right-2 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                        </span>
                      )}
                    </motion.div>
                    
                    <div className="flex flex-col px-3 border-l dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-r-xl transition-colors" onClick={() => setIsProfileModalOpen(true)}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" /> Lvl {userStats.level} {userStats.rank}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground ml-4">{userStats.xp} / {userStats.nextLevelXp} XP</span>
                      </div>
                      <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-2 w-32 bg-primary/10 transition-all duration-500 ease-out" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-md transition-all h-full cursor-pointer border-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Enrolled Paths
                      </CardTitle>
                      <Book className="h-4 w-4 text-primary opacity-80" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground mt-1 text-primary/60 font-medium">
                        Active learning tracks
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-md transition-all h-full cursor-pointer border-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Completed Modules
                      </CardTitle>
                      <Award className="h-4 w-4 text-primary opacity-80" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">14</div>
                      <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1 inline" /> +2 from
                        last week
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="col-span-1 lg:col-span-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Card className="bg-primary text-primary-foreground relative overflow-hidden group h-full hover:shadow-xl transition-all duration-300 transform">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <motion.div
                      className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <CardHeader className="flex flex-row items-center space-y-0 pb-2 text-primary-foreground relative z-10">
                      <CardTitle className="text-lg font-medium flex items-center cursor-pointer">
                        <Play className="w-5 h-5 mr-2 fill-current hover:text-white transition-colors" />{" "}
                        Resume Learning
                      </CardTitle>
                      <Clock className="h-4 w-4 ml-auto opacity-70 animate-pulse" />
                    </CardHeader>
                    <CardContent className="mt-2 text-primary-foreground drop-shadow-sm relative z-10">
                      <div className="text-xl font-bold">
                        {currentPath.title}
                      </div>
                      <div className="flex justify-between text-xs mt-6 mb-2 opacity-80 font-medium">
                        <span>
                          {currentPath.modulesCompleted} /{" "}
                          {currentPath.modulesTotal} Modules Completed
                        </span>
                        <span>{currentPath.progress}%</span>
                      </div>
                      <Progress
                        value={progressValue}
                        className="h-2 bg-primary-foreground/30 transition-all duration-1000 ease-out"
                      />
                      <Button
                        variant="secondary"
                        className="w-full mt-6 shadow-sm hover:scale-[1.02] transition-transform font-bold text-primary"
                        onClick={() => setActiveTab("courses")}
                      >
                        Continue Module 6{" "}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center justify-between border-b pb-4 mb-4 dark:border-zinc-800">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Recommended AI Paths
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/5"
                    onClick={() => setActiveTab("courses")}
                  >
                    View all curated paths{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Prompt Engineering Mastery",
                      time: "2 weeks",
                      difficulty: "Beginner",
                      icon: "🧠",
                    },
                    {
                      title: "Machine Learning Fundamentals",
                      time: "3 months",
                      difficulty: "Intermediate",
                      icon: "📊",
                    },
                  ].map((course, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="hover:shadow-lg transition-all border-primary/10 hover:border-primary/30 group cursor-pointer h-full relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 text-primary/5 text-9xl font-bold group-hover:scale-110 transition-transform -z-10 pointer-events-none">
                          {course.icon}
                        </div>
                        <CardHeader>
                          <div className="text-4xl mb-3 drop-shadow-sm">
                            {course.icon}
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="opacity-80">
                            {course.time} • {course.difficulty}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                            onClick={() => setActiveTab("courses")}
                          >
                            Explore Curated Path
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Gamification Badges Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center justify-between border-b pb-4 mb-4 dark:border-zinc-800 mt-8">
                  <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" /> Recent Badges
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { title: "Project Master", desc: "Completed 5 projects", icon: "🚀", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
                    { title: "Fast Learner", desc: "Finished path in 1 week", icon: "⚡", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600" },
                    { title: "Code Ninja", desc: "Perfect score on quiz", icon: "🥷", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
                    { title: "Consistency", desc: "14-day learning streak", icon: "🔥", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
                  ].map((badge, i) => (
                    <motion.div key={i} whileHover={{ y: -5, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="text-center p-4 border-primary/10 hover:shadow-md transition-all cursor-pointer h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 shadow-sm ${badge.color}`}>
                          {badge.icon}
                        </div>
                        <h4 className="font-bold text-sm">{badge.title}</h4>
                        <p className="text-[10px] text-muted-foreground mt-1">{badge.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <Target className="w-8 h-8 text-primary" /> Skill Gap Analyzer
                </h2>
                <p className="text-muted-foreground mt-2">
                  Upload your resume or take a quick assessment to see how ready you are for your dream role.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1 border-primary/20 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="text-xl">Upload Resume</CardTitle>
                    <CardDescription>Let our AI scan your profile.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center text-center space-y-4 pt-4">
                    <input 
                      type="file" 
                      id="resume-upload" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <div 
                      className={`w-full p-8 border-2 border-dashed rounded-xl transition-all ${isUploading ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer'}`}
                      onClick={() => !isUploading && !analysisResult && document.getElementById('resume-upload').click()}
                    >
                      {isUploading ? (
                        <div className="space-y-4">
                          <Zap className="w-12 h-12 mx-auto text-primary animate-pulse" />
                          <p className="text-sm font-medium">AI is analyzing your profile...</p>
                          <Progress value={uploadProgress} className="h-2 w-full" />
                        </div>
                      ) : analysisResult ? (
                        <div className="space-y-4">
                          <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
                          <p className="text-sm font-medium text-green-600">Analysis Complete!</p>
                          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setAnalysisResult(null); }}>Scan New Profile</Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                          <div className="text-sm">
                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                          </div>
                          <p className="text-xs text-muted-foreground">PDF, JPG, PNG, DOCX up to 5MB</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center w-full my-2">
                      <div className="h-px flex-1 bg-border"></div>
                      <span className="px-3 text-xs text-muted-foreground uppercase font-medium">OR</span>
                      <div className="h-px flex-1 bg-border"></div>
                    </div>
                    
                    <Button variant="secondary" className="w-full" disabled={isUploading}>
                      <FileText className="w-4 h-4 mr-2" /> Take Skill Quiz
                    </Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 border-primary/10 overflow-hidden relative">
                  {!analysisResult && (
                    <div className="absolute inset-0 z-10 backdrop-blur-sm bg-background/50 flex flex-col items-center justify-center text-center p-6">
                      <Target className="w-16 h-16 text-muted-foreground/30 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Awaiting Data</h3>
                      <p className="text-muted-foreground max-w-sm">Upload your resume to instantly see your career readiness score, missing skills, and a personalized roadmap.</p>
                    </div>
                  )}
                  <CardHeader className="bg-primary/5 border-b pb-6">
                    <CardTitle className="text-2xl">Readiness Report</CardTitle>
                    <CardDescription>Target Role: <strong className="text-foreground">{analysisResult?.role || "Data Analyst"}</strong></CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/30" />
                            <circle 
                              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" 
                              className="text-primary"
                              strokeDasharray={`${(analysisResult?.score || 0) * 2.83} 283`}
                              style={{ transition: "stroke-dasharray 1.5s ease-out" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-4xl font-bold">{analysisResult?.score || 0}%</span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Ready</span>
                          </div>
                        </div>
                        <p className="text-center text-sm font-medium">You are <strong className="text-primary">{analysisResult?.score || 0}% ready</strong> for this role. Let's close the gap.</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-red-500">
                            <Zap className="w-4 h-4" /> Weak Areas to Improve
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(analysisResult?.weakAreas || ["Data Prep", "SQL Joins", "Stats"]).map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:border-red-900">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-orange-500">
                            <Target className="w-4 h-4" /> Missing Critical Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(analysisResult?.missingSkills || ["Tableau", "AWS"]).map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-green-500">
                            <CheckCircle2 className="w-4 h-4" /> Your Strengths
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(analysisResult?.strengths || ["Python", "Pandas"]).map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:border-green-900">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {analysisResult && (
                      <div className="mt-8 pt-6 border-t">
                        <div className="flex justify-end mb-6">
                          <Button 
                            className="group" 
                            onClick={handleGeneratePath}
                            disabled={isGeneratingPath}
                          >
                            {isGeneratingPath ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Analyzing Skills...
                              </>
                            ) : (
                              <>
                                Generate Custom Path <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </Button>
                        </div>

                        {generatedPath && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-4"
                          >
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                              <MapPin className="w-5 h-5 text-primary" /> Your AI-Generated Roadmap
                            </h3>
                            <div className="grid gap-4">
                              {generatedPath.map((module, i) => (
                                <Card key={i} className="border-l-4 border-l-primary bg-zinc-50/50 dark:bg-zinc-800/30 p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-bold text-lg">{module.title}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                                    </div>
                                    <Badge variant="secondary">{module.duration}</Badge>
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "market" && (
            <motion.div
              key="market"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <BarChart2 className="w-8 h-8 text-primary" /> Real Market Insights
                </h2>
                <p className="text-muted-foreground mt-2">
                  Stay ahead of the curve. Track industry trends, job demand, and salary expectations.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg md:col-span-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-blue-100 font-medium mb-1">Top Trending Skill</p>
                        <h3 className="text-4xl font-bold">Python</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-3 py-1.5 rounded-full">
                      <Zap className="w-4 h-4 text-yellow-300" /> Demand increased <span className="text-yellow-300 font-bold">35%</span> this year
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg md:col-span-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-emerald-100 font-medium mb-1">Fastest Growing Role</p>
                        <h3 className="text-3xl font-bold mt-1">AI Engineer</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-3 py-1.5 rounded-full">
                      <TrendingUp className="w-4 h-4 text-white" /> +120% YoY growth
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg md:col-span-1">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-purple-100 font-medium mb-1">Average Starting Salary</p>
                        <h3 className="text-3xl font-bold mt-1">$85k - $120k</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-3 py-1.5 rounded-full">
                      <Briefcase className="w-4 h-4 text-white" /> For entry-level AI roles
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="w-5 h-5 text-primary" /> Job Demand (Past 6 Months)
                    </CardTitle>
                    <CardDescription>Number of open positions (in thousands) for AI/Data roles.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={marketDemandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                          <RechartsTooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
                          />
                          <Area type="monotone" dataKey="demand" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorDemand)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-500" /> Salary Trajectory
                    </CardTitle>
                    <CardDescription>Average salary progression (in $1,000s) for Tech/AI roles.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salaryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                          <XAxis dataKey="role" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                          <RechartsTooltip 
                            cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
                          />
                          <Bar dataKey="salary" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                  My Courses
                </h2>
                <p className="text-muted-foreground mt-2">
                  View and manage your active learning paths and generated
                  curriculums.
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  {
                    title: "React JS Full Course for Beginners",
                    progress: 80,
                    thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
                    url: "https://www.youtube.com/watch?v=bMknfKXIFA8"
                  },
                  {
                    title: "Node.js and Express.js - Full Course",
                    progress: 40,
                    thumbnail: "https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg",
                    url: "https://www.youtube.com/watch?v=Oe421EPjeBE"
                  },
                  {
                    title: "Python for Beginners - Full Course",
                    progress: 10,
                    thumbnail: "https://img.youtube.com/vi/eWRfhZUzrAc/maxresdefault.jpg",
                    url: "https://www.youtube.com/watch?v=eWRfhZUzrAc"
                  }
                ].map((course, index) => (
                  <Card
                    key={index}
                    className="p-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-primary hover:-translate-y-1"
                    onClick={() => window.open(course.url, "_blank")}
                  >
                    <div className="w-full md:w-48 h-28 bg-muted rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-10 h-10 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 w-full">
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-3">
                        <Progress
                          value={course.progress}
                          className="h-2 w-full max-w-[200px]"
                        />
                        <p className="text-sm text-muted-foreground whitespace-nowrap">
                          {course.progress}% completed
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full md:w-auto mt-4 md:mt-0"
                    >
                      Watch on YouTube <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "internships" && (
            <motion.div
              key="internships"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                  Premium Internships
                </h2>
                <p className="text-muted-foreground mt-2">
                  Kickstart your career with handpicked internship opportunities from top tech companies.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    company: "Google",
                    role: "AI Research Intern",
                    location: "Remote",
                    stipend: "$8k/month",
                    duration: "3 months",
                    tags: ["Machine Learning", "Python", "TensorFlow"],
                    logo: "G",
                    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  },
                  {
                    company: "OpenAI",
                    role: "Frontend Engineering Intern",
                    location: "San Francisco, CA",
                    stipend: "$9k/month",
                    duration: "6 months",
                    tags: ["React", "TypeScript", "Next.js"],
                    logo: "O",
                    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                  },
                  {
                    company: "Microsoft",
                    role: "Data Science Intern",
                    location: "Seattle, WA",
                    stipend: "$7.5k/month",
                    duration: "12 weeks",
                    tags: ["Data Analysis", "SQL", "PowerBI"],
                    logo: "M",
                    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  }
                ].map((internship, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="h-full flex flex-col hover:shadow-xl transition-shadow border-primary/10 overflow-hidden relative group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${internship.color}`}>
                            {internship.logo}
                          </div>
                          <Badge variant="secondary" className="px-3 py-1 font-medium">{internship.duration}</Badge>
                        </div>
                        <CardTitle className="text-xl line-clamp-1">{internship.role}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground">{internship.company}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-4">
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> {internship.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> {internship.stipend}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {internship.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-background/50">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <div className="p-6 pt-0 mt-auto">
                        <Button className="w-full group-hover:scale-[1.02] transition-transform">
                          Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "hackathons" && (
            <motion.div
              key="hackathons"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Upcoming Hackathons
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Build, collaborate, and win prizes in global AI and Web3 hackathons.
                  </p>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Global AI Innovators Challenge",
                    org: "TechCrunch",
                    date: "Oct 15 - Oct 17, 2026",
                    prize: "$50,000",
                    participants: 1240,
                    status: "Registration Open",
                    theme: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                  },
                  {
                    title: "Web3 Builders Weekend",
                    org: "Ethereum Foundation",
                    date: "Nov 5 - Nov 7, 2026",
                    prize: "$25,000",
                    participants: 850,
                    status: "Closing Soon",
                    theme: "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                  },
                  {
                    title: "Open Source Contribution Drive",
                    org: "GitHub",
                    date: "Dec 1 - Dec 31, 2026",
                    prize: "Exclusive Swags",
                    participants: 5000,
                    status: "Upcoming",
                    theme: "bg-gradient-to-br from-slate-700 to-slate-900 text-white"
                  }
                ].map((hackathon, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full">
                      <div className={`p-6 ${hackathon.theme} relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                          <Code className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                              {hackathon.status}
                            </Badge>
                            <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full text-sm backdrop-blur-md font-medium">
                              <User className="w-3 h-3" /> {hackathon.participants} register
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-1 relative z-10">{hackathon.title}</h3>
                        <p className="text-white/80 font-medium relative z-10">by {hackathon.org}</p>
                      </div>
                      <CardContent className="p-6 bg-card flex-1">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-5 h-5 text-primary" />
                            <span className="font-medium text-foreground">{hackathon.date}</span>
                          </div>
                        </div>
                        <div className="bg-primary/5 rounded-xl p-4 flex justify-between items-center border border-primary/10">
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Prize Pool</p>
                            <p className="text-xl font-bold text-foreground">{hackathon.prize}</p>
                          </div>
                          <Button>Register Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="space-y-6 flex flex-col items-center justify-center py-32 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="w-28 h-28 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner"
              >
                <Award className="w-14 h-14 text-yellow-600 dark:text-yellow-500 drop-shadow-sm" />
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tight text-yellow-700 dark:text-yellow-500">
                No Certificates Yet
              </h2>
              <p className="text-muted-foreground max-w-md text-lg">
                Complete an AI learning path entirely to earn your first
                certified accolade. Keep up the great work!
              </p>
              <Button
                onClick={() => setActiveTab("courses")}
                className="mt-8 shadow-md hover:scale-105 transition-transform"
                size="lg"
              >
                Continue Learning
              </Button>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-2xl mx-auto md:mx-0"
            >
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Account Settings
                </h2>
                <p className="text-muted-foreground mt-2">
                  Manage your personal information and app preferences.
                </p>
              </div>
              <Card className="shadow-sm border-primary/10">
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>
                    This information is visible privately.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2 border-b pb-4 dark:border-zinc-800">
                    <p className="text-sm font-bold text-muted-foreground uppercase pb-1 tracking-wider">
                      Name
                    </p>
                    <p className="text-lg font-medium">{userProfile?.name || "Alex Developer"}</p>
                  </div>
                  <div className="space-y-2 border-b pb-4 dark:border-zinc-800">
                    <p className="text-sm font-bold text-muted-foreground uppercase pb-1 tracking-wider">
                      Email
                    </p>
                    <p className="text-lg font-medium">{userProfile?.email || "alex@example.com"}</p>
                  </div>
                  <div className="space-y-2 pt-2">
                    <p className="text-sm font-bold text-muted-foreground uppercase pb-1 tracking-wider">
                      Security
                    </p>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-2"
                    >
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-80 sm:w-96 h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border dark:border-zinc-800 flex flex-col overflow-hidden"
            >
              <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Career AI Assistant</h4>
                    <p className="text-[10px] opacity-80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsChatOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted dark:bg-zinc-800 rounded-tl-none"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t dark:border-zinc-800 flex gap-2">
                <input 
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 bg-muted dark:bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button size="icon" className="rounded-lg h-9 w-9" onClick={handleSendMessage} disabled={isChatLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button 
          size="icon" 
          className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Daily Check-in Modal */}
      {isCheckInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><Flame className="text-orange-500 w-6 h-6" /> Daily Check-In</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsCheckInModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-6">Answer the daily coding question to maintain your streak and earn 500 XP!</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold mb-2 block">What does CSS stand for?</label>
                <input 
                  type="text" 
                  value={dailyAnswer}
                  onChange={(e) => setDailyAnswer(e.target.value)}
                  placeholder="Type your answer here..." 
                  className="w-full p-3 rounded-lg border dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <Button className="w-full" onClick={handleCheckInSubmit}>Submit Answer</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Detailed Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl max-w-lg w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2"><User className="text-primary w-6 h-6" /> Detailed Profile</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsProfileModalOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                {userProfile?.name?.charAt(0) || "S"}
              </div>
              <div>
                <h4 className="text-xl font-bold">{userProfile?.name || "Student"}</h4>
                <p className="text-muted-foreground">{userProfile?.email || "student@example.com"}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-bold text-sm uppercase text-muted-foreground mb-3 tracking-wider">Gamification Stats</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border dark:border-zinc-800">
                    <p className="text-muted-foreground text-sm">Current Level</p>
                    <p className="text-2xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-current" /> {userStats.level}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border dark:border-zinc-800">
                    <p className="text-muted-foreground text-sm">Rank</p>
                    <p className="text-xl font-bold text-primary">{userStats.rank}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border dark:border-zinc-800">
                    <p className="text-muted-foreground text-sm">Total XP</p>
                    <p className="text-2xl font-bold text-green-600">{userStats.xp}</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border dark:border-zinc-800">
                    <p className="text-muted-foreground text-sm">Current Streak</p>
                    <p className="text-2xl font-bold flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500 fill-current" /> {userStats.streak}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-bold text-sm uppercase text-muted-foreground mb-3 tracking-wider">Career Profile</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b dark:border-zinc-800">
                    <span className="text-muted-foreground">Target Role</span>
                    <span className="font-medium">{userProfile?.targetRole || "Fullstack Developer"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b dark:border-zinc-800">
                    <span className="text-muted-foreground">Education</span>
                    <span className="font-medium">{userProfile?.education || "B.Tech Computer Science"}</span>
                  </div>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      )}
    </div>
  );
}
