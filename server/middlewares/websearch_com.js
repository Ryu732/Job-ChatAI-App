// 会社検索等の関数
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { initializeAgentExecutor } = require("langchain/agents");
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

	const comQuestionArray = comQuestion.split('  '); // 二重スペースで分割
	for (const questionItem of comQuestionArray) {
		const fullQuery = `${companyName} ${questionItem}`; // 会社名と質問事項を合わせる
		console.log(`Running query: ${fullQuery}`);
		const modelGeneratedToolCall = {
			args: {
				input: fullQuery,
			},
			id: "tool_call_id",
			name: ddgSearchTool.name,
			type: "tool_call",
		};
		console.log(await ddgSearchTool.invoke(modelGeneratedToolCall));
	}
}

// プロンプトテンプレートの設定
const promptTemplate = new PromptTemplate({
	template: `
        以下の質問に答えてください:

        質問: {input}
        考え中: {agent_scratchpad}
        アクション: {tool_names}
        アクションの入力: {tools}
        最終回答: {final_answer}
    `,
	inputVariables: ["input", "agent_scratchpad", "tool_names", "tools", "final_answer"]
});

// ReAct Agentの設定(ツールを選ぶ)
async function createAgent() {
	const executor = await initializeAgentExecutor(
		[ddgSearchTool], // 使用するツール
		geminiLlm,       // 使用するLLM
		"zero-shot-react-description", // エージェントの種類
		promptTemplate  // プロンプトテンプレート
	);
	return executor;
}

// // Web検索を行う関数
async function getCompanyInfo(companyName, comQuestion) {
	const agentExecutor = await createAgent(); // エージェントの初期化
	const comQuestionArray = comQuestion.split('  '); // 質問事項を分割
	let htmlResult = `<h2>${companyName}</h2>`;

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

	return htmlResult;
}

module.exports = { getCompanyInfo, duckTest };