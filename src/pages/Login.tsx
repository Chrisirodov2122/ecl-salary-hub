import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ParticleBackground from '@/components/ParticleBackground';
import eclLogo from '@/assets/ecl-logo.png';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = login(employeeId, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: 'linear-gradient(135deg, hsl(222 58% 8%) 0%, hsl(222 47% 15%) 25%, hsl(215 35% 18%) 50%, hsl(222 47% 12%) 75%, hsl(222 58% 8%) 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Particle animation */}
      <ParticleBackground />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 w-full max-w-md mx-4 ${isShaking ? 'shake' : ''}`}
      >
        <div className="glass-card p-8 md:p-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <img src={eclLogo} alt="ECL Logo" className="h-20 object-contain" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-center text-foreground mb-2"
          >
            ECL Employee Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground text-center mb-8 text-sm"
          >
            Salary Sight - View your earnings
          </motion.p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Employee ID */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="input-field pl-12"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Remember me & Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </button>
            </motion.div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm text-center bg-destructive/10 py-2 px-4 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                Sign In
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </form>

          {/* Demo credentials hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-xs text-muted-foreground text-center mt-6"
          >
            Demo: admin / admin123
          </motion.p>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center mt-6 text-sm text-white/50"
        >
          <p>Copyright © 2024 Eastern Coalfields. All rights reserved.</p>
          <p className="mt-1">@aunicorn</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
