import "dotenv/config";
import { InferenceClient } from "@huggingface/inference";

const callAI = async () => {

    const client = new InferenceClient(process.env.HF_TOKEN);

    const chatCompletion = await client.chatCompletion({
        model: "HuggingFaceTB/SmolLM3-3B:hf-inference",
        messages: [
            {
                role: "user",
                content: "Make a 600 word article with a title.",
            },
        ],
    });

    return chatCompletion.choices[0].message.content;
}

export default callAI;