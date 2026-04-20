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
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [progressValue, setProgressValue] = useState(0);

  const currentPath = {
    title: "Fullstack Web Development",
    progress: 45,
    modulesTotal: 12,
    modulesCompleted: 5,
  };

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(currentPath.progress), 500);
    return () => clearTimeout(timer);
  }, [currentPath.progress]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "courses", label: "My Courses", icon: Book },
    { id: "internships", label: "Internships", icon: Briefcase },
    { id: "hackathons", label: "Hackathons", icon: Code },
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
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-muted-foreground mt-2">
                  You're currently on track with your learning goals. Let's keep
                  the momentum going!
                </p>
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
                {[1, 2, 3].map((item) => (
                  <Card
                    key={item}
                    className="p-4 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-primary hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          AI Course Path {item}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress
                            value={10 * item * 2}
                            className="h-1.5 w-24"
                          />
                          <p className="text-sm text-muted-foreground whitespace-nowrap">
                            {10 * item * 2}% completed
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors hidden sm:flex"
                    >
                      Resume
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
                    <p className="text-lg font-medium">Alex Developer</p>
                  </div>
                  <div className="space-y-2 border-b pb-4 dark:border-zinc-800">
                    <p className="text-sm font-bold text-muted-foreground uppercase pb-1 tracking-wider">
                      Email
                    </p>
                    <p className="text-lg font-medium">alex@example.com</p>
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
    </div>
  );
}
