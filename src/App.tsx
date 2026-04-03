import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Filter, 
  ShoppingBag, 
  BarChart3, 
  CreditCard, 
  AppWindow,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Plus,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

type Page = 'dashboard' | 'settings' | 'filters' | 'merchandising' | 'analytics' | 'billing' | 'app-settings' | 'quick-setup';

// --- Mock Data ---

const PRICING_PLANS = [
  {
    name: 'Basic',
    price: '$19',
    features: ['Up to 10k searches', 'Basic AI relevance', 'Standard filters', 'Email support'],
    current: false
  },
  {
    name: 'Professional',
    price: '$49',
    features: ['Up to 50k searches', 'Advanced AI intent', 'Custom synonyms', 'Priority support', 'Analytics dashboard'],
    current: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    features: ['Unlimited searches', 'Custom AI models', 'Dedicated account manager', 'SLA guarantee', 'White-labeling'],
    current: false
  }
];

const TREND_DATA = [
  { name: 'Mon', searches: 400 },
  { name: 'Tue', searches: 300 },
  { name: 'Wed', searches: 600 },
  { name: 'Thu', searches: 800 },
  { name: 'Fri', searches: 500 },
  { name: 'Sat', searches: 900 },
  { name: 'Sun', searches: 1100 },
];

const TOP_QUERIES = [
  { query: 'running shoes', count: 1240, clicks: 890, conversion: '7.2%' },
  { query: 'nike sneakers', count: 980, clicks: 720, conversion: '6.8%' },
  { query: 'winter jackets', count: 850, clicks: 410, conversion: '4.1%' },
  { query: 'yoga mats', count: 620, clicks: 380, conversion: '5.5%' },
];

const NO_RESULTS = [
  { query: 'blue suede boots', count: 45, action: 'Add synonym' },
  { query: 'waterproof socks', count: 32, action: 'Create product tag' },
  { query: 'smart watch pro', count: 28, action: 'Improve product title' },
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-indigo-50 text-indigo-600 font-medium shadow-sm" 
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600")} />
    <span className="text-sm">{label}</span>
  </button>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", className)}>
    {children}
  </div>
);

const StatCard = ({ title, value, trend, trendValue, icon: Icon }: any) => (
  <Card className="p-5">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
        trend === 'up' ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
      )}>
        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {trendValue}
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  </Card>
);

// --- Pages ---

const DashboardOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Searches Today" value="2,840" trend="up" trendValue="+12.5%" icon={Search} />
      <StatCard title="Search Conversion" value="4.2%" trend="up" trendValue="+0.8%" icon={Zap} />
      <StatCard title="Top Search Query" value="Running Shoes" trend="up" trendValue="Hot" icon={TrendingUp} />
      <StatCard title="No Result Searches" value="124" trend="down" trendValue="-5.2%" icon={AlertCircle} />
    </div>

    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Search Trends</h3>
          <p className="text-sm text-gray-500">Search activity over the last 7 days</p>
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="searches" 
              stroke="#4f46e5" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Top Search Queries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Query</th>
                <th className="px-6 py-3 font-medium">Count</th>
                <th className="px-6 py-3 font-medium">Clicks</th>
                <th className="px-6 py-3 font-medium">Conv.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TOP_QUERIES.map((q, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{q.query}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{q.count}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{q.clicks}</td>
                  <td className="px-6 py-4 text-sm text-indigo-600 font-medium">{q.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">No Results Queries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Query</th>
                <th className="px-6 py-3 font-medium">Count</th>
                <th className="px-6 py-3 font-medium">Suggested Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {NO_RESULTS.map((q, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{q.query}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{q.count}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1">
                      {q.action} <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </div>
);

const SearchSettings = () => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [typoEnabled, setTypoEnabled] = useState(true);

  return (
    <div className="max-w-4xl space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">General Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">AI Search</p>
              <p className="text-sm text-gray-500">Use machine learning to understand customer intent.</p>
            </div>
            <button 
              onClick={() => setAiEnabled(!aiEnabled)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                aiEnabled ? "bg-indigo-600" : "bg-gray-200"
              )}
            >
              <div className={cn(
                "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                aiEnabled ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Typo Tolerance</p>
              <p className="text-sm text-gray-500">Automatically correct spelling mistakes in search queries.</p>
            </div>
            <button 
              onClick={() => setTypoEnabled(!typoEnabled)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                typoEnabled ? "bg-indigo-600" : "bg-gray-200"
              )}
            >
              <div className={cn(
                "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                typoEnabled ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Synonym Management</h3>
        <p className="text-sm text-gray-500 mb-6">Group similar terms to ensure customers find what they're looking for.</p>
        
        <div className="flex gap-3 mb-6">
          <input 
            type="text" 
            placeholder="e.g. sneakers" 
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <div className="flex items-center text-gray-400">→</div>
          <input 
            type="text" 
            placeholder="e.g. shoes" 
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="space-y-2">
          {['sneakers → shoes', 't-shirt → tee', 'jacket → coat'].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-sm font-medium">{s}</span>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Ranking Rules</h3>
        <div className="space-y-8">
          {[
            { label: 'Relevance', value: 85 },
            { label: 'Product Popularity', value: 60 },
            { label: 'Inventory Availability', value: 40 },
            { label: 'Manual Boosts', value: 20 },
          ].map((r, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{r.label}</span>
                <span className="text-gray-500">{r.value}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full" 
                  style={{ width: `${r.value}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const FilterManagement = () => (
  <div className="max-w-4xl space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Search Filters</h3>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add New Filter
      </button>
    </div>
    <Card>
      <div className="divide-y divide-gray-100">
        {[
          { name: 'Price', type: 'Range', active: true },
          { name: 'Brand', type: 'List', active: true },
          { name: 'Category', type: 'List', active: true },
          { name: 'Availability', type: 'Toggle', active: false },
          { name: 'Color', type: 'Swatch', active: true },
          { name: 'Size', type: 'List', active: true },
        ].map((f, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="cursor-grab text-gray-300 group-hover:text-gray-400">
                <MoreHorizontal className="w-5 h-5 rotate-90" />
              </div>
              <div>
                <p className="font-medium">{f.name}</p>
                <p className="text-xs text-gray-500">{f.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className={cn(
                "w-10 h-5 rounded-full transition-colors relative",
                f.active ? "bg-indigo-600" : "bg-gray-200"
              )}>
                <div className={cn(
                  "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                  f.active ? "translate-x-5" : "translate-x-0"
                )} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const Merchandising = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 border-l-4 border-l-indigo-600">
        <h4 className="font-semibold mb-2">Product Boost</h4>
        <p className="text-sm text-gray-500 mb-4">Boost selected products for specific search queries.</p>
        <button className="text-indigo-600 text-sm font-medium hover:underline">Configure boosts →</button>
      </Card>
      <Card className="p-6 border-l-4 border-l-green-600">
        <h4 className="font-semibold mb-2">Pin Product</h4>
        <p className="text-sm text-gray-500 mb-4">Pin a product to appear first in results regardless of relevance.</p>
        <button className="text-green-600 text-sm font-medium hover:underline">Manage pins →</button>
      </Card>
      <Card className="p-6 border-l-4 border-l-red-600">
        <h4 className="font-semibold mb-2">Hide Product</h4>
        <p className="text-sm text-gray-500 mb-4">Exclude products from search results temporarily.</p>
        <button className="text-red-600 text-sm font-medium hover:underline">View hidden items →</button>
      </Card>
    </div>

    <Card>
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Active Merchandising Rules</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search rules..." 
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Rule Type</th>
              <th className="px-6 py-3 font-medium">Target Query</th>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { type: 'Boost', query: 'running shoes', product: 'Nike Pegasus 40', status: 'Active' },
              { type: 'Pin', query: 'summer collection', product: 'Linen Shirt Blue', status: 'Active' },
              { type: 'Hide', query: 'all', product: 'Out of Stock Item #42', status: 'Paused' },
            ].map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    r.type === 'Boost' ? "bg-indigo-50 text-indigo-600" :
                    r.type === 'Pin' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  )}>{r.type}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.query}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{r.product}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "flex items-center gap-1.5 text-xs font-medium",
                    r.status === 'Active' ? "text-green-600" : "text-gray-400"
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", r.status === 'Active' ? "bg-green-600" : "bg-gray-400")} />
                    {r.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const Analytics = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Search Volume</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="searches" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Conversion Rate</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="searches" stroke="#10b981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    <Card>
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold">Top Clicked Products</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Clicks</th>
              <th className="px-6 py-3 font-medium">Conversions</th>
              <th className="px-6 py-3 font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: 'Nike Air Max 270', clicks: 450, conv: 32, rev: '$4,800' },
              { name: 'Adidas Ultraboost', clicks: 380, conv: 28, rev: '$4,200' },
              { name: 'Puma RS-X', clicks: 310, conv: 15, rev: '$1,800' },
            ].map((p, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.clicks}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.conv}</td>
                <td className="px-6 py-4 text-sm font-medium text-green-600">{p.rev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const QuickSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else onComplete();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const steps = [
    {
      title: 'Connect Your Store',
      description: 'We need to access your Shopify store data to index your products.',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">fashion-store-pro.myshopify.com</p>
              <p className="text-xs text-indigo-600 font-medium">Connected successfully</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
          </div>
          <p className="text-sm text-gray-500 italic">Permissions granted: read_products, read_orders, read_analytics</p>
        </div>
      )
    },
    {
      title: 'Sync Products',
      description: 'Our AI is indexing your product catalog to build your search engine.',
      content: (
        <div className="space-y-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Indexing in progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  75%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg font-bold">1,240</p>
              <p className="text-[10px] text-gray-500 uppercase">Products Found</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg font-bold">930</p>
              <p className="text-[10px] text-gray-500 uppercase">Indexed</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg font-bold">310</p>
              <p className="text-[10px] text-gray-500 uppercase">Remaining</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Choose Search Style',
      description: 'Select how you want the search interface to appear on your storefront.',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 border-2 border-indigo-600 bg-indigo-50 rounded-xl text-left">
            <div className="w-full aspect-video bg-white rounded border border-indigo-200 mb-3 flex items-center justify-center">
              <div className="w-3/4 h-2 bg-gray-100 rounded-full" />
            </div>
            <p className="font-medium text-sm">Overlay Modal</p>
            <p className="text-xs text-gray-500">Opens a full-screen search experience.</p>
          </button>
          <button className="p-4 border-2 border-gray-100 hover:border-indigo-200 rounded-xl text-left transition-colors">
            <div className="w-full aspect-video bg-white rounded border border-gray-200 mb-3 flex items-center justify-center">
              <div className="w-3/4 h-8 bg-gray-100 rounded flex items-center px-2">
                <div className="w-1/2 h-2 bg-gray-200 rounded-full" />
              </div>
            </div>
            <p className="font-medium text-sm">Inline Dropdown</p>
            <p className="text-xs text-gray-500">Appears directly under your search bar.</p>
          </button>
        </div>
      )
    },
    {
      title: 'Ready to Launch!',
      description: 'Your AI search engine is ready. You can now enable it on your live store.',
      content: (
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h4 className="text-xl font-bold mb-2">Everything looks great!</h4>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            We've successfully indexed your store and configured your initial settings.
          </p>
        </div>
      )
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Quick Setup</h2>
          <span className="text-sm font-medium text-gray-500">Step {step} of {totalSteps}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s <= step ? "bg-indigo-600" : "bg-gray-200"
              )} 
            />
          ))}
        </div>
      </div>

      <Card className="p-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">{currentStep.title}</h3>
          <p className="text-gray-500">{currentStep.description}</p>
        </div>

        <div className="min-h-[200px] mb-8">
          {currentStep.content}
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-100">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className="px-6 py-2 rounded-lg font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-0 transition-all"
          >
            Back
          </button>
          <button 
            onClick={nextStep}
            className="px-8 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            {step === totalSteps ? 'Go to Dashboard' : 'Continue'}
          </button>
        </div>
      </Card>
    </div>
  );
};

const Billing = () => (
  <div className="max-w-6xl space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">Current Plan</p>
            <h3 className="text-2xl font-bold mt-1">Professional</h3>
          </div>
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2 py-1 rounded uppercase">Active</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Monthly Price</span>
            <span className="font-medium">$49.00/mo</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Next Billing Date</span>
            <span className="font-medium">May 12, 2026</span>
          </div>
          <div className="pt-4">
             <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-sm text-gray-500 font-medium mb-4">Usage Statistics</p>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Search Requests</span>
              <span className="text-gray-500">42,500 / 50,000</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">AI Processing</span>
              <span className="text-gray-500">12,400 / 20,000</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '62%' }} />
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PRICING_PLANS.map((plan, i) => (
        <Card key={i} className={cn(
          "p-6 flex flex-col",
          plan.current ? "border-2 border-indigo-600 ring-4 ring-indigo-50" : ""
        )}>
          {plan.current && (
            <div className="bg-indigo-600 text-white text-[10px] font-bold uppercase py-1 px-2 rounded self-start mb-4">
              Current Plan
            </div>
          )}
          <h4 className="text-lg font-bold mb-1">{plan.name}</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-gray-500 text-sm">/mo</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            {plan.features.map((feature, j) => (
              <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <button 
            disabled={plan.current}
            className={cn(
              "w-full py-2 rounded-lg font-bold transition-all",
              plan.current 
                ? "bg-gray-100 text-gray-400 cursor-default" 
                : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
            )}
          >
            {plan.current ? 'Active' : 'Switch Plan'}
          </button>
        </Card>
      ))}
    </div>

    <Card>
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold">Payment Methods</h3>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-xs text-gray-400">VISA</div>
            <div>
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-xs text-gray-500">Expires 12/28</p>
            </div>
          </div>
          <button className="text-sm text-indigo-600 font-medium hover:underline">Edit</button>
        </div>
      </div>
    </Card>
  </div>
);

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [isOnboarded, setIsOnboarded] = useState(false);

  const renderPage = () => {
    if (!isOnboarded && activePage !== 'quick-setup') {
      return <QuickSetup onComplete={() => { setIsOnboarded(true); setActivePage('dashboard'); }} />;
    }

    switch (activePage) {
      case 'dashboard': return <DashboardOverview />;
      case 'settings': return <SearchSettings />;
      case 'filters': return <FilterManagement />;
      case 'merchandising': return <Merchandising />;
      case 'analytics': return <Analytics />;
      case 'billing': return <Billing />;
      case 'quick-setup': return <QuickSetup onComplete={() => { setIsOnboarded(true); setActivePage('dashboard'); }} />;
      default: return <DashboardOverview />;
    }
  };

  const pageTitle = {
    dashboard: 'Dashboard Overview',
    settings: 'Search Settings',
    filters: 'Filter Management',
    merchandising: 'Merchandising',
    analytics: 'Analytics',
    billing: 'Billing & Usage',
    'app-settings': 'App Settings',
    'quick-setup': 'Quick Setup'
  }[activePage];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">AI Search</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activePage === 'dashboard'} 
            onClick={() => setActivePage('dashboard')} 
          />
          <SidebarItem 
            icon={Zap} 
            label="Quick Setup" 
            active={activePage === 'quick-setup'} 
            onClick={() => setActivePage('quick-setup')} 
          />
          <div className="py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Management</div>
          <SidebarItem 
            icon={Settings} 
            label="Search Settings" 
            active={activePage === 'settings'} 
            onClick={() => setActivePage('settings')} 
          />
          <SidebarItem 
            icon={Filter} 
            label="Filters" 
            active={activePage === 'filters'} 
            onClick={() => setActivePage('filters')} 
          />
          <SidebarItem 
            icon={ShoppingBag} 
            label="Merchandising" 
            active={activePage === 'merchandising'} 
            onClick={() => setActivePage('merchandising')} 
          />
          <div className="py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account</div>
          <SidebarItem 
            icon={BarChart3} 
            label="Analytics" 
            active={activePage === 'analytics'} 
            onClick={() => setActivePage('analytics')} 
          />
          <SidebarItem 
            icon={CreditCard} 
            label="Billing" 
            active={activePage === 'billing'} 
            onClick={() => setActivePage('billing')} 
          />
          <SidebarItem 
            icon={AppWindow} 
            label="App Settings" 
            active={activePage === 'app-settings'} 
            onClick={() => setActivePage('app-settings')} 
          />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Trial Period</p>
            <p className="text-sm text-gray-700 mb-3">12 days remaining on your trial.</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-gray-900">{pageTitle}</h2>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Fashion Store Pro
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search dashboard..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2" />
            <button className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-2 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs">
                JD
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
