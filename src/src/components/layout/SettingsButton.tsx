
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function SettingsButton() {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate('/settings')}
        className="relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Settings className="h-4 w-4" />
        </motion.div>
      </Button>
    </motion.div>
  );
}
