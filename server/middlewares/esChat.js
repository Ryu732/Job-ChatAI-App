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
		以下の制約条件と入力文をもとに、ユーザーに質問を繰り返しながら、最高のエントリーシートを出力してください。
		質問する際は、質問手順を基に質問をしてください。
		ユーザーの回答が曖昧なときは、再度詳しく質問してください。
		**ユーザーに質問をする際は、1質問につき1つの事柄しか聞いてはいけません。**

		# 制約条件:
		-STAR法（S:対象となる状況、T:自分の役割や課題、A:課題に対する行動、R:行動の結果得られた成果）を用いてエントリーシートを構成してください。
		-ESの文字数は **{textMin}文字以上{textMax}文字未満** で記述してください。
		-**企業名が入力された際は、Web検索でどのような企業か調べる(事業内容や最近のニュースなど)**

		# 入力文:
		-ESの最低文字数:{textMin}
		-ESの最高文字数:{textMax}
		-提出する会社名:{company}
		-ESの種類:{esMode}
		-ESで聞かれていること:{esQuestion}
		-過去の会話内容:{chatLog}

		# 質問手順:
		1. ユーザーに関連するエピソードを1つ教えてもらう。
		2. その中での具体的な役割を尋ねる。
		3. その役割においてどのような課題があったかを尋ねる。
		4. その課題に対してどのような行動を取ったかを尋ねる。
		5. 行動の結果、どのような成果を得たかを尋ねる。
		6. ESを書く上で重要だと思うことを考えて尋ねる。

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
				verbose: true, // ログを出力
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
	company = company || "企業名"; // 企業名
	esQuestion = esQuestion || "ESで聞かれていること"; // ESで聞かれていること
	chatLog = chatLog || "これまでの会話なし"; // 過去の会話内容

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