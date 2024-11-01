🍅 Tomato - Natural Language to Gherkin Syntax Translator and Test Automation Tool
Welcome to Tomato, a command-line tool designed to simplify the process of translating natural language scenarios into Gherkin syntax and generating automated test scripts in multiple languages. Tomato helps both technical and non-technical users bridge the gap between behavior-driven development (BDD) and automated testing workflows.

## 💖 Support This Project

If you find Tomato helpful, consider supporting its development with a donation! Your contributions help us maintain and improve the tool.

[Donate Here](https://your-donation-link.com)


🌟 Features
Natural Language to Gherkin Translation: Converts plain language input into Gherkin .feature files.
Language-Specific Step Definitions: Generates step definition templates in Python (Behave), Java (Cucumber), and JavaScript (Cucumber.js).
Automated Git Commit: Automatically stages and commits generated files to version control.
CI/CD-Ready: Triggers automated test execution through GitHub Actions on each commit.
Multi-Language Support: Supports Python, Java, and JavaScript for flexible testing options.
📥 Installation
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/tomato.git
cd tomato
Install Dependencies (Node.js is required)

bash
Copy code
npm install
🚀 Usage
Start Tomato

bash
Copy code
node src/tomato.js
Enter a Natural Language Scenario

Input your scenario in plain language, e.g., "user logs in to the system".
Select Target Language

Choose the programming language for your test script (Python, Java, or JavaScript).
Generated Files

Gherkin .feature file is saved in src/output/gherkin.feature.
Step definitions are stored in src/templates, customized for each language.
Automated Commit and CI/CD Execution

Generated files are automatically committed to your Git repository.
GitHub Actions detects the new .feature file and initiates test execution.
🛠 File Structure
src: Contains the main program files, including tomato.js and language-specific templates.
src/output: Stores the generated Gherkin .feature file.
src/templates: Holds language-specific step definition templates:
python_step_definition.txt
java_step_definition.txt
js_step_definition.txt
.github/workflows/ci.yml: CI/CD pipeline configuration for test automation.
🧪 CI/CD Pipeline Setup
Tomato uses GitHub Actions to automatically run tests when new feature files are added. Here's how the pipeline works:

Trigger: When changes are pushed to the src/output/gherkin.feature file.
Matrix Testing: Runs tests in each supported language (Python, Java, JavaScript).
Test Execution: Executes .feature files using Behave (Python), Cucumber (Java), and Cucumber.js (JavaScript).
🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and test thoroughly.
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
📝 Example Scenario
Input
text
Copy code
"user logs in to the system"
Output
Gherkin .feature File (src/output/gherkin.feature)

gherkin
Copy code
Feature: User login
  Scenario: User logs in to the system
    Given the user is on the login page
    When the user enters valid credentials
    Then the user is redirected to the dashboard
Generated Step Definition (e.g., python_step_definition.txt)

python
Copy code
@given("the user is on the login page")
def step_impl(context):
    pass  # Implementation here

@when("the user enters valid credentials")
def step_impl(context):
    pass  # Implementation here

@then("the user is redirected to the dashboard")
def step_impl(context):
    pass  # Implementation here
📝 License
This project is licensed under the MIT License.

