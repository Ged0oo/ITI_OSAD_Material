# Lab 1: Product Page Guide

This guide helps you solve the lab step by step without giving the final implementation away. Use it as a checklist while working in `src/pages/Product.vue` and keep all data in the parent component only.

## 1. Start by identifying the data you need

Before writing the template, list the values the UI must show:

- Main product image
- Product name
- Product description
- Product badge
- Product price
- Discounted price
- Tags
- Related products

The important rule here is that every visible value should come from your component state or a computed value. Avoid typing fixed UI text directly in the template unless it is part of the lab instructions and not user-facing content.

## 2. Create the parent component state first

In the `<script>` section of `Product.vue`, define the main product object and the related products array using the exact data shape from the lab prompt.

Keep these points in mind:

- Do not change the object structure.
- Keep the data in the parent component only.
- Make sure the tags stay as an array so they can be rendered with a loop.
- Keep related products as an array so the UI updates automatically when items are added or removed.

At this stage, you are only preparing the data. Do not build the final layout yet.

## 3. Plan the computed value for the discounted price

The discounted price must not be calculated manually inside the template.

Create a computed property that uses:

- the original price
- the discount percentage

Think of the result as:

discounted price = original price - the discount amount

The goal is that when the price or discount changes in the script, the displayed discounted price updates automatically.

## 4. Build the main product section first

Create one clear section for the main product card.

Include these template bindings:

- Use image binding for the product image.
- Use interpolation for the name and description.
- Show the badge only if a badge value exists.
- Use a conditional class or style for the badge color.
- Use the computed value for the discounted price.

Recommended order for the layout:

1. Product image
2. Badge
3. Product title
4. Description
5. Prices
6. Buy button

This gives you a stable structure before adding the repeated sections.

## 5. Handle the original price condition correctly

The original price should only appear when the discount is greater than zero.

Use a conditional check so that:

- products with a discount show the crossed-out original price
- products without a discount do not show the strikethrough value

This requirement applies to the main product and also to each related product.

## 6. Render tags dynamically

The tags must be shown as separate visual elements, not as one comma-separated string.

Use a loop over the tags array and render each tag as its own badge, chip, or pill.

Important things to verify:

- Each tag has its own element.
- The tag list comes from the data.
- The template does not hardcode tag names.

## 7. Render related products from the array

Create a separate section for related products.

For each related product, show at least:

- image
- name
- price
- discounted price

If a related product has a discount of zero, skip the crossed-out original price for that item.

Use a loop so the section stays in sync with the array automatically.

## 8. Use Vue features intentionally

The lab expects specific Vue features to appear at least once.

Use this as a quick checklist:

- Interpolation `{{ }}` for product text and values
- `:src` for the image source
- `:class` or `:style` for badge color behavior
- `v-for` for tags and related products
- `v-if` for the original price condition and badge visibility
- `computed` for the discounted price

Do not add a feature just to satisfy the checklist; each one should serve the UI.

## 9. Keep the page presentable with DaisyUI or Bootstrap

The lab asks for a styled page, not bare HTML.

Use one of these approaches:

- DaisyUI components and utility classes
- Bootstrap cards, badges, and layout helpers

Focus on a simple layout first, then refine spacing, alignment, and emphasis.

Good visual priorities:

- Clear product card hierarchy
- Obvious price emphasis
- Clean tag layout
- Distinct related-product cards

## 10. Check the acceptance criteria one by one

Before considering the lab finished, verify each requirement:

1. Changing the price or discount updates the displayed values immediately.
2. Adding or removing related products changes the rendered UI.
3. The badge disappears when the badge value is empty.
4. Tags appear as individual elements.
5. The original price only appears when the discount is greater than zero.

If any of these fail, inspect the data flow before changing the design.

## 11. Optional bonus task

If you want to extend the lab, add an `isAvailable` field to the main product object.

Then make the UI react to that value by:

- showing an “Out of Stock” badge when availability is false
- disabling the buy button when the product is unavailable

Treat this as an extra layer on top of the main requirements, not as a replacement for them.

## 12. Suggested working order

If you want the safest path, build it in this order:

1. Define the product data.
2. Add the computed discounted price.
3. Render the main product card.
4. Add badge visibility and conditional styling.
5. Add the tags loop.
6. Add the related products loop.
7. Add the conditional original price logic.
8. Style the page with DaisyUI or Bootstrap.
9. Test the acceptance criteria.

That sequence keeps the logic simple and helps you catch issues early.

## 13. Final self-check

When you think the page is ready, ask yourself:

- Is every visible value coming from data or computed state?
- Are tags and related products generated with loops?
- Does the discounted price update automatically?
- Is the original price hidden when there is no discount?
- Does the page still look polished at a glance?

If the answer is yes to all of these, the lab is in good shape.