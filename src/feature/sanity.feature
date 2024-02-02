Feature: Sanity Testing

	# Scenario: Verify Homepage Logged in with Correct User
	# 	Given Verify the logged in name in homepage
	# 	Then Verify the homepage section

	# Scenario: Add two carts and Delete the two carts
	# 	Given Add two cart and verify and validate the two carts

	# Scenario: Verify the cart is hover and showing correct cart name and price
	# 	Given Verify each cart css background colour and get the each cart overlayed content
	# 	Then Verify the overlayed content with actual cart name, cart price and add to cart option

	Scenario: Verify the heading, sub heading and paragraph shown correctly in Homepage
		Given Verify the heading in showing correctly
		When Verify the sub heading is showing correctly
		And Verify the paragraph is showing correctly
		And Verify the button is visible and the text contains "Test Cases"
		Then Verify the button is visible and the text contains "APIs list for practice"


	


