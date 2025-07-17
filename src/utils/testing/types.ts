
/**
 * Types pour le système de tests automatisés
 */

export interface TestCase {
  name: string;
  description: string;
  test: () => Promise<TestResult> | TestResult;
  category: 'security' | 'performance' | 'functionality' | 'accessibility';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface TestResult {
  passed: boolean;
  message: string;
  duration: number;
  details?: any;
}

export interface TestSuite {
  name: string;
  tests: TestCase[];
  setup?: () => Promise<void> | void;
  teardown?: () => Promise<void> | void;
}

export interface TestReport {
  summary: { total: number; passed: number; failed: number; critical: number };
  suites: { name: string; passed: number; failed: number; duration: number }[];
  criticalFailures: { suite: string; test: string; message: string }[];
}
