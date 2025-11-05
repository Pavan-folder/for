import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import PatientOnboardingPage from "@/pages/patient-onboarding";
import ResearcherOnboardingPage from "@/pages/researcher-onboarding";
import Dashboard from "@/pages/dashboard";
import Trials from "@/pages/trials";
import Experts from "@/pages/experts";
import Publications from "@/pages/publications";
import Forums from "@/pages/forums";
import Favorites from "@/pages/favorites";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [userRole, setUserRole] = useState<'patient' | 'researcher' | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'patient' | 'researcher' | null;
    setUserRole(role);
    if (!role && location !== '/' && location !== '/patient-onboarding' && location !== '/researcher-onboarding') {
      setLocation('/');
    }
  }, [location, setLocation]);

  if (!userRole) {
    return null;
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole={userRole} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/patient-onboarding" component={PatientOnboardingPage} />
      <Route path="/researcher-onboarding" component={ResearcherOnboardingPage} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/trials">
        <ProtectedRoute>
          <Trials />
        </ProtectedRoute>
      </Route>
      <Route path="/experts">
        <ProtectedRoute>
          <Experts />
        </ProtectedRoute>
      </Route>
      <Route path="/collaborators">
        <ProtectedRoute>
          <Experts />
        </ProtectedRoute>
      </Route>
      <Route path="/publications">
        <ProtectedRoute>
          <Publications />
        </ProtectedRoute>
      </Route>
      <Route path="/forums">
        <ProtectedRoute>
          <Forums />
        </ProtectedRoute>
      </Route>
      <Route path="/favorites">
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
