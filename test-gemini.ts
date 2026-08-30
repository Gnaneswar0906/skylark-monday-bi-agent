import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';

async function testGeminiKey() {
  try {
    const envData = readFileSync('.env.local', 'utf-8');
    const match = envData.match(/LLM_API_KEY=(.+)/);
    const key = match ? match[1].trim() : '';

    if (!key) {
      console.log('No key found in .env.local');
      return;
    }

    console.log('Testing key:', key.substring(0, 5) + '...');
    
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say exactly: "Hello, the key works!"');
    console.log('SUCCESS:', result.response.text());
  } catch (err: any) {
    console.error('ERROR DETAILS:', err.message);
    if (err.status) console.error('Status:', err.status);
    if (err.statusText) console.error('Status Text:', err.statusText);
  }
}

testGeminiKey();
