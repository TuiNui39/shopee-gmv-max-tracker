Here's the TypeScript code for the AI provider service helpers:

```typescript
import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function analyzeWithGemini(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.gemini.com/v1/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error('Error in analyzeWithGemini:', error);
    throw error;
  }
}

export async function analyzeWithClaude(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ANTHROPIC_API_KEY,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error('Error in analyzeWithClaude:', error);
    throw error;
  }
}

export async function analyzeWithGPT(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Error in analyzeWithGPT:', error);
    throw error;
  }
}

export async function analyzeWithDeepSeek(prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.deepseek.ai/v1/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': DEEPSEEK_API_KEY,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error('Error in analyzeWithDeepSeek:', error);
    throw error;
  }
}
```

This code exports four functions, each corresponding to a different AI provider service. Each function takes a `prompt` string as input, makes an API call to the respective provider using `fetch()`, and returns the analysis text. The API keys are retrieved from the environment variables.

Error handling is implemented using `try-catch` blocks. If an error occurs during the API call or if the response is not OK, an error is thrown with a descriptive message.

Note: Make sure to install the `node-fetch` package if you're using this code in a Node.js environment.