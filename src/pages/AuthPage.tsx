// @ts-nocheck
import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Spinner } from '../components/ui/spinner';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';
import { validateEmail, validatePassword, validateName, validatePhone, validateConfirmPassword, validateRequired, FormErrors, hasFormErrors } from '../lib/validation';
import { FieldError } from '../components/FieldError';
import { addisLocations } from '../lib/data';

interface AuthPageProps {
  onNavigate: (page: string, role?: 'freelancer' | 'client') => void;
}

export function AuthPage({ onNavigate }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userRole, setUserRole] = useState<'freelancer' | 'client'>('freelancer');
  const { formLoading, setFormLoading } = useLoading();
  const { addError } = useError();
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    location: '',
    confirmPassword: ''
  });
  
  // Form errors
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: [] }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (authMode === 'signin') {
      // Sign-in validation
      const emailResult = validateEmail(formData.email);
      if (!emailResult.isValid) newErrors.email = emailResult.errors;
      
      const passwordResult = validateRequired(formData.password, 'Password');
      if (!passwordResult.isValid) newErrors.password = passwordResult.errors;
    } else {
      // Sign-up validation
      const nameResult = validateName(formData.name);
      if (!nameResult.isValid) newErrors.name = nameResult.errors;
      
      const emailResult = validateEmail(formData.email);
      if (!emailResult.isValid) newErrors.email = emailResult.errors;
      
      const phoneResult = validatePhone(formData.phone);
      if (!phoneResult.isValid) newErrors.phone = phoneResult.errors;
      
      const locationResult = validateRequired(formData.location, 'Location');
      if (!locationResult.isValid) newErrors.location = locationResult.errors;
      
      const passwordResult = validatePassword(formData.password);
      if (!passwordResult.isValid) newErrors.password = passwordResult.errors;
      
      const confirmPasswordResult = validateConfirmPassword(formData.password, formData.confirmPassword);
      if (!confirmPasswordResult.isValid) newErrors.confirmPassword = confirmPasswordResult.errors;
    }
    
    setErrors(newErrors);
    return !hasFormErrors(newErrors);
  };

  const handleAuth = () => {
    if (!validateForm()) {
      addError({
        type: 'validation',
        message: 'Please fix the errors below',
        details: 'Check all required fields and correct any validation errors'
      });
      return;
    }

    setFormLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (authMode === 'signin') {
        // Check for specific credentials
        if (formData.email === 'israelseleshi09@gmail.com' && formData.password === '12345678') {
          setFormLoading(false);
          onNavigate(userRole === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard', userRole);
        } else {
          setFormLoading(false);
          addError({
            type: 'api',
            message: 'Invalid email or password',
            details: 'Please check your credentials and try again'
          });
        }
      } else {
        // For signup, simulate success
        setFormLoading(false);
        onNavigate(userRole === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard', userRole);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFB300]/5 via-white to-[#0A2239]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand info */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFB300] to-[#FF8F00] shadow-lg">
              <span className="text-2xl font-bold text-[#0A2239]">AG</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0A2239]">Addis GigFind</h2>
              <div className="h-1 w-full bg-gradient-to-r from-[#FFB300] to-transparent rounded-full"></div>
            </div>
          </div>
          <p className="text-lg text-[#717182] px-4">
            Connect with trusted local talent in <span className="font-semibold text-[#0A2239]">Addis Ababa</span>
          </p>
        </div>

        {/* Auth form */}
        <Card className="border-2 border-[#FFB300]/20 shadow-2xl backdrop-blur-sm bg-white/95">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl text-center text-[#0A2239] font-bold">
              {authMode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
            </CardTitle>
            <CardDescription className="text-center text-lg">
              {authMode === 'signin'
                ? 'Sign in to continue to your dashboard'
                : 'Join Addis GigFind today'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="signin" className="w-full" onValueChange={(v) => setAuthMode(v as 'signin' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={`h-11 border-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <FieldError errors={errors.email} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password *</Label>
                    <Button variant="link" className="p-0 h-auto text-[#FFB300]">
                      Forgot?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={`h-11 border-2 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <FieldError errors={errors.password} />
                </div>

                <Button
                  className="w-full h-11 bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
                  onClick={handleAuth}
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>I want to</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={userRole === 'freelancer' ? 'default' : 'outline'}
                      className={userRole === 'freelancer' ? 'bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]' : ''}
                      onClick={() => setUserRole('freelancer')}
                    >
                      Find Gigs
                    </Button>
                    <Button
                      type="button"
                      variant={userRole === 'client' ? 'default' : 'outline'}
                      className={userRole === 'client' ? 'bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]' : ''}
                      onClick={() => setUserRole('client')}
                    >
                      Hire Talent
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Abebe Kebede"
                    className={`h-11 border-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                  <FieldError errors={errors.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email *</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    className={`h-11 border-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <FieldError errors={errors.email} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+251 9XX XXX XXX"
                    className={`h-11 border-2 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  <FieldError errors={errors.phone} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location in Addis Ababa *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger className={`h-11 border-2 ${errors.location ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}>
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                    <SelectContent>
                      {addisLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={errors.location} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password *</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className={`h-11 border-2 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <FieldError errors={errors.password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password *</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className={`h-11 border-2 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-[#FFB300]/30 focus:border-[#FFB300] hover:border-[#FFB300]/50'} transition-colors`}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                  <FieldError errors={errors.confirmPassword} />
                </div>

                <Button
                  className="w-full h-11 bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
                  onClick={handleAuth}
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      Creating Account...
                    </div>
                  ) : (
                    `Join as ${userRole === 'freelancer' ? 'Freelancer' : 'Client'}`
                  )}
                </Button>

                <p className="text-xs text-center text-[#717182]">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#717182]">
                Connecting Addis Ababa's talent community
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
