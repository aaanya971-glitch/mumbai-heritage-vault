/**
 * Mumbai HeritageVault - Registration Page
 * Allows new users, students, and researchers to join the museum platform
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { authApi } from '../services/api';
import { User } from '../types';

interface RegisterPageProps {
  onRegisterSuccess: (user: User) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'visitor' | 'admin'>('visitor');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { user } = await authApi.register(name, email, role);
      onRegisterSuccess(user);
      navigate(user.role === 'admin' ? '/admin' : '/profile');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-sm bg-stone-900 text-stone-100 flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Landmark className="w-6 h-6 text-amber-400" />
        </div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
          Create Scholar Account
        </h1>
        <p className="text-xs text-stone-500 font-serif">
          Join the community of students, researchers, and history enthusiasts preserving Mumbai.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-5">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya Sen"
              className="w-full px-3 py-2.5 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ananya@heritagevault.demo"
              className="w-full px-3 py-2.5 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1">Create Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2.5 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 uppercase mb-1">Account Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('visitor')}
                className={`py-2 px-3 text-xs rounded border text-center transition-colors ${
                  role === 'visitor'
                    ? 'bg-amber-800 text-white border-amber-900 font-semibold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Visitor / Scholar
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-3 text-xs rounded border text-center transition-colors ${
                  role === 'admin'
                    ? 'bg-amber-800 text-white border-amber-900 font-semibold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Curator Admin
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
          <span>Already have an account? </span>
          <Link to="/login" className="text-amber-900 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
