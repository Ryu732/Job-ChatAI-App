// 会社検索等の関数
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { createReactAgent } = require("langchain/agents");
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
const promptTemplate = `
    以下の質問に答えてください:
    
    質問: {input}
    考え中: {agent_scratchpad}
    アクション: {tools}
    アクションの入力: {tool_names}
    最終回答: {final_answer}
`;

// ReAct Agentの設定(ツールを選ぶ)
async function initializeAgent() {
	const reactAgent = await createReactAgent({
		llm: geminiLlm,
		tools: [ddgSearchTool],
		prompt: promptTemplate, // プロンプトテンプレートを指定
		inputVariables: ["query"], // プロンプトで使用される変数を指定
		validateResponses: true, // 生成された回答の検証
	});
	return reactAgent;
}

// Web検索を行う関数
async function getCompanyInfo(companyName, comQuestion) {
	const results = {};
	const comQuestionArray = comQuestion.split('  '); // 二重スペースで分割
	const reactAgent = await initializeAgent(); // エージェントの初期化

	for (const questionItem of comQuestionArray) {
		const fullQuery = `${companyName} ${questionItem}`; // 会社名と質問事項を合わせる
		try {
			// Web検索を実行
			console.log(`Running query: ${fullQuery}`);
			const initialResult = await reactAgent.run({ query: fullQuery });
			console.log(`Initial result:`, initialResult);

			// 検索結果の検証（他のソースや追加クエリで確認）
			const validationQuery = `${companyName} ${questionItem} verification`;
			console.log(`Running validation for: ${validationQuery}`);
			const validationResults = await reactAgent.run({ query: validationQuery });
			console.log(`Validation results:`, validationResults);

			// 結果が配列であるか確認し、エラーを防止
			if (Array.isArray(validationResults) && Array.isArray(initialResult)) {
				results[questionItem] = {
					initialResult: initialResult,
					validationResults: validationResults,
					isValid: validationResults.includes(initialResult)
				};
			} else {
				results[questionItem] = {
					initialResult: initialResult,
					validationResults: validationResults,
					isValid: false // 配列でない場合はエラーとして処理
				};
			}
		} catch (error) {
			console.error(`Error processing query ${fullQuery}:`, error);
			results[questionItem] = { error: `Error retrieving or validating information for ${questionItem}` };
		}
	}
	console.log(`result:`, results);
	return results;
}

module.exports = { getCompanyInfo };
