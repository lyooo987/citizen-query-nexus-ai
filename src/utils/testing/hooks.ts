
/**
 * Hook React pour les tests automatisés
 */

import { useState, useEffect } from 'react';
import { AutomatedTestRunner } from './testRunner';
import { TestReport } from './types';

const testRunner = new AutomatedTestRunner();

export function useTestRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<TestReport | null>(null);

  const runTests = async (suiteName?: string) => {
    setIsRunning(true);
    try {
      if (suiteName) {
        await testRunner.runSuite(suiteName);
      } else {
        await testRunner.runAllSuites();
      }
      setReport(testRunner.generateReport());
    } catch (error) {
      console.error('Test run failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    // Run tests on component mount
    runTests();
  }, []);

  return { isRunning, report, runTests };
}
