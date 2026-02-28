# Design Specification — Simple Todo App

## Color Palette

| Token              | Hex       | Usage                                  |
|--------------------|-----------|----------------------------------------|
| primary            | `#6366F1` | Buttons, links, focus rings            |
| primary-hover      | `#4F46E5` | Button hover state                     |
| primary-active     | `#4338CA` | Button active/pressed state            |
| primary-light      | `#EEF2FF` | Tinted backgrounds, selected states    |
| surface            | `#FFFFFF` | Card backgrounds, inputs               |
| background         | `#F8FAFC` | Page background                        |
| text-primary       | `#0F172A` | Headings, primary body text            |
| text-secondary     | `#64748B` | Supporting text, labels                |
| text-muted         | `#94A3B8` | Placeholder text, subtle hints         |
| border             | `#E2E8F0` | Card borders, dividers, input borders  |
| border-focus       | `#818CF8` | Input/card focus ring color            |
| success            | `#22C55E` | Completed todo indicator               |
| success-light      | `#F0FDF4` | Completed todo background tint         |
| danger             | `#EF4444` | Delete button, error states            |
| danger-hover       | `#DC2626` | Delete button hover                    |
| danger-light       | `#FEF2F2` | Danger background tint                 |
| disabled-bg        | `#F1F5F9` | Disabled element backgrounds           |
| disabled-text      | `#94A3B8` | Disabled element text                  |

## Typography

**Font Family:** `'Inter', system-ui, -apple-system, sans-serif`

| Token | Size   | Line Height | Weight | Usage               |
|-------|--------|-------------|--------|---------------------|
| xs    | 12px   | 16px        | 400    | Captions, badges    |
| sm    | 14px   | 20px        | 400    | Secondary text      |
| base  | 16px   | 24px        | 400    | Body text, inputs   |
| lg    | 18px   | 28px        | 500    | Emphasized body     |
| xl    | 20px   | 28px        | 600    | Section headings    |
| 2xl   | 24px   | 32px        | 700    | Page sub-headings   |
| 3xl   | 30px   | 36px        | 700    | Page title          |
| 4xl   | 36px   | 40px        | 800    | Hero / app title    |

## Spacing Scale (4px base unit)

| Token | Value |
|-------|-------|
| 0.5   | 2px   |
| 1     | 4px   |
| 1.5   | 6px   |
| 2     | 8px   |
| 2.5   | 10px  |
| 3     | 12px  |
| 4     | 16px  |
| 5     | 20px  |
| 6     | 24px  |
| 8     | 32px  |
| 10    | 40px  |
| 12    | 48px  |
| 16    | 64px  |
| 20    | 80px  |

## Border Radius

| Token   | Value   |
|---------|---------|
| sm      | 4px     |
| DEFAULT | 8px     |
| md      | 8px     |
| lg      | 12px    |
| xl      | 16px    |
| 2xl     | 20px    |
| full    | 9999px  |

## Box Shadows

| Token   | Value                                                                        |
|---------|------------------------------------------------------------------------------|
| sm      | `0 1px 2px 0 rgba(0, 0, 0, 0.05)`                                           |
| DEFAULT | `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`       |
| md      | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`    |
| lg      | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)` |

## Transitions

| Property     | Duration | Easing                    |
|-------------|----------|---------------------------|
| color       | 150ms    | cubic-bezier(0.4, 0, 0.2, 1) |
| background  | 150ms    | cubic-bezier(0.4, 0, 0.2, 1) |
| border      | 150ms    | cubic-bezier(0.4, 0, 0.2, 1) |
| box-shadow  | 150ms    | cubic-bezier(0.4, 0, 0.2, 1) |
| transform   | 200ms    | cubic-bezier(0.4, 0, 0.2, 1) |

## Component List

### Button
- **Variants:** primary, secondary (outline), danger, ghost
- **Sizes:** sm (h-8 px-3 text-sm), md (h-10 px-4 text-base), lg (h-12 px-6 text-lg)
- **States:** default, hover, focus, active, disabled
- **Border radius:** `md` (8px)

### Card
- **Variants:** default, interactive (hover-elevates), completed (success tint)
- **States:** default, hover, focus, active, disabled
- **Border:** 1px solid `border` color
- **Border radius:** `lg` (12px)
- **Shadow:** `sm` default, `md` on hover (interactive variant)

### Input (text field)
- **Height:** 44px (touch-friendly)
- **Border:** 1px solid `border`, 2px solid `border-focus` on focus
- **Border radius:** `md` (8px)
- **Padding:** 12px horizontal
- **Placeholder color:** `text-muted`

### Checkbox (custom)
- **Size:** 20×20px
- **Border:** 2px solid `border`
- **Checked:** filled `primary` with white checkmark
- **Border radius:** `sm` (4px)

### TodoItem (composed)
- Card containing: Checkbox + todo text + delete icon-button
- Completed state: success-light background, strikethrough text, green checkbox

## Screen Layout — Primary (Todo Screen)

```
┌──────────────────────────────────────┐
│          background (#F8FAFC)        │
│  ┌──────────────────────────────┐    │
│  │  App Title  (4xl, 800 wt)   │    │
│  │  Subtitle   (base, muted)   │    │
│  ├──────────────────────────────┤    │
│  │  [ Input field     ] [Add]  │    │
│  ├──────────────────────────────┤    │
│  │  ┌────────────────────────┐  │    │
│  │  │ ☐  Todo item text   🗑 │  │    │
│  │  └────────────────────────┘  │    │
│  │  ┌────────────────────────┐  │    │
│  │  │ ☑  Completed item  🗑  │  │    │
│  │  └────────────────────────┘  │    │
│  │  ...                         │    │
│  ├──────────────────────────────┤    │
│  │  N items left  ·  N done    │    │
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

- Max width: 540px, centered horizontally
- Content padding: 24px horizontal, 48px vertical top
- Card gap: 12px between todo items
- Input row gap: 12px between input and button

## Handoff

- **Artifacts:** `docs/design/design-spec.md`
- **BLOCKER:** None.
