# Minimalistic-e-commerce-website
Set of static HTML files with responsive layout and JavaScript functionality
This is the final individual task of the Front-End course. It's goal was creating minimalistic e-commerce website. 
The Implementation is a set of static HTML files with responsive layout and necessary JavaScript functionality. 

Some words about Markup:

- Markup supports desktop, tablet and mobile layouts. 
- Devices with width more than 1024px use desktop layout. 
- Main content area doesn’t stretch more than 1180px but slider and other promo blocks (that take full width on desktop layout) can stretch up to 1300px. 
- Devices with width more than 768px use layout for tablets. 
- For screen width larger than 375px (including) pages use mobile layout.
- If device width is less than 375px layout won’t be broken and horizontal scroll will appear.

Border separators that take full width on desktop “fade out” at the ends.

Header and Footer(are present in every page): 

- Header has logo, information about items count and total cost of the basket.

- Menu button is added for mobile version.

- The menu has a Search field and the close button.


There are some blocks with links on the site, that work on the principle of a radio button. It means that only one item can be selected. 
This is implemented in one universal function, which is applied to blocks with menu, filters, also sizes, colors and a photo gallery in the Item details page.

- in tablet layout Menu items are displayed in one line. Search field is collapsed by default on tablet. Clicking on search icon shows and hides search field. 

- Footer has blocks with additional links, contacts, social network icons that change their structure depending on the screen size.

Main page:

The main page has a slider, a promo-block and a block with catalog items.

Depending on the screen size, the quantity of displayed products is changed, and the banners in the promo-block are changed.

Banner links direct users to Catalog page and Item details page

Slider:

Slider shows static images, they are changed every 10 seconds.
 
We can change images with Previous and Next arrows on Desktop. For other layouts - with dots in pager (right under carousel) and swipe (In this case, a horizontal swipe length must be greater than the vertical).

When you switch the slider manually, image change timer is reseted. 
 
Clicking on images in slider navigates user to Catalog or Item details page.

Images change with “fade in” animation.

Catalog:

Hover over item block highlights item title and shows overlay with “View Item” text for item image. 
 
Clicking on item block navigates user to Item details page. 

Catalog page is rendered using templates of Lodash library. 

Items are Filtered by “category” “women” and “fashion” “Casual style” and Ordered by date in descending.

Items that has “hasNew” property equal to true are displayed with NEW label near to the top left corner of item preview. 
If both price and discountedPrice fields are null – displayed value of placeholder field instead of price.

Promo block (“Last weekend extra 50% off...”) is displayed after four items for desktop, 3 items for tablet and 2 items on mobile. It is implemented using the property “order” for flex-container items.

Filter:

Filters are implemented as dropdown lists on Desktop, Dropdown opens on hover over filter bar element.

For tablet and mobile all filters are combined into single block which opens by click 
anywhere on filters bar. We can select only one value per filter. 

Clicking on value in any category highlights this value and updates filters bar:

1) For Desktop: If “Not selected” is selected value for filter category – only category title is displayed in the filters bar element. Otherwise both category title and value are displayed in filter bar element. 

2) For Tablet and mobile: All selected filter values and category titles are concatenated in single string with “, ” as separator. If filter category has selected value it is displayed and highlighted in filters bar. Otherwise filter category title is displayed without highlight. 

Item details page:

- “Back to catalog” link navigates user to Catalog page. 
- We can select only one item from size and color of catalog items.
- Link “Add to bag” adds catalog item to shopping bag and updates count and total cost of items in header.

Photos switcher:

Also the photos switcher is implemented. Clicking on thumbnail replaces main image with full size image of itself, and makes thumbnail active. 

Shopping bag:

LocalStorage is used for creating persistent storage for Shopping bag data

As you can see, If few items in bag have same name, size and color - they are combined on the Shopping bag page, only quantity is changed.

And if two items in bag have same name, but different size and/or color - they aren’t combined. 

On the shopping-bag page we can:

1) change items quantity that were already in the shopping-bag;
2) delete item
3) Clicking on "Clear bag" link removes all product items from Shopping bag and replaces them with text "Your shopping bag is empty. Use Catalog to add new items". 
4) And if we click on "Buy now" - Shopping bag will remove all product items and replace them with text "Thank you for your purchase”.
(also total cost and items quantity are updated in shopping bag and in the header).

