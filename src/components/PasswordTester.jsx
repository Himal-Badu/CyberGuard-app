import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, RefreshCw, Copy, Check } from 'lucide-react';
import { PasswordAnalyzer } from '../lib/passwordAnalyzer';

export function PasswordTester() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const result = PasswordAnalyzer.analyzePassword(password);
    setAnalysis(result);
  }, [password]);

  const generatePassword = () => {
    const newPassword = PasswordAnalyzer.generateSecurePassword(16);
    setPassword(newPassword);
  };

  const copyPassword = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔐 Password Strength Tester
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password to test its strength..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="h-8 w-8 p-0"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              {password && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyPassword}
                  className="h-8 w-8 p-0"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generatePassword} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Generate Secure Password
            </Button>
          </div>

          {analysis && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Password Strength</span>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      borderColor: analysis.color,
                      color: analysis.color 
                    }}
                  >
                    {analysis.strength}
                  </Badge>
                </div>
                <Progress 
                  value={analysis.percentage} 
                  className="h-2"
                  style={{
                    '--progress-background': analysis.color
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Security Metrics</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Length:</span>
                      <span>{password.length} characters</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entropy:</span>
                      <span>{analysis.entropy?.toFixed(1)} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crack Time:</span>
                      <span className="font-medium">{analysis.crackTime}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    {analysis.feedback.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

