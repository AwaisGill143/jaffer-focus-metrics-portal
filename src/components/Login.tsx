import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { loginUser } from '@/lib/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoginProps } from '@/types/user';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('sibtain.naqvi@hysabkytab.com');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading screen
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowLoadingScreen(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        console.log("User returned with:", response.user);
        onLogin(response.user);
      } else {
        setError(response.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  // Loading Screen Component
  if (showLoadingScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 animate-in fade-in duration-500">
        {/* Animated background */}
        <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-md w-full space-y-8 z-10">
          <div className="bg-white shadow-xl rounded-xl p-12 border border-slate-100">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <img src="/JBS-Logo.png" alt="JBS Logo" className="w-24 h-24 object-contain" />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Loading...</h2>
              <p className="mt-2 text-lg text-slate-600">Preparing your experience</p>

              <div className="mt-8">
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-600 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <p className="mt-3 text-sm text-slate-500">{loadingProgress}%</p>
              </div>

              <div className="mt-6 flex justify-center">
                <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 animate-in fade-in duration-500">
      {/* Animated background */}
      <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="max-w-2xl w-full space-y-8 z-10">
        <div className="bg-white shadow-xl rounded-xl p-12 border border-slate-100">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-center py-6 rounded-lg mb-8">
            <h2 className="mt-2 text-4xl font-extrabold">Welcome back!</h2>
            <p className="text-slate-300 text-lg">Sign in to continue</p>
          </div>

          <div className="flex justify-center mb-6">
            <img src="/JBS-Logo.png" alt="JBS Logo" className="w-32 h-32 object-contain" />
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-slate-700 font-semibold text-lg">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-lg font-medium py-3"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-slate-700 font-semibold text-lg">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 pr-10 text-lg py-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-lg text-white py-4 text-2xl font-semibold transition-colors duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            {/* <p className="text-slate-500 text-lg leading-relaxed">
              For demo: use email <strong className="text-slate-700">sibtain.naqvi@hysabkytab.com</strong> and password <strong className="text-slate-700">1234</strong>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
