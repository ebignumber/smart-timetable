# How to Add Yourself as a Contributor 🎉

Thank you for contributing to Smart Timetable Generator!

## After Your Pull Request is Merged

### Step 1: Go to Your Merged Pull Request
Find the pull request you created that was merged into the main project.

### Step 2: Add a Comment
Copy and paste this (replace `your-username` with your actual GitHub username):
`@all-contributors please add @your-username for code`

### Step 3: Wait for the Bot
A bot will automatically create a new pull request adding you to the contributors list.

### Step 4: Done! ✅
Once the maintainer merges that PR, you'll see your profile picture in the README!

---

## What Type of Contribution Did You Make?

Replace `code` with what you actually did:

| What You Did | Use This |
|--------------|----------|
| Wrote code | `code` |
| Wrote documentation | `doc` |
| Designed UI/UX | `design` |
| Reported bugs | `bug` |
| Wrote tests | `test` |
| Reviewed PRs | `review` |
| Answered questions | `question` |
| Had ideas | `ideas` |
| Infrastructure/CI | `infra` |

### Examples:

**Just code:**
```markdown
@all-contributors please add @your-username for code 
```
**Code and documentation:**
```markdown
@all-contributors please add @your-username for code, doc
```
**Design work:**
```markdown
@all-contributors please add @your-username for design
```

## FAQ

**Q: When should I do this?**  
A: Only after your pull request is merged into the main project.

**Q: What if the bot doesn't respond?**  
A: The maintainer needs to install the bot first. Just ask them politely!

**Q: Can I add multiple types?**  
A: Yes! Separate them with commas like: `code, doc, test`

---

## 🔧 For Maintainers Only

### Setting Up the Bot (One-Time Setup)

To make this automatic, install the All Contributors bot:

1. Go to: https://github.com/apps/allcontributors
2. Click **"Install"**
3. Select this repository
4. Click **"Install & Authorize"**

✅ **Done!** Now contributors can add themselves automatically.

### Manual Method (If You Don't Want the Bot)

You can also add contributors manually using CLI:
```bash
# Install dependencies (if not already installed)
npm install

# Add a contributor
npx all-contributors add username code,doc

# Update the README
npx all-contributors generate

# Commit the changes
git add .
git commit -m "docs: add username as a contributor"
git push