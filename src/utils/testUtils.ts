
/**
 * Utilitaires de test pour l'application
 */

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  duration: number;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  passed: number;
  failed: number;
  totalDuration: number;
}

class TestRunner {
  private testSuites: TestSuite[] = [];

  async runTest(name: string, testFn: () => Promise<void> | void): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      await testFn();
      const duration = performance.now() - startTime;
      return {
        name,
        passed: true,
        duration
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        name,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
        duration
      };
    }
  }

  async runSuite(suiteName: string, tests: Array<{ name: string; test: () => Promise<void> | void }>) {
    const results: TestResult[] = [];
    
    for (const { name, test } of tests) {
      const result = await this.runTest(name, test);
      results.push(result);
    }

    const suite: TestSuite = {
      name: suiteName,
      tests: results,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      totalDuration: results.reduce((sum, r) => sum + r.duration, 0)
    };

    this.testSuites.push(suite);
    return suite;
  }

  getReport() {
    return {
      suites: this.testSuites,
      totalPassed: this.testSuites.reduce((sum, s) => sum + s.passed, 0),
      totalFailed: this.testSuites.reduce((sum, s) => sum + s.failed, 0),
      totalDuration: this.testSuites.reduce((sum, s) => sum + s.totalDuration, 0)
    };
  }

  clear() {
    this.testSuites = [];
  }
}

export const testRunner = new TestRunner();

// Tests de composants critiques
export const runCriticalTests = async () => {
  // Test de sécurité
  await testRunner.runSuite('Security Tests', [
    {
      name: 'Input sanitization',
      test: async () => {
        const { sanitizeInput } = await import('@/utils/security');
        const maliciousInput = '<script>alert("xss")</script>';
        const sanitized = sanitizeInput(maliciousInput);
        if (sanitized.includes('<script>')) {
          throw new Error('XSS vulnerability detected');
        }
      }
    },
    {
      name: 'Email validation',
      test: async () => {
        const { validateEmail } = await import('@/utils/security');
        if (!validateEmail('test@example.com')) {
          throw new Error('Valid email rejected');
        }
        if (validateEmail('invalid-email')) {
          throw new Error('Invalid email accepted');
        }
      }
    }
  ]);

  // Test de performance
  await testRunner.runSuite('Performance Tests', [
    {
      name: 'Cache functionality',
      test: async () => {
        const { enhancedCache } = await import('@/utils/enhancedCache');
        enhancedCache.set('test-key', { data: 'test' }, 1000);
        const cached = enhancedCache.get('test-key');
        if (!cached) {
          throw new Error('Cache not working properly');
        }
      }
    },
    {
      name: 'Debounce function',
      test: async () => {
        const { debounce } = await import('@/utils/performance');
        let callCount = 0;
        const debouncedFn = debounce(() => callCount++, 100);
        
        debouncedFn();
        debouncedFn();
        debouncedFn();
        
        // Attendre que le debounce se déclenche
        await new Promise(resolve => setTimeout(resolve, 150));
        
        if (callCount !== 1) {
          throw new Error(`Expected 1 call, got ${callCount}`);
        }
      }
    }
  ]);

  return testRunner.getReport();
};

// Fonction utilitaire pour simuler des actions utilisateur
export const simulateUserAction = (element: HTMLElement, action: 'click' | 'input', value?: string) => {
  switch (action) {
    case 'click':
      element.click();
      break;
    case 'input':
      if (element instanceof HTMLInputElement && value !== undefined) {
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
      }
      break;
  }
};
