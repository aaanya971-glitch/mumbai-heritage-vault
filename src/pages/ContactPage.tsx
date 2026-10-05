/**
 * Mumbai HeritageVault - Contact & Curatorial Inquiries
 * Contact form for academic collaboration, archival inquiries, and user feedback
 */

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Research Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
          Curatorial Desk
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900">
          Contact & Archival Inquiries
        </h1>
        <p className="text-sm text-stone-600 font-serif max-w-2xl leading-relaxed">
          Reach out for academic collaborations, research queries regarding our verified collections, or to suggest archival corrections for our digital records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Info & Hours (4 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif-display text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
              Project Archival Desk
            </h3>

            <div className="space-y-3 text-stone-700">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Digital Archive Email:</strong>
                  <span className="font-mono">curator@mumbaiheritagevault.org</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Research Focus Area:</strong>
                  <span>Fort, Kala Ghoda & Salsette Heritage Ensembles, Mumbai, Maharashtra</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Academic Review Timings:</strong>
                  <span>Monday – Friday, 10:00 AM – 5:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-600 leading-relaxed font-serif">
            <strong>Advisory Note:</strong> This platform is an educational museum project. For official heritage permissions, please contact the Archaeological Survey of India (ASI) or the Municipal Corporation of Greater Mumbai (BMC).
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900">
                Message Successfully Received
              </h3>
              <p className="text-xs text-stone-600 font-serif max-w-sm mx-auto">
                Thank you for contributing to Mumbai's heritage conversation. Our research team will review your message.
              </p>
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setEmail('');
                  setMessage('');
                  setIsSubmitted(false);
                }}
                className="mt-4 px-4 py-2 bg-stone-900 text-stone-100 text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-serif-display text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
                Send an Archival Inquiry
              </h3>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Priya Kulkarni"
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@university.edu"
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Nature of Inquiry</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none text-xs"
                >
                  <option value="Research Inquiry">Academic / Research Inquiry</option>
                  <option value="Archival Submission">Archival Photograph / Record Submission</option>
                  <option value="Correction Notice">Historical Data Verification / Correction</option>
                  <option value="Tour Guidance">Educational Tour Inquiries</option>
                  <option value="General Feedback">General Museum Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify the monument, archival reference, or academic collaboration details..."
                  className="w-full px-3 py-2 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs font-serif"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-800 hover:bg-amber-700 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
