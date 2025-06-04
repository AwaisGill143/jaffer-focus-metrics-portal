
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { loginUser } from '@/lib/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    
    // Clear error when user starts typing again
    if (error) setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send login request to backend
      const response = await loginUser({ email, password });
      
      if (response.success) {
        // Login successful
        onLogin();
      } else {
        // Login failed
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-slate-600 font-bold text-lg">
                JBS
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
            <LogIn size={24} />
            Login to JBS
          </CardTitle>
          <p className="text-blue-200 text-sm mt-2">
            Access your OKR Management Platform
          </p>
        </CardHeader>
        <CardContent className="p-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-semibold">
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
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-colors duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              For demo: use email "admin@jbs.com" and password "password123"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
