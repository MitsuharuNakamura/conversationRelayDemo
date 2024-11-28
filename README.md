# Conversation Relay with Open AI API

このプロジェクトは、WebSocketを使用してOpenAIのAPIと通信し、会話の履歴を保持しながらリアルタイムで応答を返すサーバーです。
このREADMEでは、AIは日本語を話す前提で設定されています。

## 概要

- WebSocketサーバーを立ち上げ、クライアントからのメッセージを受信します。
- OpenAIのAPIを使用して、受信したメッセージに対する応答を生成します。
- 応答はストリーミングされ、句読点で区切られた部分ごとにクライアントに送信されます。
- 会話の履歴を保持し、文脈を考慮した応答を生成します。

## セットアップ

### 必要条件

- Node.js (推奨バージョン: 14.x以上)
- npm (Node.jsに含まれています)
- ngrok
- Twilio Accountを持っていること
  - 電話番号が購入済みであること
- Open AIのアカウント持っていてAPI Keyがあること

### インストール

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/MitsuharuNakamura/conversationRelayDemo.git
   cd conversationRelayDemo
   ```

2. 必要なパッケージをインストールします。

   ```bash
   npm install
   ```

3. `.env`ファイルを作成し、以下の内容を記述します。

   ```plaintext
   PORT=9999
   OPENAI_API_KEY=your_openai_api_key
   SYSTEM_PROMPT=あなたは、コールセンターのオペレーターです。入力文は音声認識データです。丁寧な口語調で返答してください。
   ```

   - `your_openai_api_key`を実際のOpenAI APIキーに置き換えてください。

4. ブラウザからTwilioコンソールにアクセスします
5. TwiML Binsに移動し、以下のTwiMLを作成します。
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
    <Response>
       <Connect>
         <ConversationRelay url="wss://<subdomain_name>.jp.ngrok.io" language="ja-JP" welcomeGreeting="もしもし。こちらは。旅行アシスタントです。ご要件をお話ください。" ttsProvider="google" voice="Google.ja-JP-Standard-B"  />
       </Connect>
    </Response>
   ```
   - `<subdomain_name>`を実際のngrokで指定するサブドメイン名に置き換えてください。

6. PhoneNumbersのメニューに移動して、電話番号の設定から今回利用する電話番号を選択します。
7. 電話番号の設定から、A call comes inの設定で先程作成したTwimlを指定して保存します。

## 使用方法

1. サーバーを起動します。

   ```bash
   node server.js
   ```

2. ngrokを利用してサーバーを公開します。

   ```bash
   ngrok http 9999 --subdomain=<your_subdomain_name>
   ```

3. Twilioで購入済みの電話番号に自分の端末から電話をかけます
4. 音声が聞こえてきたら成功です。自由に会話してください。
   - 注意点として、自分の端末から電話を切らないと、電話が切れないので、かならずコールを切断することを忘れないでください。



## 依存関係

- [ws](https://www.npmjs.com/package/ws): WebSocketサーバーの実装
- [openai](https://www.npmjs.com/package/openai): OpenAI APIクライアント
- [dotenv](https://www.npmjs.com/package/dotenv): 環境変数の管理

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 貢献

貢献を歓迎します！バグ報告、機能提案、プルリクエストをお待ちしています。


-----------
### English Version Starts Here

# Conversation Relay with Open AI API

This project sets up a WebSocket server to communicate with OpenAI's API, maintaining conversation history and providing real-time responses. In this README, the AI is configured to communicate in Japanese.

## Overview

- Launch a WebSocket server to receive messages from clients.
- Use OpenAI's API to generate responses to received messages.
- Stream responses back to the client in segments divided by punctuation.
- Maintain conversation history to generate context-aware responses.

## Setup

### Prerequisites

- Node.js (Recommended Version: 14.x or higher)
- npm (included with Node.js)
- ngrok
- Twilio Account
  - Must have a purchased phone number
- OpenAI Account with an API Key

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/MitsuharuNakamura/conversationRelayDemo.git
   cd conversationRelayDemo
   ```

2. Install required packages.

   ```bash
   npm install
   ```

3. Create a `.env` file with the following content.

   ```plaintext
   PORT=9999
   OPENAI_API_KEY=your_openai_api_key
   SYSTEM_PROMPT=You are a call center operator. The input text is speech recognition data. Please respond in a polite and conversational manner.
   ```

   - Replace `your_openai_api_key` with your actual OpenAI API key.

4. Access the Twilio console from your browser.
5. Navigate to TwiML Bins and create the following TwiML.

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
    <Response>
       <Connect>
         <ConversationRelay url="wss://<subdomain_name>.jp.ngrok.io" language="ja-JP" welcomeGreeting="もしもし。こちらは旅行アシスタントです。ご要件をお話ください。" ttsProvider="google" voice="Google.ja-JP-Standard-B" />
       </Connect>
    </Response>
   ```

   - Replace `<subdomain_name>` with your actual ngrok subdomain name.

6. Go to the Phone Numbers menu, select the phone number you plan to use, and configure it.
7. In the **A call comes in** setting, specify the newly created TwiML and save.

## Usage

1. Start the server.

   ```bash
   node server.js
   ```

2. Use ngrok to expose the server.

   ```bash
   ngrok http 9999 --subdomain=<your_subdomain_name>
   ```

3. Call the Twilio phone number you purchased from your device.
4. If you hear a voice prompt, the setup is successful. Feel free to converse!
   - Please remember to disconnect the call from your device, as it will not hang up automatically.

## Dependencies

- [ws](https://www.npmjs.com/package/ws): WebSocket server implementation
- [openai](https://www.npmjs.com/package/openai): OpenAI API client
- [dotenv](https://www.npmjs.com/package/dotenv): Environment variable management

## License

This project is released under the MIT License. For more details, see the [LICENSE](LICENSE) file.

## Contribution

Contributions are welcome! Please feel free to report bugs, propose features, or submit pull requests.