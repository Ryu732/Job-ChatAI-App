// 会社検索等の関数
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
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
	template: `あなたは就活アドバイザーです。
    {companyName}の{question}について教えてください。
    可能な限り最新のデータを用いて回答してください。`,
	inputVariables: ["companyName", "question"] // プロンプトへの入力変数
});

// ReAct Agentの設定(ツールを選ぶ)
async function createAgent() {
	const agentExecutor = await initializeAgentExecutorWithOptions(
		[ddgSearchTool], // 使用するツール
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
	const comQuestionArray = comQuestions.split('  '); // 質問事項を分割
	let htmlResult = `<h2>${companyName}</h2>`; // HTMLの初期化

	// 各質問事項に対して検索を実行
	for (const questionItem of comQuestionArray) {
		const fullQuery = await promptTemplate.format({ companyName, question: questionItem });

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

	return htmlResult; // 完成したHTMLを返す
}

module.exports = { getCompanyInfo };