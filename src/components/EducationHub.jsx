import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Lightbulb,
  Target,
  Users
} from 'lucide-react';

export function EducationHub() {
  const [completedLessons, setCompletedLessons] = useState(new Set());

  const markLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const lessons = [
    {
      id: 'password-basics',
      title: 'Password Security Fundamentals',
      icon: Lock,
      difficulty: 'Beginner',
      duration: '5 min',
      content: {
        overview: 'Learn the essential principles of creating and managing secure passwords.',
        keyPoints: [
          'Passwords are your first line of defense against cyber attacks',
          'Weak passwords can be cracked in seconds by modern computers',
          'Strong passwords should be long, random, and unique for each account',
          'Password managers make it easy to use strong passwords everywhere'
        ],
        tips: [
          'Use at least 16 characters for maximum security',
          'Include a mix of uppercase, lowercase, numbers, and symbols',
          'Avoid personal information like birthdays or pet names',
          'Never reuse passwords across multiple accounts',
          'Consider using passphrases with 4-7 unrelated words'
        ],
        examples: {
          weak: ['password123', 'john1990', 'qwerty', '123456789'],
          strong: ['Tr0ub4dor&3', 'correct horse battery staple', 'Xk9#mP2$vL8@nQ5!']
        }
      }
    },
    {
      id: 'brute-force',
      title: 'Understanding Brute Force Attacks',
      icon: Target,
      difficulty: 'Intermediate',
      duration: '7 min',
      content: {
        overview: 'Discover how brute force attacks work and how to defend against them.',
        keyPoints: [
          'Brute force attacks try every possible password combination',
          'Modern computers can try billions of passwords per second',
          'Longer passwords exponentially increase crack time',
          'Additional security measures can stop brute force attacks'
        ],
        defenses: [
          'Use long, complex passwords (16+ characters)',
          'Enable account lockouts after failed attempts',
          'Implement rate limiting on login attempts',
          'Use multi-factor authentication (MFA)',
          'Monitor for suspicious login activity'
        ],
        timeEstimates: {
          '8 characters (simple)': 'Minutes to hours',
          '8 characters (complex)': 'Days to weeks',
          '12 characters (complex)': 'Centuries',
          '16 characters (complex)': 'Billions of years'
        }
      }
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering Awareness',
      icon: Users,
      difficulty: 'Intermediate',
      duration: '6 min',
      content: {
        overview: 'Learn about social engineering tactics and how to recognize them.',
        keyPoints: [
          'Social engineering exploits human psychology, not technology',
          'Attackers use trust, urgency, and authority to manipulate victims',
          'Common tactics include phishing, pretexting, and baiting',
          'Awareness and verification are your best defenses'
        ],
        commonTactics: [
          'Phishing emails that look legitimate',
          'Phone calls claiming to be from IT support',
          'Fake websites that steal login credentials',
          'USB drives left in public places',
          'Impersonation of authority figures'
        ],
        redFlags: [
          'Urgent requests for sensitive information',
          'Unexpected emails asking for passwords',
          'Pressure to act quickly without verification',
          'Requests to bypass normal security procedures',
          'Offers that seem too good to be true'
        ]
      }
    },
    {
      id: 'digital-hygiene',
      title: 'Digital Hygiene Best Practices',
      icon: Shield,
      difficulty: 'Beginner',
      duration: '8 min',
      content: {
        overview: 'Essential habits for maintaining good cybersecurity hygiene.',
        keyPoints: [
          'Regular security practices protect against most threats',
          'Software updates fix security vulnerabilities',
          'Backups protect against data loss from attacks',
          'Privacy settings control who can access your information'
        ],
        dailyHabits: [
          'Check for and install software updates',
          'Review privacy settings on social media',
          'Use secure networks for sensitive activities',
          'Log out of accounts when finished',
          'Be cautious about what you share online'
        ],
        weeklyHabits: [
          'Review account activity for suspicious behavior',
          'Update passwords for critical accounts',
          'Back up important data',
          'Clean up old accounts and apps',
          'Review and update security settings'
        ]
      }
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What makes a password strong?",
      options: [
        "Using your birthday",
        "Long, random, and unique",
        "Using common words",
        "Making it easy to remember"
      ],
      correct: 1,
      explanation: "Strong passwords are long (16+ characters), random (unpredictable), and unique (different for each account)."
    },
    {
      id: 2,
      question: "How long would it take to crack a 16-character complex password?",
      options: [
        "Minutes",
        "Hours",
        "Years",
        "Billions of years"
      ],
      correct: 3,
      explanation: "A 16-character complex password would take billions of years to crack with current technology."
    },
    {
      id: 3,
      question: "What is the best defense against social engineering?",
      options: [
        "Strong passwords",
        "Antivirus software",
        "Awareness and verification",
        "Firewalls"
      ],
      correct: 2,
      explanation: "Social engineering attacks target human psychology, so awareness and verification of requests are the best defenses."
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === quizQuestions[currentQuiz].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Cybersecurity Education Hub
          </CardTitle>
          <p className="text-muted-foreground">
            Learn essential cybersecurity concepts to protect yourself and others online.
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">Interactive Lessons</TabsTrigger>
          <TabsTrigger value="quiz">Knowledge Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          {lessons.map((lesson) => {
            const Icon = lesson.icon;
            const isCompleted = completedLessons.has(lesson.id);
            
            return (
              <Card key={lesson.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{lesson.difficulty}</Badge>
                          <Badge variant="outline">{lesson.duration}</Badge>
                          {isCompleted && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{lesson.content.overview}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Key Points
                    </h4>
                    <ul className="space-y-1">
                      {lesson.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {lesson.content.tips && (
                    <div>
                      <h4 className="font-semibold mb-2">Best Practices</h4>
                      <ul className="space-y-1">
                        {lesson.content.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lesson.content.examples && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                          <XCircle className="h-4 w-4" />
                          Weak Examples
                        </h4>
                        <ul className="space-y-1">
                          {lesson.content.examples.weak.map((example, index) => (
                            <li key={index} className="text-sm font-mono bg-red-50 dark:bg-red-950 p-2 rounded">
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          Strong Examples
                        </h4>
                        <ul className="space-y-1">
                          {lesson.content.examples.strong.map((example, index) => (
                            <li key={index} className="text-sm font-mono bg-green-50 dark:bg-green-950 p-2 rounded">
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {lesson.content.defenses && (
                    <div>
                      <h4 className="font-semibold mb-2">Defense Strategies</h4>
                      <ul className="space-y-1">
                        {lesson.content.defenses.map((defense, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {defense}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lesson.content.timeEstimates && (
                    <div>
                      <h4 className="font-semibold mb-2">Crack Time Estimates</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(lesson.content.timeEstimates).map(([type, time]) => (
                          <div key={type} className="flex justify-between p-2 bg-muted rounded text-sm">
                            <span>{type}:</span>
                            <span className="font-medium">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => markLessonComplete(lesson.id)}
                    disabled={isCompleted}
                    className="w-full"
                  >
                    {isCompleted ? 'Lesson Completed' : 'Mark as Complete'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cybersecurity Knowledge Quiz</CardTitle>
              <p className="text-muted-foreground">
                Test your understanding of cybersecurity concepts.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuiz < quizQuestions.length ? (
                <>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Question {currentQuiz + 1} of {quizQuestions.length}
                    </Badge>
                    <Badge variant="outline">
                      Score: {quizScore}/{currentQuiz + (showExplanation ? 1 : 0)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {quizQuestions[currentQuiz].question}
                    </h3>
                    
                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            showExplanation
                              ? index === quizQuestions[currentQuiz].correct
                                ? "default"
                                : index === selectedAnswer
                                ? "destructive"
                                : "outline"
                              : selectedAnswer === index
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() => !showExplanation && handleQuizAnswer(index)}
                          disabled={showExplanation}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    
                    {showExplanation && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm">
                          <strong>Explanation:</strong> {quizQuestions[currentQuiz].explanation}
                        </p>
                      </div>
                    )}
                    
                    {showExplanation && currentQuiz < quizQuestions.length - 1 && (
                      <Button onClick={nextQuestion} className="w-full">
                        Next Question
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Quiz Complete!</h3>
                  <p className="text-lg">
                    Your Score: {quizScore}/{quizQuestions.length}
                  </p>
                  <p className="text-muted-foreground">
                    {quizScore === quizQuestions.length
                      ? "Perfect! You have excellent cybersecurity knowledge."
                      : quizScore >= quizQuestions.length * 0.7
                      ? "Great job! You have a good understanding of cybersecurity."
                      : "Keep learning! Review the lessons to improve your knowledge."}
                  </p>
                  <Button onClick={resetQuiz} className="w-full">
                    Retake Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

