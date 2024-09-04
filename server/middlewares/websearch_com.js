// 会社検索等の関数
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { PromptTemplate } = require("@langchain/core/prompts");
const { DuckDuckGoSearch } = require("@langchain/community/tools/duckduckgo_search");
const { BingSerpAPI } = require("@langchain/community/tools/bingserpapi");

// APIキーやモデルの設定などGeminiの準備
const geminiLlm = new ChatGoogleGenerativeAI({
	model: "gemini-1.5-flash",
	apiKey: process.env.Gemini_Key,
	temperature: 0, // 創造性(1が最大)
	maxRetries: 2,    // 最大再試行回数
});

// 検索エンジンDuckDuckGoの設定
const bingSearchTool = new BingSerpAPI({ apiKey: process.env.Bing_Key, maxResults: 5 });

// プロンプトテンプレートの設定
const promptTemplate = new PromptTemplate({
	template: `
	# 命令書
	あなたは就活アドバイザーです。
    {companyName}という会社について調査し、以下の質問事項について、それぞれ2024年より後の情報を提供してください。
	Web検索する際は、信頼できる情報源（公式サイト、ニュース、業界レポートなど）から調べてください。
    
	# 質問事項:{question}
	
	# 出力形式
	改行は\nで表現してください。
	記号などは使わずに答えてください。`,
	inputVariables: ["companyName", "question"]// プロンプトへの入力変数
});

// Agentの設定(ツールを選ぶ)
async function createAgent() {
	const agentExecutor = await initializeAgentExecutorWithOptions(
		[bingSearchTool,], // 使用するツール
		geminiLlm,       // 使用するLLM
		{
			agentType: "zero-shot-react-description", // エージェントの種類
			verbose: false, // ログを出力
			maxRetries: 2, // 最大再試行回数
		}
	);
	return agentExecutor;
}

// Web検索を行い、結果をHTML形式で返す関数
async function getCompanyInfo(companyName, comQuestions) {
	const agentExecutor = await createAgent(); // エージェントの初期化
	let htmlResult = ''; // 会社説明のHTMLの初期化

	// 質問事項ごとに検索処理を行う
	for (const question of comQuestions) {
		const fullQuery = await promptTemplate.format({ companyName, question });
		htmlResult += `<h2>${question}</h2>`; // 質問事項をHTMLに追加

		try {
			// 各質問事項に対して検索を実行
			const initialResult = await agentExecutor.call({ input: fullQuery });

			// 結果を取り出してHTMLに追加
			const resultText = initialResult?.output || JSON.stringify(initialResult);
			htmlResult += `<p>${resultText}</p>`; // 結果をHTMLに追加
			console.log(resultText); // デバッグのために結果をコンソールに出力
		} catch (error) {
			console.error(`Error processing query ${fullQuery}:`, error);
			htmlResult += `<p>Error processing query: ${error.message}</p>`; // エラーをHTMLに追加
		}
	}

	// 最終的なHTMLを返却
	return htmlResult;
}

module.exports = { getCompanyInfo };