import pandas as pd

# load your data into a dataframe
df = pd.read_csv("Jcommerce_data.csv")
# print(df)

print("Chatbot: Hello there, I am your Chat assistance bot. How can I help you?.")


while True:
    #1.  Get the user input and store the same into a variable
    user_text = input("\n You: ").lower()

    # 2. Check if the users what to exit 
    if user_text == "quit":
        print("Chatbot: Goodbye! Nice to have been of service to you.")
        break

    # Create a variable with will store the details structured in the csv file
    found_answer = False

    # come up with a loop that loops through the entire data frame created before.
    for index, row in df.iterrows():
        # clean up the keywords from the CSV row
        keywords_list = str(row['Keywords']).split(',')

        # print("The words inside of the variable keywords_list are: ", keywords_list)
        # Below we check every keyword in that given row (Keywords)

        for word in keywords_list:
            clean_word = word.strip().lower()
            # print("The content inside of clean_word are:", clean_word)

            # if the keyword is inside of the user's sentence
            if clean_word in user_text:
                print("Healthbot:", row["Response"])
                found_answer = True
                break #Stop looking at other keywords
        
        if found_answer:
            break # Stop looking at other answers since we already found a match
    
    # 4. If we went through the entire/whole CSV file and never found any match of the keywords, 
    # we need to display a message to the user

    if not found_answer:
        print("Chatbot: Sorry, i don't know that one, Try asking for something else.")
