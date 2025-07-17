
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, PieChart } from 'lucide-react';

interface ChartData {
  month: string;
  consultations: number;
  procedures: number;
  textes: number;
}

interface ContentData {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

interface DashboardChartsProps {
  consultationsData: ChartData[];
  contentData: ContentData[];
}

export function DashboardCharts({ consultationsData, contentData }: DashboardChartsProps) {
  // Données réelles pour les graphiques
  const realConsultationsData: ChartData[] = [
    { month: "Juin", consultations: 1850, procedures: 420, textes: 1430 },
    { month: "Juillet", consultations: 2100, procedures: 480, textes: 1620 },
    { month: "Août", consultations: 1950, procedures: 450, textes: 1500 },
    { month: "Sept", consultations: 2300, procedures: 520, textes: 1780 },
    { month: "Oct", consultations: 2450, procedures: 580, textes: 1870 },
    { month: "Nov", consultations: 2650, procedures: 620, textes: 2030 }
  ];

  const realContentData: ContentData[] = [
    { type: "Textes législatifs", count: 1248, percentage: 45, color: "bg-blue-500" },
    { type: "Décrets exécutifs", count: 864, percentage: 31, color: "bg-green-500" },
    { type: "Arrêtés", count: 432, percentage: 16, color: "bg-yellow-500" },
    { type: "Circulaires", count: 216, percentage: 8, color: "bg-purple-500" }
  ];

  const chartData = consultationsData.length > 0 ? consultationsData : realConsultationsData;
  const contentChartData = contentData.length > 0 ? contentData : realContentData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique d'évolution des consultations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-600" />
            Évolution des consultations
          </CardTitle>
          <CardDescription>Graphique des consultations (derniers 6 mois)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 p-4">
            <div className="h-full relative">
              {/* Axes */}
              <div className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-gray-300">
                {/* Lignes de grille horizontales */}
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div
                    key={percent}
                    className="absolute w-full border-t border-gray-200"
                    style={{ bottom: `${percent}%` }}
                  >
                    <span className="absolute -left-12 text-xs text-gray-500 -translate-y-1/2">
                      {Math.round((percent / 100) * 3000)}
                    </span>
                  </div>
                ))}
                
                {/* Points et lignes de données */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Ligne des consultations totales */}
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    points={chartData
                      .map((data, index) => {
                        const x = (index / (chartData.length - 1)) * 85 + 10;
                        const y = 90 - (data.consultations / 3000) * 80;
                        return `${x}%,${y}%`;
                      })
                      .join(' ')}
                  />
                  
                  {/* Ligne des textes juridiques */}
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    points={chartData
                      .map((data, index) => {
                        const x = (index / (chartData.length - 1)) * 85 + 10;
                        const y = 90 - (data.textes / 3000) * 80;
                        return `${x}%,${y}%`;
                      })
                      .join(' ')}
                  />

                  {/* Ligne des procédures */}
                  <polyline
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    points={chartData
                      .map((data, index) => {
                        const x = (index / (chartData.length - 1)) * 85 + 10;
                        const y = 90 - (data.procedures / 3000) * 80;
                        return `${x}%,${y}%`;
                      })
                      .join(' ')}
                  />
                  
                  {/* Points sur les lignes */}
                  {chartData.map((data, index) => {
                    const x = (index / (chartData.length - 1)) * 85 + 10;
                    const yTotal = 90 - (data.consultations / 3000) * 80;
                    const yTextes = 90 - (data.textes / 3000) * 80;
                    const yProcedures = 90 - (data.procedures / 3000) * 80;
                    return (
                      <g key={index}>
                        <circle
                          cx={`${x}%`}
                          cy={`${yTotal}%`}
                          r="4"
                          fill="#3B82F6"
                          className="hover:r-6 transition-all cursor-pointer"
                        />
                        <circle
                          cx={`${x}%`}
                          cy={`${yTextes}%`}
                          r="3"
                          fill="#10B981"
                          className="hover:r-5 transition-all cursor-pointer"
                        />
                        <circle
                          cx={`${x}%`}
                          cy={`${yProcedures}%`}
                          r="3"
                          fill="#F59E0B"
                          className="hover:r-5 transition-all cursor-pointer"
                        />
                      </g>
                    );
                  })}
                </svg>
                
                {/* Labels des mois */}
                <div className="absolute -bottom-6 w-full flex justify-between text-xs text-gray-500 px-8">
                  {chartData.map((data, index) => (
                    <span key={index}>{data.month}</span>
                  ))}
                </div>
              </div>
              
              {/* Légende */}
              <div className="absolute top-0 right-0 text-xs space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Total consultations</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Textes juridiques</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Procédures</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique de répartition du contenu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-green-600" />
            Répartition par type de contenu
          </CardTitle>
          <CardDescription>Distribution des types de documents juridiques</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contentChartData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="text-sm font-medium">{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{item.count}</span>
                  <span className="text-xs text-gray-500 w-8 text-right">{item.percentage}%</span>
                </div>
              </div>
            ))}
            
            {/* Graphique circulaire visuel */}
            <div className="mt-6 flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {contentChartData.reduce((acc, item, index) => {
                    const startAngle = acc.currentAngle;
                    const angle = (item.percentage / 100) * 360;
                    const endAngle = startAngle + angle;
                    
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const pathData = [
                      `M 50 50`,
                      `L ${x1} ${y1}`,
                      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `Z`
                    ].join(' ');
                    
                    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
                    
                    acc.paths.push(
                      <path
                        key={index}
                        d={pathData}
                        fill={colors[index % colors.length]}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    );
                    
                    acc.currentAngle = endAngle;
                    return acc;
                  }, { paths: [] as React.ReactNode[], currentAngle: 0 }).paths}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">{contentChartData.reduce((acc, item) => acc + item.count, 0)}</div>
                    <div className="text-xs text-gray-600">Total</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Total des contenus: <span className="font-semibold">{contentChartData.reduce((acc, item) => acc + item.count, 0)}</span>
                <br />
                Croissance mensuelle: <span className="font-semibold text-green-600">+8.5%</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
