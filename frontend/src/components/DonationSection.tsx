'use client';

import { motion } from 'framer-motion';
import { Heart, QrCode, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function DonationSection() {
  const [copied, setCopied] = useState(false);
  const upiId = '9520568769@kotakbank';

  const donationTiers = [
    { amount: 50, label: 'Plants 1 Tree', icon: '🌱' },
    { amount: 500, label: 'Plants 10 Trees', icon: '🌳' },
    { amount: 1000, label: 'Plantation Drive', icon: '🌲' },
  ];

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="donate" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Donation Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              Support Our{' '}
              <span className="text-green-400">Green Mission</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mb-8 text-lg"
            >
              Your donation can plant more trees and change lives. Every rupee counts towards creating a greener planet.
            </motion.p>

            {/* Donation Tiers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {donationTiers.map((tier) => (
                <motion.button
                  key={tier.amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border-2 border-green-500/20 rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all"
                >
                  <div className="text-3xl mb-2">{tier.icon}</div>
                  <div className="font-semibold text-green-400">₹{tier.amount}</div>
                  <div className="text-xs text-gray-400">{tier.label}</div>
                </motion.button>
              ))}
            </motion.div>

            {/* Custom Amount */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm text-gray-400 mb-2">Custom Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-green-500/20 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Contribute
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - QR Code & UPI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg mb-8"
            >
              <div className="w-64 h-64 bg-slate-200 rounded-lg flex items-center justify-center text-center">
                <div>
                  <div className="text-6xl mb-2">📱</div>
                  <p className="text-sm text-slate-600">QR Code will appear here</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full text-center"
            >
              <p className="text-gray-400 mb-4">Or use UPI:</p>
              <div className="flex items-center gap-2 bg-slate-900 p-4 rounded-lg border border-green-500/20 mb-4">
                <input
                  type="text"
                  value={upiId}
                  readOnly
                  className="flex-1 bg-transparent text-green-400 font-semibold outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyUPI}
                  className="p-2 hover:bg-slate-800 rounded transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-green-400" />
                  )}
                </motion.button>
              </div>
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-400"
                >
                  ✓ Copied to clipboard!
                </motion.p>
              )}
            </motion.div>

            {/* Payment Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full flex gap-3 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-6 py-3 border-2 border-green-500 text-green-400 rounded-lg font-semibold hover:bg-green-500/10 transition-colors flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Scan QR
              </motion.button>
            </motion.div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Thank you for supporting nature! 🙏
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
