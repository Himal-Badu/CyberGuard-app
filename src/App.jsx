import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Zap, BookOpen, User, Star, Github, Linkedin } from 'lucide-react'
import { PasswordTester } from './components/PasswordTester'
import { BruteForceSimulator } from './components/BruteForceSimulator'
import { EducationHub } from './components/EducationHub'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('tester')

  const tabs = [
    { id: 'tester', label: 'Password Tester', icon: Lock },
    { id: 'simulator', label: 'Brute Force Demo', icon: Zap },
    { id: 'education', label: 'Learn Security', icon: BookOpen },
    { id: 'about', label: 'About', icon: User }
  ]

  return (
    <div className="min-h-screen hero-background">
      <div className="container mx-auto px-4 py-8 hero-content">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-white floating-icon glow-effect" />
            <h1 className="text-4xl font-bold text-white gradient-text">
              CyberGuard
            </h1>
          </div>
          <p className="text-lg text-white/90 mb-2">
            Password Security & Cybersecurity Education Tool
          </p>
          <Badge variant="outline" className="text-sm bg-white/10 text-white border-white/20 backdrop-blur-sm">
            <Star className="h-3 w-3 mr-1" />
            Created by Himal Badu • Age 16 • Cybersecurity Enthusiast
          </Badge>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'tester' && (
            <div className="card-hover">
              <PasswordTester />
            </div>
          )}
          {activeTab === 'simulator' && (
            <div className="card-hover">
              <BruteForceSimulator />
            </div>
          )}
          {activeTab === 'education' && (
            <div className="card-hover">
              <EducationHub />
            </div>
          )}
          {activeTab === 'about' && (
            <Card className="card-hover bg-white/95 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  About CyberGuard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        About the Creator
                      </h3>
                      <p className="text-muted-foreground">
                        CyberGuard was created by Himal Badu, a 16-year-old cybersecurity enthusiast 
                        passionate about making cybersecurity education accessible to everyone. This tool 
                        represents his commitment to helping people understand and implement better security practices.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Mission</h3>
                      <p className="text-muted-foreground">
                        To help people understand password security and protect themselves from 
                        cyber threats through interactive tools and educational content. We believe 
                        that cybersecurity education should be accessible, engaging, and practical.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Features</h3>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Real-time password strength analysis with detailed feedback</li>
                        <li>• Interactive brute force attack simulation with custom targets</li>
                        <li>• Comprehensive cybersecurity education modules</li>
                        <li>• Knowledge quiz to test understanding</li>
                        <li>• Security recommendations and best practices</li>
                        <li>• Modern, responsive design for all devices</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Connect with Himal</h3>
                      <div className="flex gap-2 flex-wrap">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => window.open('https://x.com/himal_badu666', '_blank')}
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                          X (Twitter)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Why This Matters</h3>
                  <p className="text-muted-foreground">
                    Cybersecurity threats are growing every day, and passwords remain one of the most 
                    common attack vectors. By understanding how to create strong passwords and recognize 
                    security threats, we can all contribute to a safer digital world.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg neon-border">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Educational Purpose:</strong> This tool is designed for educational purposes 
                    to help users understand cybersecurity concepts. Always follow your organization's 
                    security policies and use official security tools for production environments.
                  </p>
                </div>
                
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Made with ❤️ by a young cybersecurity enthusiast
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
