import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.0-pro';
const GEM_API_KEY = 'AIzaSyDsxsj2Lc1A3iLB8nd0QBKTbV3yeFoiNIk';

async function runGeminiFoodQuery(locaton: string, mealDescription: string) {
    const genAI = new GoogleGenerativeAI(GEM_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: 'user',
                parts: [
                    {
                        text: 'For the rest of the messages you are going to receive a restaurant name, or a location, as well as meal description in the format:\n\n["restaurant or location name", "brief description of the meal"] \n\nRespond in the following following with appropriate estimates based on my input:\n\n[calories, carbs, protein, fat] \n\nDo you understand my request?',
                    },
                ],
            },
            {
                role: 'model',
                parts: [
                    {
                        text: 'Yes, I understand your request. I will provide you with calorie, carb, protein, and fat estimates for each meal description you give me, in the following format:\n\n[calories, carbs, protein, fat] \n\nFor example, if you give me the following input:\n\n["McDonald\'s", "Big Mac"]\n\nI might respond with the following:\n\n[560, 46, 25, 30]\n\nI will do my best to provide accurate estimates, but please note that these are just estimates and may not be exact.',
                    },
                ],
            },
            {
                role: 'user',
                parts: [{ text: '["McDonald\'s", "Big Mac"]' }],
            },
            {
                role: 'model',
                parts: [{ text: '[560, 46, 25, 30]' }],
            },
            {
                role: 'user',
                parts: [{ text: '["Popeyes", "Spicy Chicken Sandwich"]' }],
            },
            {
                role: 'model',
                parts: [{ text: '[690, 46, 39, 36]' }],
            },
        ],
    });

    const result = await chat.sendMessage(
        `["${locaton}", "${mealDescription}"]`
    );
    const response = result.response;
    // console.log(response.text());
    return response.text();
}

export default runGeminiFoodQuery;

/*
For the rest of the messages you are going to receive a restaurant name, or a location, as well as meal description in the format 

["restaraunt or location name", "brief description of the meal"]

Respond in the following following with appropriate estimates based on my input:

[calories, carbs, protein, fat]

Do you understand my request?

/// ///

{
    location: "McDonalds",
    description: "Quarter Pounder with Cheese"
}


*/
