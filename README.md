# GTM DataLayer for Contact Form 7 Tracking with All Inputs Values (hashed email)

### How to use 
1. In Google Tag Manager, create a new tag as a custom HTML tag.
2. Inside the tag, paste the entire code from the `cf7-datalayer.js` or `cf7-hashed-email-datalayer.js` file provided in this repository. Don't forget to wrap the code with <script> tag.
3. Set the trigger to fire on All Pages page views.

Once you've configured this setup, you'll begin receiving Google Tag Manager dataLayer events as `cf7_submit`. You will get form ID as ***formId*** and all other form inputs.
