// Password strength analysis utility
export class PasswordAnalyzer {
  static analyzePassword(password) {
    if (!password) {
      return {
        score: 0,
        strength: 'Very Weak',
        feedback: ['Password is required'],
        crackTime: 'Instantly',
        color: 'red'
      };
    }

    let score = 0;
    const feedback = [];
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      longLength: password.length >= 12,
      veryLongLength: password.length >= 16
    };

    // Length scoring
    if (checks.length) score += 2;
    else feedback.push('Use at least 8 characters');
    
    if (checks.longLength) score += 1;
    if (checks.veryLongLength) score += 1;

    // Character variety scoring
    if (checks.lowercase) score += 1;
    else feedback.push('Include lowercase letters');
    
    if (checks.uppercase) score += 1;
    else feedback.push('Include uppercase letters');
    
    if (checks.numbers) score += 1;
    else feedback.push('Include numbers');
    
    if (checks.symbols) score += 2;
    else feedback.push('Include special characters (!@#$%^&*)');

    // Common patterns penalty
    const commonPatterns = [
      /123456/,
      /password/i,
      /qwerty/i,
      /abc123/i,
      /admin/i,
      /letmein/i,
      /welcome/i,
      /monkey/i,
      /dragon/i,
      /master/i
    ];

    const hasCommonPattern = commonPatterns.some(pattern => pattern.test(password));
    if (hasCommonPattern) {
      score -= 2;
      feedback.push('Avoid common patterns and dictionary words');
    }

    // Repetitive characters penalty
    const hasRepetitive = /(.)\1{2,}/.test(password);
    if (hasRepetitive) {
      score -= 1;
      feedback.push('Avoid repetitive characters');
    }

    // Sequential characters penalty
    const hasSequential = this.hasSequentialChars(password);
    if (hasSequential) {
      score -= 1;
      feedback.push('Avoid sequential characters (abc, 123)');
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(8, score));

    const result = this.getStrengthInfo(score);
    result.crackTime = this.estimateCrackTime(password, score);
    result.feedback = feedback.length > 0 ? feedback : ['Great password!'];
    result.entropy = this.calculateEntropy(password);
    
    return result;
  }

  static hasSequentialChars(password) {
    const sequences = [
      'abcdefghijklmnopqrstuvwxyz',
      '0123456789',
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm'
    ];

    for (const seq of sequences) {
      for (let i = 0; i <= seq.length - 3; i++) {
        const subseq = seq.substring(i, i + 3);
        if (password.toLowerCase().includes(subseq)) {
          return true;
        }
      }
    }
    return false;
  }

  static getStrengthInfo(score) {
    if (score <= 2) {
      return { score, strength: 'Very Weak', color: '#ef4444', percentage: 20 };
    } else if (score <= 4) {
      return { score, strength: 'Weak', color: '#f97316', percentage: 40 };
    } else if (score <= 6) {
      return { score, strength: 'Medium', color: '#eab308', percentage: 60 };
    } else if (score <= 7) {
      return { score, strength: 'Strong', color: '#22c55e', percentage: 80 };
    } else {
      return { score, strength: 'Very Strong', color: '#16a34a', percentage: 100 };
    }
  }

  static estimateCrackTime(password, score) {
    const charset = this.getCharsetSize(password);
    const combinations = Math.pow(charset, password.length);
    
    // Assume 1 billion attempts per second (modern GPU)
    const attemptsPerSecond = 1e9;
    const secondsToCrack = combinations / (2 * attemptsPerSecond);

    if (secondsToCrack < 1) return 'Instantly';
    if (secondsToCrack < 60) return `${Math.round(secondsToCrack)} seconds`;
    if (secondsToCrack < 3600) return `${Math.round(secondsToCrack / 60)} minutes`;
    if (secondsToCrack < 86400) return `${Math.round(secondsToCrack / 3600)} hours`;
    if (secondsToCrack < 31536000) return `${Math.round(secondsToCrack / 86400)} days`;
    if (secondsToCrack < 31536000000) return `${Math.round(secondsToCrack / 31536000)} years`;
    
    const years = secondsToCrack / 31536000;
    if (years > 1e12) return 'Centuries';
    if (years > 1e9) return 'Billions of years';
    if (years > 1e6) return 'Millions of years';
    if (years > 1e3) return 'Thousands of years';
    
    return `${Math.round(years)} years`;
  }

  static getCharsetSize(password) {
    let size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/\d/.test(password)) size += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) size += 32;
    return size || 1;
  }

  static calculateEntropy(password) {
    const charset = this.getCharsetSize(password);
    return Math.log2(Math.pow(charset, password.length));
  }

  static generateSecurePassword(length = 16) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = '';
    
    // Ensure at least one character from each category
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}

