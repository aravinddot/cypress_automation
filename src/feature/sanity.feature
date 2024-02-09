Feature: Sanity Testing

	Scenario: Verify Homepage Logged in with Correct User
		Given Verify the logged in name in homepage
		Then Verify the homepage section

	Scenario: Add two carts and Delete the two carts
		Given Click on the 'Cart' option in homepage
		When Verify the cart is empty in cart page
		And Click on the 'Home' option in homepage
		Then Add two cart and verify and validate the two carts


	Scenario: Verify the cart is hover and showing correct cart name and price
		Given Verify each cart css background colour and get the each cart overlayed content
		Then Verify the overlayed content with actual cart name, cart price and add to cart option

	Scenario: Verify the heading, sub heading and paragraph shown correctly in Homepage
		Given Verify the heading in showing correctly
		When Verify the sub heading is showing correctly
		And Verify the paragraph is showing correctly
		And Verify the button is visible and the text contains "Test Cases"
		Then Verify the button is visible and the text contains "APIs list for practice"

	Scenario: Verify and validate the contact form
		Given Click on the 'Contact us' option in homepage
		When Verify the contact us page is visible
		And Verify 'Contact Us' form titile is visible
		And Verify 'Get In Touch' form titile is visible
		And Verify 'Feedback For Us' form titile is visible
		And Enter the 'name' in contact form as 'username'
		And Enter the 'email' in contact form as 'email'
		And Enter the 'subject' in contact form as 'subject'
		And Enter the text message in contact form 'textArea'
		And Upload a file 'invoice.txt' in contact form
		And click on contact form submit button
		Then Verify the contact form is submitted successfully

	Scenario: Verify the subscription in homepage and enter and email and verify successfull message
		Given Verify the subscription text is visible in homepage
		When Enter the current user email in email textbox
		And Click on subscription submit button
		Then Verify the subscribed successfully message shown	


