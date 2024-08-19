// 会社検索等の関数
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { AgentExecutor, createReactAgent } = require("langchain/agents");
const { PromptTemplate } = require("@langchain/core/prompts");
const { DuckDuckGoSearch } = require("@langchain/community/tools/duckduckgo_search");

// APIキーやモデルの設定などGeminiの準備
const geminiLlm = new ChatGoogleGenerativeAI({
	model: "gemini-1.5-flash",
	apiKey: process.env.Gemini_Key,
	temperature: 0.1, // 創造性(1が最大)
	maxRetries: 2,    // 最大再試行回数
});

// 検索エンジンDuckDuckGoの設定
const ddgSearchTool = new DuckDuckGoSearch({ maxResults: 1 });

// プロンプトテンプレートの設定
const promptTemplate = new PromptTemplate({
	template: `{companyName}の{question}について教えてください。可能な限り最新のデータを用いて回答してください。`,
	inputVariables: ["companyName", "question"]
});

// ReAct Agentの設定(ツールを選ぶ)
async function createAgent() {
	const executor = await initializeAgentExecutor(
		[ddgSearchTool], // 使用するツール
		geminiLlm,       // 使用するLLM
		"self-ask-with-search", // エージェントの種類(内部推論)
		promptTemplate  // プロンプトテンプレート
	);
	return executor;
}

// // Web検索を行う関数
async function test(companyName, comQuestion) {
	const comQuestionArray = comQuestion.split('  '); // 質問事項を分割
	for (const questionItem of comQuestionArray) {
		const fullQuery = `${companyName} ${questionItem}`; // 会社名と質問事項を合わせる
		console.log(`Running query: ${fullQuery}`);
		try {
			const initialResult = await agentExecutor.call({ input: fullQuery });

			// オブジェクトから出力結果を取り出して表示
			const resultText = initialResult?.output || JSON.stringify(initialResult);

			htmlResult += `<h3>${questionItem}</h3><p>${resultText}</p>`;
		} catch (error) {
			console.error(`Error processing query ${fullQuery}:`, error);
			htmlResult += `<h3>${questionItem}</h3><p>情報を取得できませんでした</p>`;
		}
	}
}