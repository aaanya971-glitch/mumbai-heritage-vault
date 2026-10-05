/**
 * Mumbai HeritageVault - Login Page
 * Features One-Click Demo Credentials for Admin and Visitor
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Shield, User, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { authApi } from '../services/api';
import { User as UserType } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: UserType) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { user } = await authApi.login(email, password);
      onLoginSuccess(user);
      navigate(user.role === 'admin' ? '/admin' : '/profile');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (demoType: 'admin' | 'visitor') => {
    if (demoType === 'admin') {
      setEmail('admin@heritagevault.demo');
      setPassword('Admin@123');
    } else {
      setEmail('visitor@heritagevault.demo');
      setPassword('Visitor@123');
    }
    setError('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-sm bg-stone-900 text-stone-100 flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Landmark className="w-6 h-6 text-amber-400" />
        </div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
          Sign In to HeritageVault
        </h1>
        <p className="text-xs text-stone-500 font-serif">
          Access your saved collection, personal tour plans, and scholarly evaluations.
        </p>
      </div>

      {/* Demo Credentials Helper Box */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg space-y-3 text-xs text-amber-950">
        <div className="flex items-center gap-1.5 font-semibold text-amber-900">
          <Shield className="w-4 h-4 text-amber-800" />
          <span>Evaluation Demo Credentials:</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-900/90 font-serif">
          Click below to populate verified credentials for instant role-based exploration:
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillDemo('admin')}
            className="py-1.5 px-2 bg-white border border-amber-300 rounded text-center text-amber-950 font-medium hover:bg-amber-100/60 transition-colors"
          >
            Admin Curator
            <span className="block font-mono text-[10px] text-amber-800">admin@heritagevault.demo</span>
          </button>

          <button
            type="button"
            onClick={() => fillDemo('visitor')}
            className="py-1.5 px-2 bg-white border border-amber-300 rounded text-center text-amber-950 font-medium hover:bg-amber-100/60 transition-colors"
          >
            Visitor / Student
            <span className="block font-mono text-[10px] text-amber-800">visitor@heritagevault.demo</span>
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-5">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. visitor@heritagevault.demo"
              className="w-full px-3 py-2.5 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>Need an account? </span>
          <Link to="/register" className="text-amber-900 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
