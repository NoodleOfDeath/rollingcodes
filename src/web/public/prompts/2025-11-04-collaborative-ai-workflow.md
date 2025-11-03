# Designing with Purpose at Astronomical Speed: My Collaborative AI Workflow

*November 4, 2025*

## The New Paradigm

Yesterday, I built a complete resume builder in 45 minutes. Today, I added a Tech News aggregator, contact page, restructured navigation with nested menus, and integrated GitHub source references—all in a single session. This isn't just about coding faster. This is about **designing with purpose at astronomical speed**.

## The Secret: Speaking the Language AI Understands

My speed doesn't come from AI doing all the work. It comes from my expertise in knowing how to communicate with Claude in a way that leverages its training on Stack Overflow, best practices documentation, and millions of code examples. When I say:

> "make expansion carets on the left of each accordion title not the right"

Claude immediately knows:
- Material-UI's `AccordionSummary` has an `expandIconPosition` prop
- The value should be `"start"` not `"end"`
- This needs to be applied consistently across all 5 accordions
- The implementation should follow the existing code style

No ambiguity. No back-and-forth. Just precision.

## The Workflow: Design → Delegate → Refine

### 1. **Design with Intent**
I don't just ask for features. I describe the *architecture*:

```markdown
"Resume and My Articles should be under About menu.
For large viewports: mouseover dropdown.
For small viewports: accordion in drawer."
```

This single statement communicates:
- Navigation hierarchy structure
- Responsive behavior requirements
- UX patterns for different contexts
- Implementation approach (Menu vs Accordion)

### 2. **Delegate Systematically**
Claude maintains a todo list, tracking progress:
```markdown
1. [completed] Create Tech News page with RSS feeds
2. [completed] Add 'Curious how this is done?' section with GitHub source links
3. [completed] Modify About menu for responsive behavior
4. [completed] Move Resume and My Articles under About menu
5. [completed] Add 'View This Website Source Code' button to app bar
6. [completed] Create Contact Me page
```

This systematic approach ensures nothing gets lost, even if VSCode crashes (which happens with large Claude conversations).

### 3. **Refine Strategically**
Here's where my expertise matters. Claude often needs course correction:

**Style Consistency**: Claude maintains a "mutt of best practices" style that's surprisingly consistent. It reads enough of the codebase to maintain patterns, even after losing context.

**Architectural Decisions**: When I said "use localStorage to save resume data," Claude didn't just add localStorage calls—it:
- Created load/save helper functions
- Added error handling
- Integrated with existing context
- Provided a reset mechanism
- Stored serialized data properly

**Edge Cases**: The "yes sir, no questions asked" approach sometimes leads Claude astray. For example, when implementing page indicators:

```typescript
// Claude's first attempt - wrong reference point
top: ${(props) => props.$page * 100}%;

// After my correction - relative to container
top: ${(props) => `${(props.$page * props.$pageHeight)}px`};
```

## The Power of Composition

One of my biggest wins was teaching Claude about React composition through action:

**Me**: "I just replaced your thumbnail logic by literally reusing the ResumeRenderer component"

This wasn't a criticism—it was a teaching moment. Claude immediately understood:

```typescript
// Before: Duplicate rendering logic for thumbnails
const renderPreview = () => {
  // 100+ lines of duplicated structure
};

// After: Component reuse
<ResumeRenderer presetStyleOverride={preset} />
```

This is the React way. Single source of truth. Zero duplication.

## Why I Keep Conversation Logs

I asked Claude to maintain logs in `/public/prompts/` for a reason:

1. **Reproducibility**: Others can see exactly how features were built
2. **Learning Resource**: Each log is a case study in AI-assisted development
3. **Debugging**: When things break, I can trace back to design decisions
4. **Documentation**: The conversation IS the documentation
5. **Transparency**: "Curious how this is done?" links directly to source code

## The GitHub Integration Strategy

Every feature now includes GitHub source links:

```typescript
const GITHUB_BASE_URL = 'https://github.com/noodleofdeath/rollingcodes/blob/main/src/web/src';

<Button
  href={`${GITHUB_BASE_URL}/pages/tech-news/index.tsx`}
  target="_blank">
  Tech News Page Source
</Button>
```

This creates a virtuous cycle:
- Users see the feature
- They wonder how it works
- They click to see the code
- They learn from real implementations
- They build their own versions

## What Was Achieved Today

In a single session, we implemented:

### **Tech News Page**
- RSS feed aggregation from 3 major tech publications
- Real-time updates with 1-hour revalidation
- Server-side rendering for SEO
- Beautiful card-based layout with hover effects

### **Contact Page**
- Professional contact cards (Email, Phone, GitHub, LinkedIn)
- Responsive grid layout
- Call-to-action buttons with proper `mailto:` and `tel:` links

### **Navigation Restructure**
- Desktop: Hover-activated dropdown menu for About
- Mobile: Accordion-based navigation in drawer
- Nested menu structure: About → (About Me, Resume, My Articles)
- Added "Tech News" and "Contact" as top-level items

### **GitHub Integration**
- "View This Website Source Code" button in app bar
- Source code links on Tech News page
- Direct links to specific implementation files
- All links properly formatted for GitHub blob URLs

### **Resume Builder Enhancements** (from yesterday)
- localStorage persistence for user resume data
- "Reset to Thom's Resume" button with confirmation
- Accordion expand icons on the left (better UX)
- Close buttons on all popovers and drawers
- Skill tooltips with hover delay
- Fixed list element margins/padding

## The Real Innovation

The innovation isn't the AI. It's the **collaborative workflow**:

1. I design with architectural clarity
2. Claude implements with best practices consistency
3. I refine based on domain expertise
4. Claude adapts and learns from corrections
5. We iterate rapidly toward production quality

This is faster than coding alone because:
- No syntax errors to debug
- No forgotten imports to track down
- No "which prop was that again?" moments
- No switching between documentation and IDE
- No context switching between files

But it's also *better* than coding alone because:
- Two perspectives on every implementation
- Immediate code review
- Consistent style enforcement
- Real-time best practices application
- Built-in documentation through conversation

## The Future of Development

This workflow represents a fundamental shift:

**Old Paradigm**: Developer → Code → Debug → Refactor → Ship

**New Paradigm**: Developer ↔ AI → Design → Implement → Refine → Ship

The arrows go both ways. It's a conversation. A collaboration. A partnership where:
- I bring domain expertise, architectural vision, and UX intuition
- Claude brings implementation speed, pattern recognition, and consistency
- Together we build production-quality features in hours, not days

## Lessons Learned

1. **Precision in Communication**: The clearer my intent, the better the output
2. **Trust but Verify**: Claude's implementations are usually correct, but edge cases exist
3. **Composition Over Duplication**: Teaching Claude React principles improves all future work
4. **Documentation as Byproduct**: Conversation logs become valuable learning resources
5. **Transparency Builds Trust**: GitHub links let users verify and learn

## Try It Yourself

Want to see this workflow in action? Check out:
- [Resume Builder Log](/prompts/2025-11-03.1231-resume-builder.md) - How I built the resume builder in 45 minutes
- [Tech News Source](https://github.com/noodleofdeath/rollingcodes/blob/main/src/web/src/pages/tech-news/index.tsx) - Implementation with RSS feeds
- [Navigation Component](https://github.com/noodleofdeath/rollingcodes/blob/main/src/web/src/components/Layout.tsx) - Responsive nested menus

The code is open source. The conversations are documented. The workflow is reproducible.

This is the future of development: designing with purpose at astronomical speed.

---

*Built with Claude Code in a single afternoon session. Yes, really.*
