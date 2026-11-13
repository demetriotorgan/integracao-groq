import 'dotenv/config';
import { Groq } from 'groq-sdk';

const groq = new Groq();

//const pergunta = process.argv.slice(2).join(' ');
const pergunta = "Qual é seu nome?";

if (!pergunta) {
    console.log('Uso: node index.js "Sua pergunta aqui"');
    process.exit(1);
}

const chatCompletion = await groq.chat.completions.create({
    messages: [
        {
            role: 'user',
            content: pergunta,
        },
    ],
    model: 'openai/gpt-oss-20b',
    temperature: 1,
    max_completion_tokens: 250,
    top_p: 1,
    stream: true,
    reasoning_effort: 'low',
    stop: null,
});

for await (const chunk of chatCompletion) {
process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
console.log('\n')