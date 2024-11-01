import sys

def convert_to_gherkin(natural_language):
    # Conversion logic based on specific phrases
    if "logs in" in natural_language:
        return "Given the user logs in to the system"
    elif "views" in natural_language:
        return "When the user views the dashboard"
    elif "sees" in natural_language:
        return "Then the user sees the welcome message"
    else:
        return f"Given a user performs an action: {natural_language}"  # Default case

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_text = sys.argv[1]
        gherkin_output = convert_to_gherkin(input_text)
        print(gherkin_output)
    else:
        print("No input provided.")
