// ES作成のプロセス提供
// ES作成の会話を生成する関数
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { PromptTemplate } = require("@langchain/core/prompts");
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

// エージェントが使うツールを設定
const tools = [{
	name: "bingseach",
	description: "Web上から検索するときに使うツールです。最新の情報などを取得できます。",
	func: bingSearchTool,
}, {
	name: "countString",
	description: "文字数を数えるツールです。生成した文章の文字数を数えるときに使います。",
	func: function (str) { return str.length; },
},];

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
	inputVariables: ["textMin", "textMax", "company", "esMode",]// プロンプトへの入力変数
});

// Agentの設定(ツールを選ぶ)
async function createAgent() {
	const agentExecutor = await initializeAgentExecutorWithOptions(
		tools, // 使用するツール
		geminiLlm,       // 使用するLLM
		{
			agentType: "conversational-react-description", // エージェントの種類
			verbose: true, // ログを出力
			maxRetries: 2, // 最大再試行回数
		}
	);
	return agentExecutor;
}

// AIでES作成の会話を生成
async function esCreateChat(textMax, company, esMode) {
	const agentExecutor = await createAgent(); // エージェントの初期化
	const textMin = Math.floor(textMax * 0.8); // 最低文字数(8割り)

	// 各質問事項に対して検索を実行
	const fullQuery = await promptTemplate.format({ textMin, textMax, company, esMode });

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