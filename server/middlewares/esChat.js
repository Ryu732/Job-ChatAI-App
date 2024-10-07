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
		あなたはキャリアコンサルタントです。
		以下の制約条件と入力文をもとに、タスクのステップ1かステップ2を実行してください。
		最高の{esMode}という内容のエントリーシートを作成してください。

		# 制約条件:
		-STAR法（S:対象となる状況、T:自分の役割や課題、A:課題に対する行動、R:行動の結果得られた成果）を用いてエントリーシートを構成してください。
		-**{company}が入力されている場合、ユーザーにその企業についての理解や志望理由を尋ねてください。**

		# 入力文:
		-ESで聞かれていること:{esQuestion}
		-過去の会話内容:{chatLog}

		# タスク:
		## ステップ1: ユーザーへの質問:
		ES作成に関連することをユーザーに質問をしてください。
		約5~7つの質問を目安としますが、必要な情報が集まったと判断したらステップ2を実行してください。
		*質問をする際は1回につき、一度しか質問をしてはいけません。*
		質問例を参考にしながら質問してください。

		### 質問例:
		1. 具体的な経験やエピソードを教えてください。
		2. その中での具体的な役割を尋ねる。
		3. 役割においてどのような課題があったかを尋ねる。
		4. 課題に対してどのような行動を取ったかを尋ねる。
		5. 行動の結果、どのような成果を得たかを尋ねる。
		6. その他、{esMode}に役立つ情報があれば教えてください。

		## ステップ2: ESの作成:
		ユーザーの回答と提供された情報を基に、ESを作成してください。
		ESは{textMin}以上{textMax}未満の文字数で、生成する場合は必ず文字数をカウントしてください。

		# ESの出力形式:
		--ES:ESの内容
		--文字数:`,
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
	// コンソールにログを出力
	console.log("esCreateChat:", { textMax, company, esMode, esQuestion, chatLog, });

	const agentExecutor = await createAgent(); // エージェントの初期化

	// 引数の値がない場合は、デフォルト値を設定
	company = company || "企業名なし"; // 企業名
	esQuestion = esQuestion || " "; // ESで聞かれていること
	chatLog = chatLog || "log nothing"; // 過去の会話内容

	const textMin = Math.floor(textMax * 0.8); // 最低文字数(8割り)

	// 各変数をプロンプトに埋め込む
	const fullQuery = await promptTemplate.format({ textMin, textMax, company, esMode, esQuestion, chatLog, });

	// エージェントからの出力文字
	let AIChatText = "";

	try {
		const initialResult = await agentExecutor.call({ input: fullQuery });

		// オブジェクトから出力結果を取り出して表示
		AIChatText = initialResult?.output || JSON.stringify(initialResult);
		console.log("AIChatText:", AIChatText);
	} catch (error) {
		console.error(`Error processing query`, error);
		return "エラーが発生しました。";
	}
	return AIChatText; // 完成したAIからの返答を返す
}

module.exports = { esCreateChat };