# import torch
# from transformers import pipeline
# import os

# # model_id = "meta-llama/Llama-3.2-1B" # tried the 1B model, but it was genearting nonsense responses such as:
# # [{'generated_text': "\n        - Inception,\n        - The Godfather,\n        - Pulp Fiction,\n        - Kill Bill,\n        - Djanga Unchained,\n        - Ready Player One,\n        \n        Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the word itself.\n            - If the word is a verb, then return the word itself.\n            - If the word is a noun or verb, then return the word itself.\n        - Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the word itself.\n            - If the word is a verb, then return the word itself.\n            - If the word is a noun or verb, then return the word itself.\n        - Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the word itself.\n            - If the word is a verb, then return the word itself.\n            - If the word is a noun or verb, then return the word itself.\n        - Return the movie titles that are most similar to the word 'tion'.\n            - If the word is a noun, then return the"}]
# model_id = "meta-llama/Llama-3.2-3B"

# hf_auth_token = os.getenv("HF_AUTH_TOKEN")

# pipe = pipeline(
#     "text-generation", 
#     model=model_id, 
#     torch_dtype=torch.bfloat16, 
#     device_map="auto",
#     use_auth_token=hf_auth_token,
# )

#         # From the movie titles below, which one is similar to 'fiction'? 
#         # Filter out the movie titles that are similar to 'fiction'.
#         # From the movie list above, return the movie titles that are similar to the input 'fiction'.
# # res = pipe("The key to life is")
# # res = pipe("""
# #         1. Inception
# #         2. The Godfather
# #         3. Pulp Fiction
# #         4. Kill Bill
# #         5. Djanga Unchained
# #         6. Ready Player One
        
# #         Return the movie ids whose titles are wordwise similar to the word below 
        
# #         tion
# #            """, max_new_tokens=200)
# res = pipe("what is the best way to ask you a question?")
# print(res)


from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
import torch

model_name = "deepset/roberta-base-squad2"

# a) Get predictions
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
# QA_input = {
#     'question': 'Why is model conversion important?',
#     'context': 'The option to convert models between FARM and transformers gives freedom to the user and let people easily switch between frameworks.'
# }
QA_input = {
    # 'question': 'Which movie titles are the most similar to the word "tion"?',
    'question': 'Rank the movie titles based on their similarity to the word "chain"?',
    'context': '''
    These are the movie titles:
        - Inception
        - The Godfather
        - Pulp Fiction
        - Kill Bill
        - Djanga Unchained
        - Ready Player One
        '''
}
res = nlp(QA_input, max_new_tokens=200)

print(res)

# b) Load model & tokenizer
model = AutoModelForQuestionAnswering.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# # c) Use the tokenizer to pre-process the input and the model to generate an answer
# inputs = tokenizer(QA_input['question'], QA_input['context'], return_tensors="pt")
# answer_start_scores, answer_end_scores = model(**inputs)
# answer_start = torch.argmax(answer_start_scores)  # Get the most likely beginning of answer with the argmax of the score
# answer_end = torch.argmax(answer_end_scores) + 1  # Get the most likely end of answer with the argmax of the
# answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][answer_start:answer_end]))

# print(answer)
