
/**
 * Classe principale pour l'exécution des tests automatisés
 */

import { TestSuite, TestResult, TestReport } from './types';
import { 
  createSecurityTestSuite, 
  createPerformanceTestSuite, 
  createFunctionalityTestSuite, 
  createAccessibilityTestSuite 
} from './testSuites';

export class AutomatedTestRunner {
  private testSuites: TestSuite[] = [];
  private results: Map<string, TestResult[]> = new Map();

  constructor() {
    this.initializeCoreSuites();
  }

  private initializeCoreSuites() {
    this.addSuite(createSecurityTestSuite());
    this.addSuite(createPerformanceTestSuite());
    this.addSuite(createFunctionalityTestSuite());
    this.addSuite(createAccessibilityTestSuite());
  }

  addSuite(suite: TestSuite) {
    this.testSuites.push(suite);
  }

  async runSuite(suiteName: string): Promise<TestResult[]> {
    const suite = this.testSuites.find(s => s.name === suiteName);
    if (!suite) {
      throw new Error(`Test suite "${suiteName}" not found`);
    }

    console.log(`🧪 Running test suite: ${suiteName}`);
    
    // Setup
    if (suite.setup) {
      await suite.setup();
    }

    const results: TestResult[] = [];

    // Run tests
    for (const testCase of suite.tests) {
      console.log(`  • Running: ${testCase.name}`);
      const start = performance.now();
      
      try {
        const result = await testCase.test();
        result.duration = performance.now() - start;
        results.push(result);
        
        console.log(`    ${result.passed ? '✅' : '❌'} ${result.message}`);
      } catch (error) {
        const result: TestResult = {
          passed: false,
          message: `Test failed: ${error}`,
          duration: performance.now() - start
        };
        results.push(result);
        console.log(`    ❌ ${result.message}`);
      }
    }

    // Teardown
    if (suite.teardown) {
      await suite.teardown();
    }

    this.results.set(suiteName, results);
    return results;
  }

  async runAllSuites(): Promise<Map<string, TestResult[]>> {
    console.log('🚀 Running all test suites...');
    
    for (const suite of this.testSuites) {
      await this.runSuite(suite.name);
    }

    return this.results;
  }

  generateReport(): TestReport {
    let totalTests = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let criticalFailures = 0;

    const suites = Array.from(this.results.entries()).map(([suiteName, results]) => {
      const passed = results.filter(r => r.passed).length;
      const failed = results.filter(r => !r.passed).length;
      const duration = results.reduce((sum, r) => sum + r.duration, 0);

      totalTests += results.length;
      totalPassed += passed;
      totalFailed += failed;

      return { name: suiteName, passed, failed, duration };
    });

    const criticalFailuresList: { suite: string; test: string; message: string }[] = [];
    
    this.testSuites.forEach(suite => {
      const results = this.results.get(suite.name) || [];
      suite.tests.forEach((test, index) => {
        const result = results[index];
        if (result && !result.passed && test.priority === 'critical') {
          criticalFailures++;
          criticalFailuresList.push({
            suite: suite.name,
            test: test.name,
            message: result.message
          });
        }
      });
    });

    return {
      summary: {
        total: totalTests,
        passed: totalPassed,
        failed: totalFailed,
        critical: criticalFailures
      },
      suites,
      criticalFailures: criticalFailuresList
    };
  }

  scheduleAutomaticTests(intervalMinutes: number = 60) {
    setInterval(async () => {
      console.log('🔄 Running scheduled tests...');
      await this.runAllSuites();
      const report = this.generateReport();
      
      if (report.summary.critical > 0) {
        console.warn('🚨 Critical test failures detected!', report.criticalFailures);
      }
    }, intervalMinutes * 60 * 1000);
  }
}
