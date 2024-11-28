require('dotenv').config();
const WebSocket = require('ws');
const OpenAI = require('openai');

const port = process.env.PORT || 9999;
const open_ai_api_key = process.env.OPENAI_API_KEY;

const wss = new WebSocket.Server({ port: port });
console.log(`WebSocket server is running on ws://localhost:${port}`);

const openai = new OpenAI({
    apiKey: open_ai_api_key,
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    // 会話履歴を保持するための配列
    let conversationHistory = [
        { role: 'system', content: process.env.SYSTEM_PROMPT }
    ];

    ws.on('message', async (message) => {
        console.log(`Received: ${message}`);

        try {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.hasOwnProperty('voicePrompt')) {
                const question = parsedMessage.voicePrompt;
                // ユーザーの質問を会話履歴に追加
                conversationHistory.push({ role: 'user', content: question });

                const stream = await openai.chat.completions.create({
                    model: 'gpt-4o-mini', // または 'gpt-4o-mini'
                    messages: conversationHistory,
                    stream: true,
                });

                let buffer = '';

                for await (const chunk of stream) {
                    const message = chunk.choices[0]?.delta?.content;
                    if (message) {
                        buffer += message;
                        let sentences = buffer.split(/(?<=[。、])/);
                        buffer = sentences.pop(); // 最後の未完了の文をバッファに残す
                        for (const sentence of sentences) {
                            console.log("DEBUG: " + sentence);
                            ws.send(JSON.stringify({ type: 'text', token: sentence, last: true }));
                        }
                    }
                }

                // AIの回答を会話履歴に追加
                conversationHistory.push({ role: 'assistant', content: buffer });
            } else {
                console.log("voicePromptプロパティは存在しません。");
            }
        } catch (error) {
            console.error('メッセージのパースに失敗しました:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});