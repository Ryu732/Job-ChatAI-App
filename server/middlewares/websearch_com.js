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
const ddgSearchTool = new DuckDuckGoSearch({ maxResults: 5 });
const bingSearchTool = new BingSerpAPI({ apiKey: process.env.Bing_Key, maxResults: 5 });

// プロンプトテンプレートの設定
const promptTemplate = new PromptTemplate({
	template: `あなたは就活アドバイザーです。
    {companyName}という会社について詳しく調査し、以下の複数の質問事項について、それぞれ情報を提供してください。
    質問事項:{question}`,
	inputVariables: ["companyName", "question"]// プロンプトへの入力変数
});

// Agentの設定(ツールを選ぶ)
async function createAgent() {
	const agentExecutor = await initializeAgentExecutorWithOptions(
		[bingSearchTool], // 使用するツール
		geminiLlm,       // 使用するLLM
		{
			agentType: "zero-shot-react-description", // エージェントの種類
			verbose: true, // ログを出力
			maxRetries: 2, // 最大再試行回数
		}
	);
	return agentExecutor;
}

// Web検索を行い、結果をHTML形式で返す関数
async function getCompanyInfo(companyName, comQuestions) {
	const agentExecutor = await createAgent(); // エージェントの初期化
	let htmlResult = `<h2>${companyName}</h2>`; // HTMLの初期化

	// 各質問事項に対して検索を実行
	const searchQuery = `"${comQuestions}" site:.jp OR site:job.rikunabi.com/2026`;
	const fullQuery = await promptTemplate.format({ companyName, question: searchQuery });

	try {
		const initialResult = await agentExecutor.call({ input: fullQuery });

		// オブジェクトから出力結果を取り出して表示
		const resultText = initialResult?.output || JSON.stringify(initialResult);
		console.log(resultText);
	} catch (error) {
		console.error(`Error processing query ${fullQuery}:`, error);
	}
	return htmlResult; // 完成したHTMLを返す
}

module.exports = { getCompanyInfo };