import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

import Login from "@/pages/Login";
import ForbiddenPage from "@/pages/ForbiddenPage";
import NotFound from "@/pages/NotFound";

import Dashboard from "@/pages/Dashboard";
import MealPlan from "@/pages/MealPlan";

import { ProtectedRoute } from "@/auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />

            {/* Protected routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="ADMIN">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student"
              element={
                <ProtectedRoute requireRole="USER">
                  <MealPlan />
                </ProtectedRoute>
              }
            />

            {/* Catch-all MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
