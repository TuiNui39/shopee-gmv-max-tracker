import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface AIInsightCardProps {
  provider: 'gemini' | 'claude' | 'gpt' | 'deepseek';
  type: 'trend' | 'insight' | 'recommendation' | 'prediction';
  title: string;
  content: string;
  priority?: 'high' | 'medium' | 'low';
  createdAt: string;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({
  provider,
  type,
  title,
  content,
  priority = 'medium',
  createdAt,
}) => {
  const [expanded, setExpanded] = useState(false);

  const providerColors: Record<AIInsightCardProps['provider'], string> = {
    gemini: 'bg-blue-500 text-white',
    claude: 'bg-green-500 text-white',
    gpt: 'bg-yellow-500 text-black',
    deepseek: 'bg-purple-500 text-white',
  };

  const priorityColors: Record<AIInsightCardProps['priority'], string> = {
    high: 'bg-red-500 text-white',
    medium: 'bg-orange-500 text-white',
    low: 'bg-gray-500 text-white',
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${providerColors[provider]}`}>
      <div className="flex items-center mb-2">
        <span className="text-xl font-bold mr-2">{title}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      <div className="flex items-center mb-2">
        <span className="px-2 py-1 rounded-full text-xs bg-white text-black mr-2">
          {provider}
        </span>
        <span className="px-2 py-1 rounded-full text-xs bg-white text-black">
          {type}
        </span>
      </div>
      <div className={`prose prose-sm ${expanded ? '' : 'line-clamp-3'}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      {content.split('\n').length > 3 && (
        <button
          className="mt-2 text-sm underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
      <div className="mt-2 text-xs text-gray-300">{createdAt}</div>
    </div>
  );
};

export default AIInsightCard;