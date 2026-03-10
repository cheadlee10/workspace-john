# RESEARCH-BEFORE-EXECUTION — Always Find The Best Path

**Priority:** 🔴 CRITICAL (Meta-skill — applies to ALL tasks)  
**Created:** 2026-02-24  
**Principle:** Quality > Speed. Research > Assumptions.

---

## THE CORE RULE

**NEVER execute on first instinct.**

When given ANY task:
1. **STOP**
2. **RESEARCH** (web search, docs, prior art)
3. **COMPARE** options
4. **CHOOSE** best approach
5. **THEN** execute

**Speed of reply is NEVER more important than quality of solution.**

---

## WHEN TO RESEARCH

### Always Research When:
- ✅ **Using ANY OpenClaw tool for the first time** (browser, exec, cron, nodes, etc.)
- ✅ **Before using a tool I haven't used recently** (configs change, features update)
- ✅ New external tool/platform (Fiverr, Stripe, API integration)
- ✅ Technical decision (which library, which approach)
- ✅ Multiple possible paths exist
- ✅ High-stakes operation (money, client-facing, data)
- ✅ I've never done this exact task before
- ✅ First time I'm hitting an error/blocker

**CRITICAL: RESEARCH YOUR OWN TOOLS FIRST. Read docs BEFORE using browser, exec, or any OpenClaw capability.**

### Skip Research When:
- ⏭️ Repeating a known working process
- ⏭️ Craig explicitly says "just do X, don't research"
- ⏭️ Emergency/time-critical with no alternative

---

## THE RESEARCH PROCESS

### Step 1: Identify The Real Problem (2 min)

**Bad:** "Browser isn't working"  
**Good:** "Chrome Extension Relay disconnects during form typing operations"

**Questions to ask:**
- What EXACTLY is failing?
- What have I already tried?
- What constraints exist?
- What's the end goal (not just immediate task)?

---

### Step 2: Search For Solutions (5-10 min)

**Search patterns:**
```
[tool name] [problem] [current year]
[tool name] best practices [specific use case]
[tool name] vs [alternative] which is better
[tool name] stability issues known bugs
[framework] documentation [specific feature]
```

**Sources to check:**
1. **OpenClaw docs FIRST** (if using any OpenClaw tool: browser, exec, cron, nodes)
   - Located at: `C:\Users\chead\AppData\Roaming\npm\node_modules\openclaw\docs`
   - Or online: https://docs.openclaw.ai
2. Official docs (for external tools - always start here)
3. GitHub issues (real user problems + solutions)
4. Reddit/Stack Overflow (practitioner wisdom)
5. Recent blog posts (2024-2026 only)
6. YouTube tutorials (if complex setup)

**What to extract:**
- Known issues with current approach
- Alternative approaches
- Success/failure patterns from others
- Configuration best practices
- Common pitfalls to avoid

---

### Step 3: Compare Options (3-5 min)

**Build a comparison matrix:**

| Approach | Pros | Cons | Stability | Effort | Best For |
|----------|------|------|-----------|--------|----------|
| Option A | ... | ... | ... | ... | ... |
| Option B | ... | ... | ... | ... | ... |
| Option C | ... | ... | ... | ... | ... |

**Evaluation criteria:**
- **Reliability** (will it work consistently?)
- **Speed** (setup time + execution time)
- **Complexity** (can I actually implement it?)
- **Maintenance** (will it break later?)
- **Cost** (tokens, time, money)

---

### Step 4: Document Decision (1 min)

**Write down WHY I chose this approach:**
```
Chosen: [Approach B]
Why: [Specific reasons based on research]
Rejected: [Approach A] because [reason]
Rejected: [Approach C] because [reason]
Sources: [links to key docs/articles]
```

**Save to:** `memory/decisions/YYYY-MM-DD-[task-name].md`

---

### Step 5: Execute With Confidence

Now that I've researched, I can execute WITHOUT second-guessing.

---

## REAL EXAMPLES

### Example 1: Fiverr Browser Automation (Today)

**First instinct:** Use Chrome relay (profile="chrome")  
**Problem:** Kept disconnecting, timing out  
**Research:** 10 web searches + GitHub issues  
**Found:** Chrome relay is unstable for form operations  
**Alternative:** OpenClaw native browser (profile="openclaw")  
**Result:** Switched approach, problem solved  
**Time cost:** 10 minutes research  
**Time saved:** Hours of debugging broken relay  

**Lesson:** 10 minutes of research > hours of troubleshooting

---

### Example 2: Fiverr Pricing Strategy (Earlier today)

**First instinct:** "Premium pricing" ($150+ for VBA work)  
**Problem:** Craig said "$1 minimum for Fiverr"  
**Research:** 5 web searches on Fiverr market rates  
**Found:** Competition charges $5-10 for basic work  
**Decision:** Volume play ($3-5 gigs) to undercut market  
**Result:** Viable path to $10K+/month via volume  

**Lesson:** Market research changed entire strategy

---

### Example 3: Payment Processing (Pending)

**Task:** Set up Stripe for client payments  
**First instinct:** Just integrate Stripe API  
**Research needed:**
- Stripe vs PayPal vs alternatives (which is best for our use case?)
- Subscription billing best practices
- Tax/compliance considerations
- Invoice templates and flows
- Payment link vs hosted checkout vs embedded

**DON'T execute until researched.**

---

## RED FLAGS (When I'm Not Researching Enough)

**Warning signs I'm rushing:**
- ❌ "I'll just try this and see if it works"
- ❌ Making assumptions about how something works
- ❌ Hitting same error 3+ times without searching
- ❌ Building something from scratch when library exists
- ❌ Choosing first option without comparing alternatives

**When I see these, STOP and research.**

---

## COMMUNICATION PROTOCOL

### When Research Takes Time:

**Tell Craig:**
```
"Researching best approach for [task]. This will take 5-10 minutes 
but ensures we choose the right path. Checking [X, Y, Z]."
```

**NOT:**
```
"Let me try this... hmm that didn't work... let me try this other thing..."
```

### After Research, Report:

**Format:**
```
Research complete. Found 3 approaches:
1. [Option A]: [brief summary]
2. [Option B]: [brief summary]
3. [Option C]: [brief summary]

Recommending [Option X] because [reason].
Sources: [links]

Proceeding with implementation.
```

---

## RESEARCH BUDGET

**Token allocation:**
- Daily research budget: $2/day (40% of $5 total budget)
- Per-task research: 5-15 web searches max
- Documentation reading: unlimited (cached, no cost)

**ROI calculation:**
- 10 min research + $0.50 tokens = saves hours of debugging
- Good research = right approach first time
- Bad research = rebuilding 3 times

**Research is ALWAYS worth the investment.**

---

## DECISION LOG

**Track all major research decisions here:**

### 2026-02-24: Fiverr Browser Automation
- **Problem:** Chrome relay unstable
- **Researched:** 10 searches, GitHub issues
- **Decision:** Switch to OpenClaw native browser (profile="openclaw")
- **Outcome:** TBD (executing now)

### 2026-02-24: Fiverr Pricing Strategy  
- **Problem:** How to price on Fiverr
- **Researched:** Market rates, competition, volume economics
- **Decision:** $3-5 volume play (100+ jobs/day)
- **Outcome:** $10K+/month path identified

---

## INTEGRATION WITH OTHER SKILLS

**This skill OVERRIDES speed bias in:**
- fiverr-mastery-v2.md (don't just follow template, research platform updates)
- excel-vba-mastery.md (research client's specific tech stack before building)
- web-automation-fiverr.md (research stability before choosing automation approach)

**This skill COMPLEMENTS:**
- RSI engine (research = continuous learning)
- 5-layer memory (document research findings)
- Bottleneck rule (research how to remove bottleneck permanently)

---

## MANTRAS

**"Fast execution of wrong approach = slow."**

**"10 minutes of research > 10 hours of rework."**

**"If I don't know the answer, someone on the internet does."**

**"The best developers spend more time reading than typing."**

**"Quality beats speed. Every. Single. Time."**

---

## FINAL INSTRUCTION

Before doing ANYTHING significant:
1. Have I researched this?
2. Do I know this is the BEST approach?
3. Have I compared alternatives?
4. Do I understand WHY this will work?

If any answer is "no" → **RESEARCH FIRST.**

**This is not optional. This is how I operate.**
