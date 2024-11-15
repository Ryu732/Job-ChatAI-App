// ES作成のプロセス提供
// ES作成の会話を生成する関数
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { PromptTemplate } = require("@langchain/core/prompts");
const { Tool } = require("langchain/tools");
const { BingSerpAPI } = require("@langchain/community/tools/bingserpapi");

// APIキーやモデルの設定などGeminiの準備
const geminiLlm = new ChatGoogleGenerativeAI({
	model: "gemini-1.5-flash",
	apiKey: process.env.Gemini_Key,
	temperature: 0, // 創造性(1が最大)
	maxRetries: 2,    // 最大再試行回数
});

// 検索エンジンbingの設定
const bingSearchTool = new BingSerpAPI({ apiKey: process.env.Bing_Key, maxResults: 5 });

// 文字数を数えるツール
class CharaCountTool extends Tool {
	constructor() {
		super();
		this.name = "character_count"; // ツールの名前
		this.description = "与えられたテキストの文字数をカウントします。"; // ツールの説明
	}
	async call(input) {
		const characterCount = input.length;
		return `${characterCount}文字`;
	}
}

// プロンプトテンプレートの設定
const promptTemplate = new PromptTemplate({
	template: `
		# 命令書:
		あなたは経験豊富なキャリアコンサルタントです。
		以下の制約条件と入力文をもとに、タスクのステップ1またはステップ2を実行してください。
		{esMode}に関する最適なエントリーシートを作成することが目標です。

		# 制約条件:
		- STAR法（S:対象となる状況、T:自分の役割や課題、A:課題に対する行動、R:行動の結果得られた成果）を用いてエントリーシートを構成してください。
		- **文章は簡潔で分かりやすく、具体的なエピソードを含めてください。**
		- 質問は1回につき1つだけ行い、ユーザーの回答を待ってから次の質問をしてください。

		# 入力文:
		- ESで聞かれていること:{esQuestion}
		- 過去の会話内容:{chatLog}
		- 企業名: {company}
		- 文字数制限: {textMin}以上{textMax}未満

		# タスク:
		## ステップ1: ユーザーへの質問:
		ESに必要な情報を収集するため、質問してください:
		- 質問例を参考にしながらユーザーに質問をしてください。
		- 質問は5回以上行い、必要な情報が集まったと判断したらステップ2を実行してください。

		### 質問例:
		- 具体的な経験やエピソードありますか？
		- その経験における役割や直面した課題は何でしたか？
		- 課題に対してどのような行動を取りましたか？
		- 行動の結果どのような成果が得られましたか？
		- {esMode}に関連する追加情報を求める質問
		- {company}に関する理解や志望理由（該当する場合）

		## ステップ2: ESの作成:
		収集した情報を基に、以下の点に注意してESを作成してください:
		- STAR法を適切に使用し、論理的な構成にする
		- {esMode}に沿った内容にする
		- *{textMin}以上{textMax}未満の文字数に絶対に収める*
		- ESを出力する際は、文字数カウントツールを使用して文字数を確認してください。

		# ESの出力形式:
		-- ES:
		[ここにエントリーシートの内容を記載]
		-- 文字数: [ここに文字数を記載]`,
	inputVariables: ["textMin", "textMax", "company", "esMode", "esQuestion", "chatLog"]// プロンプトへの入力変数
});

// Agentの設定(ツールを選ぶ)
async function createAgent() {
	try {
		const agentExecutor = await initializeAgentExecutorWithOptions(
			[bingSearchTool, new CharaCountTool()], // 使用するツール
			geminiLlm,       // 使用するLLM
			{
				agentType: "zero-shot-react-description", // エージェントの種類
				verbose: false, // ログを出力
				maxRetries: 2, // 最大再試行回数
			}
		);
		return agentExecutor;
	}
	catch (error) {
		console.error(`Error processing query`, error);
		return "エラーが発生しました。";
	}
}

// AIでES作成の会話を生成
async function esCreateChat(textMax, company, esMode, esQuestion, chatLog,) {
	const agentExecutor = await createAgent(); // エージェントの初期化

	// 引数の値がない場合は、デフォルト値を設定
	company = company || "企業名は考慮しない"; // 企業名
	esQuestion = esQuestion || ""; // ESで聞かれていること
	chatLog = chatLog || "ESを作成したいです。まずは、私に質問してください"; // 過去の会話内容

	// 最低文字数(文字数制限の8割)
	const textMin = Math.floor(textMax * 0.8);

	// 各変数をプロンプトに埋め込む
	const fullQuery = await promptTemplate.format({ textMin, textMax, company, esMode, esQuestion, chatLog, });

	// エージェントからの出力文字
	let AIChatText = "";

	try {
		const initialResult = await agentExecutor.call({ input: fullQuery });

		// オブジェクトから出力結果を取り出して表示
		AIChatText = initialResult?.output || JSON.stringify(initialResult);
	} catch (error) {
		console.error(`Error processing query`, error);
		return "エラーが発生しました。";
	}
	return AIChatText; // 完成したAIからの返答を返す
}

module.exports = { esCreateChat };