'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
    date: string;
    price: number;
}

interface BenchmarkChartProps {
    data: DataPoint[];
    currency: string;
}

export function BenchmarkChart({ data, currency }: BenchmarkChartProps) {
    return (
        <div className="h-[300px] w-full bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Price Trend (90 Days)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => `${currency} ${value}`}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#0f766e"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#0f766e' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
