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

// テスト用の関数
async function duckTest(companyName, comQuestion) {

	// const comQuestionArray = comQuestion.split('  '); // 二重スペースで分割
	// for (const questionItem of comQuestionArray) {
	// 	const fullQuery = `${companyName} ${questionItem}`; // 会社名と質問事項を合わせる
	// 	console.log(`Running query: ${fullQuery}`);
	// 	const modelGeneratedToolCall = {
	// 		args: {
	// 			input: fullQuery,
	// 		},
	// 		id: "tool_call_id",
	// 		name: ddgSearchTool.name,
	// 		type: "tool_call",
	// 	};
	// 	console.log(await ddgSearchTool.invoke(modelGeneratedToolCall));
	// }
}

//プロンプトテンプレートの設定
const promptTemplate = `
    以下の質問に答えてください:

    質問: {input}
    考え中: {agent_scratchpad}
    アクション: {tools}
    アクションの入力: {tool_names}
    最終回答: {final_answer}
`;

// ReAct Agentの設定(ツールを選ぶ)
async function createAgent() {
	const reactAgent = await createReactAgent({
		geminiLlm,
		ddgSearchTool,
	});
	return reactAgent;
}

// Web検索を行う関数
async function getCompanyInfo(companyName, comQuestion) {
	const reactAgent = await createAgent(); // エージェントの初期化
	const results = {};

	// 各質問について検索を行う
	for (const query of comQuestion) {
		const fullQuery = `${companyName} ${query}`; // 会社名と質問を組み合わせる
		try {
			console.log(`Running query: ${fullQuery}`);
			const searchResult = await reactAgent.run({ query: fullQuery });
			console.log(`Result for ${query}:`, searchResult);
			results[query] = searchResult; // 結果を保存
		} catch (error) {
			console.error(`Error processing query ${fullQuery}:`, error);
			results[query] = `Error retrieving information for ${query}`;
		}
	}

	return results; // 取得した情報を返す
}

module.exports = { getCompanyInfo, duckTest };