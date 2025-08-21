import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Zap, AlertTriangle, Target, Lock, Clock, Shield } from 'lucide-react'

export function BruteForceSimulator() {
  const [targetPassword, setTargetPassword] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [currentAttempt, setCurrentAttempt] = useState('')
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [attemptsPerSecond] = useState(1000000) // 1 million attempts per second
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [maxCombinations, setMaxCombinations] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState('')
  const [showEstimation, setShowEstimation] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  // Character sets for brute force
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

  // Calculate maximum combinations and estimated time
  useEffect(() => {
    if (targetPassword) {
      const combinations = Math.pow(charset.length, targetPassword.length)
      setMaxCombinations(combinations)
      
      // Calculate estimated time to crack (average case is half of all combinations)
      const averageCombinations = combinations / 2
      const secondsTocrack = averageCombinations / attemptsPerSecond
      setEstimatedTime(formatEstimatedTime(secondsTocrack))
    }
  }, [targetPassword, attemptsPerSecond])

  // Format estimated time in human readable format
  const formatEstimatedTime = (seconds) => {
    if (seconds < 1) return 'Less than 1 second'
    if (seconds < 60) return `${seconds.toFixed(1)} seconds`
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} days`
    if (seconds < 31536000000) return `${(seconds / 31536000).toFixed(1)} years`
    return `${(seconds / 31536000000).toFixed(1)} decades`
  }

  // Check if password is considered strong
  const isStrongPassword = (password) => {
    return password.length >= 8 && 
           /[a-z]/.test(password) && 
           /[A-Z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[!@#$%^&*]/.test(password)
  }

  // Generate random attempt string
  const generateAttempt = (length) => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return result
  }

  // Analyze password and show estimation
  const analyzePassword = async () => {
    if (!targetPassword.trim()) {
      alert('Please enter a target password first!')
      return
    }

    setIsAnalyzing(true)
    setShowEstimation(false)

    // Simulate analysis time
    setTimeout(() => {
      setShowEstimation(true)
      setIsAnalyzing(false)
    }, 2000)
  }

  // Start brute force simulation
  const startAttack = () => {
    if (!targetPassword.trim()) {
      alert('Please enter a target password first!')
      return
    }

    setIsRunning(true)
    setIsComplete(false)
    setTotalAttempts(0)
    setTimeElapsed(0)
    setProgress(0)
    setShowEstimation(false)
    startTimeRef.current = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      setTimeElapsed(elapsed)

      // Simulate attempts
      const attemptsThisSecond = attemptsPerSecond / 10 // Slower for visual effect
      setTotalAttempts(prev => {
        const newTotal = prev + attemptsThisSecond
        
        // Calculate progress
        const progressPercent = Math.min((newTotal / maxCombinations) * 100, 100)
        setProgress(progressPercent)

        // Generate current attempt
        const attempt = generateAttempt(targetPassword.length)
        setCurrentAttempt(attempt)

        // Check if we should "find" the password
        // For strong passwords, simulate longer time, for weak ones, find quickly
        const shouldComplete = isStrongPassword(targetPassword) 
          ? elapsed > 15 || progressPercent >= 95 // Strong passwords take longer
          : elapsed > 5 || progressPercent >= 50   // Weak passwords crack faster

        if (attempt === targetPassword || shouldComplete) {
          setCurrentAttempt(targetPassword)
          setIsComplete(true)
          setIsRunning(false)
          setProgress(100)
          clearInterval(intervalRef.current)
        }

        return newTotal
      })
    }, 100) // Update every 100ms for smooth animation
  }

  // Reset simulation
  const resetAttack = () => {
    setIsRunning(false)
    setIsComplete(false)
    setTotalAttempts(0)
    setTimeElapsed(0)
    setProgress(0)
    setCurrentAttempt('')
    setShowEstimation(false)
    setIsAnalyzing(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toString()
  }

  // Format time
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds.toFixed(1)}s`
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)}m`
    return `${(seconds / 3600).toFixed(1)}h`
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Brute Force Attack Simulator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Educational demonstration of how brute force attacks work. Set your own target password to see how long it takes to crack.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Target Password Input */}
        <div className="space-y-2">
          <Label htmlFor="target-password" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Target Password
          </Label>
          <Input
            id="target-password"
            type="text"
            placeholder="Enter the password to crack (e.g., abc123, MyStr0ng!Pass)"
            value={targetPassword}
            onChange={(e) => setTargetPassword(e.target.value)}
            disabled={isRunning}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            This password will be the target for the brute force simulation
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={analyzePassword} 
            disabled={isRunning || !targetPassword.trim() || isAnalyzing}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Estimate Crack Time'}
          </Button>
          <Button 
            onClick={startAttack} 
            disabled={isRunning || !targetPassword.trim()}
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Start Attack
          </Button>
          <Button onClick={resetAttack} variant="outline">
            Reset
          </Button>
        </div>

        {/* Time Estimation Display */}
        {showEstimation && !isRunning && (
          <div className={`p-4 border rounded-lg ${
            isStrongPassword(targetPassword) 
              ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-start gap-2">
              {isStrongPassword(targetPassword) ? (
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <h4 className={`font-semibold mb-2 ${
                  isStrongPassword(targetPassword) 
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  Password Strength Analysis
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Password Type:</span>
                    <Badge variant={isStrongPassword(targetPassword) ? "default" : "destructive"}>
                      {isStrongPassword(targetPassword) ? "Strong" : "Weak"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Possible Combinations:</span>
                    <span className="font-mono">{formatNumber(maxCombinations)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Crack Time:</span>
                    <span className="font-semibold">{estimatedTime}</span>
                  </div>
                </div>
                <p className={`mt-2 text-xs ${
                  isStrongPassword(targetPassword) 
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {isStrongPassword(targetPassword) 
                    ? "This password would take a very long time to crack with brute force!"
                    : "This password is vulnerable and can be cracked quickly!"
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {(isRunning || isComplete) && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Attack Progress</span>
              <span>{progress.toFixed(2)}%</span>
            </div>
            <Progress value={progress} className="progress-bar-animated" />
            {isComplete && (
              <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                <Lock className="h-3 w-3" />
                Password Cracked!
              </Badge>
            )}
          </div>
        )}

        {/* Attack Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Attack Statistics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current Attempt:</span>
                <span className="font-mono text-right break-all max-w-32">
                  {currentAttempt || '---'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Attempts:</span>
                <span>{formatNumber(totalAttempts)}</span>
              </div>
              <div className="flex justify-between">
                <span>Attempts/Second:</span>
                <span>{formatNumber(attemptsPerSecond)}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Elapsed:</span>
                <span>{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Attack Method</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Method:</span>
                <span>Brute Force</span>
              </div>
              <div className="flex justify-between">
                <span>Character Set:</span>
                <span>a-z, A-Z, 0-9, !@#$%^&*</span>
              </div>
              <div className="flex justify-between">
                <span>Max Combinations:</span>
                <span>{formatNumber(maxCombinations)}</span>
              </div>
              <div className="flex justify-between">
                <span>Target Length:</span>
                <span>{targetPassword.length} characters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Note */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                Educational Note:
              </p>
              <p className="text-yellow-700 dark:text-yellow-300">
                This is a simplified simulation. Real brute force attacks can take much longer depending on 
                password complexity, security measures, and computing power. Always use strong, unique passwords 
                and enable additional security measures like two-factor authentication.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

